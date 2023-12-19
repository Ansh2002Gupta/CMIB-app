import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import images from "../../images";

import CustomModal from "../../components/CustomModal/CustomModal";
import CommonText from "../CommonText";
import style from "./logoutModal.style";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../TwoRowButton/TwoRowButton";
import  useLogoutAPI from "../../services/apiServices/hooks/useLogoutAPI"

const LogoutModel = ({ onCancel ,onSave}) => {
  const intl = useIntl();
  const { handleUserLogout,isLoading } = useLogoutAPI();
  const Warning = images.Warning;

  const columnConfigs = [
    {
      content: <Warning style={style.logo}/>,
    },
    {
      content:  <CommonText customTextStyle={style.headerText} title={intl.formatMessage({ id: "label.logout" })} />,
    },
    {
      content: <CommonText customTextStyle={style.subHeaderText} title={intl.formatMessage({ id: "label.logout_message" })} />,
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
     <MultiRow rows={columnConfigs} />     
    </CustomModal>
  );
};

LogoutModel.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default LogoutModel;
