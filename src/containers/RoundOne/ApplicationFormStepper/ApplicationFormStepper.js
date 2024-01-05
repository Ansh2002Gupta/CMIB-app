import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import { APPLICATION_FORM_STEPPER_OPTIONS } from "../../../constants/constants";
import Stepper from "../../../components/Stepper";

const ApplicationFormStepper = ({ activeStep }) => {
  const intl = useIntl();

  return (
    <View>
      <Stepper
        {...{
          activeStep: activeStep,
          steps: APPLICATION_FORM_STEPPER_OPTIONS.map((step) =>
            intl.formatMessage({ id: step.title })
          ),
        }}
      />
    </View>
  );
};

ApplicationFormStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default ApplicationFormStepper;
