import { useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { useState } from "react";

import { ADD_APPLICATION_STEPPER, PREVIOUS_SCREEN } from "../../../../constants/constants";

const useAddApplication = () => {
    const intl = useIntl();
    const navigate = useNavigate()
    const stepperData = ADD_APPLICATION_STEPPER.map((stepper) => ({
        id: stepper.id,
        title: intl.formatMessage({ id: stepper.title }),
      }));
  const [selectedStepper, setSelectedStepper] = useState(stepperData?.[0]);

  const onChangeStepper = () => {
    setSelectedStepper(stepperData[selectedStepper.id]);
  } 
  
  const onClickCancel = () => {
    navigate(PREVIOUS_SCREEN);
  }

  const onClickBack = () => {
    setSelectedStepper(stepperData[selectedStepper.id - 2]);
  } 

  return {
    intl,
    onChangeStepper,
    onClickBack,
    onClickCancel,
    selectedStepper,
    stepperData,
  };
};

export default useAddApplication;
