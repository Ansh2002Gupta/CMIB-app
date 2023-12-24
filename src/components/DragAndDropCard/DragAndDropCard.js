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
          customTextStyle={{ ...styles.error, ...commonStyles.errorMessage }}
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
  );
};

DragAndDropCard.defaultProps = {
  errorMessage: "",
  fileInputRef: null,
  fileUploadHandler: () => {},
  handleDragOver: () => {},
  handleDrop: () => {},
  handleUploadClick: () => {},
};

DragAndDropCard.propTypes = {
  errorMessage: PropTypes.string,
  fileInputRef: PropTypes.any,
  fileUploadHandler: PropTypes.func,
  handleDragOver: PropTypes.func,
  handleDrop: PropTypes.func,
  handleUploadClick: PropTypes.func,
};

export default DragAndDropCard;
