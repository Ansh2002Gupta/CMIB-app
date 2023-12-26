import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import styles from "./CustomList.style";

const CustomList = ({ item }) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.list, item.isSelected && styles.selectedItemBackground]}
       
      >
        <CommonText
          customTextStyle={{
            ...styles.listText,
            ...(item.isSelected && styles.selectedItem),
            ...(item.subitems && item.subitems.length > 0 && styles.commonText),
          }}
          title={item.title}
        />
      </TouchableOpacity>
    </View>
  );
};

CustomList.prototypes = {
  item: PropTypes.object.isRequired,
};

export default CustomList;
