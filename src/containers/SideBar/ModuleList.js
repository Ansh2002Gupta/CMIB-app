import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  FlatList,
} from "@unthinkable/react-core-components";

import styles from "./SideBar.style"; 
import CommonText from "../../components/CommonText";

const ModuleList = ({ modules, onSelectItem }) => {
  return (
    <FlatList
      data={modules}
      keyExtractor={(module) => module.key}
      renderItem={({ item: module }) => (
        <>
          <TouchableOpacity
            style={styles.moduleListItem}
            key={module.key}
            onPress={() => !module?.subMenu?.length && onSelectItem(module)}
          >
            <CommonText
              customTextStyle={[
                styles.changeText,
                module?.subMenu?.length ? styles.disabled : {},
              ]}
              title={module.label}
            />
          </TouchableOpacity>
          {module?.subMenu?.length > 0 && (
            <FlatList
              data={module.subMenu}
              keyExtractor={(menu) => menu.key}
              renderItem={({ item: menu }) => (
                <TouchableOpacity
                  style={styles.moduleListItem}
                  onPress={() => onSelectItem(menu, true)}
                >
                  <CommonText
                    customTextStyle={styles.changeText}
                    title={menu.label}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
    />
  );
};

ModuleList.propTypes = {
  modules: PropTypes.array.isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default ModuleList;
