import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import Background from "../components/Background";

const names = ["תכנית 1", "תכנית 2", "תכנית 3"];
const links = ["https://www.example.com/plan1", "https://www.example.com/plan2", "https://www.example.com/plan3"];
const dates = ["20/04/2023", "20/04/2023", "20/04/2023"];

const PlansScreen = () => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>תכנית</Text>
          <Text style={styles.headerText}>קישור</Text>
          <Text style={styles.headerText}>תאריך</Text>
        </View>
        <View>
          {names.map((name, index) => (
            <View style={styles.tableRow} key={index}>
              <Text>{name}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(links[index])}>
                <Text style={{ textDecorationLine: "underline" }}>{links[index]}</Text>
              </TouchableOpacity>
              <Text>{dates[index]}</Text>
            </View>
          ))}
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 10,
  },
});

export default PlansScreen;
