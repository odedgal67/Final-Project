import React from 'react';
import { Button, Text, Pressable, StyleSheet } from "react-native";

const ProjectButton = (props) => {
  return (
    <Pressable style={styles.button}
        onPress={props.onPress}>
        <Text style={styles.text}>{props.projectName}</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: '#2196F3',
      borderColor: 'black',
      borderWidth: 1,
      margin: 4.5,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

export default ProjectButton;