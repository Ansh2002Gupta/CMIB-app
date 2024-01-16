import React from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CardComponent from "../CardComponent/CardComponent";
import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./IconHeader.style";

const IconHeader = ({
  actionButtonIcon,
  buttonTitle,
  handleButtonClick,
  hasActionButton,
  hasIconBar,
  headerText,
  iconLeft,
  iconRight,
  onPressLeftIcon,
  onPressRightIcon,
}) => {
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
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
        <View style={styles.titleContainer}>
          <CommonText
            customTextStyle={!isWebView ? styles.formHeaderStyle : {}}
            fontWeight="600"
          >
            {headerText}
          </CommonText>
          {hasActionButton && isWebView && (
            <CardComponent customStyle={styles.cardContainer}>
              <CustomTouchableOpacity
                style={styles.editContainer}
                onPress={handleButtonClick}
              >
                <Image source={actionButtonIcon} />
                <CommonText customTextStyle={styles.textStyle}>
                  {buttonTitle}
                </CommonText>
              </CustomTouchableOpacity>
            </CardComponent>
          )}
        </View>
      </>
      <View style={styles.borderStyle} />
    </View>
  );
};

IconHeader.defaultProps = {
  actionButtonIcon: "",
  buttonTitle: "",
  handleButtonClick: () => {},
  hasActionButton: false,
  hasIconBar: false,
  headerText: "",
  iconLeft: images.iconBack,
  iconRight: images.iconNotification,
  onPressLeftIcon: () => {},
  onPressRightIcon: () => {},
};

IconHeader.propTypes = {
  actionButtonIcon: PropTypes.string,
  buttonTitle: PropTypes.string,
  handleButtonClick: PropTypes.func,
  hasActionButton: PropTypes.bool,
  hasIconBar: PropTypes.bool,
  headerText: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  onPressLeftIcon: PropTypes.func,
  onPressRightIcon: PropTypes.func,
};

export default IconHeader;
