import { useContext, useState } from "react";
import MissionLinkButtonBase from "./MissionLinkButtonBase";
import { Mission, Title } from "../../types";
import { hebrew } from "../../utils/text_dictionary";
import { ProjectContext } from "../../utils/ProjectContext";
import { UserContext } from "../../utils/UserContext";
import * as DocumentPicker from "expo-document-picker";
import API from "../../API/api_bridge";

type PdfMissionLinkProps = {
  mission: Mission;
  title: Title;
  stage_id: string;
  link?: string;
};

export const TekkenPdfMissionLink = (props: PdfMissionLinkProps) => {
  const [documentUri, setDocumentUri] = useState<string | undefined>(
    props.mission.document_link
  );
  const { getProject } = useContext(ProjectContext);
  const { getUser } = useContext(UserContext);

  let NotFoundAction = async () => {
    try {
      const result: DocumentPicker.DocumentResult =
        await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });
      if (result.type === "success" && result.uri) {
        console.log("document uri: " + result.uri);
        const documentUri = result.uri;
        API.get_instance()
          .update_mission_document(
            getProject().id,
            props.title,
            props.stage_id,
            props.mission.id,
            documentUri,
            getUser().id
          )
          .then((uri) => {
            setDocumentUri(uri);
            props.mission.document_link = uri;
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        alert(hebrew.no_document_found);
      }
    } catch (error) {
      console.log(error);
      alert(hebrew.error_occurred);
    }
  };

  return (
    <MissionLinkButtonBase
      title={hebrew.plan}
      link={documentUri}
      notFoundAction={NotFoundAction}
    />
  );
};

export const PlanPdfMissionLink = (props: PdfMissionLinkProps) => {
  const [documentUri, setDocumentUri] = useState<string | undefined>(
    props.mission.plan_link
  );
  const { getProject } = useContext(ProjectContext);
  const { getUser } = useContext(UserContext);

  let NotFoundAction = async () => {
    try {
      const result: DocumentPicker.DocumentResult =
        await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });
      if (result.type === "success" && result.uri) {
        console.log("document uri: " + result.uri);
        const documentUri = result.uri;
        API.get_instance()
          .update_mission_plan(
            getProject().id,
            props.title,
            props.stage_id,
            props.mission.id,
            documentUri,
            getUser().id
          )
          .then((uri) => {
            setDocumentUri(uri);
            props.mission.plan_link = uri;
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        alert(hebrew.no_document_found);
      }
    } catch (error) {
      console.log(error);
      alert(hebrew.error_occurred);
    }
  };

  return (
    <MissionLinkButtonBase
      title={hebrew.tekken}
      link={documentUri}
      notFoundAction={NotFoundAction}
    />
  );
};
