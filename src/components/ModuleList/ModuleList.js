import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FlatList, TouchableOpacity } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { getAccessibleModulesList } from "../../constants/sideBarHelpers";
import styles from "./ModuleList.style";

const ModuleList = ({ modules, onSelectItem }) => {
  const [userProfileState] = useContext(UserProfileContext);

  const renderrableModules = getAccessibleModulesList({
    allModules: modules,
    accessibleModules: userProfileState.userDetails?.users?.[0]?.role || [],
  });

  const renderItem = ({ item: module }) => (
    <>
      {module.visible && (
        <TouchableOpacity
          style={
            module.sectionHeading
              ? styles.moduleListWithoutCursor
              : styles.moduleListItem
          }
          key={module.key}
          onPress={() =>
            !module.sectionHeading ? onSelectItem(module) : () => {}
          }
        >
          <CommonText
            customTextStyle={[
              styles.changeText,
              module.sectionHeading ? styles.disabled : {},
            ]}
            title={module.label}
          />
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <FlatList
      data={renderrableModules}
      keyExtractor={(module) => module.key}
      renderItem={renderItem}
    />
  );
};

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default ModuleList;
