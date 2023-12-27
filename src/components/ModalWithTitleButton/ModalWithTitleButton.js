import React from "react";

import CustomModal from "../../components/CustomModal";
import TwoRowButton from "../../components/TwoRowButton";

import styles from "./ModalWithTitleButton.style";


const ModalWithTitleButton = ({ heading }) => {


  return (
      <CustomModal
        headerText={heading}
      >
      
        <TwoRowButton
          leftButtonText={intl.formatMessage({ id: "label.cancel" })}
          onLeftButtonClick={handleCancelButton}
          leftTextStyle={styles.leftTextStyle}
          rightButtonText={intl.formatMessage({ id: "label.save" })}
          rightButtonStyle={styles.saveStyle}
          rightTextStyle={styles.rightTextStyle}
          onRightButtonClick={handleSaveButton}
        />
      </CustomModal>
  );
};

export default ModalWithTitleButton;
