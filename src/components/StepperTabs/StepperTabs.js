import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import images from "../../images";
import { STEPPER_STATE } from "../../constants/constants";
import styles from "./StepperTabs.style";

const StepperTabs = ({ activeStep, customStyle, steps }) => {
  const getStepStatus = (step) => {
    if (activeStep === step) return STEPPER_STATE.ACTIVE;
    if (activeStep > step) return STEPPER_STATE.DONE;
    return STEPPER_STATE.INACTIVE;
  };

  const getStepStyle = (status) => {
    switch (status) {
      case STEPPER_STATE.INACTIVE:
        return styles.stepperpending;
      case STEPPER_STATE.ACTIVE:
        return styles.stepperActive;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {steps.map((item, index) => {
        const status = getStepStatus(index);
        return (
          <View
            key={`step-${index}`}
            style={{
              ...getStepStyle(status),
              ...customStyle,
              ...styles.stepperContainer,
            }}
          >
            {getStepStatus(index) === STEPPER_STATE.DONE ? (
              <CustomImage
                source={images.iconStepperDone}
                alt="Done"
                style={styles.stepperDoneIcon}
              />
            ) : (
              <CommonText
                customContainerStyle={{
                  ...(getStepStatus(index) === STEPPER_STATE.ACTIVE
                    ? styles.activeCircleContainer
                    : styles.inActiveCircleContainer),
                }}
                customTextStyle={styles.circleText}
                fontWeight="600"
              >{`${index + 1}`}</CommonText>
            )}
            <CommonText fontWeight={"600"} customTextStyle={styles.stepperText}>
              {item}
            </CommonText>
          </View>
        );
      })}
    </View>
  );
};

export default StepperTabs;