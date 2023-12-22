import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CustomModal from "../CustomModal/CustomModal";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../TwoRowButton/TwoRowButton";

import styles from "./addDesignation.style";

const AddDesignation = () => {
  const intl = useIntl();

  const rowConfigs = [
    // {
    //   content: (<></>),
    // },
    // {
    //   content: (<> </>),
    // },
    // {
    //   content: (<> </>),
    // },
    {
      content: (
        <TwoRowButton
          leftButtonText={intl.formatMessage({ id: "label.cancel" })}
          onLeftButtonClick={() => {console.log("Cancel clicked !!!")}}
          leftButtonStyle={{}}
          rightButtonText={intl.formatMessage({ id: "label.save" })}
          rightButtonStyle={styles.saveStyle}
          onRightButtonClick={() => {console.log("Save button clicked !!!")}}
        />
      ),
    },
  ];

  const onGoBack = () => {
    console.log(" back button clicked");
  };

  const onClickNext = () => {
    console.log(" add button clicked");
  };

  return (
    <CustomModal
      style={styles.containerStyle}
      headerText={intl.formatMessage({
        id: "label.add_designation",
      })}
    >
      <MultiRow rows={rowConfigs} />
    </CustomModal>
  );
};

export default AddDesignation;
