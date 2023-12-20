import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Modal, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage/CustomImage";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../../components/TwoRowButton/TwoRowButton";
import useLogoutAPI from "../../services/apiServices/hooks/useLogoutAPI";
import images from "../../images";
import styles from "./logoutModal.style";

const LogoutModal = ({ onCancel, onSave }) => {
  const intl = useIntl();
  const { handleUserLogout } = useLogoutAPI();
  const WarningIcon = images.iconWarning;

  const rowConfigs = [
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
          rightButtonText={intl.formatMessage({ id: "label.logout" })}
          onRightButtonClick={() => {
            handleUserLogout(
              {},
              () => {
                onCancel(false);
                onSave();
              },
              (error) => {}
            );
          }}
        />
      ),
    },
  ];

  return (
      <Modal isVisible style={styles.containerStyle}>
        <View style={styles.innerContainer}>
          <MultiRow rows={rowConfigs} />
        </View>
      </Modal>
  );
};

LogoutModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default LogoutModal;
