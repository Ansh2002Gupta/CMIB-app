import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { APPLICATION_FORM_STEPPER_OPTION } from "../../../constants/constants";
import Stepper from "../../../components/Stepper";

const ApplicationFormStepper = ({ activeStep }) => {
  const intl = useIntl();

  return (
    <View>
      <Stepper
        {...{
          activeStep: activeStep,
          steps: APPLICATION_FORM_STEPPER_OPTION.map((step) =>
            intl.formatMessage({ id: step.title })
          ),
        }}
      />
    </View>
  );
};

export default ApplicationFormStepper;
