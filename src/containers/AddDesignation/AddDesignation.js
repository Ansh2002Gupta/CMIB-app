import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CustomModal from "../../components/CustomModal/CustomModal";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../../components/TwoRowButton/TwoRowButton";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./AddDesignation.style";
import CustomTextInput from "../../components/CustomTextInput";

const AddDesignation = ({handleCancelButton}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [countValue, setCountValue] = useState(0);


  const handleCountChange = (newCount) => {
    setCountValue(newCount);
  };

  const handleSaveButton = () => {
    console.log("Save Button clicked !!!");
  };

  const addDesignation = [
    {
      content: (
        <CustomTextInput
          label={intl.formatMessage({ id: "label.designation" })}
          placeholder={intl.formatMessage({
            id: "label.designation_placeholder",
          })}
          value={value}
          isMandatory
          isDropdown
          customLabelStyle={isWebView ? styles.webView.inputLabelText : {}}
          customTextInputContainer={isWebView ? styles.webView.inputTextBox : {}}
          customStyle={styles.negativePadding}
        />
      ),
      style: styles.vacancyStyle,
    },
    {
      content: (
        <CustomTextInput
          label={intl.formatMessage({ id: "label.no_of_vacancy" })}
          isMandatory
          isCounterInput
          initialCount={countValue}
          onCountChange={handleCountChange}
          customStyle={styles.negativePadding}
          customTextInputContainer={isWebView ? styles.webView.inputLabelText : {}}
        />
      ),
      style: styles.vacancyStyle,
    },
    {
      content: (
        <TwoRowButton
          leftButtonText={intl.formatMessage({ id: "label.cancel" })}
          onLeftButtonClick={handleCancelButton}
          leftTextStyle={styles.leftTextStyle}
          rightButtonText={intl.formatMessage({ id: "label.save" })}
          rightButtonStyle={styles.saveStyle}
          rightTextStyle={styles.rightTextStyle}
          onRightButtonClick={handleSaveButton}
        />
      ),
      style: styles.vacancyStyle,
    },
  ];

  return (
    <CustomModal
      headerText={intl.formatMessage({
        id: "label.add_designation",
      })}
    >
      <MultiRow rows={addDesignation} />
    </CustomModal>
  );
};

export default AddDesignation;
