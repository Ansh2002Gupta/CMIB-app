import React from "react";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../components/ActionPairButton";
import CommonText from "../../../components/CommonText";
import CustomButton from "../../../components/CustomButton";
import EducationalDetails from "../EducationalDetails";
import NumberAndTextStepper from "../../NumberAndTextStepper";
import PersonalDetails from "../PersonalDetails";
import Stepper from "../../../components/Stepper";
import { ADD_APPLICATION_STEPPER } from "../../../constants/constants";
import images from "../../../images";
import styles from "./AddApplication.style";
import TrainingDetails from "../TrainingDetails";
import WorkExperienceDetails from "../WorkExperience";
import HobbiesDetails from "../Hobbies";

const AddApplicationTemplate = ({
  countryCodeData,
  intl,
  isWebView,
  onChangeStepper,
  onClickBack,
  onClickCancel,
  selectedStepper,
  stepperData,
}) => {
  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonStyle,
        }
      : {};

  const getCurrentStepperDetails = () => {
    switch (selectedStepper.id) {
      case 1:
        return (
          <PersonalDetails
            countryCodeData={countryCodeData}
            intl={intl}
            isWebView={isWebView}
          />
        );
      case 2:
        return <EducationalDetails intl={intl} isWebView={isWebView} />;
      case 3:
        return <TrainingDetails intl={intl} isWebView={isWebView} />;
      case 4:
        return <WorkExperienceDetails intl={intl} isWebView={isWebView} />;
      case 5:
        return <HobbiesDetails intl={intl} isWebView={isWebView} />;
      default:
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <CommonText customTextStyle={{ fontSize: 32 }} fontWeight={"600"}>
              COMING SOON!!!
            </CommonText>
          </View>
        );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={isWebView ? styles.webHeaderContainer : styles.headerContainer}
      >
        <CommonText
          customTextStyle={styles.headerText(isWebView)}
          fontWeight={"600"}
        >
          {intl.formatMessage({ id: "label.add_application" })}
        </CommonText>
        {isWebView ? (
          <NumberAndTextStepper
            stepperData={stepperData}
            selectedStepper={selectedStepper}
          />
        ) : (
          <Stepper
            customStyle={{
              containerStyle: styles.stepperContainer,
              stepperHeroLabelText: styles.stepperText,
            }}
            {...{
              activeStep: selectedStepper.id - 1,
              steps: ADD_APPLICATION_STEPPER.map((step) =>
                intl.formatMessage({ id: step.title })
              ),
            }}
          />
        )}
      </View>
      {getCurrentStepperDetails()}
      <View style={styles.row}>
        {isWebView && selectedStepper.id != 1 && (
          <CustomButton
            onPress={onClickBack}
            style={styles.buttonStyle}
            iconLeft={{
              leftIconSource: images.iconArrowLeft,
            }}
            customStyle={{ textFontWeight: "500" }}
          >
            {intl.formatMessage({ id: "label.back" })}
          </CustomButton>
        )}
        <ActionPairButton
          buttonOneText={intl.formatMessage({
            id:
              !isWebView && selectedStepper.id != 1
                ? "label.back"
                : "label.cancel",
          })}
          buttonTwoText={intl.formatMessage({ id: "label.next" })}
          customStyles={{
            ...isWebProps,
            customContainerStyle: styles.customButtonContainer,
            buttonOneTextStyle: styles.buttonText,
            buttonTwoTextStyle: styles.buttonText,
          }}
          iconRight={{
            rightIconSource: images.iconArrowRightWhite,
          }}
          iconLeft={
            !isWebView &&
            selectedStepper.id != 1 && {
              leftIconSource: images.iconArrowLeft,
            }
          }
          isDisabled={false}
          isButtonTwoGreen
          onPressButtonOne={() => {
            if (!isWebView && selectedStepper.id != 1) {
              onClickBack();
            } else {
              onClickCancel();
            }
          }}
          onPressButtonTwo={onChangeStepper}
        />
      </View>
    </View>
  );
};

export default AddApplicationTemplate;
