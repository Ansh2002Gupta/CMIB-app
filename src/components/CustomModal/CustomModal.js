import React from "react";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";
import { KeyboardAvoidingView } from "@unthinkable/react-core-components/src/Keyboard";
import PropTypes from "prop-types";

import ActionPairButton from "../ActionPairButton";
import CommonText from "../CommonText";
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "../CustomImage";
import Modal from "../Modal";
import TouchableImage from "../TouchableImage";
import useEscKeyListener from "../../hooks/useEscKeyListener";
import images from "../../images";
import style from "./CustomModal.style";

const CustomModal = ({
  buttonTitle,
  children,
  containerStyle,
  customHeaderStyle,
  customInnerContainerStyle,
  headerText,
  headerTextStyle,
  isSuccess,
  isIconCross,
  maxWidth,
  onPress,
  onPressIconCross,
  secondaryText,
  onBackdropPress,
  showActionButtonOnSuccess,
  imageOnSuccess,
  customStyles,
  handleButtonOnePress,
  handleButtonTwoPress,
  isLoading,
  isButtonOneDisabled,
}) => {
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";
  const webProps = isWeb ? { maxWidth } : { onBackdropPress };

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
              source={imageOnSuccess}
              Icon={imageOnSuccess}
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
                buttonOneText={intl.formatMessage({ id: "label.no_need_time" })}
                buttonTwoText={intl.formatMessage({ id: "label.yes_pass_on" })}
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
            <View style={{ ...style.headerStyle, ...customHeaderStyle }}>
              {!!headerText && (
                <CommonText
                  customTextStyle={[style.headerText, headerTextStyle]}
                  fontWeight={headerTextStyle?.fontWeight || "600"}
                >
                  {headerText}
                </CommonText>
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
  headerText: "",
  headerTextStyle: {},
  isIconCross: false,
  isSuccess: false,
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
  headerText: PropTypes.string,
  headerTextStyle: PropTypes.object,
  isSuccess: PropTypes.bool,
  isIconCross: PropTypes.bool,
  maxWidth: PropTypes.string,
  onPress: PropTypes.func,
  onPressIconCross: PropTypes.func,
  onBackdropPress: PropTypes.func,
  secondaryText: PropTypes.string,
  showActionButtonOnSuccess: PropTypes.bool,
};

export default CustomModal;
