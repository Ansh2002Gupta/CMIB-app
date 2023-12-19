import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import images from "../../images";
import CommonText from "../CommonText";
import CustomModal from "../../components/CustomModal/CustomModal";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../TwoRowButton/TwoRowButton";
import  useLogoutAPI from "../../services/apiServices/hooks/useLogoutAPI"
import styles from "./logoutModal.style";

const LogoutModal = ({ onCancel ,onSave}) => {
  const intl = useIntl();
  const { handleUserLogout } = useLogoutAPI();
  const Warning = images.Warning;

  const rowConfigs = [
    {
      content: <Warning style={styles.logo}/>,
    },
    {
      content:  <CommonText customTextStyle={styles.headerText} title={intl.formatMessage({ id: "label.logout" })} />,
    },
    {
      content: <CommonText customTextStyle={styles.subHeaderText} title={intl.formatMessage({ id: "label.logout_message" })} />,
    },
     {
      content:    <TwoRowButton
      leftButtonText={intl.formatMessage({ id: "label.cancel" })}
      onLeftButtonClick={() => {
        onCancel(false);
      }}
      rightButtonText={intl.formatMessage({ id: "label.save" })} 
      onRightButtonClick={() => { 
        handleUserLogout(
          {},
          ()=>{
            onCancel(false);
            onSave();
          },
          (error)=>{}); 
         }}
    />,
    },
  ];

  return (
    <CustomModal>
     <MultiRow rows={rowConfigs} />     
    </CustomModal>
  );
};

LogoutModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default LogoutModal;
