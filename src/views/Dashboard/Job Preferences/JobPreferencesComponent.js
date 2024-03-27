import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { MEMBER_CA_JOB_PROFILE } from "../../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import useUpdateService from "../../../services/apiServices/hooks/JobProfile/useUpdateService";
import JobPreferencesUI from "./JobPreferencesUI";
import { useJobPreferences } from "./useJobPreferences";
const JobPreferencesComponent = ({isEditable, handleEdit}) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data } = useFetch({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE}`,
  });

  const { handleUpdate, isError, isLoading } = useUpdateService({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE}`,
  });
  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? data : {kindOfIndustry: []}
  );

  const {
    preferences_details,
    handlePreferencesDetailBlur,
    isValidAllFields,
    handleAreasOfInterestSelection,
  } = useJobPreferences({
    state,
    isEditable,
  });

  useEffect(() => {
    if (data !== null && Object.keys(data).length) {
      setState(data);
    }
  }, [data]);

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeValue = (details) => (label, value, codeValue) => {
    const { key } = findKeyByLabel(label, details);

    if (codeValue) {
      setState((prev) => ({
        ...prev,
        codeValue: value,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const onChangeMultiSelect = (value, name) => {
    console.log(state, value, name)
    let updatedState = state;
    if (name === "kindOfIndustry") {
      const existingModules = updatedState?.[name] || [];

      if (existingModules.includes(value)) {
        // Remove the value if it already exists
        updatedState = {
          ...updatedState,
          [name]: existingModules.filter((item) => item !== value),
        };
      } else {
        // Append the value if it does not exist
        updatedState = {
          ...updatedState,
          [name]: [...existingModules, value],
        };
      }
      setState(updatedState);
    } 
  };

  console.log("state::", state)

  return (
    <JobPreferencesUI
      preferences_details={preferences_details}
      onChangeValue={onChangeValue}
      onChangeMultiSelect={onChangeMultiSelect}
      handlePreferencesDetailBlur={handlePreferencesDetailBlur}
      isValidAllFields={isValidAllFields}
      handleAreasOfInterestSelection={handleAreasOfInterestSelection}
      isError={isError}
      isLoading={isLoading}
      isEditable={isEditable}
      onClickSave={() => {
        handleUpdate(state, () => {
          // turn off the edit mode
          handleEdit(false);
        });
      }}
      onClickCancel={() => {
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default JobPreferencesComponent;
