import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CommonText from "../CommonText";
import images from "../../images";
import style from "./CustomModal.style";

const CustomModal = (props) => {
  const {
    headerText,
    headerTextStyle,
    secondaryText,
    buttonTitle,
    onPress,
    isSuccess,
    children,
    isIconCross,
    onPressIconCross,
    customInnerContainerStyle,
  } = props;

  return (
    <View>
      <Modal isVisible style={style.containerStyle}>
        <View style={[style.innerContainer, customInnerContainerStyle]}>
          {isSuccess ? (
            <>
              <Image source={images.iconSuccess} />
              <CommonText
                customTextStyle={style.headerText}
                title={headerText}
              />
              <CommonText
                customTextStyle={style.infoText}
                title={secondaryText}
              />
              <ButtonComponent title={buttonTitle} onPress={onPress} />
            </>
          ) : (
            <>
              <View style={style.headerStyle}>
                <CommonText
                  customTextStyle={[style.headerText, headerTextStyle]}
                  title={headerText}
                />
                <TouchableOpacity onPress={onPressIconCross}>
                  {isIconCross && <Image source={images.iconCross} />}
                </TouchableOpacity>
              </View>
              {children}
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

CustomModal.propTypes = {
  headerText: PropTypes.string,
  headerTextStyle: PropTypes.bool,
  isIconCross: PropTypes.bool,
  isSuccess: PropTypes.bool,
  onPress: PropTypes.func,
  onPressIconCross: PropTypes.func,
  secondaryText: PropTypes.string,
  buttonTitle: PropTypes.string,
  customInnerContainerStyle: PropTypes.object,
};

export default CustomModal;
