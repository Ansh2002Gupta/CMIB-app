import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import styles from "./SessionDropdown.style";

const SessionDropdown = ({
  onSelect,
  options,
  optionStyle,
  selectedItem,
  sessionRef,
}) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  return (
    <>
      {!!options?.length && (
        <View style={styles.modalContent(currentBreakpoint)} ref={sessionRef}>
          {options.map((option, index) => (
            <CustomTouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => onSelect(option.label)}
            >
              <CommonText
                customTextStyle={[styles.optionTextStyle, optionStyle]}
                fontWeight={option.label === selectedItem ? "600" : "500"}
              >
                {option.label}
              </CommonText>
            </CustomTouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

SessionDropdown.defaultProps = {
  options: [],
  optionStyle: {},
  sessionRef: {},
};

SessionDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  optionStyle: PropTypes.object,
  selectedItem: PropTypes.string.isRequired,
  sessionRef: PropTypes.object,
};

export default SessionDropdown;
