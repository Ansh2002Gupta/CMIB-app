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
}) => {
  const isPlatformWeb = Platform.OS.toLowerCase() === "web";

  const webProps = isPlatformWeb
    ? {
        onDragOver: handleDragOver,
        onDrop: handleDrop,
      }
    : {};

  const intl = useIntl();

  return (
    <>
      {isLoading ? (
        <View style={styles.contentContainerStyle}>
          <View style={styles.loaderBox}>
            <Spinner />
            {(uploadPercentage || uploadPercentage === 0) && (
              <View
                style={{
                  ...styles.percentageBox,
                  ...(Math.round(uploadPercentage) > 9
                    ? styles.percentageBoxTwoDigitNumber
                    : {}),
                }}
              >
                <CommonText
                  customTextStyle={styles.percentageText}
                  title={`${Math.round(uploadPercentage)}%`}
                />
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.contentContainerStyle} {...webProps}>
          <Image source={images.iconUpload} />
          <View style={styles.textContainer}>
            <CommonText
              customTextStyle={styles.textStyle}
              title={intl.formatMessage({ id: "label.drag_drop_files" })}
            />
            <TouchableOpacity onPress={handleUploadClick}>
              <CommonText
                customTextStyle={styles.browseStyle}
                title={` ${intl.formatMessage({ id: "label.browse" })}`}
              />
            </TouchableOpacity>
          </View>
          <CommonText
            customTextStyle={styles.infoStyle}
            title={intl.formatMessage({ id: "label.supported_type" })}
          />
          {!!errorMessage && (
            <CommonText
              customTextStyle={{
                ...styles.error,
                ...commonStyles.errorMessage,
              }}
              title={errorMessage}
            />
          )}
          {isPlatformWeb && (
            <TextInput
              type="file"
              ref={fileInputRef}
              name="fileUpload"
              accept="image/png, image/jpeg, image/svg, image/eps"
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
};

export default DragAndDropCard;
