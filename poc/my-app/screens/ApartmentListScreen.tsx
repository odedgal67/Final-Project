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
import CreateApartmentButton from "../components/CreateApartmentButton";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { ProjectContext } from "../utils/ProjectContext";
import { Apartment, Project, Title } from "../types";
import { hebrew } from "../utils/text_dictionary";
import ApartmentButton from "../components/ApartmentButton";

const ApartmentListScreen = ({ navigation, route }) => {
  const { getUser } = React.useContext(UserContext);
  const { getProject } = React.useContext(ProjectContext);
  const [apartments, setApartments] = React.useState([] as Apartment[]);
  const [editingApartment, setEditingApartment] = React.useState<Apartment | null>(null);
  const [editedApartmentNumber, setEditedApartmentNumber] = React.useState(0);

  let add_apartment_click = (
    apartment_number: string,
    modal_visibility_setter: (b: boolean) => void
  ) => {
    API.get_instance()
      .add_apartment(getProject().id, parseInt(apartment_number), getUser().id)
      .then(() => {
        modal_visibility_setter(false);
        return API.get_instance().get_all_apartments(getProject().id, getUser().id);
      })
      .then((apartments) => setApartments(apartments))
      .catch((err) => console.log(err));
  };

//   const handleSaveEditedApartment = () => {
//     if (editingApartment && editingApartment.apartment_number !== editedApartmentNumber) {
//         API.get_instance()
//         .edit_apartment_number(
//             getProject().id,
//             editingApartmentNumber,
//             getUser().id
//         )
//     .then((apartments) => setApartments(apartments))
//     .catch((err) => console.log(hebrew.fault_description + "\n" + err));
//     }
//   };

  const handleApartmentLongPress = (apartment: Apartment) => {
    setEditingApartment(apartment);
    setEditedApartmentNumber(apartment.apartment_number);
  };

  const handleRemoveApartment = (apartment: Apartment) => {
    API.get_instance()
      .remove_apartment(getProject().id, apartment.apartment_number, getUser().id)
      .then(() => {
        return API.get_instance().get_all_apartments(
          getProject().id,
          getUser().id
        );
      })
      .then((apartments) => setApartments(apartments))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    API.get_instance()
      .get_all_apartments(getProject().id, getUser().id)
      .then((apartments) => setApartments(apartments))
      .catch((err) => console.log(err));
  }, []);

  navigation.setOptions({
    title: route.params.header + " > " + hebrew.apartments,
  });

  return (
    <Background>
      <ScrollView style={{ height: "85%" }}>
        <View style={styles.container}>
          <View>
            {apartments.map((apartment, index) => (
                <ApartmentButton
                apartmentNumber={apartment.apartment_number}
                onClick={(apartmentNumber: number) => {
                    return () => {
                    navigation.navigate("GeneralStagesScreen", {
                        title: Title.ApartmentStages,
                        project: getProject(),
                        apartment_number: apartmentNumber,
                    });
                }}}
                />
            ))}
          </View>
        </View>
      </ScrollView>
      <CreateApartmentButton
        onAddClick={add_apartment_click}
        setEditingApartment={setEditingApartment}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
    padding: 20,
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
  ButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ApartmentListScreen;
