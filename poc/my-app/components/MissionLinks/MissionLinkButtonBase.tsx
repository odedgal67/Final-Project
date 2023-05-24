import { TouchableHighlight, Text, StyleSheet, Linking } from "react-native";

type MissionLinkButtonBaseProps = {
  title: string;
  notFoundAction: () => void;
  link?: string;
};

const MissionLinkButtonBase = (props: MissionLinkButtonBaseProps) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() =>
        props.link ? Linking.openURL(props.link) : props.notFoundAction()
      }
      onLongPress={props.notFoundAction}
    >
      <Text style={styles.link_button_text}>{props.title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
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
  link_button_text: {
    fontSize: 14,
    lineHeight: 21,
    color: "white",
    marginVertical: "10%",
  },
});

export default MissionLinkButtonBase;
