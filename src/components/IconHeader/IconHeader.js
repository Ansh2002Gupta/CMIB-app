import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./IconHeader.style";
import CardComponent from "../CardComponent/CardComponent";
import images from "../../images";

const IconHeader = ({
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

  return (
    <View style={styles.container}>
      <>
        {hasIconBar && (
          <View style={styles.iconContainer}>
            {iconLeft && (
              <CustomTouchableOpacity onPress={onPressLeftIcon}>
                <Image source={iconLeft} />
              </CustomTouchableOpacity>
            )}
            {iconRight && (
              <CustomTouchableOpacity onPress={onPressRightIcon}>
                <Image source={iconRight} />
              </CustomTouchableOpacity>
            )}
          </View>
        )}
        <View style={styles.titleContainer}>
          <CommonText
            title={headerText}
            customTextStyle={
              isWebView ? styles.webHeaderStyle : styles.formHeaderStyle
            }
          />
          {hasActionButton && (
            <CardComponent customStyle={styles.cardContainer}>
              <CustomTouchableOpacity
                style={styles.editContainer}
                onPress={handleButtonClick}
              >
                <Image source={images.iconSquareEdit} />
                <CommonText
                  customTextStyle={styles.textStyle}
                  title={buttonTitle}
                />
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
  buttonTitle: "",
  handleButtonClick: () => {},
  hasActionButton: false,
  hasIconBar: false,
  headerText: "",
  iconLeft: null,
  iconRight: null,
  onPressLeftIcon: () => {},
  onPressRightIcon: () => {},
};

IconHeader.propTypes = {
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
