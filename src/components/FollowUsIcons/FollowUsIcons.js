import React from "react";
import { useIntl } from "react-intl";
import { Text, View, Image } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";

import styles from "./FollowUsIcons.style";

const FollowUsIcons = () => {
  const intl = useIntl();
  const icons = useTheme("icons");
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.followUsText}>
        {intl.formatMessage({ id: "label.follow_us" })}
      </Text>
      <View style={styles.imageView}>
        <View style={styles.imageStyle}>
          <Image source={icons.iconTwitter} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.iconFacebook} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.iconYoutube} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.iconLinkedin} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.iconInstagram} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.iconTelegram} />
        </View>
      </View>
    </View>
  );
};

export default FollowUsIcons;
