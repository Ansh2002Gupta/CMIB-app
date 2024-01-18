import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { View, Image } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./FollowUsIcons.style";

const socialMediaPlatforms = [
  "Twitter",
  "Facebook",
  "Youtube",
  "Linkedin",
  "Instagram",
  "Telegram",
];

const FollowUsIcons = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const icons = useTheme("icons");

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
          <View
            key={index}
            style={isWebView ? styles.webImageStyle : styles.imageStyle}
          >
            <Image
              source={
                isWebView
                  ? icons[`icon${platform}Web`]
                  : icons[`icon${platform}`]
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default FollowUsIcons;
