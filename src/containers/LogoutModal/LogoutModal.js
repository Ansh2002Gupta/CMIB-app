import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import images from "../../images";
import CommonText from "../../components/CommonText";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../../components/TwoRowButton/TwoRowButton";
import useLogoutAPI from "../../services/apiServices/hooks/useLogoutAPI";
import styles from "./logoutModal.style";

const LogoutModal = ({ onCancel, onSave }) => {
  const intl = useIntl();
  const { handleUserLogout } = useLogoutAPI();
  const IconWarning = images.iconWarning;

  const rowConfigs = [
    {
      content: <IconWarning style={styles.logo} />,
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
          rightButtonText={intl.formatMessage({ id: "label.save" })}
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
    <View>
      <Modal isVisible style={styles.containerStyle}>
        <View style={styles.innerContainer}>
          <MultiRow rows={rowConfigs} />
        </View>
      </Modal>
    </View>
  );
};

LogoutModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default LogoutModal;
