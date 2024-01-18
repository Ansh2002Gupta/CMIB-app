import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FlatList } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { getAccessibleModulesList } from "../../constants/sideBarHelpers";
import styles from "./ModuleList.style";

const ModuleList = ({ modules, onSelectItem, selectedModule }) => {
  const [userProfileState] = useContext(UserProfileContext);
  const renderrableModules = getAccessibleModulesList({
    allModules: modules,
    accessibleModules: userProfileState.userDetails?.role || [],
  });

  const renderItem = ({ item: module }) => (
    <>
      {module.visible && (
        <CustomTouchableOpacity
          style={
            module.sectionHeading
              ? styles.moduleListWithoutCursor
              : styles.moduleListItem(module.key === selectedModule.key)
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
          >
            {module.label}
          </CommonText>
        </CustomTouchableOpacity>
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
  selectedModule: PropTypes.object.isRequired,
};

export default ModuleList;
