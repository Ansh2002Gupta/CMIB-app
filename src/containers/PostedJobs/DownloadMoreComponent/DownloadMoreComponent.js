import React, { useState } from "react";
import styles from "./DownloadMoreComponent.styles";
import { View } from "@unthinkable/react-core-components";
import TouchableImage from "../../../components/TouchableImage";
import images from "../../../images";
import CommonText from "../../../components/CommonText";
import useIsWebView from "../../../hooks/useIsWebView";
import { useIntl } from "react-intl";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
const DownloadMoreComponent = ({ onPress }) => {
  const { isWebView } = useIsWebView();
  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);
  const intl = useIntl();

  return (
    <View style={isWebView ? styles.container : styles.mobileContainer}>
      {isWebView ? (
        <View style={styles.innerContainer}>
          <TouchableImage
            source={images.iconDownloading}
            style={styles.iconstyle}
            onPress={onPress}
          />
          <CommonText
            customContainerStyle={styles.marginLeft8}
            customTextStyle={styles.fontSize14}
          >
            {intl.formatMessage({ id: "label.download_job_list" })}
          </CommonText>
        </View>
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
