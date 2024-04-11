import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import EducationDetailsUI from "./EducationDetailsUI";
import useFetch from "../../hooks/useFetch";
import { usePut } from "../../hooks/useApiRequest";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import {
  ACADEMICS,
  MEMBERS,
  MEMBER_CA_JOB_PROFILE_EDUCATION,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { useEducationDetails } from "./Controllers/useEducationDetails";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";

const EducationDetails = ({ isEditable = true, handleEdit }) => {
  const { id } = useParams();
  const { isCompany, currentModule } = useGetCurrentUser();

  const {
    data: applicantAcadimicsData,
    isLoading: isGettingapplicantAcadimicsDataLoading,
    error: errorWhileGettingapplicantAcadimicsData,
    fetchData: fetchingApplicantAcadimicsData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY + `/${currentModule}` + MEMBERS + `/${id}` + ACADEMICS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: educationData,
    isLoading: isGettingEducationData,
    error: errorWhileGettingEducationData,
    fetchData: fetchingEducationData,
  } = useFetch({
    url: `${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (currentModule) {
      if (isCompany) {
        fetchingApplicantAcadimicsData({});
      } else {
        fetchingEducationData({});
      }
    }
  }, [currentModule]);

  const data = isCompany ? applicantAcadimicsData : educationData;
  const isLoading = isCompany
    ? isGettingapplicantAcadimicsDataLoading
    : isGettingEducationData;
  const errorWhileFetching = isCompany
    ? errorWhileGettingapplicantAcadimicsData
    : errorWhileGettingEducationData;

  const {
    makeRequest: handleUpdate,
    isLoading: isUpdatingEducationData,
    error,
    setError,
  } = usePut({
    url: `${MEMBER_CA_JOB_PROFILE_EDUCATION}`,
  });

  const getData = (data) => {
    return data && Object.keys(data).length
      ? {
          has_education: data["Class 12"]?.has_education,
          examination_name: data["Class 12"]?.exam_name,
          status: data["Class 12"]?.exam_status,
          board: data["Class 12"]?.exam_board,
          year: data["Class 12"]?.passing_year,
          rank_medal: data["Class 12"]?.passing_rank,
          mark_in_percent: data["Class 12"]?.passing_percentage,

          higher_secondary_has_education: data["Class 10"]?.has_education,
          higher_secondary: data["Class 10"]?.exam_name,
          higher_secondary_status: data["Class 10"]?.exam_status,
          higher_board: data["Class 10"]?.exam_board,
          higher_secondary_year: data["Class 10"]?.passing_year,
          higher_secondary_rank_medal: data["Class 10"]?.passing_rank,
          higher_secondary_mark_in_percent:
            data["Class 10"]?.passing_percentage,

          graduation: data["Graduation"]?.has_education,
          graduation_examination_name: data["Graduation"]?.exam_name,
          graduation_status: data["Graduation"]?.exam_status,
          graduation_board: data["Graduation"]?.exam_board,
          graduation_year: data["Graduation"]?.passing_year,
          graduation_rank_medal: data["Graduation"]?.passing_rank,
          graduation_mark_in_percent: data["Graduation"]?.passing_percentage,

          post_graduation: data["Post Graduation"]?.has_education,
          post_graduation_examination_name: data["Post Graduation"]?.exam_name,
          post_graduation__status: data["Post Graduation"]?.exam_status,
          post_graduation_board: data["Post Graduation"]?.exam_board,
          post_graduation_year: data["Post Graduation"]?.passing_year,
          post_graduation_rank_medal: data["Post Graduation"]?.passing_rank,
          post_graduation_mark_in_percent:
            data["Post Graduation"]?.passing_percentage,
        }
      : {};
  };

  const [state, setState] = useState(getData(data));

  const {
    isValidAllFields,
    education_detail,
    higher_secondary_detail,
    graduation_detail,
    post_graduation_detail,
    handleEducationDetailBlur,
    handleHigherSecondaryDetailBlur,
    handleGraduationDetailBlur,
    handlePostGraduationDetailBlur,
  } = useEducationDetails({
    state,
    isEditable,
  });

  useEffect(() => {
    if (data !== null && Object.keys(data).length) {
      setState(getData(data));
    }
  }, [data]);

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeValue = (details) => (label, value) => {
    const { key } = findKeyByLabel(label, details);

    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDismissToast = () => {
    setError("");
  };

  const handleSave = () => {
    let payload = {
      "Class 10": {
        has_education: state?.higher_secondary_has_education,
        exam_board: state?.higher_board,
        exam_name: state?.higher_secondary,
        passing_percentage: state?.higher_secondary_mark_in_percent,
        passing_rank: state?.higher_secondary_rank_medal,
        passing_year: state?.higher_secondary_year,
        exam_status: state?.higher_secondary_status,
      },
      "Class 12": {
        has_education: state?.has_education,
        exam_board: state?.board,
        exam_name: state?.examination_name,
        passing_percentage: state?.mark_in_percent,
        passing_rank: state?.rank_medal,
        passing_year: state?.year,
        exam_status: state?.status,
      },
      Graduation: {
        has_education: state?.graduation,
        exam_board: state?.graduation_board,
        exam_name: state?.graduation_examination_name,
        passing_percentage: state?.graduation_mark_in_percent,
        passing_rank: state?.graduation_rank_medal,
        passing_year: state?.graduation_year,
        exam_status: state?.graduation_status,
      },
      "Post Graduation": {
        has_education: state?.post_graduation,
        exam_board: state?.post_graduation_board,
        exam_name: state?.post_graduation_examination_name,
        passing_percentage: state?.post_graduation_mark_in_percent,
        passing_rank: state?.post_graduation_rank_medal,
        passing_year: state?.post_graduation_year,
        exam_status: state?.post_graduation__status,
      },
    };
    handleUpdate({
      body: payload,
      onSuccessCallback: () => {
        handleEdit(false);
      },
    });
  };

  return isLoading ? (
    <LoadingScreen />
  ) : errorWhileFetching ? (
    <ErrorComponent
      errorMsg={
        errorWhileFetching?.data?.message ||
        GENERIC_GET_API_FAILED_ERROR_MESSAGE
      }
    />
  ) : (
    <>
      {!!error && (
        <ToastComponent toastMessage={error} onDismiss={handleDismissToast} />
      )}
      <EducationDetailsUI
        education_detail={education_detail}
        higher_secondary_detail={higher_secondary_detail}
        graduation_detail={graduation_detail}
        post_graduation_detail={post_graduation_detail}
        onChangeValue={onChangeValue}
        handleEducationDetailBlur={handleEducationDetailBlur}
        handleHigherSecondaryDetailBlur={handleHigherSecondaryDetailBlur}
        handleGraduationDetailBlur={handleGraduationDetailBlur}
        handlePostGraduationDetailBlur={handlePostGraduationDetailBlur}
        isValidAllFields={isValidAllFields}
        isLoading={isUpdatingEducationData}
        isEditable={isEditable}
        onClickSave={handleSave}
        onClickCancel={() => {
          setState(getData(data));
          handleEdit(false);
        }}
      />
    </>
  );
};

export default EducationDetails;
