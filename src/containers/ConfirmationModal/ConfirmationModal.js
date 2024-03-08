import React from "react";
import PropTypes from "prop-types";
import { Platform } from "@unthinkable/react-core-components";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import CustomImage from "../../components/CustomImage";
import Modal from "../../components/Modal";
import MultiRow from "../../core/layouts/MultiRow";
import images from "../../images";
import styles, {
  getButtonStyle,
  getTextStyle,
} from "./ConfirmationModal.style";

const ConfirmationModal = ({
  buttonOneStyle,
  buttonOneText,
  buttonOneTextStyle,
  buttonTwoText,
  buttonTwoStyle,
  buttonTwoTextStyle,
  hasSingleButton,
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
          style={{ ...getButtonStyle(severity) }}
          customStyle={{
            customTextStyle: { ...getTextStyle(severity), ...buttonOneStyle },
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
            buttonTwoStyle: { ...getButtonStyle(severity), ...buttonTwoStyle },
            buttonOneTextStyle: buttonOneTextStyle,
            buttonTwoTextStyle: {
              ...getTextStyle(severity),
              ...buttonTwoTextStyle,
            },
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
  buttonOneStyle: {},
  buttonOneText: "",
  buttonOneTextStyle: {},
  buttonTwoText: "",
  buttonTwoStyle: {},
  buttonTwoTextStyle: {},
  hasSingleButton: false,
  headingText: "",
  icon: images.iconWarning,
  loader: false,
  onPressButtonOne: () => {},
  onPressButtonTwo: () => {},
  subHeading: "",
};

ConfirmationModal.propTypes = {
  buttonOneStyle: PropTypes.object,
  buttonOneText: PropTypes.string,
  buttonOneTextStyle: PropTypes.object,
  buttonTwoText: PropTypes.string,
  buttonTwoStyle: PropTypes.object,
  buttonTwoTextStyle: PropTypes.object,
  hasSingleButton: PropTypes.bool,
  headingText: PropTypes.string,
  icon: PropTypes.node,
  loader: PropTypes.bool,
  onPressButtonOne: PropTypes.func,
  onPressButtonTwo: PropTypes.func,
  severity: PropTypes.string,
  subHeading: PropTypes.string,
};

export default ConfirmationModal;
