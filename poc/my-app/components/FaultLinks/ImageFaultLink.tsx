import { useContext, useState } from "react";
import FaultLinkButtonBase from "./FaultLinkButtonBase";
import { Fault } from "../../types";
import { hebrew } from "../../utils/text_dictionary";
import { ProjectContext } from "../../utils/ProjectContext";
import { UserContext } from "../../utils/UserContext";
import * as ImagePicker from "expo-image-picker";
import API from "../../API/api_bridge";

type ImageFaultLinkProps = {
  fault: Fault;
  link?: string;
};

export const ImageFaultProofLink = (props: ImageFaultLinkProps) => {
  const [image, setImage] = useState<string | undefined>(
    props.fault.proof
  );
  const { getProject } = useContext(ProjectContext);
  const { getUser } = useContext(UserContext);
  let NotFoundAction = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
      if (result.assets) {
        console.log("image uri: " + result.assets[0].uri);
        const imageUri = result.assets[0].uri;
        API.get_instance()
          .set_fault_proof(
            getProject().id,
            props.fault.id,
            imageUri,
            getUser().id
          )
          .then((uri) => {
            setImage(uri);
            props.fault.proof = uri;
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
    <FaultLinkButtonBase
      title={hebrew.fault_photo}
      link={image}
      notFoundAction={NotFoundAction}
    />
  );
};

export const ImageFaultProofFixLink = (props: ImageFaultLinkProps) => {
    const [image, setImage] = useState<string | undefined>(
      props.fault.proof_fix
    );
    const { getProject } = useContext(ProjectContext);
    const { getUser } = useContext(UserContext);
    let NotFoundAction = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        const result: ImagePicker.ImagePickerResult =
          await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
        if (result.assets) {
          console.log("image uri: " + result.assets[0].uri);
          const imageUri = result.assets[0].uri;
          API.get_instance()
            .set_fault_proof_fix(
              getProject().id,
              props.fault.id,
              imageUri,
              getUser().id
            )
            .then((uri) => {
              setImage(uri);
              props.fault.proof_fix = uri;
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
      <FaultLinkButtonBase
        title={hebrew.fault_fix_photo}
        link={image}
        notFoundAction={NotFoundAction}
      />
    );
  };  
