//Libraries
import React, { useImperativeHandle, useRef, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useTheme } from "@unthinkable/react-theme";
import { useLocation } from "../../../routes";
//UI & Styling
import MultiRow from "../../../core/layouts/MultiRow";
import getStyles from "./JobPreferenceDetails.style";
import { View } from "@unthinkable/react-core-components";
import useFetch from "../../../hooks/useFetch";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
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
  const { currentModule } = useGetCurrentUser();
  const { id } = useParams();
  const location = useLocation();
  const hasRoundTwo = location?.pathname.includes("round-two");
  const hasRoundOne = location?.pathname.includes("round-one");

  const theme = useTheme();
  const styles = getStyles(theme);

  const [isPreferenceRegardingCompleted, setIsPreferenceRegardingCompleted] =
    useState(false);
  const [isCitySelectionCompleted, setIsCitySelectionCompleted] =
    useState(false);
  const [isMockInterviewCompleted, setIsMockInterviewCompleted] = useState(
    hasRoundOne ? false : true
  );
  const [isCVUploadCompleted, setIsCVUploadCompleted] = useState(false);

  const {
    fetchData: getJobPreference,
    data: jobPreferenceData,
    isLoading: isGettingJobPreference,
    error: errorWhileGettingJobPreference,
  } = useFetch({
    url: `${USER_TYPE_MEMBER}/${currentModule}${ROUNDS}/${id}${JOB_PREFERENCES}`,
  });

  const { fetchData: fetchCentres, data: interviewCentreData } = useFetch({
    url: `${USER_TYPE_MEMBER}/${currentModule}${ROUNDS}/${id}/centres`,
  });

  const { fetchData: fetchProgram, data: programeData } = useFetch({
    url: `core/${currentModule}${ROUNDS}/${id}/orientation-centres`,
  });

  const { fetchData: fetchMockCentres, data: mockCenters } = useFetch({
    url: `core/${currentModule}${ROUNDS}/${id}/mock-interviews`,
  });

  const { fetchData: fetchSlots, data: slotsData } = useFetch({
    url: `core/${currentModule}/mock-interviews`,
  });

  useEffect(() => {
    fetchCentres();
    fetchProgram();
    fetchMockCentres();
  }, []);

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
        ...mockInterviewRefData,
        ...citySelectionData,
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

  const handleMockCentreSelection = (id) => {
    fetchSlots({
      overrideUrl: `core/${currentModule}/mock-interviews/${id}/interview-dates`,
    });
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
          interviewCentreData={interviewCentreData}
          programeData={programeData}
          hasRoundOne={hasRoundOne}
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
          mockCenters={mockCenters}
          slotsData={slotsData}
          handleMockCentreSelection={handleMockCentreSelection}
          hasRoundOne={hasRoundOne}
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
