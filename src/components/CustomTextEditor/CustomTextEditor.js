import React from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { View } from "@unthinkable/react-core-components";
import styles from "./CustomTextEditor.style";
import CommonText from "../CommonText";
import { useIntl } from "react-intl";
import {
  attachmentType,
  color,
  format,
  listOptions,
  listType,
  size,
  textFormats,
} from "../../constants/constants";
import "./styles.css";

const CustomTextEditor = (props) => {
  const {
    label,
    isMandatory,
    customLabelStyle,
    onChangeText,
    customErrorStyle,
    isError,
    value,
    errorMessage,
  } = props;
  var modules = {
    toolbar: [
      [{ size: size }],
      textFormats,
      listType,
      attachmentType,
      listOptions,
      [{ color: color }],
    ],
  };
  const intl = useIntl();

  var formats = format;

  const handleProcedureContentChange = (content) => {
    onChangeText(content);
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
          className={isError ? "error" : ""}
          modules={modules}
          formats={formats}
          placeholder={intl.formatMessage({ id: "label.description" })}
          onChange={handleProcedureContentChange}
          style={styles.quillStyling}
        />
      </View>
      {isError && (
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

export default CustomTextEditor;
