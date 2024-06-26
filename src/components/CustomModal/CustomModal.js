import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { Platform, View } from "@unthinkable/react-core-components";
import { KeyboardAvoidingView } from "@unthinkable/react-core-components/src/Keyboard";

import ActionPairButton from "../ActionPairButton";
import CommonText from "../CommonText";
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "../CustomImage";
import Modal from "../Modal";
import TouchableImage from "../TouchableImage";
import useEscKeyListener from "../../hooks/useEscKeyListener";
import images from "../../images";
import getStyles from "./CustomModal.style";

const CustomModal = ({
  buttonTitle,
  children,
  containerStyle,
  customHeaderStyle,
  customInnerContainerStyle,
  customStyles,
  handleButtonOnePress,
  handleButtonTwoPress,
  headerText,
  headerTextStyle,
  isButtonOneDisabled,
  isSuccess,
  isIconCross,
  isLoading,
  imageOnSuccess,
  maxWidth,
  onPress,
  onPressIconCross,
  onBackdropPress,
  secondaryText,
  showActionButtonOnSuccess,
  topLeftIcon,
  buttonLeftTitle,
  buttonRightTitle,
}) => {
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";
  const webProps = isWeb ? { maxWidth } : { onBackdropPress };

  const theme = useTheme();
  const style = getStyles(theme);

  useEscKeyListener(onPressIconCross);

  return (
    <Modal
      isVisible
      style={style.containerStyle}
      containerStyle={containerStyle}
      {...webProps}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" && !isSuccess ? "padding" : "height"}
        style={[style.innerContainer, customInnerContainerStyle]}
      >
        {isSuccess ? (
          <>
            <CustomImage
              alt={"Success Icon"}
              source={imageOnSuccess || images.iconSuccess}
              Icon={imageOnSuccess || images.iconSuccess}
              isSvg
              style={style.iconStyle}
            />
            <CommonText
              customTextStyle={[
                !secondaryText && style.headerTextStyle,
                style.textStyle,
              ]}
              fontWeight="600"
            >
              {headerText}
            </CommonText>
            {!!secondaryText && (
              <CommonText customTextStyle={style.infoText}>
                {secondaryText}
              </CommonText>
            )}
            {showActionButtonOnSuccess ? (
              <ActionPairButton
                buttonOneText={
                  buttonLeftTitle ??
                  intl.formatMessage({ id: "label.no_need_time" })
                }
                buttonTwoText={
                  buttonRightTitle ??
                  intl.formatMessage({ id: "label.yes_pass_on" })
                }
                isButtonTwoGreen
                onPressButtonOne={handleButtonOnePress}
                onPressButtonTwo={handleButtonTwoPress}
                customStyles={customStyles}
                displayLoader={isLoading}
                isButtonOneDisabled={isLoading}
              />
            ) : (
              <CustomButton onPress={onPress} withGreenBackground>
                {buttonTitle}
              </CustomButton>
            )}
          </>
        ) : (
          <>
            {!!topLeftIcon && (
              <View style={style.topIconContianer}>
                {isIconCross && (
                  <TouchableImage
                    isSvg={isWeb}
                    source={topLeftIcon}
                    style={{ height: 24, width: 24 }}
                  />
                )}
                {isIconCross && (
                  <TouchableImage
                    isSvg={isWeb}
                    onPress={onPressIconCross}
                    source={isWeb ? images.iconCloseDark : images.iconCross}
                    style={{ height: 24, width: 24 }}
                  />
                )}
              </View>
            )}
            <View style={{ ...style.headerStyle, ...customHeaderStyle }}>
              {!!headerText && (
                <CommonText
                  customTextStyle={[style.headerText, headerTextStyle]}
                  fontWeight={headerTextStyle?.fontWeight || "600"}
                >
                  {headerText}
                </CommonText>
              )}
              {!topLeftIcon && isIconCross && (
                <TouchableImage
                  isSvg={isWeb}
                  onPress={onPressIconCross}
                  source={isWeb ? images.iconCloseDark : images.iconCross}
                  style={{ height: 24, width: 24 }}
                />
              )}
            </View>
            {children}
          </>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

CustomModal.defaultProps = {
  buttonTitle: "",
  children: <></>,
  containerStyle: {},
  customHeaderStyle: {},
  customInnerContainerStyle: {},
  customStyles: {},
  handleButtonOnePress: () => {},
  handleButtonTwoPress: () => {},
  headerText: "",
  headerTextStyle: {},
  isButtonOneDisabled: false,
  isIconCross: false,
  isLoading: false,
  isSuccess: false,
  imageOnSuccess: "",
  maxWidth: "sm",
  onPress: () => {},
  onPressIconCross: () => {},
  onBackdropPress: () => {},
  secondaryText: "",
  showActionButtonOnSuccess: false,
};

CustomModal.propTypes = {
  buttonTitle: PropTypes.string,
  children: PropTypes.node,
  containerStyle: PropTypes.object,
  customHeaderStyle: PropTypes.object,
  customInnerContainerStyle: PropTypes.object,
  customStyles: PropTypes.object,
  handleButtonOnePress: PropTypes.func,
  handleButtonTwoPress: PropTypes.func,
  headerText: PropTypes.string,
  headerTextStyle: PropTypes.object,
  isButtonOneDisabled: PropTypes.bool,
  isIconCross: PropTypes.string,
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isIconCross: PropTypes.bool,
  imageOnSuccess: PropTypes.string,
  maxWidth: PropTypes.string,
  onPress: PropTypes.func,
  onPressIconCross: PropTypes.func,
  onBackdropPress: PropTypes.func,
  secondaryText: PropTypes.string,
  showActionButtonOnSuccess: PropTypes.bool,
};

export default CustomModal;
