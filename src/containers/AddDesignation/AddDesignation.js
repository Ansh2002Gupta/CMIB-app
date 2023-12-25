import React, { useState } from "react";
import { useIntl } from "react-intl";

import CustomModal from "../../components/CustomModal/CustomModal";
import CustomTextInput from "../../components/CustomTextInput";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../../components/TwoRowButton";
import { ENTITY_OPTIONS } from "../../constants/constants";
import styles from "./AddDesignation.style";


const AddDesignation = ({ handleCancelButton }) => {
  const intl = useIntl();
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
          options={ENTITY_OPTIONS}
          isMandatory
          isDropdown
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
        <MultiRow rows={addDesignation} style={styles.parentStyle} />
      </CustomModal>
  );
};

export default AddDesignation;
