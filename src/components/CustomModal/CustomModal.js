import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { KeyboardAvoidingView } from "@unthinkable/react-core-components/src/Keyboard";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "../CustomImage";
import Modal from "../Modal";
import images from "../../images";
import style from "./CustomModal.style";

const CustomModal = ({
  buttonTitle,
  children,
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
}) => {
  const webProps =
    Platform.OS.toLowerCase() === "web" ? { maxWidth } : { onBackdropPress };

  return (
    <>
      <Modal isVisible style={style.containerStyle} {...webProps}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" && !isSuccess ? "padding" : "height"}
          style={[style.innerContainer, customInnerContainerStyle]}
        >
          {isSuccess ? (
            <>
              <CustomImage
                alt={"Success Icon"}
                source={images.iconSuccess}
                Icon={images.iconSuccess}
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
              <CustomButton onPress={onPress} withGreenBackground>
                {buttonTitle}
              </CustomButton>
            </>
          ) : (
            <>
              <View style={style.headerStyle}>
                <CommonText
                  customTextStyle={[style.headerText, headerTextStyle]}
                  fontWeight={headerTextStyle?.fontWeight || "600"}
                >
                  {headerText}
                </CommonText>
                <TouchableOpacity onPress={onPressIconCross}>
                  {isIconCross && <Image source={images.iconCross} />}
                </TouchableOpacity>
              </View>
              {children}
            </>
          )}
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

CustomModal.defaultProps = {
  buttonTitle: "",
  children: <></>,
  customInnerContainerStyle: {},
  headerText: "",
  headerTextStyle: {},
  isIconCross: false,
  isSuccess: false,
  maxWidth: "xs",
  onPress: () => {},
  onPressIconCross: () => {},
  onBackdropPress: () => {},
  secondaryText: "",
};

CustomModal.propTypes = {
  buttonTitle: PropTypes.string,
  children: PropTypes.node,
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
};

export default CustomModal;
