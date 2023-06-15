import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView,
} from "react-native";
import Background from "../components/Background";
import CreatePlanButton from "../components/CreatePlanButton";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { ProjectContext } from "../utils/ProjectContext";
import { Plan } from "../types";
import { hebrew } from "../utils/text_dictionary";
import * as DocumentPicker from "expo-document-picker";

const PlansScreen = ({ navigation, route }) => {
  const { getUser } = React.useContext(UserContext);
  const { getProject } = React.useContext(ProjectContext);
  const [plans, setPlans] = React.useState([] as Plan[]);
  const [editingPlan, setEditingPlan] = React.useState<Plan | null>(null);
  const [editedPlanName, setEditedPlanName] = React.useState("");
  const [editedPlanLink, setEditedPlanLink] = React.useState("");

  let handleDocumentPick = async () => {
    try {
      const result: DocumentPicker.DocumentResult = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type === "success" && result.uri) {
        const documentLink = result.uri;
        setEditedPlanLink(documentLink);
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };

  let add_plan_click = (
    planName: string,
    planLink: string,
    modal_visibility_setter: (b: boolean) => void
  ) => {
    API.get_instance()
      .add_plan(getProject().id, planName, planLink, getUser().id)
      .then(() => {
        modal_visibility_setter(false);
        return API.get_instance().get_all_plans(getProject().id, getUser().id);
      })
      .then((plans) => setPlans(plans))
      .catch((err) => console.log(err));
  };

  const handleSaveEditedPlan = () => {
    if (editingPlan) {
      const promises = [];
      if (editingPlan.name !== editedPlanName) {
        promises.push(
          API.get_instance()
            .edit_plan_name(
              getProject().id,
              editingPlan.id,
              editedPlanName,
              getUser().id
            )
        );
      }
      if (editingPlan.link !== editedPlanLink) {
        promises.push(
          API.get_instance()
            .edit_plan_link(
              getProject().id,
              editingPlan.id,
              editedPlanLink,
              getUser().id
            )
        );
      }

      Promise.all(promises)
        .then(() => {
          setEditingPlan(null);
          setEditedPlanName("");
          setEditedPlanLink("");
          return API.get_instance().get_all_plans(
            getProject().id,
            getUser().id
          );
        })
        .then((plans) => setPlans(plans))
        .catch((err) => console.log(err));
    }
  };

  const handlePlanLongPress = (plan: Plan) => {
    setEditingPlan(plan);
    setEditedPlanName(plan.name);
    setEditedPlanLink(plan.link);
  };

  const handleRemovePlan = (plan: Plan) => {
    API.get_instance()
      .remove_plan(getProject().id, plan.id, getUser().id)
      .then(() => {
        return API.get_instance().get_all_plans(
          getProject().id,
          getUser().id
        );
      })
      .then((plans) => setPlans(plans))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    API.get_instance()
      .get_all_plans(getProject().id, getUser().id)
      .then((plans) => setPlans(plans))
      .catch((err) => console.log(err));
  }, []);

  navigation.setOptions({
    title: route.params.header + " > " + hebrew.plans,
  });

  return (
    <Background>
      <ScrollView style={{ height: "80%" }}>
        <View style={styles.container}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>{hebrew.plans}</Text>
            <Text style={styles.headerText}>{hebrew.date_of_edit}</Text>
          </View>
          <View>
            {plans.map((plan, index) => (
              <TouchableOpacity
              key={index}
              onPress={() =>
                plan.link
                  ? Linking.openURL(API.get_instance().get_url(plan.link)).catch((error) =>
                      alert(hebrew.error_occurred + "\n" + error)
                    )
                  : alert(hebrew.link_doesnt_exist)
              }
              onLongPress={() => handlePlanLongPress(plan)}
            >
                <View style={styles.tableRow}>
                  {editingPlan === plan ? (
                    <View style={{ flex: 1 }}>
                      <View style={styles.editContainer}>
                        <TextInput
                          style={styles.editInput}
                          value={editedPlanName}
                          onChangeText={setEditedPlanName}
                        />
                        <TouchableOpacity
                          style={styles.EditLinkButton}
                          onPress={handleDocumentPick}
                        >
                          <Text style={styles.ButtonText}>{hebrew.link_edit}</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={styles.Button}
                        onPress={handleSaveEditedPlan}
                      >
                        <Text style={styles.ButtonText}>{hebrew.accept}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.Button}
                        onPress={() => handleRemovePlan(plan)}
                      >
                        <Text style={styles.ButtonText}>{hebrew.delete_plan}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.nameText}>{plan.name}</Text>
                      <Text style={styles.dateText}>
                        {plan.date}
                      </Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <CreatePlanButton
        onAddClick={add_plan_click}
        setEditingPlan={setEditingPlan}
      />
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
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  Button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    padding: 5,
    marginTop: 10,
  },
  EditLinkButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    padding: 5,
  },
  ButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PlansScreen;
