import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  ScrollView,
} from "@unthinkable/react-core-components";

import { MediaQueryContext } from "@unthinkable/react-theme";
import CommonText from "../CommonText";
import styles from "./SessionDropdown.style";

const SessionDropdown = ({ options, onSelect, optionStyle, sessionRef }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  return (
    <View style={styles.modalContent} ref={sessionRef}>
      <ScrollView>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onSelect(option.label)}
          >
            <CommonText
              title={option.label}
              customTextStyle={[
                styles.optionTextStyle(currentBreakpoint),
                optionStyle,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

SessionDropdown.defaultProps = {
  optionStyle: {},
};

SessionDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  optionStyle: PropTypes.object,
};

export default SessionDropdown;
