import React from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  ScrollView,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./SessionDropdown.style";

const SessionDropdown = ({ options, onSelect, onClose, optionStyle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => onSelect(option.label)}
              >
                <CommonText
                  title={option.label}
                  customTextStyle={[styles.optionTextStyle, optionStyle]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
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
