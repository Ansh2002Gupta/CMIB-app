import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import styles from "./CustomTextEditor.style";

const CustomTextEditor = ({
  customErrorStyle,
  customHandleBlur,
  customLabelStyle,
  errorMessage,
  isMandatory,
  label,
  onChangeText,
  value,
}) => {
  const richText = useRef(null);
  const intl = useIntl();

  const handleHead = () => (
    <CommonText customTextStyle={styles.headingStyle}>
      {intl.formatMessage({ id: "label.heading" })}
    </CommonText>
  );

  return (
    <View style={styles.componentView}>
      <View style={styles.labelContainer}>
        <CommonText
          customTextStyle={[styles.label, customLabelStyle]}
          fontWeight={customLabelStyle?.fontWeight}
        >
          {label}
        </CommonText>
        {isMandatory && (
          <CommonText customTextStyle={[styles.label, styles.starStyle]}>
            {"*"}
          </CommonText>
        )}
      </View>
      <View style={[styles.mainView, !!rrorMessage ? styles.invalidInput : {}]}>
        <View>
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
              actions.insertBulletsList,
              actions.insertLink,
              actions.checkboxList,
              actions.undo,
              actions.redo,
            ]}
            iconMap={{ [actions.heading1]: handleHead }}
          />
          <ScrollView>
            <RichEditor
              ref={richText}
              onBlur={customHandleBlur}
              initialContentHTML={value}
              onChange={(val) => {
                onChangeText(val);
              }}
              placeholder={intl.formatMessage({ id: "label.description" })}
            />
          </ScrollView>
        </View>
      </View>
      {!!errorMessage && (
        <CommonText
          customTextStyle={[styles.errorMsg, customErrorStyle]}
          fontWeight={customErrorStyle?.fontWeight || "600"}
        >
          {errorMessage}
        </CommonText>
      )}
    </View>
  );
};

CustomTextEditor.defaultProps = {
  customLabelStyle: {},
  isMandatory: false,
  label: "",
};

CustomTextEditor.propTypes = {
  customErrorStyle: PropTypes.object,
  customHandleBlur: PropTypes.func,
  customLabelStyle: PropTypes.object,
  errorMessage: PropTypes.string,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

export default CustomTextEditor;
