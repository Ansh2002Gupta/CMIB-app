import React from "react";
import PropTypes from "prop-types";
import { FlatList, TouchableOpacity } from "@unthinkable/react-core-components";

import { getAccessibleModulesList } from "../../constants/sideBarHelpers";
import CommonText from "../CommonText";
import styles from "./ModuleList.style";

const ModuleList = ({ modules, onSelectItem }) => {
  // This is dummy data for now
  const accessibleModules = [
    {
      id: 7,
      name: "CA Jobs",
      slug: "ca-jobs",
      guard_name: "users-api",
      created_at: "2023-12-11T17:15:39.000000Z",
      updated_at: "2023-12-11T17:15:39.000000Z",
      pivot: {
        model_type: "App\\Models\\User",
        model_id: 4,
        role_id: 7,
      },
    },
    {
      id: 7,
      name: "Overseas Chapters",
      slug: "ca-jobs",
      guard_name: "users-api",
      created_at: "2023-12-11T17:15:39.000000Z",
      updated_at: "2023-12-11T17:15:39.000000Z",
      pivot: {
        model_type: "App\\Models\\User",
        model_id: 4,
        role_id: 7,
      },
    },
  ];

  const renderrableModules = getAccessibleModulesList({
    allModules: modules,
    accessibleModules,
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
          >
            {module.label}
          </CommonText>
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
