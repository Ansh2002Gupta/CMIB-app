import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import Spinner from "../Spinner";
import images from "../../images";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./DragAndDropCard.style";

const DragAndDropCard = ({
  errorMessage,
  fileInputRef,
  fileUploadHandler,
  handleDragOver,
  handleDrop,
  handleUploadClick,
  isLoading,
  uploadPercentage,
  customContentContainerStyle,
  accept,
}) => {
  const isPlatformWeb = Platform.OS.toLowerCase() === "web";

  const webProps = isPlatformWeb
    ? {
        onDragOver: handleDragOver,
        onDrop: handleDrop,
      }
    : {};

  const intl = useIntl();

  let additionalStyle = {};
  if (isPlatformWeb) {
    additionalStyle = {
      ...styles.percentageBox,
      ...(Math.round(uploadPercentage) > 9
        ? styles.percentageBoxTwoDigitNumber
        : {}),
    };
  }
  return (
    <>
      {isLoading ? (
        <View
          style={[styles.contentContainerStyle, customContentContainerStyle]}
        >
          <View style={styles.loaderBox}>
            <Spinner customStyle={styles.spinnerStyle} />
            {(uploadPercentage || uploadPercentage === 0) && (
              <View style={additionalStyle}>
                <CommonText
                  customTextStyle={styles.percentageText}
                >{`${Math.round(uploadPercentage)}%`}</CommonText>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View
          style={[styles.contentContainerStyle, customContentContainerStyle]}
          {...webProps}
        >
          <Image source={images.iconUpload} />
          <View style={styles.textContainer}>
            <CommonText customTextStyle={styles.textStyle}>
              {intl.formatMessage({ id: "label.drag_drop_files" })}
            </CommonText>
            <TouchableOpacity onPress={handleUploadClick}>
              <CommonText
                customTextStyle={styles.browseStyle}
              >{` ${intl.formatMessage({ id: "label.browse" })}`}</CommonText>
            </TouchableOpacity>
          </View>
          <CommonText customTextStyle={styles.infoStyle}>
            {intl.formatMessage({ id: "label.supported_type" })}
          </CommonText>
          {!!errorMessage && (
            <CommonText
              customTextStyle={{
                ...styles.error,
                ...commonStyles.errorMessage,
              }}
              fontWeight="600"
            >
              {errorMessage}
            </CommonText>
          )}
          {isPlatformWeb && (
            <TextInput
              type="file"
              ref={fileInputRef}
              name="fileUpload"
              accept={accept ?? "image/png, image/jpeg, image/svg, image/eps"}
              onChange={(event) => fileUploadHandler(event)}
              style={styles.hideRawInputField}
            />
          )}
        </View>
      )}
    </>
  );
};

DragAndDropCard.defaultProps = {
  errorMessage: "",
  fileInputRef: null,
  fileUploadHandler: () => {},
  handleDragOver: () => {},
  handleDrop: () => {},
  handleUploadClick: () => {},
  isLoading: false,
  uploadPercentage: 0,
  customContentContainerStyle: {},
};

DragAndDropCard.propTypes = {
  errorMessage: PropTypes.string,
  fileInputRef: PropTypes.any,
  fileUploadHandler: PropTypes.func,
  handleDragOver: PropTypes.func,
  handleDrop: PropTypes.func,
  handleUploadClick: PropTypes.func,
  isLoading: PropTypes.bool,
  uploadPercentage: PropTypes.number,
  customContentContainerStyle: PropTypes.object,
  accept: PropTypes.string,
};

export default DragAndDropCard;
