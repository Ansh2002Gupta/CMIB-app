import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import { View } from "@unthinkable/react-core-components";

import { TwoColumn } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import JobProfileTab from "../JobProfile";
import LoadingScreen from "../../components/LoadingScreen";
import useIsWebView from "../../hooks/useIsWebView";
import ScheduleInterviewModal from "../../containers/ScheduleInterviewModal/ScheduleInterviewModal";
import useFetch from "../../hooks/useFetch";
import { usePost } from "../../hooks/useApiRequest";
import {
  JOBS,
  JOB_APPLICANT,
  MARK_PREFER,
  QUESTIONNAIRE,
  USER_TYPE_CANDIDATES,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { getDate } from "../../utils/util";
import images from "../../images";
import styles from "./JobApplicantsDetails.style";
import { STATUS_ENUM } from "../../constants/constants";

const RenderUserInfo = ({ label, value, isWebView }) => {
  return (
    <View
      style={isWebView ? styles.userInfoContainer : styles.userInfoContainerMob}
    >
      <CommonText customTextStyle={styles.keyHeading}>
        {label}&nbsp;&#58;&nbsp;
      </CommonText>
      <CommonText fontWeight={"600"} customTextStyle={styles.valueStyle}>
        {value}
      </CommonText>
    </View>
  );
};

const JobApplicantsDetails = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const { job_id, id } = useParams();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [profileData, setProfileData] = useState({});

  const {
    isLoading: isProfileDataLoading,
    fetchData: fetchProfileData,
    isError: isErrorWhileFetching,
    error: errorWhileFetching,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${JOBS}` +
      `/${job_id}` +
      `${JOB_APPLICANT}` +
      `/${id}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { makeRequest: handleSave, isLoading: isCandidateUserSaving } = usePost(
    {
      url:
        USER_TYPE_COMPANY + `/${USER_TYPE_CANDIDATES}` + `/${id}` + MARK_PREFER,
    }
  );

  useEffect(async () => {
    const newdata = await fetchProfileData();
    setProfileData(newdata[0]);
  }, []);

  const onSaveClick = () => {
    handleSave({
      onSuccessCallback: () => {
        setProfileData((prev) => ({
          ...prev,
          is_saved: true,
        }));
      },
    });
  };
  const onScheduleInterviewClick = () => {
    setShowScheduleModal(true);
  };

  const questionnaireURL =
    USER_TYPE_COMPANY + `/${JOBS}` + `/${job_id}` + QUESTIONNAIRE;

  const buttonSection = (
    intl,
    isWebView,
    onSaveClick,
    onScheduleInterviewClick
  ) => {
    const isSaved = profileData?.is_saved;
    const isEditScheduleInterview =
      profileData?.status?.trim().toLowerCase() ===
      STATUS_ENUM?.INTERVIEW_SCHEDULED?.trim()?.toLowerCase();
    return (
      <View
        style={isWebView ? styles.buttonContainer : styles.MobButtonContainer}
      >
        <CustomButton
          iconLeft={{
            leftIconSource: isWebView && images.iconSavedJob,
          }}
          onPress={onSaveClick}
          disabled={isSaved}
          isLoading={isCandidateUserSaving}
          disabledStyle={styles.savedButtonContainer}
        >
          <CommonText customTextStyle={styles.valueStyle}>
            {!isSaved
              ? intl.formatMessage({ id: "label.save_applicant_details" })
              : intl.formatMessage({ id: "label.saved_applicant" })}
          </CommonText>
        </CustomButton>
        {(profileData?.status?.trim().toLowerCase() ===
          STATUS_ENUM?.SHORTLISTED?.trim().toLowerCase() ||
          profileData?.status?.trim().toLowerCase() ===
            STATUS_ENUM?.INTERVIEW_SCHEDULED?.trim().toLowerCase()) && (
          <CustomButton
            withGreenBackground
            iconLeft={{
              leftIconSource: images.iconCalendarWhite,
            }}
            onPress={onScheduleInterviewClick}
            style={isWebView ? styles.greenButton : {}}
            isLeftIconNotSvg={false}
          >
            <CommonText customTextStyle={styles.greenButtonText}>
              {isEditScheduleInterview
                ? intl.formatMessage({ id: "label.edit_schedule_interview" })
                : intl.formatMessage({ id: "label.schedule_interview" })}
            </CommonText>
          </CustomButton>
        )}
      </View>
    );
  };

  const UserDetails = ({ intl, isWebView, profileData }) => {
    return (
      <View style={styles.shortProfile}>
        <View style={styles.detailsSection}>
          <View style={styles.rowStyle}>
            <RenderUserInfo
              label={intl.formatMessage({ id: "label.applicant_name" })}
              value={profileData?.name}
              isWebView={isWebView}
            />
            {isWebView && <View style={styles.seperator} />}
            <RenderUserInfo
              label={intl.formatMessage({
                id: "label.applicant_id",
              })}
              value={profileData?.applicant_id}
              isWebView={isWebView}
            />
          </View>
          <View style={styles.rowStyle}>
            <RenderUserInfo
              label={intl.formatMessage({ id: "label.updated_at" })}
              value={getDate(profileData?.updated_at)}
              isWebView={isWebView}
            />
            {isWebView && <View style={styles.seperator} />}
            <RenderUserInfo
              label={intl.formatMessage({ id: "label.status" })}
              value={profileData?.status}
              isWebView={isWebView}
            />
          </View>
        </View>
        <View>
          {isWebView &&
            buttonSection(
              intl,
              isWebView,
              onSaveClick,
              onScheduleInterviewClick
            )}
        </View>
      </View>
    );
  };

  return (
    <>
      {isProfileDataLoading && !isErrorWhileFetching && <LoadingScreen />}
      {!isProfileDataLoading && !isErrorWhileFetching && (
        <JobProfileTab
          renderHeader={() => (
            <View style={isWebView ? styles.headerContainer : {}}>
              <CommonText
                fontWeight={"600"}
                customTextStyle={styles.headerText}
              >
                {intl.formatMessage({ id: "label.applicant_details" })}
              </CommonText>
              <UserDetails
                intl={intl}
                isWebView={isWebView}
                profileData={profileData}
              />
            </View>
          )}
          isQuestionaireRequired
          renderFooter={() =>
            !isWebView &&
            buttonSection(intl, false, onSaveClick, onScheduleInterviewClick)
          }
          questionaireURL={questionnaireURL}
        />
      )}
      {!isProfileDataLoading && isErrorWhileFetching && (
        <ErrorComponent
          errorMsg={errorWhileFetching?.data?.message}
          onRetry={() => fetchProfileData({})}
        />
      )}
      {showScheduleModal && (
        <ScheduleInterviewModal
          applicant_id={profileData?.id}
          interviewId={profileData?.interview_id}
          onClose={() => {
            setShowScheduleModal(false);
          }}
        />
      )}
    </>
  );
};

export default JobApplicantsDetails;
