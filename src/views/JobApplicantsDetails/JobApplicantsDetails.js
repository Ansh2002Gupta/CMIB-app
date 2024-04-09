import React from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import { View } from "@unthinkable/react-core-components";

import { TwoColumn } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
import JobProfileTab from "../JobProfile";
import useIsWebView from "../../hooks/useIsWebView";
import useFetch from "../../hooks/useFetch";
import { usePost } from "../../hooks/useApiRequest";
import {
  JOBS,
  JOB_APPLICANTS,
  MARK_PREFER,
  USER_TYPE_CANDIDATES,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import images from "../../images";
import styles from "./JobApplicantsDetails.style";

const buttonSection = (
  intl,
  isWebView,
  onSaveClick,
  onScheduleInterviewClick
) => {
  return (
    <View
      style={isWebView ? styles.buttonContainer : styles.MobButtonContainer}
    >
      <CustomButton
        iconLeft={{
          leftIconSource: images.iconSavedJob,
        }}
        onPress={onSaveClick}
      >
        <CommonText customTextStyle={styles.valueStyle}>
          {isWebView
            ? intl.formatMessage({ id: "label.save_applicant_details" })
            : "Save Applicant "}
        </CommonText>
      </CustomButton>
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
          {intl.formatMessage({ id: "label.schedule_interview" })}
        </CommonText>
      </CustomButton>
    </View>
  );
};

const RenderUserInfo = ({ label, value }) => {
  return (
    <View style={styles.userInfoContainer}>
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

  // Will uncomment when we get job id from applicant list

  //   const { data, isLoading, fetchData } = useFetch({
  //     url: USER_TYPE_COMPANY + JOBS + `/${job_id}` + JOB_APPLICANTS + `/${id}`,
  //   });

  const { makeRequest: handleSave, isLoading: isCandidateUserSaving } = usePost(
    {
      url: USER_TYPE_CANDIDATES + `/${id}` + MARK_PREFER,
    }
  );

  const onSaveClick = () => {
    //  GIVING 404
    handleSave({
      onSuccessCallback: () => {
        console.log("saved");
      },
    });
  };
  const onScheduleInterviewClick = () => {};

  const UserDetails = ({ intl, isWebView }) => {
    return (
      <TwoColumn
        isLeftFillSpace
        isRightFillSpace
        leftSection={
          <>
            <View style={styles.rowStyle}>
              <RenderUserInfo
                label={intl.formatMessage({ id: "label.applicant_name" })}
                value="Nikhil Sharma"
              />
              <View style={styles.seperator} />
              <RenderUserInfo
                label={intl.formatMessage({
                  id: "label.applicant_id",
                })}
                value="NRO01233"
              />
            </View>
            <View style={styles.rowStyle}>
              <RenderUserInfo
                label={intl.formatMessage({ id: "label.updated_at" })}
                value="10/11/2023"
              />
              <View style={styles.seperator} />
              <RenderUserInfo
                label={intl.formatMessage({ id: "label.status" })}
                value="Shortlisted"
              />
            </View>
          </>
        }
        rightSection={
          isWebView &&
          buttonSection(intl, isWebView, onSaveClick, onScheduleInterviewClick)
        }
      />
    );
  };

  return (
    <>
      <JobProfileTab
        renderHeader={() => (
          <View style={isWebView ? styles.headerContainer : {}}>
            <CommonText fontWeight={"600"} customTextStyle={styles.headerText}>
              {intl.formatMessage({ id: "label.applicant_details" })}
            </CommonText>
            <UserDetails intl={intl} isWebView={isWebView} />
          </View>
        )}
        isQuestionaireRequired
        questionaireData={questionArray}
        renderFooter={() =>
          !isWebView &&
          buttonSection(intl, false, onSaveClick, onScheduleInterviewClick)
        }
        questionaireURL={""}
      />
    </>
  );
};

export default JobApplicantsDetails;

// TODO : will have to integrate questionnaire API
const questionArray = [
  {
    id: 252,
    question: "THis is a new question",
    type: "text",
    mandatory: 0,
    company_id: 115,
    created_at: "2024-04-04T07:40:10.000000Z",
    updated_at: "2024-04-04T07:40:10.000000Z",
    deleted_at: null,
    job_id: 188,
    question_options: null,
    question_order: 1,
    typeofQuestion: "Text Question",
    isMandatory: 0,
  },
  {
    id: 253,
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "text",
    mandatory: 0,
    company_id: 115,
    created_at: "2024-04-04T07:40:10.000000Z",
    updated_at: "2024-04-04T07:40:10.000000Z",
    deleted_at: null,
    job_id: 188,
    question_options: [
      {
        label: "one",
        value: "one",
      },
      {
        label: "two",
        value: "two",
      },
    ],
    question_order: 3,
    typeofQuestion: "mulit-select-drop-down",
    isMandatory: 0,
  },
];
