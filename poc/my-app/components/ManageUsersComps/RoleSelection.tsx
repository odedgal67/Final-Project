import { SelectList } from "react-native-dropdown-select-list";
import { roles } from "../../utils/Permissions";
import { role_to_hebrew } from "../../utils/text_dictionary";
import React from "react";
import { StyleSheet, View } from "react-native";

type RoleSelectionProps = {
  onPress: (val: roles) => void;
  title: string;
};

const RoleSelection = (props: RoleSelectionProps) => {
  const data = [
    { key: roles.CONTRACTOR, value: role_to_hebrew[roles.CONTRACTOR] },
    {
      key: roles.PROJECT_MANAGER,
      value: role_to_hebrew[roles.PROJECT_MANAGER],
    },
    { key: roles.WORK_MANAGER, value: role_to_hebrew[roles.WORK_MANAGER] },
  ];
  const [selected, setSelected] = React.useState("");
  return (
    <View style={{ flex: 1 }}>
      <SelectList
        data={data}
        setSelected={props.onPress}
        dropdownItemStyles={styles.dropDown}
        boxStyles={styles.box}
        placeholder={props.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropDown: {},
  box: {
    flex: 1,
  },
});

export default RoleSelection;
