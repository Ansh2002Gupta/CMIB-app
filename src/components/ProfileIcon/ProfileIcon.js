import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import images from "../../images";
import { getInitialsFromName } from "../../utils/util";
import getStyles from "./ProfileIcon.style";

const ProfileIcon = ({
  customContainerStyle,
  customImageStyle,
  customOuterContainer,
  customTextStyle,
  name,
  onPressEditIcon,
  profileImage,
  showEditIcon,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const renderEditIcon = () => (
    <CustomTouchableOpacity
      style={styles.editOuterContainer}
      onPress={onPressEditIcon}
    >
      <View style={styles.editInnerContainer}>
        <CustomImage
          source={images.iconEditSvg}
          style={styles.iconStyle}
          isSvg
          Icon={images.iconEditSvg}
        />
      </View>
    </CustomTouchableOpacity>
  );

  if (profileImage) {
    return (
      <View style={{ ...styles.outerContainer, ...customOuterContainer }}>
        <View style={{ ...styles.initialsContainer, ...customContainerStyle }}>
          <Image
            source={{ uri: profileImage }}
            style={{ ...styles.profileImageStyle, ...customImageStyle }}
          />
        </View>
        {showEditIcon && renderEditIcon()}
      </View>
    );
  } else {
    return (
      <View
        style={{
          ...styles.initialsContainer,
          ...styles.containerStyle,
          ...customContainerStyle,
        }}
      >
        <CommonText
          customTextStyle={{ ...styles.initialsText, ...customTextStyle }}
        >
          {getInitialsFromName(name)}
        </CommonText>
        {showEditIcon && renderEditIcon()}
      </View>
    );
  }
};

ProfileIcon.defaultProps = {
  customContainerStyle: {},
  customImageStyle: {},
  customOuterContainer: {},
  customTextStyle: {},
  customOuterContainer: {},
  name: "",
  onPressEditIcon: () => {},
  profileImage: "",
  showEditIcon: false,
};

ProfileIcon.propTypes = {
  customContainerStyle: PropTypes.object,
  customImageStyle: PropTypes.object,
  customOuterContainer: PropTypes.object,
  customTextStyle: PropTypes.object,
  customOuterContainer: PropTypes.object,
  name: PropTypes.string,
  onPressEditIcon: PropTypes.func,
  profileImage: PropTypes.string,
  showEditIcon: PropTypes.bool,
};

export default ProfileIcon;
