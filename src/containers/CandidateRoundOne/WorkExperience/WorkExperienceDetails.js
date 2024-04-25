//Libraries
import React, { useImperativeHandle, useRef, useState } from "react";
import { useParams } from "react-router";
//UI & Styling
import WorkExperienceDetailsTemplate from "./WorkExperienceDetailsTemplate";
import useExamDetailsAPI from "../../../services/apiServices/hooks/CandidateRoundeOne/useExamDetailsAPI";
import useFetch from "../../../hooks/useFetch";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import MultiRow from "../../../core/layouts/MultiRow";
import styles from "./WorkExperienceDetails.style";
import { View } from "@unthinkable/react-core-components";
import {
  ROUNDS,
  MEMBER_WORK_EXPERIENCE,
  USER_TYPE_MEMBER,
} from "../../../services/apiServices/apiEndPoint";
import CurrentStatusDetailsTemplate from "./CurrentStatusDetailsTemplate";

const WorkExperienceDetails = (
  { intl, isWebView, isViewMode = false, handleSave = () => {} },
  ref
) => {
  const { currentModule } = useGetCurrentUser();
  const id = useParams();
  const {
    fetchData: getWorkExperience,
    data: workExperienceData,
    isLoading: isGettingWorkExperience,
    error: errorWhileGettingWorkExperience,
  } = useFetch({
    url: `${USER_TYPE_MEMBER}/${currentModule}${ROUNDS}/${id}${MEMBER_WORK_EXPERIENCE}`,
  });

  const [
    isWorkExperienceDetailsCompleted,
    setIsWorkExperienceDetailsCompleted,
  ] = useState(false);
  const [isCurrentStatusCompleted, setIsCurrentStatusCompleted] =
    useState(false);

  //refs
  const WorkExpDetailsTemplateRef = useRef();
  const CurrentStatusDetailsTemplateRef = useRef();
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
      const WorkExpAddData = WorkExpDetailsTemplateRef?.current?.getState();
      const CurrentStatusData =
        CurrentStatusDetailsTemplateRef?.current?.getState();
      return {
        has_work_experience: WorkExpAddData[0]?.has_work_experience ? 0 : 1,
        work_experiences: WorkExpAddData[0]?.has_work_experience
          ? []
          : WorkExpAddData,
        current_status: CurrentStatusData,
      };
    },
  }));

  const handleWorkExperienceDetailsFields = (val) => {
    if (val !== isWorkExperienceDetailsCompleted) {
      setIsWorkExperienceDetailsCompleted(val);
      handleSave(val && isCurrentStatusCompleted);
    }
  };

  const handleCurrentStatusFields = (val) => {
    if (val !== isCurrentStatusCompleted) {
      setIsCurrentStatusCompleted(val);
      handleSave(val && isWorkExperienceDetailsCompleted);
    }
  };

  const edDetailsConfig = [
    {
      content: (
        <WorkExperienceDetailsTemplate
          ref={WorkExpDetailsTemplateRef}
          intl={intl}
          isWebView={isWebView}
          isViewMode={isViewMode}
          onValidationChange={handleWorkExperienceDetailsFields}
        />
      ),
    },
    {
      content: (
        <CurrentStatusDetailsTemplate
          ref={CurrentStatusDetailsTemplateRef}
          intl={intl}
          isWebView={isWebView}
          isViewMode={isViewMode}
          onValidationChange={handleCurrentStatusFields}
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

export default React.forwardRef(WorkExperienceDetails);
