import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useIntl } from "react-intl";

import CustomTextInput from "../../components/CustomTextInput";
import ModalWithTitleButton from "../../components/ModalWithTitleButton";
import MultiRow from "../../core/layouts/MultiRow";
import { ENTITY_OPTIONS } from "../../constants/constants";
import styles from "./AddDesignation.style";

const AddDesignation = ({ resultCallback }) => {
  const intl = useIntl();
  const [countValue, setCountValue] = useState(0);

  const handleCountChange = (newCount) => {
    setCountValue(newCount);
  };

  const handleCancelButton = () => {
    resultCallback();
  };

  const handleSaveButton = () => {
    resultCallback();
  };

  const addDesignation = [
    {
      content: (
        <CustomTextInput
          label={intl.formatMessage({ id: "label.designation" })}
          placeholder={intl.formatMessage({
            id: "label.designation_placeholder",
          })}
          options={ENTITY_OPTIONS}
          isMandatory
          isDropdown
          isPaddingNotRequired
        />
      ),
      style : styles.gapBetween
    },
    {
      content: (
        <CustomTextInput
          label={intl.formatMessage({ id: "label.no_of_vacancy" })}
          isMandatory
          isCounterInput
          isPaddingNotRequired
          initialCount={countValue}
          onCountChange={handleCountChange}
        />
      ),
      style : styles.gapBetween
    },
  ];

  const customStyles = {
    rightButtonStyle: styles.rightButtonStyle, 
  };

  return (
    <ModalWithTitleButton
      heading={intl.formatMessage({ id: "label.add_designation" })}
      enableBottomButton
      leftLabelTxt={intl.formatMessage({ id: "label.cancel" })}
      onClickLeftButton={handleCancelButton}
      onClickRightButton={handleSaveButton}
      rightLabelTxt={intl.formatMessage({ id: "label.save" })}
      rightButtonStyle={styles.rightButtonStyle}
      customStyles={customStyles}
    >
      <MultiRow rows={addDesignation} style={styles.gapTop}/>
    </ModalWithTitleButton>
  );
};

AddDesignation.defaultProps = {
  resultCallback: ()=>{},
};

AddDesignation.propTypes = {
  resultCallback: PropTypes.func.isRequired,
};

export default AddDesignation;
