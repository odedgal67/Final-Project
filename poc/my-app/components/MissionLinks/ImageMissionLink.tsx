import { useContext, useState } from "react";
import MissionLinkButtonBase from "./MissionLinkButtonBase";
import { Mission, Title } from "../../types";
import { hebrew } from "../../utils/text_dictionary";
import { ProjectContext } from "../../utils/ProjectContext";
import { UserContext } from "../../utils/UserContext";
import * as ImagePicker from "expo-image-picker";
import API from "../../API/api_bridge";
import React from "react";

type ImageMissionLinkProps = {
  mission: Mission;
  title: Title;
  stage_id: string;
  link?: string;
};

const ImageMissionLink = (props: ImageMissionLinkProps) => {
  const [image, setImage] = useState<string | undefined>(
    props.mission.proof_link
  );
  const { getProject } = useContext(ProjectContext);
  const { getUser } = useContext(UserContext);
  let NotFoundAction = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (result.assets) {
        console.log("image uri: " + result.assets[0].uri);
        const imageUri = result.assets[0].uri;
        API.get_instance()
          .update_mission_proof(
            getProject().id,
            props.title,
            props.stage_id,
            props.mission.id,
            imageUri,
            getUser().id
          )
          .then((uri) => {
            setImage(uri);
            props.mission.proof_link = uri;
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        alert(hebrew.no_image_found);
      }
    } else {
      alert(hebrew.please_aprove_camera_permissions);
    }
  };

  return (
    <MissionLinkButtonBase
      title={hebrew.link_to_documentation}
      link={image}
      notFoundAction={NotFoundAction}
    />
  );
};

export default ImageMissionLink;
