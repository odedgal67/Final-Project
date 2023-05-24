import { TouchableHighlight, Text, StyleSheet, Linking } from "react-native";
import ConfirmDialogue from "../ConfirmDialogue";
import { hebrew } from "../../utils/text_dictionary";

type MissionLinkButtonBaseProps = {
  title: string;
  notFoundAction: () => void;
  link?: string;
};

const MissionLinkButtonBase = (props: MissionLinkButtonBaseProps) => {
  return (
    <TouchableHighlight
      style={props.link ? styles.button_with_link : styles.button_no_link}
      onPress={() =>
        props.link ? Linking.openURL(props.link) : props.notFoundAction()
      }
      onLongPress={() =>
        props.link
          ? ConfirmDialogue({
              title: "",
              message: hebrew.link_was_found_would_you_like_to_change_it,
              onConfirm: props.notFoundAction,
            })
          : null
      }
    >
      <Text style={styles.link_button_text}>{props.title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button_no_link: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#646464",
    borderColor: "black",
    borderWidth: 0,
    marginVertical: "2%",
    marginHorizontal: 1,
    flex: 1,
  },
  button_with_link: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#649494",
    borderColor: "black",
    borderWidth: 0,
    marginVertical: "2%",
    marginHorizontal: 1,
    flex: 1,
  },
  link_button_text: {
    fontSize: 14,
    lineHeight: 21,
    color: "white",
    marginVertical: "10%",
  },
});

export default MissionLinkButtonBase;
