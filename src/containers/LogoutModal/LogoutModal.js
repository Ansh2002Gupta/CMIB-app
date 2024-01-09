import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform } from "@unthinkable/react-core-components";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import Modal from "../../components/Modal";
import MultiRow from "../../core/layouts/MultiRow";
import { useHeader } from "../../hooks/useHeader";
import images from "../../images";
import styles from "./logoutModal.style";

const LogoutModal = ({ onCancel }) => {
  const intl = useIntl();
  const { isLoggingUserOut, onLogout } = useHeader();
  const WarningIcon = images.iconWarning;

  const logoutConfig = [
    {
      content: (
        <CustomImage
          Icon={WarningIcon}
          style={styles.logo}
          source={WarningIcon}
          isSvg={true}
        />
      ),
    },
    {
      content: (
        <CommonText customTextStyle={styles.headerText} fontWeight="600">
          {intl.formatMessage({ id: "label.logout" })}
        </CommonText>
      ),
    },
    {
      content: (
        <CommonText customTextStyle={styles.subHeaderText}>
          {intl.formatMessage({ id: "label.logout_message" })}
        </CommonText>
      ),
    },
    {
      content: (
        <ActionPairButton
          buttonOneText={intl.formatMessage({ id: "label.cancel" })}
          buttonTwoText={intl.formatMessage({ id: "label.logout" })}
          buttonTwoStyle={styles.logoutStyle}
          displayLoader={isLoggingUserOut}
          onPressButtonOne={() => onCancel(false)}
          onPressButtonTwo={() => onLogout()}
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

LogoutModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default LogoutModal;
