import React from "react";
import PropTypes from "prop-types";
import { Platform } from "@unthinkable/react-core-components";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import CustomButton from "../../components/CustomButton";
import Modal from "../../components/Modal";
import MultiRow from "../../core/layouts/MultiRow";
import images from "../../images";
import styles from "./ConfirmationModal.style";

const ConfirmationModal = ({
  hasSingleButton,
  buttonOneStyle,
  buttonOneText,
  buttonOneTextStyle,
  buttonTwoText,
  buttonTwoStyle,
  buttonTwoTextStyle,
  headingText,
  icon,
  loader,
  onPressButtonOne,
  onPressButtonTwo,
  severity,
  subHeading,
}) => {
  const getIcon = () => {
    switch (severity) {
      case "error":
        return images.iconAlert;
      case "warning":
        return images.iconWarning;
      case "success":
        return images.iconSuccess;
      default: {
        return icon;
      }
    }
  };

  const getTextStyle = () => {
    switch (severity) {
      case "warning":
        return styles.warningTextStyle;
      case "error":
      case "success":
        return styles.customTextStyle;
      default:
        return {};
    }
  };

  const getButtonStyle = () => {
    switch (severity) {
      case "error":
        return styles.errorButtonStyle;
      case "warning":
        return styles.warningButtonStyle;
      case "success":
        return styles.successButtonStyle;
      default:
        return {};
    }
  };

  const confirmationConfig = [
    {
      content: (
        <CustomImage
          Icon={getIcon()}
          style={styles.logo}
          source={getIcon()}
          isSvg
        />
      ),
    },
    {
      content: (
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {headingText}
        </CommonText>
      ),
    },
    {
      content: (
        <CommonText customTextStyle={styles.subHeaderText}>
          {subHeading}
        </CommonText>
      ),
    },
    {
      content: hasSingleButton ? (
        <CustomButton
          onPress={onPressButtonOne}
          style={{ ...getButtonStyle() }}
          customStyle={{
            customTextStyle: { ...getTextStyle(), ...buttonOneStyle },
          }}
        >
          {buttonOneText}
        </CustomButton>
      ) : (
        <ActionPairButton
          buttonOneText={buttonOneText}
          buttonTwoText={buttonTwoText}
          customStyles={{
            buttonOneStyle: buttonOneStyle,
            buttonTwoStyle: { ...getButtonStyle(), ...buttonTwoStyle },
            buttonOneTextStyle: buttonOneTextStyle,
            buttonTwoTextStyle: { ...getTextStyle(), ...buttonTwoTextStyle },
          }}
          displayLoader={loader}
          onPressButtonOne={onPressButtonOne}
          onPressButtonTwo={onPressButtonTwo}
        />
      ),
      style: styles.gapStyle,
    },
  ];

  const platformProps = Platform.select({
    web: {
      maxWidth: "xs",
    },
  });

  return (
    <Modal {...platformProps} isVisible style={styles.containerStyle}>
      <MultiRow rows={confirmationConfig} style={styles.parentStyle} />
    </Modal>
  );
};

ConfirmationModal.defaultProptypes = {
  hasSingleButton: false,
  buttonOneStyle: {},
  buttonOneText: "",
  buttonOneTextStyle: {},
  buttonTwoText: "",
  buttonTwoStyle: {},
  buttonTwoTextStyle: {},
  headingText: "",
  icon: images.iconWarning,
  loader: false,
  onPressButtonOne: () => {},
  onPressButtonTwo: () => {},
  subHeading: "",
};

ConfirmationModal.propTypes = {
  hasSingleButton: PropTypes.bool,
  buttonOneStyle: PropTypes.object,
  buttonOneText: PropTypes.string.isRequired,
  buttonOneTextStyle: PropTypes.object,
  buttonTwoText: PropTypes.string.isRequired,
  buttonTwoStyle: PropTypes.object,
  buttonTwoTextStyle: PropTypes.object,
  headingText: PropTypes.string.isRequired,
  icon: PropTypes.node,
  loader: PropTypes.bool.isRequired,
  onPressButtonOne: PropTypes.func.isRequired,
  onPressButtonTwo: PropTypes.func.isRequired,
  severity: PropTypes.string,
  subHeading: PropTypes.string.isRequired,
};

export default ConfirmationModal;
