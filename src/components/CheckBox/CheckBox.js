import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from '../CommonText';
import images from "../../images";
import styles from "./CheckBox.style";

const CheckBox = (props) => {
  const { title, isSelected, handleCheckbox, index, id } = props;
  return (
    <View style={styles.contentContainerStyle}>
      <TouchableOpacity onPress={() => handleCheckbox(id)}>
        <Image
          source={
            isSelected
              ? images.iconCheckedCheckbox
              : images.iconUncheckedCheckbox
          }
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <CommonText customTextStyle ={styles.titleStyle} title={title}/>
    </View>
  );
};

CheckBox.propTypes = {
  title: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default CheckBox;
