import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { useIntl } from "react-intl";
import "quill/dist/quill.snow.css";
import { View } from "@unthinkable/react-core-components";
import CommonText from "../CommonText";
import CustomButton from "../CustomButton";
import {
  ATTACHMENT_TYPE,
  COLOR,
  FORMAT,
  LIST_OPTION,
  LIST_TYPE,
  SIZE,
  TEXT_FORMATS,
  PREVIEWED_LENGTH,
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
    isViewMore,
    label,
    onChangeText,
    value,
    quilStyle,
    quillContainerStyle,
    removePadding,
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

  const [isExpanded, setIsExpanded] = useState(!isViewMore);
  const getPreviewContent = (val) => {
    const previewDelta = val.slice(0, PREVIEWED_LENGTH);
    return previewDelta;
  };

  const getTextEditorStyles = () => {
    if (!!errorMessage) {
      return "error";
    } else if (disabled) {
      return "disabled";
    }
    return "";
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
      <View style={{ ...styles.quillContainer, ...quillContainerStyle }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <ReactQuill
            theme="snow"
            value={isExpanded ? value : getPreviewContent(value)}
            className={[
              getTextEditorStyles(),
              isViewMore && "custom",
              removePadding && "removePadding",
            ].join(" ")}
            modules={modules}
            onBlur={customHandleBlur}
            formats={FORMAT}
            placeholder={intl.formatMessage({ id: "label.description" })}
            onChange={handleProcedureContentChange}
            style={{ ...styles.quillStyling, ...quilStyle }}
            readOnly={disabled}
          />
          {isViewMore && value.length > PREVIEWED_LENGTH && (
            <CustomButton
              onPress={(event) => {
                setIsExpanded(!isExpanded);
                event.stopPropagation();
              }}
              customStyle={{ customTextStyle: styles.customButtonTextStyle }}
              style={styles.buttonStyle}
            >
              {isExpanded
                ? intl.formatMessage({ id: "label.viewLess" })
                : intl.formatMessage({ id: "label.viewMore" })}
            </CustomButton>
          )}
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
  disabled: false,
  quillContainerStyle: {},
  quilStyle: {},
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
  quilStyle: PropTypes.object,
  quillContainerStyle: PropTypes.object,
};

export default CustomTextEditor;
