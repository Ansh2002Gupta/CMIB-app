import React from "react";
import { Linking, View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage/CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import images from "../../images";
import { getValidUrl } from "../../utils/util";
import styles from "./VideoCard.styles";

const VideoCard = ({ url }) => {
  return (
    <CustomTouchableOpacity
      style={styles.container}
      onPress={() => {
        Linking.openURL(getValidUrl(url), "_blank");
      }}
    >
      <View style={styles.playIconBoxStyles}>
        <CustomImage
          alt="Play icon"
          isSvg
          Icon={images.videoPlayIcon}
          source={images.videoPlayIcon}
          style={styles.playIconStyles}
        />
      </View>
    </CustomTouchableOpacity>
  );
};

export default VideoCard;
