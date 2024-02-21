import React, { useContext } from "react";

import { useIntl } from "react-intl";
import { useLocation } from "../../routes";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import CommonText from "../../components/CommonText";
import UserAccountInfo from "../../components/UserAccountInfo";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { navigations } from "../../constants/routeNames";
import { breadcrumbs } from "../../constants/constants";
import styles from "./PrivateHeader.style";

const PrivateHeader = ({
  onPressLeftIcon = () => {},
  onPressRightIcon = () => {},
  leftIcon,
  rightIcon,
}) => {
  const intl = useIntl();
  const location = useLocation();
  const windowDimensions = useWindowDimensions();
  const [userProfileState] = useContext(UserProfileContext);

  const loggedInUserInfo = userProfileState.userDetails || {};

  const name = loggedInUserInfo?.name || "";

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
        {location?.pathname === navigations?.DASHBOARD && (
          <>
            <CommonText
              customTextStyle={styles.nameText}
            >{`${intl.formatMessage({
              id: "label.hey",
            })} ${name} -`}</CommonText>
            <CommonText customTextStyle={styles.overView}>
              {"here’s your overview"}
            </CommonText>
          </>
        )}
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </View>
      <UserAccountInfo
        onPressRightIcon={onPressRightIcon}
        rightIcon={rightIcon}
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
