import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import Modal from "../../components/Modal";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../../components/TwoRowButton";
import useLogoutAPI from "../../services/apiServices/hooks/useLogoutAPI";
import images from "../../images";
import styles from "./logoutModal.style";

const LogoutModal = ({ onCancel, onSave }) => {
  const intl = useIntl();
  const { handleUserLogout } = useLogoutAPI();
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
        <CommonText
          customTextStyle={styles.headerText}
          title={intl.formatMessage({ id: "label.logout" })}
        />
      ),
    },
    {
      content: (
        <CommonText
          customTextStyle={styles.subHeaderText}
          title={intl.formatMessage({ id: "label.logout_message" })}
        />
      ),
    },
    {
      content: (
        <TwoRowButton
          leftButtonText={intl.formatMessage({ id: "label.cancel" })}
          onLeftButtonClick={() => {
            onCancel(false);
          }}
          leftTextStyle={styles.leftTextStyle}
          leftButtonStyle={styles.cancelStyle}
          rightButtonText={intl.formatMessage({ id: "label.logout" })}
          rightButtonStyle={styles.saveStyle}
          rightTextStyle={styles.rightTextStyle}
          onRightButtonClick={() => {
            handleUserLogout(() => {
              onCancel(false);
              onSave();
            });
          }}
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
  onSave: PropTypes.func.isRequired,
};

export default LogoutModal;
