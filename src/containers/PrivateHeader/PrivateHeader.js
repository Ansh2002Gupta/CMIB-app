import React, { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";

import CommonText from "../../components/CommonText";
import CustomAvatar from "../../components/CustomAvatar";
import useIsWebView from "../../hooks/useIsWebView";
import { PATH_TO_HEADER_TEXT } from "../../constants/constants";
import images from "../../images";
import styles from "./PrivateHeader.style";

const PrivateHeader = ({
  onPressLeftIcon = () => {},
  onPressRightIcon = () => {},
}) => {
  const { isWebView } = useIsWebView();
  const location = useLocation();
  const navigate = useNavigate();
  const windowDimensions = useWindowDimensions();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const {
    text: headerTextWithIcon,
    backButton,
    editButton,
  } = PATH_TO_HEADER_TEXT[location.pathname] || {};

  const profileImage = "";
  const firstName = "Elongated";
  const lastName = "Mask";
  const role = "Admin";

  const isMdOrGreater = useMemo(
    () => windowDimensions.width >= 900,
    [windowDimensions.width]
  );

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isWebView ? (
        <View style={styles.webMainContainer}>
          <View style={styles.webContainer}>
            <View style={styles.textContainer}>
              {currentBreakpoint === "sm" ? (
                backButton ? (
                  <TouchableOpacity onPress={goBack}>
                    <Image source={images.iconBack} style={styles.icons} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={onPressLeftIcon}>
                    <Image source={images.iconMenu} style={styles.icons} />
                  </TouchableOpacity>
                )
              ) : null}
              {/* Right Now It's a static data, we will replace it by dynamic data as we get API */}
              <CommonText
                customTextStyle={styles.nameText}
                title={"Hey John -"}
              />
              <CommonText
                customTextStyle={styles.overView}
                title={"here’s your overview"}
              />
            </View>
            <View style={styles.notficationIconView}>
              <TouchableOpacity onPress={onPressRightIcon}>
                <Image
                  source={images.iconNotification}
                  style={styles.iconNotification}
                />
              </TouchableOpacity>
              <View style={styles.profileView}>
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
                      <CommonText
                        title={role}
                        customTextStyle={styles.roleStyle}
                      />
                    </View>
                    <TouchableOpacity>
                      <Image
                        source={images.iconArrowDown2}
                        style={styles.iconArrow}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.horizontalStyles} />
          {!!headerTextWithIcon && (
            <View style={styles.textHeader}>
              <CommonText
                title={headerTextWithIcon}
                customTextStyle={styles.formHeaderStyle}
              />
              {editButton && (
                <TouchableOpacity style={styles.editButton}>
                  <Image source={images.iconEdit} style={styles.icons} />
                  <CommonText
                    title="Edit"
                    customTextStyle={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ) : (
        <View
          style={[
            headerTextWithIcon
              ? styles.container
              : styles.containerWithoutBorder,
          ]}
        >
          <View>
            {backButton ? (
              <TouchableOpacity onPress={goBack}>
                <Image source={images.iconBack} style={styles.icons} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onPressLeftIcon}>
                <Image source={images.iconMenu} style={styles.icons} />
              </TouchableOpacity>
            )}
            {headerTextWithIcon && (
              <CommonText
                title={headerTextWithIcon}
                customTextStyle={styles.formHeaderStyle}
              />
            )}
          </View>

          <TouchableOpacity onPress={onPressRightIcon}>
            <Image source={images.iconNotification} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default PrivateHeader;
