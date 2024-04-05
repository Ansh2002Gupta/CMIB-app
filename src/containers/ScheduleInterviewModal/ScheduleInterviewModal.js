import React, { useState } from "react";
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
import useIsWebView from "../../hooks/useIsWebView";
import { ADDRESS_MAX_LENGTH } from "../../constants/constants";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./ScheduleInterviewModal.style";

const radioButtonOptions = ["Face to Face ", "Telephonic", "Remote"];
const isMob = Platform.OS.toLowerCase() !== "web";

const ScheduleInterviewModal = ({ onClose }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [currentInterviewType, setCurrentInterviewType] = useState(0);
  const [error, setError] = useState({
    faceToFace: {
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
    faceToFace: {
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
    faceToFace: {
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

  const handleValueChange = (details, setDetails, fieldName, value) => {
    const [interviewKey, field] = fieldName.split(".");
    setDetails((prevDetails) => ({
      ...prevDetails,
      [interviewKey]: {
        ...prevDetails[interviewKey],
        [field]: value,
      },
    }));
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
                date
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
                time
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

  const renderInterviewDetails = (details, setDetails, isPrimary) => {
    const interviewKey =
      currentInterviewType === 0
        ? "faceToFace"
        : currentInterviewType === 1
        ? "telephonic"
        : "remote";

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

    switch (currentInterviewType) {
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
                  value
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
                  value
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
        <CustomToggleComponent
          isMandatory
          label={intl.formatMessage({ id: "label.interview_type" })}
          options={radioButtonOptions}
          customLabelStyle={styles.toggleComponentLabelStyle}
          onValueChange={(val) => setCurrentInterviewType(val)}
          value={currentInterviewType}
          customToggleButtonTextStyle={styles.customToggleText}
        />
        {renderHorizontalLine()}
        <View>
          <TwoRow
            topSection={
              <CommonText
                fontWeight={"600"}
                customTextStyle={styles.headerText}
              >
                {intl.formatMessage({ id: "label.primary_interview" })}
              </CommonText>
            }
            bottomSection={renderInterviewDetails(
              primaryDetails,
              setPrimaryDetails,
              true
            )}
          />
          <TwoRow
            topSection={
              <CommonText
                fontWeight={"600"}
                customTextStyle={styles.headerText}
              >
                {intl.formatMessage({ id: "label.alternate_interview" })}
              </CommonText>
            }
            bottomSection={renderInterviewDetails(
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
            // displayLoader={isLoading}
            isDisabled={false}
            isButtonTwoGreen
            onPressButtonOne={onClose}
            onPressButtonTwo={() => {}}
          />
        </View>
      </View>
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
