import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View, Platform } from "@unthinkable/react-core-components";

import Stepper from "../../../components/Stepper";
import StepperTabs from "../../../components/StepperTabs";
import { APPLICATION_FORM_STEPPER_OPTIONS } from "../../../constants/constants";
import styles from "./ApplicationFormStepper.style";

const isWeb = Platform.OS.toLowerCase() === "web";

const ApplicationFormStepper = ({ activeStep }) => {
  const intl = useIntl();
  const steps = APPLICATION_FORM_STEPPER_OPTIONS.map((step) =>
    intl.formatMessage({ id: step.title })
  );

  return (
    <>
      {isWeb ? (
        <View style={styles.stepperContainer}>
          <StepperTabs
            {...{
              activeStep,
              steps,
            }}
          />
        </View>
      ) : (
        <Stepper
          {...{
            activeStep,
            steps,
          }}
        />
      )}
    </>
  );
};

ApplicationFormStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default ApplicationFormStepper;
