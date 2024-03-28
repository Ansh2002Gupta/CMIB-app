import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { useIntl } from "react-intl";
import "quill/dist/quill.snow.css";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import {
  ATTACHMENT_TYPE,
  COLOR,
  FORMAT,
  LIST_OPTION,
  LIST_TYPE,
  SIZE,
  TEXT_FORMATS,
} from "../../constants/constants";
import "./styles.css";
import styles from "./CustomTextEditor.style";

const CustomTextEditor = (props) => {
  const {
    customErrorStyle,
    customHandleBlur,
    customLabelStyle,
    disabled,
    errorMessage,
    isMandatory,
    label,
    onChangeText,
    value,
  } = props;

  const modules = {
    toolbar: [
      [{ size: SIZE }],
      TEXT_FORMATS,
      LIST_TYPE,
      ATTACHMENT_TYPE,
      LIST_OPTION,
      [{ color: COLOR }],
    ],
  };
  const intl = useIntl();

  const handleProcedureContentChange = (content) => {
    onChangeText && onChangeText(content);
  };

  return (
    <View>
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
      <View style={styles.quillContainer}>
        <ReactQuill
          theme="snow"
          value={value}
          className={!!errorMessage ? "error" : ""}
          modules={modules}
          onBlur={customHandleBlur}
          formats={FORMAT}
          placeholder={intl.formatMessage({ id: "label.description" })}
          onChange={handleProcedureContentChange}
          style={styles.quillStyling}
          readOnly={disabled}
        />
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
  disabled: false,
};
CustomTextEditor.propTypes = {
  customErrorStyle: PropTypes.object,
  customHandleBlur: PropTypes.func,
  customLabelStyle: PropTypes.object,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

export default CustomTextEditor;
