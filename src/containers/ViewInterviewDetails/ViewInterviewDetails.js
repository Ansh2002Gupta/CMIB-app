import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ScrollView, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import {
  FACE_TO_FACE,
  INTERVIEW_DETAILS,
  INTERVIEW_DETAILS_FIELDS,
  REMOTE,
  TELEPHONIC,
} from "./ViewInterviewFieldDetails";
import styles from "./ViewInterviewDetails.style";
import commonStyles from "../../theme/styles/commonStyles";

const interviewDetails = INTERVIEW_DETAILS_FIELDS(
  INTERVIEW_DETAILS.applicant_name,
  INTERVIEW_DETAILS.applicant_id,
  INTERVIEW_DETAILS.type
);

const primaryFaceToFace = FACE_TO_FACE(
  INTERVIEW_DETAILS.vanue_address || "-",
  INTERVIEW_DETAILS.primary_schedule_date || "-",
  INTERVIEW_DETAILS.primary_schedule_time || "-"
);

const alternateFaceToFace = FACE_TO_FACE(
  INTERVIEW_DETAILS.alternate_venue_address || "-",
  INTERVIEW_DETAILS.alternate_schedule_date || "-",
  INTERVIEW_DETAILS.alternate_schedule_time || "-"
);

const primaryTelephonicDetails = TELEPHONIC(
  INTERVIEW_DETAILS.primary_schedule_date || "-",
  INTERVIEW_DETAILS.primary_schedule_time || "-"
);

const alternateTelephonicDetails = TELEPHONIC(
  INTERVIEW_DETAILS.alternate_schedule_date || "-",
  INTERVIEW_DETAILS.alternate_schedule_time || "-"
);

const primaryRemoteDetails = REMOTE(
  INTERVIEW_DETAILS.primary_schedule_date || "-",
  INTERVIEW_DETAILS.primary_schedule_time || "-",
  INTERVIEW_DETAILS.remote_meeting_link || "-"
);

const alternateRemoteDetails = REMOTE(
  INTERVIEW_DETAILS.alternate_schedule_date || "-",
  INTERVIEW_DETAILS.alternate_schedule_time || "-",
  INTERVIEW_DETAILS.alternate_remote_meeting_link || "-"
);

const currentPrimaryDetails =
  INTERVIEW_DETAILS.type === "face_to_face"
    ? primaryFaceToFace
    : INTERVIEW_DETAILS.type === "remote"
    ? primaryRemoteDetails
    : primaryTelephonicDetails;

const currentAlternateDetails =
  INTERVIEW_DETAILS.type === "face_to_face"
    ? alternateFaceToFace
    : INTERVIEW_DETAILS.type === "remote"
    ? alternateRemoteDetails
    : alternateTelephonicDetails;

const ViewInterviewDetails = ({ onClose }) => {
  const intl = useIntl();

  const renderInterviewDetails = (details) => {
    return (
      <View style={styles.detailsSection}>
        {details.map((item) => {
          return (
            <TwoRow
              topSection={
                <CommonText
                  customContainerStyle={styles.headingContainer}
                  customTextStyle={styles.headerText}
                >
                  {intl.formatMessage({
                    id: `label.${item.headingIntl}`,
                  })}
                </CommonText>
              }
              bottomSection={
                <CommonText customTextStyle={styles.formalText}>
                  {item.value}
                </CommonText>
              }
            />
          );
        })}
      </View>
    );
  };

  return (
    <CustomModal
      headerText={intl.formatMessage({ id: "label.interview_details" })}
      isIconCross
      onPressIconCross={onClose}
      onBackdropPress={onClose}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.modalInnerContainer}
      >
        <View style={styles.detailsSection}>
          {interviewDetails.map((item) => {
            return (
              <TwoRow
                topSection={
                  <View style={styles.headingContainer}>
                    <CommonText customTextStyle={styles.headerText}>
                      {intl.formatMessage({ id: `label.${item.headingIntl}` })}
                    </CommonText>
                    <CommonText customTextStyle={styles.redText}>*</CommonText>
                  </View>
                }
                bottomSection={
                  <CommonText customTextStyle={styles.formalText}>
                    {item.value}
                  </CommonText>
                }
              />
            );
          })}
        </View>
        <View style={commonStyles.horizontalLine} />
        <TwoRow
          topSection={
            <CommonText fontWeight={"600"} customTextStyle={styles.headingText}>
              {intl.formatMessage({ id: "label.primary_interview" })}
            </CommonText>
          }
          bottomSection={renderInterviewDetails(currentPrimaryDetails)}
        />
        <TwoRow
          topSection={
            <CommonText fontWeight={"600"} customTextStyle={styles.headingText}>
              {intl.formatMessage({ id: "label.alternate_interview" })}
            </CommonText>
          }
          bottomSection={renderInterviewDetails(currentAlternateDetails)}
        />
      </ScrollView>
    </CustomModal>
  );
};

ViewInterviewDetails.defaultProps = {
  onClose: () => {},
};

ViewInterviewDetails.propTypes = {
  onClose: PropTypes.func,
};

export default ViewInterviewDetails;
