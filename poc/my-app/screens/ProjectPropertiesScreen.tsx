import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PropertiesButton from "../components/PropertiesButton";
import Background from "../components/Background";
import { TouchableOpacity, View } from "react-native";
import {
  ProjectContext,
  ProjectContextProvider,
} from "../utils/ProjectContext";
import { hebrew } from "../utils/text_dictionary";
import { Project, Title } from "../types";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import ProjectSettingsModal from "../components/ProjectSettingsModal";
import { actions, hasPermission } from "../utils/Permissions";

const ProjectPropertiesScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { project: Project } };
}) => {
  let projectName = route.params.project.name;
  const { setProject, getProject, setRole } = React.useContext(ProjectContext);
  const { getUser, getRole } = React.useContext(UserContext);
  React.useEffect(() => {
    setProject(route.params.project);
    setRole(API.get_instance().get_role(getUser().name, getProject().id));
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: projectName });
  }, [navigation]);
  function getButton(ButtonProps: {
    propertyName: string;
    ScreenName: String;
    title: Title;
  }) {
    return (
      <PropertiesButton
        key={ButtonProps.propertyName}
        title={ButtonProps.propertyName}
        onPress={() =>
          navigation.navigate(ButtonProps.ScreenName, {
            project: getProject(),
            header: getProject().name,
            title: ButtonProps.title,
          })
        }
      />
    );
  }

  function getRow(button1: JSX.Element, button2: JSX.Element, key: number) {
    return (
      <View
        key={key}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {button1}
        {button2}
      </View>
    );
  }

  function getRows() {
    let buttonProperties = [
      {
        propertyName: hebrew.general_stages,
        ScreenName: "GeneralStagesScreen",
        title: Title.GeneralStages,
      },
      {
        propertyName: hebrew.pre_stage,
        ScreenName: "GeneralStagesScreen",
        title: Title.EarlyStages,
      },
      {
        propertyName: hebrew.skeletal_stages,
        ScreenName: "GeneralStagesScreen",
        title: Title.SkeletalStages,
      },
      {
        propertyName: hebrew.apartments,
        ScreenName: "LevelsScreen",
        title: Title.ApartmentStages,
      },
      { propertyName: hebrew.plans, ScreenName: "PlansScreen", title: -1 },
      {
        propertyName: hebrew.building_defects,
        ScreenName: "BuildingDefectsScreen",
        title: Title.BuildingFaults,
      },
    ];
    let rows = [];
    for (let i = 0; i < buttonProperties.length; i += 2) {
      let button1 = getButton(buttonProperties[i]);
      let button2 = getButton(buttonProperties[i + 1]);
      rows.push(getRow(button1, button2, i));
    }
    return rows;
  }
  return (
    <ProjectContextProvider>
      <Background>
        <View style={{ flex: 1 }}>
          <SafeAreaView
            style={{
              flexDirection: "column",
              justifyContent: "center",
              margin: 20,
              flex: 5,
            }}
          >
            {getRows()}
          </SafeAreaView>
          {hasPermission(getRole(), actions.MANAGE_PROJECT_SETTINGS) ? (
            <ProjectSettingsModal
              project={getProject()}
              navigation={navigation}
            />
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>
      </Background>
    </ProjectContextProvider>
  );
};

export default ProjectPropertiesScreen;
