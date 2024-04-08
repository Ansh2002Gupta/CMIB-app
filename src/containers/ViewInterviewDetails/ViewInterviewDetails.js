import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ScrollView, View, Linking } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import {
  FACE_TO_FACE,
  INTERVIEW_DETAILS,
  INTERVIEW_DETAILS_FIELDS,
  REMOTE,
  TELEPHONIC,
} from "./ViewInterviewFieldDetails";
import { getValidUrl } from "../../utils/util";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./ViewInterviewDetails.style";

const interviewDetails = INTERVIEW_DETAILS_FIELDS(
  INTERVIEW_DETAILS.applicant_name,
  INTERVIEW_DETAILS.applicant_id
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

  const handlePressLink = (url) => {
    Linking.openURL(getValidUrl(url), "_blank");
  };

  const renderHeadingAndValue = ({
    heading,
    value,
    isMandatory,
    label = "",
  }) => {
    return (
      <TwoRow
        style={styles.headingValueContainer}
        topSection={
          <View style={styles.headingContainer}>
            <CommonText customTextStyle={styles.headerText}>
              {heading}
            </CommonText>
            {isMandatory && (
              <CommonText customTextStyle={styles.redText}>*</CommonText>
            )}
          </View>
        }
        bottomSection={
          label === "link" ? (
            <CustomTouchableOpacity onPress={() => handlePressLink(value)}>
              <CommonText customTextStyle={styles.linkText}>{value}</CommonText>
            </CustomTouchableOpacity>
          ) : (
            <CommonText customTextStyle={styles.formalText}>{value}</CommonText>
          )
        }
      />
    );
  };

  const renderInterviewDetails = (details, isMandatory) => {
    return (
      <View style={styles.detailsSection}>
        {details.map((item) => {
          return (
            <>
              {renderHeadingAndValue({
                heading: intl.formatMessage({
                  id: `label.${item.headingIntl}`,
                }),
                value: item.value,
                isMandatory: isMandatory,
                label: item.label,
              })}
            </>
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
      maxWidth={"lg"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.modalInnerContainer}
      >
        <View style={styles.detailsSection}>
          {interviewDetails.map((item) => {
            return (
              <>
                {renderHeadingAndValue({
                  heading: intl.formatMessage({
                    id: `label.${item.headingIntl}`,
                  }),
                  value: item.value,
                  isMandatory: true,
                })}
              </>
            );
          })}
        </View>
        <View style={commonStyles.horizontalLine} />
        <TwoRow
          topSection={
            <View>
              <CommonText
                fontWeight={"600"}
                customTextStyle={styles.headingText}
              >
                {intl.formatMessage({ id: "label.primary_interview" })}
              </CommonText>
              {renderHeadingAndValue({
                heading: intl.formatMessage({ id: "label.interview_type" }),
                value: INTERVIEW_DETAILS.type,
                isMandatory: true,
              })}
            </View>
          }
          bottomSection={renderInterviewDetails(currentPrimaryDetails, true)}
        />
        <TwoRow
          topSection={
            <View>
              <CommonText
                fontWeight={"600"}
                customTextStyle={styles.headingText}
              >
                {intl.formatMessage({ id: "label.alternate_interview" })}
              </CommonText>
              {renderHeadingAndValue({
                heading: intl.formatMessage({ id: "label.interview_type" }),
                value: INTERVIEW_DETAILS.type,
                isMandatory: false,
              })}
            </View>
          }
          bottomSection={renderInterviewDetails(currentAlternateDetails, false)}
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
