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
import {
  formatDate,
  formatText,
  formatTime,
  getValidUrl,
} from "../../utils/util";
import useFetch from "../../hooks/useFetch";
import {
  JOB_APPLICANTS,
  INTERVIEW,
  USER_TYPE_COMPANY,
  USER_TYPE_MEMBER,
  JOBS,
  INTERVIEWS,
  APPLICANT,
} from "../../services/apiServices/apiEndPoint";
import commonStyles from "../../theme/styles/commonStyles";
import styles, {
  getModalInnerContainerHeight,
} from "./ViewInterviewDetails.style";

const ViewInterviewDetails = ({ applicant_id, onClose, interview_id }) => {
  const intl = useIntl();
  const [interviewData, setInterviewData] = useState();

  const { data, setData, isLoading, fetchData, isError, error } = useFetch({
    url: USER_TYPE_COMPANY + JOB_APPLICANTS + INTERVIEW + `/${applicant_id}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const {
    data: interviewDatesData,
    fetchData: fetchInterviewDates,
    isLoading: isGettingDatesData,
    isError: isErrorInDatesData,
  } = useFetch({
    url: USER_TYPE_MEMBER + `/${JOBS}` + `/${applicant_id}` + INTERVIEWS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (!!interview_id) runGetInterviewDates();
    else runFetchData();
  }, [interview_id]);

  const runFetchData = async () => {
    if (!interview_id) {
      const newData = await fetchData();
      setInterviewData(newData);
    }
  };

  const runGetInterviewDates = async () => {
    const newData = await getInterviewDates();
    restructureData(newData);
  };

  const getInterviewDates = async () => {
    const newData = await fetchInterviewDates({
      overrideUrl:
        USER_TYPE_MEMBER +
        `/${JOBS}` +
        `/${applicant_id}` +
        `${APPLICANT}` +
        `/${interview_id}` +
        INTERVIEWS,
    });
    return newData;
  };

  const restructureData = (data) => {
    const restructuredData = {
      type: data?.[0]?.primary?.type,
      venue_address: data?.[0]?.primary?.venue,
      primary_schedule: data?.[0]?.primary?.schedule,
      remote_meeting_link: data?.[0]?.primary?.meeting_link,
      alternate_type: data?.[0]?.alternate?.type,
      alternate_venue_address: data?.[0]?.alternate?.venue,
      alternate_schedule: data?.[0]?.alternate?.schedule,
      alternate_remote_meeting_link: data?.[0]?.alternate?.meeting_link,
    };
    setInterviewData({ ...restructuredData });
    setData({
      type: data?.[0]?.primary?.type,
      alternate_type: data?.[0]?.alternate?.type,
    });
  };

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

  const currentPrimaryType = data?.type.toLowerCase();
  const currentAlternateType = data?.alternate_type.toLowerCase();

  const currentPrimaryDetails =
    currentPrimaryType === "face-to-face"
      ? primaryFaceToFace
      : currentPrimaryType === "remote"
      ? primaryRemoteDetails
      : primaryTelephonicDetails;

  const currentAlternateDetails =
    currentAlternateType === "face-to-face"
      ? alternateFaceToFace
      : currentAlternateType === "remote"
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
          label === "link" && value !== "-" ? (
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
        style={{
          ...getModalInnerContainerHeight(!!interview_id ? 0.4 : 0.6),
          ...styles.marginTop,
        }}
      >
        {(isLoading || isGettingDatesData) && !isError && <LoadingScreen />}
        {!isLoading && !isGettingDatesData && !isError && (
          <>
            {!interview_id && (
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
              </>
            )}
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
                    value: !!data?.type && formatText(currentPrimaryType),
                    isMandatory: true,
                  })}
                </View>
              }
              bottomSection={renderInterviewDetails(
                currentPrimaryDetails,
                true
              )}
            />
            <View style={commonStyles.horizontalLine} />
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
                    value:
                      !!data?.alternate_type &&
                      formatText(currentAlternateType),
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
            onRetry={() => (!!interview_id ? getInterviewDates() : fetchData())}
          />
        )}
      </ScrollView>
    </CustomModal>
  );
};

ViewInterviewDetails.defaultProps = {
  onClose: () => {},
  interview_id: null,
};

ViewInterviewDetails.propTypes = {
  onClose: PropTypes.func,
  interview_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViewInterviewDetails;
