import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import {
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import socialMediaConfig from "../../constants/socialMediaConfig";
import useIsWebView from "../../hooks/useIsWebView";
import getStyles from "./FollowUsIcons.style";

const mobileProps =
  Platform.OS.toLowerCase() === "web"
    ? {}
    : {
        accessibilityRole: "link",
      };

const FollowUsIcons = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const icons = useTheme("icons");
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.containerStyle}>
      <CommonText
        customTextStyle={{
          ...styles.followUsText,
          ...(isWebView ? styles.webFollowUsText : {}),
        }}
        fontWeight={isWebView ? "500" : "600"}
      >
        {intl.formatMessage({ id: "label.follow_us" })}
      </CommonText>
      <View style={isWebView ? styles.webImageView : styles.imageView}>
        {socialMediaConfig.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={isWebView ? styles.webImageStyle : styles.imageStyle}
            onPress={() => Linking.openURL(item.link, "_blank")}
            {...mobileProps}
          >
            <Image
              source={isWebView ? icons[item.webIcon] : icons[item.mobileIcon]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FollowUsIcons;
