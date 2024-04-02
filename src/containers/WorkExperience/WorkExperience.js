import React, { useContext, useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import WorkExperienceTemplate from "./WorkExperienceTemplate";
import {
  FUNCTION_AREAS,
  INDUSTRY_TYPES,
  MEMBER_CA_JOB_PROFILE,
  MEMBER_CA_JOB_PROFILE_WORK_EXPERIENCE,
} from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import {
  doHaveWorkExperience,
  useWorkExperience,
} from "./controller/useWorkExperience";
import { formatDate, yesNoToBoolean } from "../../utils/util";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import { validateFields } from "./controller/WorkExperienceUtils";

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

const WorkExperience = ({ isEditable, handleEdit }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data, fetchData } = useFetch({
    url: MEMBER_CA_JOB_PROFILE_WORK_EXPERIENCE,
  });
  const { data: functionalAreas } = useFetch({
    url: FUNCTION_AREAS,
  });
  const { data: industryTypes } = useFetch({
    url: INDUSTRY_TYPES,
  });

  const { handleUpdate, isError, isLoading, error, setError } =
    useUpdateService(MEMBER_CA_JOB_PROFILE_WORK_EXPERIENCE);

  const [formFieldsError, setFormFieldsError] = useState({});

  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? {} : {}
  );

  const {
    workExperiences,
    setWorkExperiences,
    current_status,
    setCurrentStatusState,
    handleCurrentStatusDetailBlur,
    isValidAllFields,
    initailWorkExperience,
    handleAreasOfInterestSelection,
    handleCurrentSpecialisationSelection,
    handleCurrentIndustrySpecialisationSelection,
  } = useWorkExperience({
    state: state,
    formError: formFieldsError,
    isEditable,
    functionalAreas,
    industryTypes,
  });

  const handleWorkExperienceDetailBlur = (key, index) => {
    validateFields(
      workExperiences,
      setWorkExperiences,
      formFieldsError,
      setFormFieldsError,
      key
    );
  };

  let showOtherFields = doHaveWorkExperience(state);

  const updateFormattedData = (workExpData) => {
    let workExperienceData =
      workExpData.work_experiences.length > 0
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
    setState({
      ...data,
      work_experiences: workExperienceData,
    });
  };

  useEffect(() => {
    if (data !== null && Object.keys(data).length) {
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
      state?.[detail.key].push(value);
    }
    setState({ ...state });
  };

  const onChangeValue_workExperiences = (details, index) => (label, value) => {
    const { key } = findKeyByLabel(label, initailWorkExperience);

    if (key === "haveWorkExperience" && !yesNoToBoolean(value)) {
      state.work_experiences = [
        {
          ...workExperienceKeys(),
          [key]: value,
        },
      ];
    } else {
      state.work_experiences[index] = {
        ...state.work_experiences[index],
        [key]: value,
      };
    }
    setFormFieldsError({ ...formFieldsError, [`${index}:${key}`]: null });

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
  };

  const handleSave = () => {
    if (
      validateFields(
        workExperiences,
        setWorkExperiences,
        formFieldsError,
        setFormFieldsError
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
        // turn off the edit mode
        handleEdit(false);
        fetchData();
      });
    }
  };

  const handleDismissToast = () => {
    setError("");
  };

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
      />
      {!!error && (
        <ToastComponent toastMessage={error} onDismiss={handleDismissToast} />
      )}
    </>
  );
};

export default WorkExperience;
