import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CustomView from "../../components/CustomView/CustomView";
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
    console.log("Count has changed to:", newCount);
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
        <CustomView
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
        </CustomView>
      ),
      style:styles.vacancyStyle,
    },
    {
      content: (
        <TwoRowButton
          leftButtonText={intl.formatMessage({ id: "label.cancel" })}
          onLeftButtonClick={handleCancelButton}
          leftTextStyle={{ fontSize:14 ,fontWeight:"600"}}
          rightButtonText={intl.formatMessage({ id: "label.save" })}
          rightButtonStyle={styles.saveStyle}
          rightTextStyle={{color:'white', fontSize:14 ,fontWeight:"600"}}
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
