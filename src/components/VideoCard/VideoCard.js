import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { Linking, View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage/CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import images from "../../images";
import { getValidUrl } from "../../utils/util";
import getStyles from "./VideoCard.styles";

const VideoCard = ({ url }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <CustomTouchableOpacity
      style={styles.container}
      onPress={() => {
        Linking.openURL(getValidUrl(url), "_blank");
      }}
    >
      <View>
        <CustomImage
          alt="Play icon"
          height={50}
          isSvg
          Icon={images.videoPlayIcon}
          source={images.videoPlayIcon}
          style={styles.playIconStyles}
          width={50}
        />
      </View>
    </CustomTouchableOpacity>
  );
};

export default VideoCard;
