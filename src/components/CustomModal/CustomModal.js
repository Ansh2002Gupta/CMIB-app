import React from "react";
import PropTypes from "prop-types";
import { Image, Text, View, Modal } from "@unthinkable/react-core-components";
import images from "../../images";
import style from "./CustomModal.style";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const CustomModal = (props) => {
  const { headerText, secondaryText, buttonTitle, onPress } = props;
  return (
    <View>
      <Modal isVisible style={style.containerStyle}>
        <View style={style.innerContainer}>
          <Image source={images.iconSuccess} />
          <Text style={style.headerText}>{headerText}</Text>
          <Text style={style.infoText}>{secondaryText}</Text>
          <ButtonComponent title={buttonTitle} onPress={onPress} />
        </View>
      </Modal>
    </View>
  );
};

CustomModal.propTypes = {
  headerText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CustomModal;
