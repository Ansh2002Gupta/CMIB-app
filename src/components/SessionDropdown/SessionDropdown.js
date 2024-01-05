import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  View,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";

import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CommonText from "../CommonText";
import styles from "./SessionDropdown.style";

const SessionDropdown = ({ options, onSelect, optionStyle, sessionRef }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  return (
    <View style={styles.modalContent(currentBreakpoint)} ref={sessionRef}>
      {options.map((option, index) => (
        <CustomTouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onSelect(option.label)}
        >
          <CommonText
            title={option.label}
            customTextStyle={[
              styles.optionTextStyle,
              optionStyle,
            ]}
          />
        </CustomTouchableOpacity>
      ))}
    </View>
  );
};

SessionDropdown.defaultProps = {
  optionStyle: {},
  sessionRef:{},
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
};

export default SessionDropdown;
