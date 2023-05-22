import { Alert } from "react-native";
import { hebrew } from "../utils/text_dictionary";

type ConfirmDialogueProps = {
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const ConfirmDialogue = (props: ConfirmDialogueProps) => {
  return Alert.alert(props.title, props.message, [
    {
      text: hebrew.accept,
      onPress: props.onConfirm,
    },
    {
      text: hebrew.decline,
      onPress: props.onCancel,
    },
  ]);
};

export default ConfirmDialogue;
