import React from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "../../routes";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../../components/CommonText";
import CustomAvatar from "../../components/CustomAvatar";
import SessionBar from '../../components/SessionBar';
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

  const {
    text: pageHeading,
    showBackButton,
    showRightButton,
  } = getSmallScreenHeaderInfo(location.pathname);

  const profileImage = "";
  const firstName = "Elongated";
  const lastName = "Mask";
  const role = "Admin";

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
            {/* Right Now It's a static data, we will replace it by dynamic data as we get API */}
            {pageHeading === "" && (
              <>
                <CommonText
                  customTextStyle={styles.nameText}
                  title={"Hey John -"}
                />
                <CommonText
                  customTextStyle={styles.overView}
                  title={"here’s your overview"}
                />
              </>
            )}
          </View>
          <HeaderRight
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
    <CommonText
      title={intl.formatMessage({ id: pageHeading })}
      customTextStyle={styles.formHeaderStyle}
    />
    {showRightButton && isWebView && (
      <TouchableOpacity style={styles.editButton}>
        <Image source={images.iconEdit} style={styles.icons} />
        <CommonText title="Edit" customTextStyle={styles.editText} />
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

const HeaderRight = ({
  onPressRightIcon,
  rightIcon,
  isWebView,
  profileImage,
  firstName,
  lastName,
  role,
  isMdOrGreater,
}) => (
  <View style={styles.notficationIconView}>
      {isWebView && <SessionBar /> }
    <TouchableOpacity onPress={onPressRightIcon}>
      <Image source={rightIcon} style={styles.iconNotification} />
    </TouchableOpacity>
    {isWebView && (
      <View style={styles.profileView}>
        <CustomAvatar image={profileImage} text={`${firstName} ${lastName}`} />
        {isMdOrGreater && (
          <View style={styles.profileNameSection}>
            <View>
              <CommonText
                customTextStyle={styles.fullNameStyle}
                title={`${firstName} ${lastName}`}
              />
              <CommonText title={role} customTextStyle={styles.roleStyle} />
            </View>
            <TouchableOpacity>
              <Image source={images.iconArrowDown2} style={styles.iconArrow} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    )}
  </View>
);

export default PrivateHeader;
