import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import CustomImage from "../../components/CustomImage";
import Modal from "../../components/Modal";
import MultiColumn from "../../core/layouts/MultiColumn"
import MultiRow from "../../core/layouts/MultiRow";
import useLogoutAPI from "../../services/apiServices/hooks/useLogoutAPI";
import images from "../../images";
import styles from "./logoutModal.style";

const LogoutModal = ({ onCancel, onSave }) => {
  const intl = useIntl();
  const {isLoading , handleUserLogout } = useLogoutAPI();
  const WarningIcon = images.iconWarning;

  const cancelHandler = () => {
    onCancel(false);
  };

  const saveHandler = () => {
    handleUserLogout(() => {
      onCancel(false);
      onSave();
    });
  };

  const saveCancelButton = [
    {
      content: (
        <CustomButton onPress={cancelHandler}>
          {intl.formatMessage({ id: "label.cancel" })}
        </CustomButton>
      ),
      isFillSpace: true,
    },
    {
      content: (
        <CustomButton
          onPress={saveHandler}
          style={{ backgroundColor: "#FABB00", marginLeft: 16 }}
          {...{isLoading}} 
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
       <MultiColumn columns={saveCancelButton} />
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
