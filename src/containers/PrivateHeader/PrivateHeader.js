import React, { useContext } from "react";

import { useIntl } from "react-intl";
import { useLocation } from "../../routes";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../../components/CommonText";
import UserAccountInfo from "../../components/UserAccountInfo";
import useIsWebView from "../../hooks/useIsWebView";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { navigations } from "../../constants/routeNames";

import styles from "./PrivateHeader.style";

const PrivateHeader = ({
  onPressLeftIcon = () => {},
  onPressRightIcon = () => {},
  leftIcon,
  rightIcon,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const location = useLocation();
  const windowDimensions = useWindowDimensions();
  const [userProfileState] = useContext(UserProfileContext);

  const loggedInUserInfo = userProfileState.userDetails || {};

  const profileImage = ""; // TODO: Not getting the user profile image key in the API. Have updated the API pening document for the same.
  const firstName = loggedInUserInfo?.name?.split(" ")?.[0] || "";
  const lastName = loggedInUserInfo?.name?.split(" ")?.[1] || "";
  const role = "Admin"; // TODO: Not getting type of user at the moment in the API. Have updated the API pening document for the same.

  const isMdOrGreater = windowDimensions.width >= 900;

  return (
    <View style={styles.webContainer}>
      <View style={styles.textContainer}>
        <HeaderLeft
          onPressLeftIcon={onPressLeftIcon}
          isMdOrGreater={isMdOrGreater}
          leftIcon={leftIcon}
        />
        {/*TODO: Right Now It's a static data, we will replace it by dynamic data as we get API */}
        {location.pathname === navigations.DASHBOARD && (
          <>
            <CommonText
              customTextStyle={styles.nameText}
            >{`${intl.formatMessage({
              id: "label.hey",
            })} ${firstName} -`}</CommonText>
            <CommonText customTextStyle={styles.overView}>
              {"here’s your overview"}
            </CommonText>
          </>
        )}
      </View>
      <UserAccountInfo
        onPressRightIcon={onPressRightIcon}
        rightIcon={rightIcon}
        isWebView={isWebView}
        profileImage={profileImage}
        firstName={firstName}
        lastName={lastName}
        role={role}
        isMdOrGreater={isMdOrGreater}
      />
    </View>
  );
};

const HeaderLeft = ({ onPressLeftIcon, isMdOrGreater, leftIcon }) => {
  if (!isMdOrGreater) {
    return (
      <TouchableOpacity onPress={onPressLeftIcon}>
        <Image source={leftIcon} style={styles.icons} />
      </TouchableOpacity>
    );
  }
  return null;
};

export default PrivateHeader;
