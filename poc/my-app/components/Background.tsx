import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";

const Background = ({ children }: { children: JSX.Element }) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={styles.gradient}
      />
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f4efeb"
  },
});

export default Background;
