import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import CustomImage from "../../components/CustomImage";
import Modal from "../../components/Modal";
import MultiColumn from "../../core/layouts/MultiColumn";
import MultiRow from "../../core/layouts/MultiRow";
import { useHeader } from "../../hooks/useHeader";
import images from "../../images";
import styles from "./logoutModal.style";

const LogoutModal = ({ onCancel }) => {
  const intl = useIntl();
  const { isLoggingUserOut, onLogout } = useHeader();
  const WarningIcon = images.iconWarning;

  const saveCancelButton = [
    {
      content: (
        <CustomButton onPress={() => onCancel(false)}>
          {intl.formatMessage({ id: "label.cancel" })}
        </CustomButton>
      ),
      isFillSpace: true,
    },
    {
      content: (
        <CustomButton
          onPress={() => onLogout()}
          style={styles.saveStyle}
          {...{ isLoading: isLoggingUserOut }}
        >
          {intl.formatMessage({ id: "label.logout" })}
        </CustomButton>
      ),
      isFillSpace: true,
    },
  ];

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
      content: <MultiColumn columns={saveCancelButton} />,
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
