import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useIntl } from "react-intl";
import { GROSS_SALARY, KIND_OF_INDUSTRY } from "../../../constants/constants";

const preferences_details = [
    {
        key: "postingAnywhereInIndia",
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
        key: "transferablePostAcceptable",
        isMandatory: true,
        isToggle: true,
        label: "label.whether_transferable_post_acceptable",
        placeholder: "label.whether_transferable_post_acceptable",
        validate: (value) => {
          if (!value) {
            return "transferable post acceptable is required";
          }
        },
      },
      {
        key: "readyToPlaceOutsideIndia",
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
        key: "preferredRegion",
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
        key: "expectedAnnualSalary",
        isMandatory: true,
        label: "label.expected_annual_salary",
        placeholder: "label.expected_annual_salary",
        validate: (value) => {
          if (!value) {
            return "expected annual salary is required";
          }
        },
      },
      {
        key: "preferences_kindOfIndustry",
        label: "label.preferences_kind_of_industry",
        options: KIND_OF_INDUSTRY,
        selectedItems:[],
        isMandatory: true,
        isMultiSelect: true,
        isDropdown: true,
        placeholder: "label.preferences_kind_of_industry",
      },
];

const addValueOnField = ({ state, details, isEditable }) => {
  const {kindOfIndustry} = state;
  console.log("Before kindOfIndustry",kindOfIndustry, KIND_OF_INDUSTRY)
  if (kindOfIndustry.length > 0) {
    KIND_OF_INDUSTRY.forEach(item => {
      if (kindOfIndustry.some(selectedItem => selectedItem === item.value)) {
        item.isSelected = true;
      }else{
        item.isSelected = false;
      }
    });
  }else{
    KIND_OF_INDUSTRY.forEach(item => {
        item.isSelected = false;
      });
  }
  const selectedKindOfIndustry = kindOfIndustry.length > 0 && KIND_OF_INDUSTRY.filter(item =>
     kindOfIndustry.some(selectedItem => selectedItem === item.value));
  return details.map((item,index) => {
    if (item?.key === 'preferences_kindOfIndustry'){
        return{
            ...item,
            value: kindOfIndustry || [],
            selectedItems: KIND_OF_INDUSTRY,
            defaultValues: selectedKindOfIndustry,
            labelField:"name",
            valueField:"value",
            indexField:"selectedIndex",
            isSelected:"isSelected",
        }
    }
    return {
      ...item,
      value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
      codeValue: state.codeValue,
    };
  });
};

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

export const useJobPreferences = ({ state, isEditable}) => {
  const intl = useIntl();
  const [preferences_details_state, setPreferencesDetailsState] = useState(preferences_details);
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
      details: preferences_details,
      isEditable,
    }),
    handlePreferencesDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
