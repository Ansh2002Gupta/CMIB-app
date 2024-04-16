import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useFetch from "../../hooks/useFetch";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import WorkExperienceTemplate from "./WorkExperienceTemplate";
import {
  FUNCTION_AREAS,
  INDUSTRY_TYPES,
  MEMBERS,
  MEMBER_CA_JOB_PROFILE_WORK_EXPERIENCE,
  USER_TYPE_COMPANY,
  WORK_EXPERIENCE,
} from "../../services/apiServices/apiEndPoint";
import {
  doHaveWorkExperience,
  useWorkExperience,
} from "./controller/useWorkExperience";
import { formatDate } from "../../utils/util";
import {
  validateCurrentStatus,
  validateFields,
} from "./controller/WorkExperienceUtils";

const workExperienceKeys = () => ({
  haveWorkExperience: null,
  name_of_organisation: "",
  designation: "",
  location: "",
  from_date: "",
  to_date: "",
  emp_strength: "",
  gross_salary_drawn: "",
  areas_of_work: [],
});

const WorkExperience = ({ isEditable, handleEdit, onSaveSuccessfull }) => {
  const { id } = useParams();
  const { isCompany, currentModule } = useGetCurrentUser();

  const {
    data: applicantWorkExperienceData,
    isLoading: isGettingApplicantWorkExperienceDataLoading,
    error: errorWhileGettingApplicantWorkExperienceData,
    fetchData: fetchingApplicantWorkExperienceData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${currentModule}` +
      MEMBERS +
      `/${id}` +
      WORK_EXPERIENCE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: workexperinceData,
    fetchData,
    isLoading: workExperienceDataIsLoading,
    error: erroWhileFetching,
  } = useFetch({
    url: MEMBER_CA_JOB_PROFILE_WORK_EXPERIENCE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: functionalAreas,
    isLoading: functionalAreasIsLoading,
    error: functionalAreasError,
    fetchData: fetchingFunctionalAreas,
  } = useFetch({
    url: FUNCTION_AREAS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: industryTypes,
    isLoading: industryTypesIsLoading,
    error: industryTypesError,
    fetchData: fetchingIndustryTypes,
  } = useFetch({
    url: INDUSTRY_TYPES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(async () => {
    if (currentModule) {
      if (isCompany) {
        fetchingApplicantWorkExperienceData({});
      } else {
        await fetchingFunctionalAreas();
        await fetchingIndustryTypes();
        await fetchData({});
      }
    }
  }, [currentModule]);

  const data = isCompany ? applicantWorkExperienceData : workexperinceData;
  const workExperienceIsLoading = isCompany
    ? isGettingApplicantWorkExperienceDataLoading
    : workExperienceDataIsLoading;
  const workExperienceError = isCompany
    ? errorWhileGettingApplicantWorkExperienceData
    : erroWhileFetching;

  const { handleUpdate, isError, isLoading, error, setError } =
    useUpdateService(MEMBER_CA_JOB_PROFILE_WORK_EXPERIENCE);

  const [formFieldsError, setFormFieldsError] = useState([]);
  const [currentStatusError, setCurrentStatusError] = useState({});

  const [state, setState] = useState(
    data !== null && Object.keys(data)?.length ? {} : {}
  );

  const {
    workExperiences,
    setWorkExperiences,
    current_status,
    setCurrentStatusState,
    handleCurrentStatusDetailBlur,
    isValidAllFields,
    initailWorkExperience,
  } = useWorkExperience({
    state: state,
    formError: formFieldsError,
    currentStatusError,
    isEditable,
    functionalAreas,
    industryTypes,
  });

  const handleWorkExperienceDetailBlur = (index) => (key) => {
    validateFields(
      workExperiences,
      setWorkExperiences,
      formFieldsError,
      setFormFieldsError,
      key,
      index
    );
  };

  let showOtherFields = doHaveWorkExperience(state);

  const updateFormattedData = (workExpData) => {
    let workExperienceData =
      workExpData.work_experiences?.length > 0
        ? workExpData.work_experiences.map((v, index) => {
            if (index === 0) {
              if (v.has_work_experience === "false") {
                return { ...workExperienceKeys(), haveWorkExperience: "No" };
              } else {
                return { haveWorkExperience: "Yes", ...v };
              }
            }
            return v;
          })
        : [{ ...workExperienceKeys() }];

    setFormFieldsError([
      new Array(workExperienceData?.length).fill(0).map(() => ({})),
    ]);

    setState({
      ...workExpData,
      work_experiences: workExperienceData,
    });
  };

  useEffect(() => {
    if (data !== null && Object.keys(data)?.length) {
      updateFormattedData(data);
    }
  }, [data]);

  const handleAreasOfInterest = (index) => (value, detail) => {
    const valIndex = state.work_experiences[index]?.[detail.key].indexOf(value);
    if (valIndex > -1) {
      state.work_experiences[index]?.[detail.key].splice(valIndex, 1);
    } else {
      state.work_experiences[index]?.[detail.key].push(value);
    }
    setState({ ...state, work_experiences: state.work_experiences });
  };

  const handleCurrentStatus = (value, detail) => {
    const valIndex = state?.[detail.key].indexOf(value);
    if (valIndex > -1) {
      state?.[detail.key].splice(valIndex, 1);
    } else {
      state[detail.key] = [...(state?.[detail?.key] ?? []), value];
    }

    setCurrentStatusError({ ...currentStatusError, [`${detail.key}`]: null });
    setState({ ...state });
  };

  const onChangeValue_workExperiences = (details, index) => (label, value) => {
    const { key } = findKeyByLabel(label, initailWorkExperience);

    formFieldsError[index] = { ...formFieldsError[index], [key]: null };
    setFormFieldsError([...formFieldsError]);

    let toDate = state.work_experiences[index]?.to_date;
    //if from_date is greater then to_date then remove to_date
    if (toDate && key === "from_date" && new Date(value) > new Date(toDate)) {
      state.work_experiences[index] = {
        ...state.work_experiences[index],
        to_date: "",
      };
    }

    state.work_experiences[index] = {
      ...state.work_experiences[index],
      [key]: value,
    };
    setState({ ...state });
  };

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeValue_currentStatus = (details) => (label, value, index) => {
    const { key } = findKeyByLabel(label, details[index]);
    setState({ ...state, [key]: value });
  };

  const addMoreWorkExperience = () => {
    state.work_experiences.push({ ...workExperienceKeys() });
    setState({
      ...state,
    });
  };

  const handleCancelPress = (index) => {
    state.work_experiences.splice(index, 1);
    setState({ ...state });

    formFieldsError.splice(index, 1);
    setFormFieldsError([...formFieldsError]);
  };

  const handleSave = () => {
    //check both work experience and current status validation
    if (
      validateFields(
        workExperiences,
        setWorkExperiences,
        formFieldsError,
        setFormFieldsError
      ) &&
      validateCurrentStatus(
        current_status,
        setCurrentStatusState,
        currentStatusError,
        setCurrentStatusError
      )
    ) {
      let body = { ...state };
      body.work_experiences = showOtherFields ? body.work_experiences : null;

      if (body.work_experiences?.length > 0) {
        body.work_experiences = body.work_experiences.map((exp, index) => {
          return {
            ...exp,
            from_date: formatDate(exp.from_date, "YYYY-MM-DD"),
            to_date: formatDate(exp.to_date, "YYYY-MM-DD"),
          };
        });
      } else {
        body.work_experiences = [{ has_work_experience: "false" }];
      }

      handleUpdate(body, () => {
        onSaveSuccessfull && onSaveSuccessfull();
        // turn off the edit mode
        handleEdit(false);
        fetchData();
      });
    }
  };

  const handleDismissToast = () => {
    setError("");
  };

  const isPageLoading =
    workExperienceIsLoading ||
    functionalAreasIsLoading ||
    industryTypesIsLoading;

  const fetchDataError =
    workExperienceError?.data ||
    functionalAreasError?.data ||
    industryTypesError?.data;

  return (
    <>
      <WorkExperienceTemplate
        initailWorkExperience={initailWorkExperience}
        workExperiences={workExperiences}
        setWorkExperiences={setWorkExperiences}
        current_status={current_status}
        setCurrentStatusState={setCurrentStatusState}
        onChangeValue_workExperiences={onChangeValue_workExperiences}
        onChangeValue_currentStatus={onChangeValue_currentStatus}
        handleAreasOfInterestSelection={handleAreasOfInterest}
        handleWorkExperienceDetailBlur={handleWorkExperienceDetailBlur}
        handleCurrentStatusDetailBlur={handleCurrentStatusDetailBlur}
        handleCurrentSpecialisationSelection={handleCurrentStatus}
        handleCurrentIndustrySpecialisationSelection={handleCurrentStatus}
        handleCancelPress={handleCancelPress}
        isValidAllFields={isValidAllFields}
        isError={isError}
        isLoading={isLoading}
        isEditable={isEditable}
        addMoreWorkExperience={addMoreWorkExperience}
        onClickSave={handleSave}
        onClickCancel={() => {
          // turn off the edit mode
          handleEdit(false);
          updateFormattedData(data);
        }}
        isPageLoading={isPageLoading}
        error={fetchDataError}
      />
      {!!error && (
        <ToastComponent toastMessage={error} onDismiss={handleDismissToast} />
      )}
    </>
  );
};

export default WorkExperience;
