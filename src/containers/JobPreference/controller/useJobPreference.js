import React, { useState, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";

import { JobPreferences_keys, updateDropDownOptions } from "./utils";

const preferences_details = [
  [{
      key: "posting_anywhere_in_india",
      isMandatory: true,
      isToggle: true,
      label: "label.posting_anywhere_in_india",
      placeholder: "label.posting_anywhere_in_india",
      validate: (value) => {
        if (!value) {
          return "posting anywhere in india is required";
        }
      },
    },
    {
      key: "transferable_post_acceptable",
      isMandatory: true,
      isToggle: true,
      label: "label.whether_transferable_post_acceptable",
      placeholder: "label.whether_transferable_post_acceptable",
      validate: (value) => {
        if (!value) {
          return "transferable post acceptable is required";
        }
      },
    },],
    [{
      key: "posting_outside_india",
      isMandatory: true,
      isToggle: true,
      label: "label.ready_to_place_outside_india",
      placeholder: "label.ready_to_place_outside_india",
      validate: (value) => {
        if (!value) {
          return "ready to place india is required";
        }
      },
    },
    {
      key: "preferred_region",
      isMandatory: true,
      label: "label.preferred_region",
      placeholder: "label.preferred_region",
      validate: (value) => {
        if (!value) {
          return "preferred region is required";
        }
      },
    },
    {
      key: "expected_annual_salary",
      isMandatory: true,
      label: "label.expected_annual_salary",
      placeholder: "label.expected_annual_salary",
      validate: (value) => {
        if (!value) {
          return "expected annual salary is required";
        }
      },
    },],
    [{
      key: "industry_preference",
      label: "label.preferences_kind_of_industry",
      labelField: "name",
      valueField: "name",
      isMandatory: true,
      isMultiSelect: true,
      isDropdown: true,
      placeholder: "label.preferences_kind_of_industry",
      defaultValues: [],
      isSingleMutliSelect: true,
      isEditable: true,
      width: 2,
    }],
    [{
      key: "functional_area_preference",
      label: "label.preference_for_area_of_work",
      value: [],
      isMandatory: true,
      isMultiSelect: true,
      isDropdown: true,
      placeholder: "label.preference_for_area_of_work",
      defaultValues: [],
      options: [],
      isSingleMutliSelect: true,
      validate: (value) => {
        if (value.length === 0) {
          return "Prefrence for area of work is required";
        }
      },
    },],
];

  
const addValueOnField = ({ state, details, isEditable }) => {
  const updatedState = details.map(subArray => {
    return subArray.map((field) => {
      return {
        ...field,
        value: isEditable || state[field.key] ? state[field.key] : "--",
      };
    });
  });
  return updatedState;
}

const validateOnBlur = ({ state, details, key, index, intl }) => {
  const value = state[key];
  const updatedData = details.map((item, i) => {
    if (key === item.key) {
      return {
        ...item,
        value,
        error: item.validate ? item.validate(value, intl) : "",
      };
    }
    return item;
  });
  return updatedData;
};

export const useJobPreference = ({ state, isEditable, functionalAreas, industryTypes}) => {
  const intl = useIntl();
  
  const [preferences_details_state, setPreferencesDetailsState] = useState(preferences_details);

  const updatedDropDownList = useMemo(() => {
    const updatedWithIndustryType = updateDropDownOptions(industryTypes, preferences_details_state, 2, JobPreferences_keys.INDUSTRY_PREFERENCE, state.industry_preference);
    const updatedWithFunctionalAreas = updateDropDownOptions(functionalAreas, updatedWithIndustryType, 3, JobPreferences_keys.FUNCTIONAL_AREA_PREFERENCE, state.functional_area_preference);
    return updatedWithFunctionalAreas;
  }, [industryTypes, functionalAreas, state]);

  useEffect(() => {
    setPreferencesDetailsState(updatedDropDownList);
  }, [updatedDropDownList]);

  const handlePreferencesDetailBlur = (key, index) => {
    setPreferencesDetailsState(
      validateOnBlur({
        state,
        details: preferences_details_state,
        key,
        index,
        intl,
      })
    );
  }
  const checkMandatoryFields = () => {
    let error = false;
    [
      ...preferences_details_state,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    preferences_details: addValueOnField({
      state,
      details: preferences_details_state,
      isEditable,
    }),
    handlePreferencesDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
