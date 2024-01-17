import React, { useContext } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CommonText from "../CommonText";
import styles from "./SessionDropdown.style";

const SessionDropdown = ({ options, onSelect, optionStyle, sessionRef, selectedItem }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  return (
    <>
      {
      options.length > 0 &&
      <View style={styles.modalContent(currentBreakpoint)} ref={sessionRef}>
        {options.map((option, index) => (
          <CustomTouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onSelect(option.label)}
          >
            <CommonText
              customTextStyle={[styles.optionTextStyle, optionStyle]}
              fontWeight={option.label === selectedItem ? '600' : '500' }
            >
              {option.label}
            </CommonText>
          </CustomTouchableOpacity>
        ))}
      </View>
    }
    </>
  );
};

SessionDropdown.defaultProps = {
  options: [],
  optionStyle: {},
  sessionRef: {},
};

SessionDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  sessionRef: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  optionStyle: PropTypes.object,
  selectedItem: PropTypes.string.isRequired,
};

export default SessionDropdown;
