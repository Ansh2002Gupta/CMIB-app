import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CustomModal from "../../components/CustomModal/CustomModal";
import CommonText from "../CommonText";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton"


import style from "./logoutModal.style";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../TwoRowButton/TwoRowButton";

const LogoutModel = ({ onPressCancel }) => {
  const intl = useIntl();

  const columnConfigs = [
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
        onPressCancel(false);
      }}
      rightButtonText={intl.formatMessage({ id: "label.save" })} //rightButtonText
      onRightButtonClick={() => {console.log("Save clicked !!")}}
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
