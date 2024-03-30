import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View, Platform } from "@unthinkable/react-core-components";

import Stepper from "../../../components/Stepper";
import StepperTabs from "../../../components/StepperTabs";
import { APPLICATION_FORM_STEPPER_OPTIONS } from "../../../constants/constants";
import styles from "./ApplicationFormStepper.style";
import { TwoColumn } from "../../../core/layouts";
import CommonText from "../../../components/CommonText";

const isWeb = Platform.OS.toLowerCase() === "web";

const ApplicationFormStepper = ({
  activeStep,
  headingText,
  webActionButton,
  mobActionButton,
  customMobHeadingText,
}) => {
  const intl = useIntl();

  return (
    <>
      {isWeb ? (
        <View style={styles.stepperContainer}>
          <View style={styles.headingContainerWeb}>
            {!!headingText && (
              <TwoColumn
                leftSection={
                  <CommonText
                    fontWeight={"600"}
                    customTextStyle={{
                      ...styles.headingtextWeb,
                      customMobHeadingText,
                    }}
                  >
                    {headingText}
                  </CommonText>
                }
                rightSection={!!webActionButton && webActionButton}
              />
            )}
          </View>
          <StepperTabs
            activeStep={activeStep}
            steps={APPLICATION_FORM_STEPPER_OPTIONS.map((step) =>
              intl.formatMessage({ id: step.title })
            )}
          />
        </View>
      ) : (
        <View style={styles.container}>
          {!!headingText && (
            <TwoColumn
              style={styles.headingContainer}
              leftSection={
                <CommonText
                  fontWeight={"600"}
                  customTextStyle={{
                    ...styles.headingtext,
                    customMobHeadingText,
                  }}
                >
                  {headingText}
                </CommonText>
              }
              rightSection={!!mobActionButton && mobActionButton}
            />
          )}
          <Stepper
            {...{
              activeStep: activeStep,
              steps: APPLICATION_FORM_STEPPER_OPTIONS.map((step) =>
                intl.formatMessage({ id: step.title })
              ),
            }}
          />
        </View>
      )}
    </>
  );
};

ApplicationFormStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

export default ApplicationFormStepper;
