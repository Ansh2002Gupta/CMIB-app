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
    secondaryText,
    buttonTitle,
    onPress,
    isSuccess,
    children,
    isIconCross,
    onPressIconCross,
  } = props;

  return (
    <View>
      <Modal isVisible style={style.containerStyle}>
        <View style={style.innerContainer}>
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
                  customTextStyle={style.headerText}
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
  buttonTitle: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  isIconCross: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  onPressIconCross: PropTypes.func,
  secondaryText: PropTypes.string.isRequired,
};

export default CustomModal;
