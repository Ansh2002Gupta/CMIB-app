//Libraries
import React, { useImperativeHandle, useRef, useState } from "react";
import { useParams } from "react-router";
//UI & Styling
import MultiRow from "../../../core/layouts/MultiRow";
import styles from "./JobPreferenceDetails.style";
import { View } from "@unthinkable/react-core-components";
import useFetch from "../../../hooks/useFetch";
import useGetUserDetails from "../../../services/apiServices/hooks/UserProfile/useGetUserDetails";
import {
  ROUNDS,
  JOB_PREFERENCES,
  USER_TYPE_MEMBER,
} from "../../../services/apiServices/apiEndPoint";
import PreferenceRegarding from "./PreferenceRegarding";
import CitySelection from "./CitySelection";
import MockInterview from "./MockInterview";
import CvUpload from "./CvUpload";

const JobPreferenceDetails = (
  { intl, isWebView, isViewMode = false, handleSave = () => {} },
  ref
) => {
  //refs
  const preferenceRegardingRef = useRef();
  const citySelectionRef = useRef();
  const mockInterviewRef = useRef();
  const cvUploadRef = useRef();
  const { currentModules } = useGetUserDetails();
  const { id } = useParams();

  const [isPreferenceRegardingCompleted, setIsPreferenceRegardingCompleted] =
    useState(false);
  const [isCitySelectionCompleted, setIsCitySelectionCompleted] =
    useState(false);
  const [isMockInterviewCompleted, setIsMockInterviewCompleted] =
    useState(false);
  const [isCVUploadCompleted, setIsCVUploadCompleted] = useState(false);

  const {
    fetchData: getJobPreference,
    data: jobPreferenceData,
    isLoading: isGettingJobPreference,
    error: errorWhileGettingJobPreference,
  } = useFetch({
    url: `${USER_TYPE_MEMBER}/${currentModules}${ROUNDS}/${id}${JOB_PREFERENCES}`,
  });
  // const { handleExamDetails} = useExamDetailsAPI();

  // useEffect(() => {
  //     handleExamDetails ({
  //       successCallback: (examDetails) => {
  //         updateExamDetails(examDetails);
  //       },
  //       errorCallback: () => {},
  //     });
  //   }, []);

  useImperativeHandle(ref, () => ({
    getAllData: () => {
      const preferenceRegardingData =
        preferenceRegardingRef?.current?.getState();
      const citySelectionData = citySelectionRef?.current?.getState();
      const mockInterviewRefData = mockInterviewRef?.current?.getState();
      const cvUploadRefData = cvUploadRef?.current?.getState();
      return {
        ...preferenceRegardingData,
        ...cvUploadRefData,
        mock_interview_date: {
          mock_interview_id: 1,
          name: "Centre XX",
          schedule_date: "2024-11-12",
          start_time: "09:30:00",
          end_time: "10:00:00",
        },
        campus_interview: citySelectionData,
        orientation_centre: citySelectionData,
      };
    },
  }));

  const handlePreferenceRegardingFields = (val) => {
    if (val !== isPreferenceRegardingCompleted) {
      setIsPreferenceRegardingCompleted(val);
      handleSave(
        val &&
          isCitySelectionCompleted &&
          isCVUploadCompleted &&
          isMockInterviewCompleted
      );
    }
  };
  const handleCitySelectionFields = (val) => {
    if (val !== isCitySelectionCompleted) {
      setIsCitySelectionCompleted(val);
      handleSave(
        val &&
          isPreferenceRegardingCompleted &&
          isCVUploadCompleted &&
          isMockInterviewCompleted
      );
    }
  };
  const handleMockInterviewFields = (val) => {
    if (val !== isMockInterviewCompleted) {
      setIsMockInterviewCompleted(val);
      handleSave(
        val &&
          isPreferenceRegardingCompleted &&
          isCitySelectionCompleted &&
          isCVUploadCompleted
      );
    }
  };
  const handleCVUploadRefFields = (val) => {
    if (val !== isCVUploadCompleted) {
      setIsCVUploadCompleted(val);
      handleSave(
        val &&
          isPreferenceRegardingCompleted &&
          isCitySelectionCompleted &&
          isMockInterviewCompleted
      );
    }
  };

  const edDetailsConfig = [
    {
      content: (
        <PreferenceRegarding
          ref={preferenceRegardingRef}
          intl={intl}
          isWebView={isWebView}
          isViewMode={isViewMode}
          onValidationChange={handlePreferenceRegardingFields}
        />
      ),
    },
    {
      content: (
        <CitySelection
          ref={citySelectionRef}
          intl={intl}
          isWebView={isWebView}
          isViewMode={isViewMode}
          onValidationChange={handleCitySelectionFields}
        />
      ),
    },
    {
      content: (
        <MockInterview
          ref={mockInterviewRef}
          intl={intl}
          isWebView={isWebView}
          isViewMode={isViewMode}
          onValidationChange={handleMockInterviewFields}
        />
      ),
    },
    {
      content: (
        <CvUpload
          ref={cvUploadRef}
          intl={intl}
          isWebView={isWebView}
          isViewMode={isViewMode}
          onValidationChange={handleCVUploadRefFields}
        />
      ),
    },
  ];

  return (
    <View style={styles.main}>
      <MultiRow rows={edDetailsConfig} style={styles.mainContainer} />
    </View>
  );
};

export default React.forwardRef(JobPreferenceDetails);
