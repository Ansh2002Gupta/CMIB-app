import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ScrollView, View, Linking } from "@unthinkable/react-core-components";

import { TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import {
  FACE_TO_FACE,
  INTERVIEW_DETAILS_FIELDS,
  REMOTE,
  TELEPHONIC,
} from "./ViewInterviewFieldDetails";
import { formatDate, formatTime, getValidUrl } from "../../utils/util";
import useFetch from "../../hooks/useFetch";
import {
  JOB_APPLICANTS,
  INTERVIEW,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./ViewInterviewDetails.style";

const ViewInterviewDetails = ({ onClose, applicant_id }) => {
  const intl = useIntl();

  const [interviewData, setInterviewData] = useState();
  const { data, isLoading, fetchData, isError, error } = useFetch({
    url: USER_TYPE_COMPANY + JOB_APPLICANTS + INTERVIEW + `/${applicant_id}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(async () => {
    const newData = await fetchData();
    setInterviewData(newData);
  }, []);

  const handlePressLink = (url) => {
    Linking.openURL(getValidUrl(url), "_blank");
  };

  const interviewDetails = INTERVIEW_DETAILS_FIELDS(
    interviewData?.applicant_name ?? "-",
    interviewData?.application_id ?? "-"
  );

  const primaryFaceToFace = FACE_TO_FACE(
    interviewData?.venue_address || "-",
    formatDate(interviewData?.primary_schedule) || "-",
    formatTime(interviewData?.primary_schedule) || "-"
  );

  const alternateFaceToFace = FACE_TO_FACE(
    interviewData?.alternate_venue_address || "-",
    formatDate(interviewData?.alternate_schedule) || "-",
    formatTime(interviewData?.alternate_schedule) || "-"
  );

  const primaryTelephonicDetails = TELEPHONIC(
    formatDate(interviewData?.primary_schedule) || "-",
    formatTime(interviewData?.primary_schedule) || "-"
  );

  const alternateTelephonicDetails = TELEPHONIC(
    formatDate(interviewData?.alternate_schedule) || "-",
    formatTime(interviewData?.alternate_schedule) || "-"
  );

  const primaryRemoteDetails = REMOTE(
    formatDate(interviewData?.primary_schedule) || "-",
    formatTime(interviewData?.primary_schedule) || "-",
    interviewData?.remote_meeting_link || "-"
  );

  const alternateRemoteDetails = REMOTE(
    formatDate(interviewData?.alternate_schedule) || "-",
    formatTime(interviewData?.alternate_schedule) || "-",
    interviewData?.alternate_remote_meeting_link || "-"
  );

  const currentType = data?.type.toLowerCase();

  const currentPrimaryDetails =
    currentType === "face-to-face"
      ? primaryFaceToFace
      : currentType === "remote"
      ? primaryRemoteDetails
      : primaryTelephonicDetails;

  const currentAlternateDetails =
    currentType === "face-to-face"
      ? alternateFaceToFace
      : currentType === "remote"
      ? alternateRemoteDetails
      : alternateTelephonicDetails;

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
        {isLoading && !isError && <LoadingScreen />}
        {!isLoading && !isError && (
          <>
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
                    heading: intl.formatMessage({
                      id: "label.interview_type",
                    }),
                    value: currentType,
                    isMandatory: true,
                  })}
                </View>
              }
              bottomSection={renderInterviewDetails(
                currentPrimaryDetails,
                true
              )}
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
                    heading: intl.formatMessage({
                      id: "label.interview_type",
                    }),
                    value: currentType,
                    isMandatory: false,
                  })}
                </View>
              }
              bottomSection={renderInterviewDetails(
                currentAlternateDetails,
                false
              )}
            />
          </>
        )}
        {isError && (
          <ErrorComponent
            errorMsg={error?.data?.message}
            onRetry={() => fetchData()}
          />
        )}
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
