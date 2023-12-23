import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CustomLabelView from "../../components/CustomLabelView/CustomLabelView";
import CustomModal from "../../components/CustomModal/CustomModal";
import CounterInput from "../../components/CounterInput/CounterInput";
import MultiRow from "../../core/layouts/MultiRow";
import TwoRowButton from "../../components/TwoRowButton/TwoRowButton";
import styles from "./AddDesignation.style";

const AddDesignation = () => {
  const intl = useIntl();
  const [countValue, setCountValue] = useState(0);

  const handleCountChange = (newCount) => {
    setCountValue(newCount);
  };
  const handleCancelButton = () => {
    console.log("Cancel button clikced !!!");
  };
  const handleSaveButton = () => {
    console.log("Save Button clicked !!!");
  };

  const rowConfigs = [
    {
      content: (
        <CustomLabelView
          label={intl.formatMessage({ id: "label.no_of_vacancy" })}
          isMandatory
        >
          <CounterInput
            initialCount={countValue}
            minCount={0}
            maxCount={100}
            onCountChange={handleCountChange}
            step={1}
          />
        </CustomLabelView>
      ),
      style:styles.vacancyStyle,
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
    },
  ];

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
