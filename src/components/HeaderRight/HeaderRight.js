import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Image } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import CustomAvatar from "../CustomAvatar";
import images from "../../images";
import MyAccountSection from "../MyAccountSection";
import styles from "./HeaderRight.style";

const HeaderRight = ({
  firstName,
  isMdOrGreater,
  isWebView,
  lastName,
  onPressRightIcon,
  profileImage,
  rightIcon,
  role,
}) => {
  const [showAccountSection, setShowAccountSection] = useState(false);

  const handleAccountSection = () => {
    setShowAccountSection(!showAccountSection);
  };

  return (
    <>
      <View style={styles.notficationIconView}>
        <CustomTouchableOpacity onPress={onPressRightIcon}>
          <Image source={rightIcon} style={styles.iconNotification} />
        </CustomTouchableOpacity>
        {isWebView && (
          <CustomTouchableOpacity
            style={styles.profileView}
            onPress={handleAccountSection}
          >
            <CustomAvatar
              image={profileImage}
              text={`${firstName} ${lastName}`}
            />
            {isMdOrGreater && (
              <View style={styles.profileNameSection}>
                <View>
                  <CommonText
                    customTextStyle={styles.fullNameStyle}
                    title={`${firstName} ${lastName}`}
                  />
                  <CommonText title={role} customTextStyle={styles.roleStyle} />
                </View>
                {showAccountSection ? (
                  <Image source={images.iconArrowUp} style={styles.iconArrow} />
                ) : (
                  <Image
                    source={images.iconArrowDown2}
                    style={styles.iconArrow}
                  />
                )}
              </View>
            )}
            {showAccountSection && <MyAccountSection />}
          </CustomTouchableOpacity>
        )}
      </View>
    </>
  );
};

HeaderRight.propTypes = {
  firstName: PropTypes.string.isRequired,
  isMdOrGreater: PropTypes.bool.isRequired,
  isWebView: PropTypes.bool, 
  lastName: PropTypes.string, 
  onPressRightIcon: PropTypes.func.isRequired,
  profileImage: PropTypes.string, 
  rightIcon: PropTypes.string.isRequired,
  role: PropTypes.string, 
};

export default HeaderRight;
