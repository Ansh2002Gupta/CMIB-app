import React, { useState, useRef, useEffect } from "react";
import { Platform, View } from "@unthinkable/react-core-components";

import ActionPairButton from "../../../components/ActionPairButton";
import CommonText from "../../../components/CommonText";
import CustomButton from "../../../components/CustomButton";
import EducationalDetails from "../EducationalDetails";
import NumberAndTextStepper from "../../NumberAndTextStepper";
import PaymentDetails from "../PaymentDetails/PaymentDetails";
import PersonalDetails from "../PersonalDetails";
import Stepper from "../../../components/Stepper";
import { ADD_APPLICATION_STEPPER } from "../../../constants/constants";
import images from "../../../images";
import styles from "./AddApplication.style";
import TrainingDetails from "../TrainingDetails";
import WorkExperienceDetails from "../WorkExperience";
import HobbiesDetails from "../Hobbies";
import JobPreferenceDetails from "../JobPreference";
import { usePut } from "../../../hooks/useApiRequest";
import useFetch from "../../../hooks/useFetch";

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
  const [isSaveEnabled, setIsSaveEnaabled] = useState(false);

  const personalDetailsref = useRef();
  const edDetailsRef = useRef();
  const workExperienceDetailsref = useRef();
  const trainingDetailRef = useRef();
  const jobPreferneceref = useRef();
  const hobbiesRef = useRef();

  const { isLoading, makeRequest, error } = usePut({
    url: "/member/nqca-placements/rounds/264/training-details",
  });

  const {
    isLoading: isLoadingHobbies,
    makeRequest: makeRequestHobbies,
    error: errorHobbies,
  } = usePut({
    url: "/member/nqca-placements/rounds/264/activities",
  });

  const {
    data: hobbiesData,
    isLoading: isHobbiesLoading,
    error: errorWhileFetchingHobbies,
    fetchData: fetchHobbies,
  } = useFetch({
    url: "/member/nqca-placements/rounds/264/activities",
  });

  useEffect(() => {
    fetchHobbies();
  }, []);

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
            ref={personalDetailsref}
            isWebView={isWebView}
            handleSave={(val) => {
              if (val !== isSaveEnabled) {
                setIsSaveEnaabled(val);
              }
            }}
          />
        );
      case 2:
        return (
          <EducationalDetails
            ref={edDetailsRef}
            intl={intl}
            isWebView={isWebView}
            handleSave={(val) => {
              if (val !== isSaveEnabled) {
                setIsSaveEnaabled(val);
              }
            }}
          />
        );
      case 3:
        return (
          <TrainingDetails
            intl={intl}
            isWebView={isWebView}
            ref={trainingDetailRef}
            handleSave={(val) => {
              if (val !== isSaveEnabled) {
                setIsSaveEnaabled(val);
              }
            }}
          />
        );
      case 4:
        return (
          <WorkExperienceDetails
            intl={intl}
            isWebView={isWebView}
            ref={workExperienceDetailsref}
            handleSave={(val) => {
              if (val !== isSaveEnabled) {
                setIsSaveEnaabled(val);
              }
            }}
          />
        );
      case 5:
        return (
          <HobbiesDetails
            intl={intl}
            isWebView={isWebView}
            ref={hobbiesRef}
            hobbiesData={hobbiesData}
          />
        );
      case 6:
        return (
          <JobPreferenceDetails
            intl={intl}
            isWebView={isWebView}
            ref={jobPreferneceref}
            handleSave={(val) => {
              if (val !== isSaveEnabled) {
                setIsSaveEnaabled(val);
              }
            }}
          />
        );
      case 7:
        return (
          <PaymentDetails
            intl={intl}
            isWebView={isWebView}
            handleSave={(val) => {
              if (val !== isSaveEnabled) {
                setIsSaveEnaabled(val);
              }
            }}
          />
        );
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

  const onPersonalDetailSave = () => {
    const payload = personalDetailsref?.current?.getFilledData();
    makeRequest({
      overrideUrl: `/member/nqca-placements/rounds/264/personal`,
      body: payload,
      onErrorCallback: (errorMessage) => {
        //
        console.log("error");
      },
      onSuccessCallback: (data) => {
        onChangeStepper();
      },
    });
  };

  const onEdDetailsSave = () => {
    const payload = edDetailsRef?.current?.getAllData();
    makeRequest({
      overrideUrl: `/member/nqca-placements/rounds/264/academics`,
      body: payload,
      onErrorCallback: (errorMessage) => {
        //
        console.log("error");
      },
      onSuccessCallback: (data) => {
        onChangeStepper();
      },
    });
  };

  const onTrainingDetailsSave = () => {
    const payload = trainingDetailRef?.current?.getAllData();
    makeRequest({
      overrideUrl: `/member/nqca-placements/rounds/264/training-details`,
      body: payload,
      onErrorCallback: (errorMessage) => {
        //
        console.log("error");
      },
      onSuccessCallback: (data) => {
        onChangeStepper();
      },
    });
  };

  const onExperienceDetailsSave = () => {
    const payload = workExperienceDetailsref?.current?.getAllData();
    makeRequest({
      overrideUrl: `member/nqca-placements/rounds/264/work-experience`,
      body: payload,
      onErrorCallback: (errorMessage) => {
        //
        console.log("error");
      },
      onSuccessCallback: (data) => {
        onChangeStepper();
      },
    });
  };

  const onJobPreferencesSave = () => {
    const payload = jobPreferneceref?.current?.getAllData();
    makeRequest({
      overrideUrl: `member/nqca-placements/rounds/264/job-preferences`,
      body: payload,
      onErrorCallback: (errorMessage) => {
        //
        console.log("error");
      },
      onSuccessCallback: (data) => {
        onChangeStepper();
      },
    });
  };

  const onHobbiesDetailsSave = () => {
    const payload = hobbiesRef?.current?.getAllData();
    makeRequestHobbies({
      body: { data: payload },
      onErrorCallback: (errorMessage) => {},
      onSuccessCallback: (data) => {
        onChangeStepper();
      },
    });
  };

  const handleSavePress = () => {
    switch (selectedStepper.id) {
      case 1:
        onPersonalDetailSave();
        return;
      case 2:
        onEdDetailsSave();
        return;
      case 3:
        onTrainingDetailsSave();
        return;
      case 4:
        onExperienceDetailsSave();
        return
      case 5:
        onJobPreferencesSave();
        return;
      case 6:
        onHobbiesDetailsSave();
        return;
      default:
        return;
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
          isDisabled={selectedStepper.id == 5 ? false : !isSaveEnabled}
          isButtonTwoGreen
          onPressButtonOne={() => {
            if (!isWebView && selectedStepper.id != 1) {
              onClickBack();
            } else {
              onClickCancel();
            }
          }}
          onPressButtonTwo={handleSavePress}
        />
      </View>
    </View>
  );
};

export default AddApplicationTemplate;
