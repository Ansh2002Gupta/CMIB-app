import React, { useState } from "react";
import { View, Image } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomAvatar from "../CustomAvatar";
import MyAccountSection from "../MyAccountSection";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import images from "../../images";
import styles from "./HeaderRight.style";

const HeaderRight = ({
  onPressRightIcon,
  rightIcon,
  isWebView,
  profileImage,
  firstName,
  lastName,
  role,
  isMdOrGreater,
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

export default HeaderRight;
