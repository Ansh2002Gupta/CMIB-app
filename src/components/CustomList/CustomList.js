import React from "react";
import { TouchableOpacity, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import colors from "../../assets/colors";
import styles from "./CustomList.style";

const CustomList = ({ item, onSelect }) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.list, item.isSelected && styles.selectedItemBackground]}
        onPress={() => onSelect(item.id)}
      >
        <CommonText
          customTextStyle={{
            ...styles.listText,
            ...(item.isSelected && styles.selectedItem),
            ...(item.subitems &&
              item.subitems.length > 0 && { color: colors.subHeadingGray }),
          }}
          title={item.title}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomList;
