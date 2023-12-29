import React from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import Styles from "./ModuleList.style"; 

const ModuleList = ({ modules, onSelectItem }) => {
  return (
    <FlatList
      data={modules}
      keyExtractor={(module) => module.key}
      renderItem={({ item: module }) => (
        <>
          <TouchableOpacity
            style={Styles.moduleListItem}
            key={module.key}
            onPress={() => !module?.subMenu?.length && onSelectItem(module)}
          >
            <CommonText
              customTextStyle={[
                Styles.changeText,
                module?.subMenu?.length ? Styles.disabled : {},
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
                  style={Styles.moduleListItem}
                  onPress={() => onSelectItem(menu, true)}
                >
                  <CommonText
                    customTextStyle={Styles.changeText}
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
