import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import getStyles from "./SessionDropdown.style";

const SessionDropdown = ({
  includeAllKeys,
  labelField,
  onSelect,
  options,
  optionStyle,
  selectedItem,
  sessionRef,
  valueField,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const getAllKeys = (option) => {
    let finalObj = {};
    Object.keys(option).forEach((key) => {
      if (key !== valueField && key !== labelField) {
        finalObj = { ...finalObj, [key]: option[key] };
      }
    });
    return finalObj;
  };

  const defaultOptions = options?.map((option) => ({
    value: String(option[valueField]),
    label: String(option[labelField]),
    ...(includeAllKeys ? { ...getAllKeys(option) } : {}),
  }));
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  return (
    <>
      {!!defaultOptions?.length && (
        <View style={styles.modalContent(currentBreakpoint)} ref={sessionRef}>
          {defaultOptions.map((option, index) => {
            return (
              <CustomTouchableOpacity
                key={index}
                style={styles.option}
                disabled={!option.participated && option.status === 0}
                onPress={() => onSelect(option)}
              >
                <CommonText
                  customTextStyle={{
                    ...styles.optionTextStyle,
                    optionStyle,
                    ...(!option.participated && option.status === 0
                      ? styles.inactiveStyle
                      : {}),
                  }}
                  fontWeight={option.label === selectedItem ? "600" : "500"}
                >
                  {option.label}
                </CommonText>
              </CustomTouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

SessionDropdown.defaultProps = {
  includeAllKeys: false,
  labelField: "label",
  options: [],
  optionStyle: {},
  sessionRef: {},
  valueField: "value",
};

SessionDropdown.propTypes = {
  includeAllKeys: PropTypes.bool,
  labelField: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
  optionStyle: PropTypes.object,
  selectedItem: PropTypes.string.isRequired,
  sessionRef: PropTypes.object,
  valueField: PropTypes.string,
};

export default SessionDropdown;
