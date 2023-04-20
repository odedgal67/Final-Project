import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#cce3de80", "#eaf4f4"]}
        start={{ x: 0, y: 1 }}
        end={{ x: -1, y: 0 }}
        style={styles.gradient}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Background;