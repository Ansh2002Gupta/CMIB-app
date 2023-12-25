import React from "react";
import PropTypes from "prop-types";
import { Image } from "@unthinkable/react-core-components";

import images from "../../images";
import { getAppropriateStyle, styles } from "./Stepper.style";

const Stepper = ({ activeStep, orientation, showActiveLabelOnly, steps }) => {
  const getStepStatus = (step) => {
    if (activeStep === step) return "active";
    if (activeStep > step) return "done";
    return "inActive";
  };

  return (
    <React.Fragment>
      <div
        style={{
          ...(orientation === "vertical" ? styles.stepperVertical : {}),
          ...styles.stepsContainer,
        }}
      >
        {steps?.map((label, index) => (
          <div key={index} style={styles.step}>
            <div style={styles.circleLabel}>
              <div
                style={{
                  ...styles.circle,
                  ...getAppropriateStyle({
                    fieldName: "circle",
                    stepValue: index,
                    getStepStatus,
                  }),
                }}
              >
                {getStepStatus(index) === "done" ? (
                  <Image source={images.iconStepperDone} alt="Done" />
                ) : (
                  index + 1
                )}
              </div>
              {!showActiveLabelOnly && (
                <div
                  style={{
                    ...styles.label,
                    ...(orientation === "vertical" ? styles.verticalLabel : {}),
                    ...(orientation !== "vertical" && !showActiveLabelOnly
                      ? styles.horizontalLabel
                      : {}),
                    ...getAppropriateStyle({
                      fieldName: "label",
                      stepValue: index,
                      getStepStatus,
                    }),
                  }}
                >
                  {label}
                </div>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                style={{
                  ...styles.line,
                  ...(orientation !== "vertical" ? styles.horizontalLine : {}),
                  ...(orientation !== "vertical" && !showActiveLabelOnly
                    ? styles.horizontalLineTop
                    : {}),
                  ...(orientation === "vertical" ? styles.verticalLine : {}),
                  ...getAppropriateStyle({
                    fieldName: "line",
                    stepValue: index,
                    getStepStatus,
                  }),
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
      {showActiveLabelOnly && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: 600,
              textAlign: "center",
              color: "#000833",
            }}
          >
            {steps.find((label, idx) => idx === activeStep)}
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

Stepper.defaultProps = {
  activeStep: 0,
  orientation: "horizontal",
  showActiveLabelOnly: true,
  steps: [],
};

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  orientation: PropTypes.string,
  showActiveLabelOnly: PropTypes.bool,
  steps: PropTypes.array.isRequired,
};

export default Stepper;
