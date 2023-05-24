import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { hebrew } from "../../utils/text_dictionary";

type AcceptButtonProps = {
  onPress: () => void;
};

const AcceptButton = (props: AcceptButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button_container} onPress={props.onPress}>
        <Text style={styles.Text}>{hebrew.accept}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#4c595f",
    width: "50%",
    borderRadius: 10,
  },
  Text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    padding: "5%",
  },
});

export default AcceptButton;
