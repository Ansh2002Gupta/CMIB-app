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
  onPress,
  onPressIconCross,
  secondaryText,
}) => {
  return (
    //TODO: Should be divided into 2 different component
    <View>
      <Modal isVisible style={style.containerStyle}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" && !isSuccess ? "padding" : "height"}
          style={[style.innerContainer, customInnerContainerStyle]}
        >
          {isSuccess ? (
            <>
              <Image source={images.iconSuccess} />
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
    </View>
  );
};

CustomModal.defaultProps = {
  buttonTitle: "",
  children: <></>,
  customInnerContainerStyle: {},
  headerText: "",
  headerTextStyle: false,
  isIconCross: false,
  isSuccess: false,
  onPress: () => {},
  onPressIconCross: () => {},
  secondaryText: "",
};

CustomModal.propTypes = {
  buttonTitle: PropTypes.string,
  children: PropTypes.node,
  customInnerContainerStyle: PropTypes.object,
  headerText: PropTypes.string,
  headerTextStyle: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isIconCross: PropTypes.bool,
  onPress: PropTypes.func,
  onPressIconCross: PropTypes.func,
  secondaryText: PropTypes.string,
};

export default CustomModal;
