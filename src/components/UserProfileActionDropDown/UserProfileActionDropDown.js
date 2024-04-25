import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CustomAvatar from "../CustomAvatar";
import CustomImage from "../CustomImage";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import MyAccountSection from "../MyAccountSection";
import useOutsideClick from "../../hooks/useOutsideClick";
import images from "../../images";
import getStyles from "./UserProfileActionDropDown.style";

const UserProfileActionDropDown = ({
  isMdOrGreater,
  isWebView,
  name,
  profileImage,
  role,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [showAccountSection, setShowAccountSection] = useState(false);
  const accountRef = useRef(null);

  useOutsideClick(accountRef, () => setShowAccountSection(false));

  const handleAccountSection = () => {
    setShowAccountSection((prev) => !prev);
  };

  return (
    <View>
      {isWebView && (
        <View style={styles.profileContainer} ref={accountRef}>
          <CustomTouchableOpacity
            style={styles.profileView}
            onPress={handleAccountSection}
          >
            <CustomAvatar image={profileImage} text={name} />
            {isMdOrGreater && (
              <View style={styles.profileNameSection}>
                <View>
                  <CommonText
                    customTextStyle={styles.fullNameStyle}
                    fontWeight={"600"}
                  >
                    {name}
                  </CommonText>
                  <CommonText customTextStyle={styles.roleStyle}>
                    {role}
                  </CommonText>
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
            <MyAccountSection setShowAccountSection={setShowAccountSection} />
          )}
        </View>
      )}
    </View>
  );
};

UserProfileActionDropDown.defaultProps = {
  name: "",
  profileImage: "",
};

UserProfileActionDropDown.propTypes = {
  isMdOrGreater: PropTypes.bool.isRequired,
  isWebView: PropTypes.bool.isRequired,
  name: PropTypes.string,
  profileImage: PropTypes.string,
  role: PropTypes.string.isRequired,
};

export default UserProfileActionDropDown;
