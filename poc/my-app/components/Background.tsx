import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Background = ( {children}: {children: JSX.Element}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#f4efeb", "#f4efeb"]}
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
