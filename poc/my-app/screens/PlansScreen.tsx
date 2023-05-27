import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import Background from "../components/Background";
import CreatePlanButton from "../components/CreatePlanButton";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { ProjectContext } from "../utils/ProjectContext";
import { Plan } from "../types";
import { hebrew } from "../utils/text_dictionary";

const PlansScreen = ({ navigation, route }) => {
  const { getUser } = React.useContext(UserContext);
  const { getProject } = React.useContext(ProjectContext);
  const [plans, setPlans] = React.useState([] as Plan[]);
  let add_plan_click = (
    planName: string,
    link: string,
    modal_visibility_setter: (b: boolean) => void
  ) => {
    API.get_instance()
      .add_plan(getProject().id, planName, link, getUser().id)
      .then(() => {
        modal_visibility_setter(false);
        return API.get_instance().get_all_plans(getProject().id);
      })
      .then((plans) => setPlans(plans))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    API.get_instance()
      .get_all_plans(getProject().id)
      .then((plans) => setPlans(plans))
      .catch((err) => console.log(err));
  }, []);
  navigation.setOptions({ title: route.params.header + " > " + hebrew.plans });
  return (
    <Background>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>{hebrew.plans}</Text>
            <Text style={styles.headerText}>{hebrew.date_of_edit}</Text>
          </View>
          <View>
            {plans.map((plan, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => Linking.openURL(plan.link)}
              >
                <View style={styles.tableRow}>
                  <Text style={styles.nameText}>{plan.name}</Text>
                  <Text style={styles.dateText}>
                    {new Date(plan.date).toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <CreatePlanButton onAddClick={add_plan_click} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
    padding: 20,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    color: "#007AFF",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 10,
  },
  nameText: {
    textAlign: "center",
    flex: 1,
    fontSize: 16,
    color: "#007AFF",
  },
  dateText: {
    flex: 1,
    fontSize: 14,
    color: "#555555",
    textAlign: "center",
  },
});

export default PlansScreen;
