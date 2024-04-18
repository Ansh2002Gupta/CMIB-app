import React, { useState } from "react";

import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CustomImage from "../../../components/CustomImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import styles from "./DownloadMoreComponent.styles";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";

const DownloadMoreComponent = ({ onPress, message = "Download Jobs List" }) => {
  const { isWebView } = useIsWebView();
  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);
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
        <PopupMessage
          message={["Download More"]}
          isPopupModal
          onPopUpClose={() => setCurrentPopupMessage(-1)}
        />
      )}
    </View>
  );
};
export default DownloadMoreComponent;
