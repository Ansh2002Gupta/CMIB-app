import React, { useState } from "react";
import { useIntl } from "react-intl";

import CustomTextInput from "../../components/CustomTextInput";
import ModalWithTitleButton from "../../components/ModalWithTitleButton";
import MultiRow from "../../core/layouts/MultiRow";
import { ENTITY_OPTIONS } from "../../constants/constants";
import styles from "./AddDesignation.style";

const AddDesignation = ({ handleCancelButton }) => {
  const intl = useIntl();
  const [countValue, setCountValue] = useState(0);

  const handleCountChange = (newCount) => {
    setCountValue(newCount);
  };

  const handleSaveButton = () => {};

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
    },
  ];

  return (
    <ModalWithTitleButton
      heading={intl.formatMessage({ id: "label.add_designation" })}
      isTwoEnable
      leftLabelTxt={intl.formatMessage({ id: "label.cancel" })}
      onClickLeftButton={handleCancelButton}
      onClickRightButton={handleSaveButton}
      rightLabelTxt={intl.formatMessage({ id: "label.save" })}
      rightButtonStyle={{ marginLeft: 8 }}
    >
      <MultiRow rows={addDesignation} style={styles.parentStyle} />
    </ModalWithTitleButton>
  );
};

export default AddDesignation;
