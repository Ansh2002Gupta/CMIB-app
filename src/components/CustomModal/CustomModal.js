import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { KeyboardAvoidingView } from "@unthinkable/react-core-components/src/Keyboard";

import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CommonText from "../CommonText";
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
    <View>
      <Modal isVisible style={style.containerStyle}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={[style.innerContainer, customInnerContainerStyle]}
        >
          {isSuccess ? (
            <>
              <Image source={images.iconSuccess} />
              <CommonText customTextStyle={style.headerText} fontWeight="600">
                {headerText}
              </CommonText>
              <CommonText customTextStyle={style.infoText}>
                {secondaryText}
              </CommonText>
              <ButtonComponent title={buttonTitle} onPress={onPress} />
            </>
          ) : (
            <>
              <View style={style.headerStyle}>
                <CommonText
                  customTextStyle={[style.headerText, headerTextStyle]}
                  fontWeight="600"
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
  customInnerContainerStyle: PropTypes.object,
  headerText: PropTypes.string,
  headerTextStyle: PropTypes.bool,
  isSuccess: PropTypes.bool.isRequired,
  isIconCross: PropTypes.bool,
  onPress: PropTypes.func,
  onPressIconCross: PropTypes.func,
  secondaryText: PropTypes.string,
};

export default CustomModal;
