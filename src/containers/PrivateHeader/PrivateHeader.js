import React, {useContext}  from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "../../routes";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../../components/CommonText";
import UserAccountInfo from "../../components/UserAccountInfo";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useIsWebView from "../../hooks/useIsWebView";
import { getSmallScreenHeaderInfo } from "../../utils/headerHelpers";
import images from "../../images";
import styles from "./PrivateHeader.style";

const PrivateHeader = ({
  onPressLeftIcon = () => {},
  onPressRightIcon = () => {},
  leftIcon = images.iconMenu,
  rightIcon = images.iconNotification,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const windowDimensions = useWindowDimensions();
  const [userProfileState] = useContext(UserProfileContext);

  const loggedInUserInfo = userProfileState.userDetails || {};

  const {
    text: pageHeading,
    showBackButton,
    showRightButton,
  } = getSmallScreenHeaderInfo(location.pathname);

  const profileImage = ""; // TODO: Not getting the user profile image key in the API. Have updated the API pening document for the same.
  const firstName = loggedInUserInfo?.name?.split(" ")?.[0] || "";
  const lastName = loggedInUserInfo?.name?.split(" ")?.[1] || "";
  const role = "Admin"; // TODO: Not getting type of user at the moment in the API. Have updated the API pening document for the same.

  const isMdOrGreater = windowDimensions.width >= 900;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <View style={styles.webMainContainer}>
        <View style={styles.webContainer}>
          <View style={styles.textContainer}>
            <HeaderLeft
              showBackButton={showBackButton}
              goBack={goBack}
              onPressLeftIcon={onPressLeftIcon}
              isMdOrGreater={isMdOrGreater}
              leftIcon={leftIcon}
            />
            {pageHeading === "" && (
              <>
                <CommonText
                  customTextStyle={styles.nameText}
                  title={`${intl.formatMessage({
                    id: "label.hey",
                  })} ${firstName} -`}
                />
                <CommonText
                  customTextStyle={styles.overView}
                  title={intl.formatMessage({ id: "label.here_your_overview" })}
                />
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
        {pageHeading !== "" && (
          <PageHeading
            intl={intl}
            pageHeading={pageHeading}
            showRightButton={showRightButton}
            isWebView={isWebView}
          />
        )}
      </View>
    </>
  );
};

const PageHeading = ({ intl, pageHeading, showRightButton, isWebView }) => (
  <View style={isWebView ? styles.textHeaderTopBorder : styles.textHeader}>
    <CommonText customTextStyle={styles.formHeaderStyle} fontWeight="600">
      {intl.formatMessage({ id: pageHeading })}
    </CommonText>
    {showRightButton && isWebView && (
      <TouchableOpacity style={styles.editButton}>
        <Image source={images.iconEdit} style={styles.icons} />
        <CommonText customTextStyle={styles.editText}>
          {intl.formatMessage({ id: "label.edit" })}
        </CommonText>
      </TouchableOpacity>
    )}
  </View>
);

const HeaderLeft = ({
  showBackButton,
  goBack,
  onPressLeftIcon,
  isMdOrGreater,
  leftIcon,
}) => {
  if (showBackButton) {
    return (
      <TouchableOpacity onPress={goBack}>
        <Image source={images.iconBack} style={styles.icons} />
      </TouchableOpacity>
    );
  }
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
