import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CustomAvatar from "../CustomAvatar";
import CustomImage from "../CustomImage";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import MyAccountSection from "../MyAccountSection";
import useOutsideClick from "../../hooks/useOutsideClick";
import images from "../../images";
import styles from "./UserProfileActionDropDown.style";

const UserProfileActionDropDown = ({
  firstName,
  isMdOrGreater,
  isWebView,
  lastName,
  profileImage,
  role,
}) => {
  const [showAccountSection, setShowAccountSection] = useState(false);
  const accountRef = useRef(null);

  useOutsideClick(accountRef, () => setShowAccountSection(false));

  const handleAccountSection = () => {
    setShowAccountSection((prev) => !prev);
  };

  return (
    <View>
      {isWebView && (
        <View style={styles.profileContainer}>
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
                  <CustomImage
                    source={images.iconArrowUp}
                    style={styles.iconArrow}
                  />
                ) : (
                  <CustomImage
                    source={images.iconArrowDown2}
                    style={styles.iconArrow}
                  />
                )}
              </View>
            )}
          </CustomTouchableOpacity>
          {showAccountSection && (
            <MyAccountSection
              setShowAccountSection={setShowAccountSection}
              accountRef={accountRef}
            />
          )}
        </View>
      )}
    </View>
  );
};

UserProfileActionDropDown.defaultProps = {
  firstName: "",
  isMdOrGreater: false,
  isWebView: false,
  lastName: "",
  profileImage: "",
  role: "",
};

UserProfileActionDropDown.propTypes = {
  firstName: PropTypes.string.isRequired,
  isMdOrGreater: PropTypes.bool.isRequired,
  isWebView: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default UserProfileActionDropDown;
