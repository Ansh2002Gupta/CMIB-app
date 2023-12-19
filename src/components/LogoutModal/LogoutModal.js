import React, { useState } from "react";
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
      content:  <CommonText customTextStyle={style.headerText} title={"Logout"} />,
    },
    {
      content: <CommonText customTextStyle={style.subHeaderText} title={"Are you sure you want to logout of the portal?"} />,
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
          (error)=>{console.log("Error ==>",error )}); 
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

LogoutModel.propTypes = {};

export default LogoutModel;
