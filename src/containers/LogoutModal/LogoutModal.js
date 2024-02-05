import React from "react";
import PropTypes from "prop-types";
import { Platform } from "@unthinkable/react-core-components";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import Modal from "../../components/Modal";
import MultiRow from "../../core/layouts/MultiRow";
import images from "../../images";
import styles from "./logoutModal.style";

const LogoutModal = ({
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
  subHeading,
}) => {
  const logoutConfig = [
    {
      content: (
        <CustomImage
          Icon={icon}
          style={styles.logo}
          source={icon}
          isSvg={true}
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
      content: (
        <ActionPairButton
          buttonOneText={buttonOneText}
          buttonTwoText={buttonTwoText}
          customStyles={{
            buttonTwoStyle: { ...styles.logoutButtonStyle, ...buttonTwoStyle },
            buttonOneTextStyle: buttonOneTextStyle,
            buttonTwoTextStyle: buttonTwoTextStyle,
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
      <MultiRow rows={logoutConfig} style={styles.parentStyle} />
    </Modal>
  );
};

LogoutModal.defaultProptypes = {
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

LogoutModal.propTypes = {
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
  subHeading: PropTypes.string.isRequired,
};

export default LogoutModal;
