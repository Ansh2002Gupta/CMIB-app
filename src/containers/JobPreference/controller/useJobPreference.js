import React, { useState, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";

import { JobPreferences_keys, updateDropDownOptions } from "./utils";
import { booleanToYesNo } from "../../../utils/util";
import { numRegex } from "../../../constants/constants";

const EXPECTED_MIN_SALARY = 750000;

const preferences_details = (intl) => [
  [
    {
      key: "posting_anywhere_in_india",
      isMandatory: true,
      isToggle: true,
      label: "label.posting_anywhere_in_india",
      placeholder: "label.posting_anywhere_in_india",
      validate: (value) => {
        if (!value) {
          return intl.formatMessage({
            id: "label.postingAnyWhereRequired",
          });
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
          return intl.formatMessage({
            id: "label.transferableRequired",
          });
        }
      },
    },
    { isEmptyField: true },
  ],
  [
    {
      key: "posting_outside_india",
      isMandatory: true,
      isToggle: true,
      label: "label.ready_to_place_outside_india",
      placeholder: "label.ready_to_place_outside_india",
      validate: (value) => {
        if (!value) {
          return intl.formatMessage({
            id: "label.readyToPlaceRequired",
          });
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
          return intl.formatMessage({
            id: "label.preferredRegionRequired",
          });
        }
      },
    },
    {
      key: "expected_annual_salary",
      isMandatory: true,
      label: "label.expected_annual_salary",
      placeholder: "label.expected_annual_salary",
      isNumeric: true,
      validate: (value) => {
        if (!value) {
          return intl.formatMessage({
            id: "label.expectedAnnualSalaryRequired",
          });
        }
        if (value.length > 0 && !numRegex.test(String(value))) {
          return intl.formatMessage({
            id: "label.enterValidInput",
          });
        }
        if (value.length > 0 && Number(value) < EXPECTED_MIN_SALARY) {
          return intl.formatMessage({
            id: "label.minExpectedSalary",
          });
        }
      },
    },
  ],
  [
    {
      key: "industry_preference",
      label: "label.preferences_kind_of_industry",
      value: [],
      showBadgeLabel: true,
      isMandatory: true,
      isMultiSelect: true,
      isDropdown: true,
      placeholder: "label.preferences_kind_of_industry",
      defaultValues: [],
      options: [],
      isSingleMutliSelect: true,
    },
  ],
  [
    {
      key: "functional_area_preference",
      label: "label.preference_for_area_of_work",
      value: [],
      isMandatory: true,
      isMultiSelect: true,
      isDropdown: true,
      placeholder: "label.preference_for_area_of_work",
      defaultValues: [],
      options: [],
      showBadgeLabel: true,
      isSingleMutliSelect: true,
    },
  ],
];

const addValueOnField = ({ state, details, isEditable }) => {
  const updatedState = details.map((subArray) => {
    return subArray.map((field) => {
      if (field?.isToggle) {
        return {
          ...field,
          value: isEditable
            ? Boolean(state?.[field?.key] ?? true)
            : state?.[field?.key] === undefined
            ? "-"
            : booleanToYesNo(Boolean(state?.[field?.key])),
        };
      }

      return {
        ...field,
        value: isEditable
          ? state?.[field?.key]
          : state?.[field?.key] === null
          ? "-"
          : state?.[field?.key],
      };
    });
  });

  return updatedState;
};

const validateOnBlur = ({ state, details, key, intl }) => {
  const value = state[key];
  const updatedData = details.map((row, i) => {
    return row.map((item) => {
      if (item.isMandatory && key === item.key) {
        return {
          ...item,
          value,
          error: item.validate ? item.validate(value, intl) : "",
        };
      }
      return item;
    });
  });
  return updatedData;
};

const resetError = ({ state, details, key }) => {
  const value = state[key];
  const updatedData = details.map((row, i) => {
    return row.map((item) => {
      if (item.isMandatory && key === item.key) {
        return {
          ...item,
          value,
          error: undefined,
        };
      }
      return item;
    });
  });
  return updatedData;
};

export const useJobPreference = ({
  state,
  isEditable,
  functionalAreas,
  industryTypes,
}) => {
  const intl = useIntl();

  const [preferences_details_state, setPreferencesDetailsState] = useState(
    preferences_details(intl)
  );

  const updatedDropDownList = useMemo(() => {
    const updatedWithIndustryType = updateDropDownOptions(
      industryTypes,
      preferences_details_state,
      2,
      JobPreferences_keys.INDUSTRY_PREFERENCE,
      state.industry_preference
    );
    const updatedWithFunctionalAreas = updateDropDownOptions(
      functionalAreas,
      updatedWithIndustryType,
      3,
      JobPreferences_keys.FUNCTIONAL_AREA_PREFERENCE,
      state.functional_area_preference
    );
    return updatedWithFunctionalAreas;
  }, [industryTypes, functionalAreas, state]);

  useEffect(() => {
    setPreferencesDetailsState(updatedDropDownList);
  }, [updatedDropDownList]);

  const imageDetails = useMemo(() => {
    return {
      cv_path: state?.cv_path ?? "",
      job_photo_path: state?.job_photo_path ?? "",
      introduction_video_path: state?.introduction_video_path ?? "",
    };
  }, [state]);

  const handlePreferencesDetailBlur = (key) => {
    setPreferencesDetailsState(
      validateOnBlur({
        state,
        details: preferences_details_state,
        key,
        intl,
      })
    );
  };

  const handleResetError = (key) => {
    setPreferencesDetailsState(
      resetError({ state, details: preferences_details_state, key })
    );
  };

  const checkMandatoryFields = () => {
    let error = false;
    [...preferences_details_state].forEach((row) => {
      row.map((item) => {
        if (item?.isMandatory && !item?.isToggle) {
          if (
            item?.error ||
            !state[item.key] ||
            (item?.isDropdown && state[item.key]?.length === 0)
          ) {
            error = true;
          }
        }
      });
    });
    return error;
  };

  return {
    preferences_details: addValueOnField({
      state,
      details: preferences_details_state,
      isEditable,
    }),
    imageDetails,
    handlePreferencesDetailBlur,
    isValidAllFields: checkMandatoryFields(),
    handleResetError,
  };
};
