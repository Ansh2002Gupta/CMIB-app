import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CustomImage from "../../../components/CustomImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import styles from "./DownloadMoreComponent.styles";

const DownloadMoreComponent = ({ onPress, message = "Download Jobs List" }) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  return (
    <View style={isWebView ? styles.container : styles.mobileContainer}>
      {isWebView ? (
        <CustomTouchableOpacity onPress={onPress} style={styles.innerContainer}>
          <CustomImage
            source={images.iconDownloading}
            style={styles.iconstyle}
          />
          <CommonText
            customContainerStyle={styles.marginLeft8}
            customTextStyle={styles.fontSize14}
          >
            {message}
          </CommonText>
        </CustomTouchableOpacity>
      ) : (
        <TouchableImage
          source={images.iconMore}
          style={styles.iconstyle}
          onPress={onPress}
        />
      )}
    </View>
  );
};
export default DownloadMoreComponent;
