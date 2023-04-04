import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#443c68", "#ff6e31", "#fffbeb"]}
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