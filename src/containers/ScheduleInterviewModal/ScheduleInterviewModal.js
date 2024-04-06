import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import { TwoColumn } from "../../core/layouts";
import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomToggleComponent from "../../components/CustomToggleComponent";
import CustomTextInput from "../../components/CustomTextInput";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import { usePost, usePut } from "../../hooks/useApiRequest";
import useIsWebView from "../../hooks/useIsWebView";
import { formateDateandTime } from "../../utils/util";
import { ADDRESS_MAX_LENGTH } from "../../constants/constants";
import {
  APPLICANTS,
  INTERVIEW,
  POST_JOB,
} from "../../services/apiServices/apiEndPoint";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./ScheduleInterviewModal.style";

const radioButtonOptions = ["Face to Face ", "Telephonic", "Remote"];
const isMob = Platform.OS.toLowerCase() !== "web";

const getInterViewType = (interviewType) => {
  const type =
    interviewType === 0
      ? "face_to_face"
      : interviewType === 1
      ? "telephonic"
      : "remote";

  return type;
};

const getAPIInterViewType = (interviewType) => {
  const type =
    interviewType === 0
      ? "Face-To-Face"
      : interviewType === 1
      ? "Telephonic"
      : "Remote";

  return type;
};

const ScheduleInterviewModal = ({ onClose }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [primaryInterviewType, setPrimaryInterviewType] = useState(0);
  const [secondaryInterviewType, setSecondaryInterviewType] = useState(0);
  const [error, setError] = useState({
    face_to_face: {
      address: "",
      date: "",
      time: "",
    },
    telephonic: {
      date: "",
      time: "",
    },
    remote: {
      link: "",
      date: "",
      time: "",
    },
  });
  const [primaryDetails, setPrimaryDetails] = useState({
    face_to_face: {
      address: "",
      date: "",
      time: "",
    },
    telephonic: {
      date: "",
      time: "",
    },
    remote: {
      link: "",
      date: "",
      time: "",
    },
  });
  const [alternateDetails, setAlternateDetails] = useState({
    face_to_face: {
      address: "",
      date: "",
      time: "",
    },
    telephonic: {
      date: "",
      time: "",
    },
    remote: {
      link: "",
      date: "",
      time: "",
    },
  });

  // for now we use hardcoded applicant id

  const applicant_id = 1;

  const {
    isLoading: isScheduleInterviewLoading,
    makeRequest: scheduleInterviewRequest,
    error: errorWhileSchedulingInterview,
    setError: setErrorWhileSchedulingInterview,
  } = usePost({
    url: POST_JOB + APPLICANTS + INTERVIEW,
  });

  const {
    isLoading: isUpdatingInterview,
    makeRequest: updatatingInterview,
    error: errorWhileUpdatingInterview,
    setError: setErrorWhileUpdatingInterview,
  } = usePut({
    url: POST_JOB + APPLICANTS + INTERVIEW + `${applicant_id}`,
  });

  const handleScheduleInterview = () => {
    const primaryType = getAPIInterViewType(primaryInterviewType);
    const alternatePrimaryType = getAPIInterViewType(secondaryInterviewType);

    const type = getInterViewType(primaryInterviewType);
    const alternate_type = getInterViewType(secondaryInterviewType);

    const primary_schedule = formateDateandTime(
      primaryDetails[type].date,
      primaryDetails[type].time
    );

    const alternate_schedule = formateDateandTime(
      alternateDetails[alternate_type].date,
      alternateDetails[alternate_type].time
    );

    scheduleInterviewRequest({
      body: {
        applicant_id: applicant_id,
        type: primaryType,
        alternate_type: alternatePrimaryType,
        venue_address: primaryDetails[type].address,
        alternate_venue_address: alternateDetails[alternate_type].address,
        primary_schedule,
        alternate_schedule,
        remote_meeting_link: primaryDetails[type].link,
        alternate_remote_meeting_link: alternateDetails[alternate_type].link,
      },
      onSuccessCallback: () => {
        onClose();
      },
    });
  };

  const handleValueChange = (
    details,
    setDetails,
    fieldName,
    value,
    isPrimary
  ) => {
    const [interviewKey, field] = fieldName.split(".");
    setDetails((prevDetails) => ({
      ...prevDetails,
      [interviewKey]: {
        ...prevDetails[interviewKey],
        [field]: value,
      },
    }));
    if (isPrimary) {
      if (value === null || value === "") {
        setError((prevDetails) => ({
          ...prevDetails,
          [interviewKey]: {
            ...prevDetails[interviewKey],
            [field]: intl.formatMessage({ id: "label.field_cannot_be_empty" }),
          },
        }));
      } else {
        setError((prevDetails) => ({
          ...prevDetails,
          [interviewKey]: {
            ...prevDetails[interviewKey],
            [field]: "",
          },
        }));
      }
    }
  };

  const handleBlur = (key, fieldName) => {
    if (!!primaryDetails[key][fieldName]) {
      setError((prevDetails) => ({
        ...prevDetails,
        [key]: {
          ...prevDetails[key],
          [fieldName]: "",
        },
      }));
    }
  };

  const renderHorizontalLine = () => {
    return <View style={commonStyles.horizontalLine} />;
  };

  const renderDateComponents = (
    details,
    setDetails,
    interviewKey,
    isPrimary
  ) => {
    const datePickerStyle = isWebView
      ? styles.customDatePickerStyleWeb
      : styles.customDatePickerStyle;

    const primaryDateProps = isPrimary
      ? {
          isMandatory: true,
          isError: !!error[interviewKey].date,
          errorMessage: error[interviewKey].date,
        }
      : {};

    const primaryTimeProps = isPrimary
      ? {
          isMandatory: true,
          isError: !!error[interviewKey].time,
          errorMessage: error[interviewKey].time,
        }
      : {};
    return (
      <TwoColumn
        isLeftFillSpace
        isRightFillSpace
        leftSection={
          <CustomTextInput
            label={intl.formatMessage({ id: "label.date" })}
            onChangeValue={(date) =>
              handleValueChange(
                details,
                setDetails,
                `${interviewKey}.date`,
                date,
                isPrimary
              )
            }
            isCalendar
            customHandleBlur={() => {
              handleBlur(interviewKey, "date");
            }}
            value={details.date}
            customStyle={{
              ...datePickerStyle,
              ...styles.leftDatePickerStyle,
            }}
            {...primaryDateProps}
          />
        }
        rightSection={
          <CustomTextInput
            label={intl.formatMessage({ id: "label.time" })}
            onChangeValue={(time) =>
              handleValueChange(
                details,
                setDetails,
                `${interviewKey}.time`,
                time,
                isPrimary
              )
            }
            isCalendar
            customHandleBlur={() => {
              handleBlur(interviewKey, "time");
            }}
            showTimeSelect
            dateFormate={isMob && "time"}
            value={details.time}
            customStyle={datePickerStyle}
            {...primaryTimeProps}
          />
        }
      />
    );
  };

  const renderInterviewDetails = (
    interviewType,
    details,
    setDetails,
    isPrimary
  ) => {
    const interviewKey = getInterViewType(interviewType);
    const primaryAddressProps = isPrimary
      ? {
          isMandatory: true,
          isError: !!error[interviewKey].address,
          errorMessage: error[interviewKey].address,
        }
      : {};

    const primaryLinkProps = isPrimary
      ? {
          isMandatory: true,
          isError: !!error[interviewKey].link,
          errorMessage: error[interviewKey].link,
        }
      : {};

    switch (interviewType) {
      case 0: // Face to Face
        return (
          <>
            <CustomTextInput
              isMultiline
              placeholder={intl.formatMessage({
                id: "label.placeholder.address",
              })}
              label={intl.formatMessage({ id: "label.placeholder.address" })}
              onChangeText={(value) => {
                handleValueChange(
                  details,
                  setDetails,
                  `${interviewKey}.address`,
                  value,
                  isPrimary
                );
              }}
              customHandleBlur={() => {
                handleBlur(interviewKey, "address");
              }}
              isMandatory={isPrimary}
              maxLength={ADDRESS_MAX_LENGTH}
              value={details[interviewKey].address}
              {...primaryAddressProps}
            />
            {renderDateComponents(
              details[interviewKey],
              setDetails,
              interviewKey,
              isPrimary
            )}
          </>
        );
      case 1: // Telephonic
        return renderDateComponents(
          details[interviewKey],
          setDetails,
          interviewKey,
          isPrimary
        );

      case 2: // Remote
        return (
          <>
            <CustomTextInput
              placeholder={intl.formatMessage({ id: "label.placeholder.link" })}
              label={intl.formatMessage({ id: "label.placeholder.link" })}
              onChangeText={(value) =>
                handleValueChange(
                  details,
                  setDetails,
                  `${interviewKey}.link`,
                  value,
                  isPrimary
                )
              }
              customHandleBlur={() => {
                handleBlur(interviewKey, "link");
              }}
              value={details[interviewKey].link}
              {...primaryLinkProps}
            />
            {renderDateComponents(
              details[interviewKey],
              setDetails,
              interviewKey,
              isPrimary
            )}
          </>
        );
      default:
        return null;
    }
  };

  const hasErrors = () => {
    const primaryErrorValues = Object.values(error).map((err) =>
      Object.values(err)
    );
    return primaryErrorValues.some((err) => err.some((e) => e !== ""));
  };

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: commonStyles.buttonStyle,
          buttonTwoStyle: commonStyles.buttonStyle,
        }
      : {};

  return (
    <CustomModal
      headerText={intl.formatMessage({ id: "label.schedule_interview" })}
      isIconCross
      onPressIconCross={onClose}
      onBackdropPress={onClose}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ ...styles.modalInnerContainer, ...styles.overflowStyle }}
      >
        {renderHorizontalLine()}
        <View>
          <TwoRow
            topSection={
              <>
                <CommonText
                  fontWeight={"600"}
                  customTextStyle={styles.headerText}
                >
                  {intl.formatMessage({ id: "label.primary_interview" })}
                </CommonText>
                <CustomToggleComponent
                  isMandatory
                  label={intl.formatMessage({ id: "label.interview_type" })}
                  options={radioButtonOptions}
                  customLabelStyle={styles.toggleComponentLabelStyle}
                  onValueChange={(val) => setPrimaryInterviewType(val)}
                  value={primaryInterviewType}
                  customToggleButtonTextStyle={styles.customToggleText}
                  containerStyle={styles.toggleContainerStyle}
                />
              </>
            }
            bottomSection={renderInterviewDetails(
              primaryInterviewType,
              primaryDetails,
              setPrimaryDetails,
              true
            )}
          />
          <TwoRow
            topSection={
              <>
                <CommonText
                  fontWeight={"600"}
                  customTextStyle={styles.headerText}
                >
                  {intl.formatMessage({ id: "label.alternate_interview" })}
                </CommonText>
                <CustomToggleComponent
                  isMandatory
                  label={intl.formatMessage({ id: "label.interview_type" })}
                  options={radioButtonOptions}
                  customLabelStyle={styles.toggleComponentLabelStyle}
                  onValueChange={(val) => setSecondaryInterviewType(val)}
                  value={secondaryInterviewType}
                  customToggleButtonTextStyle={styles.customToggleText}
                  containerStyle={styles.toggleContainerStyle}
                />
              </>
            }
            bottomSection={renderInterviewDetails(
              secondaryInterviewType,
              alternateDetails,
              setAlternateDetails,
              false
            )}
          />
        </View>
      </ScrollView>

      <View style={isWebView ? styles.buttonWebStyle : {}}>
        <View style={isWebView ? styles.subContainerStyle : {}}>
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.schedule" })}
            customStyles={{
              ...isWebProps,
              customContainerStyle: commonStyles.customContainerStyle,
            }}
            isDisabled={hasErrors()}
            displayLoader={isScheduleInterviewLoading}
            isButtonTwoGreen
            onPressButtonOne={onClose}
            onPressButtonTwo={handleScheduleInterview}
          />
        </View>
      </View>
      {!!errorWhileSchedulingInterview && (
        <ToastComponent
          toastMessage={errorWhileSchedulingInterview}
          onDismiss={() => setErrorWhileSchedulingInterview("")}
        />
      )}
    </CustomModal>
  );
};

ScheduleInterviewModal.defaultProps = {
  onClose: () => {},
};

ScheduleInterviewModal.propTypes = {
  onClose: PropTypes.func,
};

export default ScheduleInterviewModal;
