import React from "react";
import { useIntl } from "react-intl";
import { Text, View, Image } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";

import styles from "./FollowUsIcons.style";

const FollowUsIcons = ({ text }) => {
  const intl = useIntl();
  const icons = useTheme("icons");
  return (
    <View>
      <Text style={styles.followUsText}>
        {intl.formatMessage({ id: "label.follow" })}
      </Text>
      <View style={styles.imageView}>
        <View style={styles.imageStyle}>
          <Image source={icons.brand} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.facebook} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.youtube} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.linkedin} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.instagram} />
        </View>
        <View style={styles.imageStyle}>
          <Image source={icons.telegram} />
        </View>
      </View>
    </View>
  );
};

export default FollowUsIcons;
