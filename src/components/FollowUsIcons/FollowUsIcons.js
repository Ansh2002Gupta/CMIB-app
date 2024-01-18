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
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./FollowUsIcons.style";

const socialMediaPlatforms = [
  {
    id: 1,
    name: "Twitter",
    webIcon: "iconTwitterWeb",
    mobileIcon: "iconTwitter",
    link: "https://www.google.com/",
  },
  {
    id: 2,
    name: "Facebook",
    webIcon: "iconFacebookWeb",
    mobileIcon: "iconFacebook",
    link: "https://www.google.com/",
  },
  {
    id: 3,
    name: "Youtube",
    webIcon: "iconYoutubeWeb",
    mobileIcon: "iconYoutube",
    link: "https://www.google.com/",
  },
  {
    id: 4,
    name: "Linkedin",
    webIcon: "iconLinkedinWeb",
    mobileIcon: "iconLinkedin",
    link: "https://www.google.com/",
  },
  {
    id: 5,
    name: "Instagram",
    webIcon: "iconInstagramWeb",
    mobileIcon: "iconInstagram",
    link: "https://www.google.com/",
  },
  {
    id: 6,
    name: "Telegram",
    webIcon: "iconTelegramWeb",
    mobileIcon: "iconTelegram",
    link: "https://www.google.com/",
  },
];

const FollowUsIcons = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const icons = useTheme("icons");
  const isWeb = Platform.OS.toLowerCase() === "web";

  const handleRedirect = (url) => {
    if (isWeb) {
      window.location.href = url;
    } else {
      Linking.openURL(url);
    }
  };

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
        {socialMediaPlatforms.map((platform, index) => (
          <TouchableOpacity
            key={index}
            style={isWebView ? styles.webImageStyle : styles.imageStyle}
            onPress={() => handleRedirect(platform.link)}
            accessibilityRole="link"
          >
            <Image
              source={
                isWebView ? icons[platform.webIcon] : icons[platform.mobileIcon]
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FollowUsIcons;
