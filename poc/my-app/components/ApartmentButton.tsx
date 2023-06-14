import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import { hebrew } from "../utils/text_dictionary";

type ApartmentButtonProps = {
  apartmentNumber: number;
  onClick: (apartment_number: number) => void;
};

const ApartmentButton = ({ apartmentNumber, onClick }: ApartmentButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: "#2c393f",
      borderRadius: 10,
      marginVertical: 8,
    },
    text: {
      textAlign: "center",
      fontSize: 16,
      color: "white",
    },
  });

  return (
    <TouchableHighlight style={styles.button} onPress={onClick(apartmentNumber)}>
      <Text style={styles.text}>{hebrew.apartment + " " + apartmentNumber}</Text>
    </TouchableHighlight>
  );
};

export default ApartmentButton;
