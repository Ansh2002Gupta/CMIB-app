import React from "react";
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
          // source={images.iconMore}
          // style={styles.iconstyle}
          message={["Download all"]}
          onPopupClick={onPress}
        />
      )}
    </View>
  );
};
export default DownloadMoreComponent;
