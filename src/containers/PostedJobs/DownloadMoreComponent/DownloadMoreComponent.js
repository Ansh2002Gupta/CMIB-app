import React, { useState } from "react";

import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CustomImage from "../../../components/CustomImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CommonText from "../../../components/CommonText";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import { useTheme } from "@unthinkable/react-theme";
import getStyles from "./DownloadMoreComponent.styles";

const DownloadMoreComponent = ({ onPress, message = "Download Jobs List" }) => {
  const { isWebView } = useIsWebView();
  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

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
