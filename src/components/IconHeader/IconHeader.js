import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { Image, View } from "@unthinkable/react-core-components";

import CardComponent from "../CardComponent/CardComponent";
import Chip from "../Chip";
import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import Switch from "../Switch";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import getStyles from "./IconHeader.style";

const IconHeader = ({
  actionButtonIcon,
  buttonTitle,
  customActionButtonStyle,
  customActionButtonText,
  handleButtonClick,
  hasActionButton,
  hasIconBar,
  headerText,
  handleSwitchChange,
  iconLeft,
  iconRight,
  iconStyle,
  isActive,
  isSwitchVisible,
  isBorderVisible,
  mobActionButton,
  onPressLeftIcon,
  onPressRightIcon,
  subHeading,
  showInWeb,
  showHeaderContent = true,
  customHeaderContainer,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };

  const colorConfig = {
    pending: {
      bg: "lightOrange",
      text: "orange",
    },
    closed: {
      bg: "lightGreen",
      text: "darkGreen",
    },
    default: {
      bg: "skyBlueLight",
      text: "skyBlueDark",
    },
  };

  const getStatusColors = (subHeadingText) => {
    const subHeading = subHeadingText.toLowerCase();
    const statusColors = colorConfig[subHeading] || colorConfig.default;
    return {
      bgColor: theme.colors[statusColors.bg],
      textColor: theme.colors[statusColors.text],
    };
  };

  return (
    <View style={styles.container}>
      <>
        {hasIconBar && !isWebView && (
          <View style={styles.iconContainer}>
            {!!iconLeft && (
              <CustomTouchableOpacity onPress={onPressLeftIcon || onGoBack}>
                <Image source={iconLeft} />
              </CustomTouchableOpacity>
            )}
            {!!iconRight && (
              <CustomTouchableOpacity onPress={onPressRightIcon}>
                <Image source={iconRight} />
              </CustomTouchableOpacity>
            )}
          </View>
        )}
        {showHeaderContent && (
          <View
            style={
              !isWebView ? styles.titleContainer : styles.titleContainerWeb
            }
          >
            <View
              style={{ ...styles.headingContainer, ...customHeaderContainer }}
            >
              <CommonText
                customTextStyle={{
                  ...(!isWebView
                    ? styles.formHeaderStyle
                    : styles.formHeaderStyleWeb),
                }}
                customContainerStyle={styles.width100}
                customTextProps={styles.iconTextStyle}
                fontWeight="600"
              >
                {headerText}
              </CommonText>
              {!!subHeading && (
                <Chip
                  customTextStyle={
                    !isWebView
                      ? styles.formHeaderStyle
                      : styles.formHeaderStyleWeb
                  }
                  fontWeight="600"
                  label={subHeading}
                  {...getStatusColors(subHeading)}
                />
              )}
            </View>
            {!!mobActionButton && !isWebView && (
              <CustomTouchableOpacity
                style={{ ...styles.editContainer, ...iconStyle }}
                onPress={handleButtonClick}
              >
                <Image source={mobActionButton} />
              </CustomTouchableOpacity>
            )}
            {hasActionButton && showInWeb && (
              <CustomTouchableOpacity onPress={handleButtonClick}>
                <CardComponent
                  customStyle={{
                    ...styles.cardContainer,
                    ...customActionButtonStyle,
                  }}
                >
                  <View style={styles.editContainer}>
                    <CustomImage
                      style={styles.iconStyle}
                      source={actionButtonIcon}
                      Icon={actionButtonIcon}
                      isSvg
                      alt={"edit icon"}
                    />
                    <CommonText
                      customTextStyle={{
                        ...styles.textStyle,
                        ...customActionButtonText,
                      }}
                    >
                      {buttonTitle}
                    </CommonText>
                  </View>
                </CardComponent>
              </CustomTouchableOpacity>
            )}
            {isSwitchVisible && (
              <View style={styles.flexRowAlignCenter}>
                <Switch
                  isToggled={isActive}
                  onChange={() => {
                    handleSwitchChange && handleSwitchChange();
                  }}
                />
                <CommonText customContainerStyle={styles.marginLeft8}>
                  {isActive
                    ? intl.formatMessage({ id: "label.active" })
                    : intl.formatMessage({ id: "label.inactive" })}
                </CommonText>
              </View>
            )}
          </View>
        )}
      </>
      {isBorderVisible && <View style={styles.borderStyle} />}
    </View>
  );
};

IconHeader.defaultProps = {
  actionButtonIcon: "",
  buttonTitle: "",
  customActionButtonStyle: {},
  customActionButtonText: {},
  handleButtonClick: () => {},
  hasActionButton: false,
  handleSwitchChange: () => {},
  hasIconBar: false,
  headerText: "",
  iconLeft: images.iconBack,
  iconRight: images.iconNotification,
  iconStyle: {},
  isSwitchVisible: false,
  isActive: false,
  isBorderVisible: true,
  mobActionButton: "",
  onPressLeftIcon: () => {},
  onPressRightIcon: () => {},
  showInWeb: true,
};

IconHeader.propTypes = {
  actionButtonIcon: PropTypes.string,
  buttonTitle: PropTypes.string,
  customActionButtonStyle: PropTypes.object,
  customActionButtonText: PropTypes.object,
  handleButtonClick: PropTypes.func,
  hasActionButton: PropTypes.bool,
  hasIconBar: PropTypes.bool,
  headerText: PropTypes.string,
  handleSwitchChange: PropTypes.func,
  iconLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconStyle: PropTypes.object,
  isSwitchVisible: PropTypes.bool,
  isActive: PropTypes.bool,
  isBorderVisible: PropTypes.bool,
  mobActionButton: PropTypes.node,
  onPressLeftIcon: PropTypes.func,
  onPressRightIcon: PropTypes.func,
  showInWeb: PropTypes.bool,
};

export default IconHeader;
