import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { COUNTRY_CODE } from "../../../services/apiServices/apiEndPoint";
import { useIntl } from "react-intl";
import { EMP_STRENGTH, GROSS_SALARY, WORK_EXPERIENCE } from "../../../constants/constants";

const work_experience = [
 {
    key: "haveWorkExperience",
    isMandatory: true,
    label: "label.haveAnyWorkExperience",
    placeholder: "label.haveAnyWorkExperience",
    validate: (value) => {
      if (!value) {
        return "Work experience is required";
      }
    },
  },
  {
    key: "organizationName",
    isMandatory: true,
    label: "label.organizationName",
    placeholder: "label.organizationName",
    validate: (value) => {
      if (!value) {
        return "Organization is required";
      }
    },
  },
  {
    key: "designation",
    isMandatory: true,
    label: "label.designation",
    placeholder: "label.designation",
    validate: (value) => {
      if (!value) {
        return "designation is required";
      }
    },
  },
  {
    key: "location",
    isMandatory: true,
    label: "label.location",
    placeholder: "label.location",
    validate: (value) => {
      if (!value) {
        return "location is required";
      }
    },
  },
  {
    key: "from",
    isMandatory: true,
    isDate:true,
    label: "label.from",
    placeholder: "label.from",
    validate: (value) => {
      if (!value) {
        return "From date is required";
      }
    },
  },
  {
    key: "to",
    isMandatory: true,
    isDate:true,
    label: "label.to",
    placeholder: "label.to",
    validate: (value) => {
      if (!value) {
        return "To date is required";
      }
    },
  },
  {
    key: "empStrength",
    isMandatory: true,
    isDropdown: true,
    options: EMP_STRENGTH,
    label: "label.empStrength",
    placeholder: "label.empStrength",
    validate: (value) => {
      if (!value) {
        return "Emp. strength is required";
      }
    },
  },
  {
    key: "grossSalary",
    isMandatory: true,
    isDropdown: true,
    options: GROSS_SALARY,
    label: "label.grossSalary",
    placeholder: "label.grossSalary",
    validate: (value) => {
      if (!value) {
        return "Gross Salary is required";
      }
    },
  },
  {
    key: "areasOfWork",
    isMandatory: true,
    isDropdown: true,
    options: [],
    label: "label.areasOfWork",
    placeholder: "label.areasOfWork",
    validate: (value) => {
      if (!value) {
        return "Areas of work is required";
      }
    },
  },
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((item) => {
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

export const useWorkExperienceDetail = ({ state, isEditable}) => {
  const intl = useIntl();
  const { data: countryData } = useFetch({ url: COUNTRY_CODE });
  const [workExperience_detail_state, setWorkExperienceDetailState] = useState(work_experience);
  const handleWorkExperienceDetailBlur = (key, index) => {
    setWorkExperienceDetailState(
      validateOnBlur({
        state,
        details: workExperience_detail_state,
        key,
        index,
        intl,
      })
    );
  }
  const checkMandatoryFields = () => {
    let error = false;
    [
      ...workExperience_detail_state,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    workExperience_detail: addValueOnField({
      state,
      details: workExperience_detail_state,
      isEditable,
    }),
    handleWorkExperienceDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
