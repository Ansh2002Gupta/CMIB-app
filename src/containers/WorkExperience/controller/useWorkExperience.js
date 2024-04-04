import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useIntl } from "react-intl";
import { EMP_STRENGTH, GROSS_SALARY, WORK_EXPERIENCE } from "../../../constants/constants";

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((workExp) => {
    return workExp.map((item) => {
      return {
        ...item,
        value: !isEditable && !workExp?.[item?.key] ? "--" : workExp?.[item?.value],
      };
    });
  })
  };

  const addValueOnField_currentStatus = ({ state, details, isEditable }) => {
    return details.map((item) => {
      return {
        ...item,
        value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
      };
    });
  }; 


const validateOnBlur = ({ state, details, key, index, intl }) => {
  //const {workExperiences} = state;
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

export const useWorkExperience = ({ state, isEditable}) => {
  const intl = useIntl();
  const [selectAreaOfInterest, setSelectAreaOfInterest] = useState([
    {
      isSelected: false,
      label: "Ca Jobs",
      name: "Ca Jobs",
      selectedIndex: null,
      value: "Ca Jobs",
    },
    {
      isSelected: false,
      label: "Nqca",
      name: "Nqca",
      selectedIndex: null,
      value: "Nqca",
    },
  ]);
  const [selectCurrentSpecialisation, setSelectCurrentSpecialisation] = useState([
    {
      isSelected: false,
      label: "Ca Jobs",
      name: "Ca Jobs",
      selectedIndex: null,
      value: "Ca Jobs",
    },
    {
      isSelected: false,
      label: "Nqca",
      name: "Nqca",
      selectedIndex: null,
      value: "Nqca",
    },
  ]);
  const [selectCurrentIndustrySpecialisation, setSelectCurrentIndustrySpecialisation] = useState([
    {
      isSelected: false,
      label: "Ca Jobs",
      name: "Ca Jobs",
      selectedIndex: null,
      value: "Ca Jobs",
    },
    {
      isSelected: false,
      label: "Nqca",
      name: "Nqca",
      selectedIndex: null,
      value: "Nqca",
    },
  ]);

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
       value: [],
       showBadgeLabel: isEditable ? true : false,
       isMandatory: true,
       isMultiSelect: true,
       isDropdown: true,
       label: "label.areasOfWork",
       placeholder: "label.areasOfWork",
       defaultValues: [],
       isSingleMutliSelect: true,
       options: selectAreaOfInterest,
       validate: (value) => {
         if (!value) {
           return "Areas of work is required";
         }
       },
     },
   ];

   const current_status = [
    [{
      key: "currentSpecialisation",
      value:[],
      showBadgeLabel: isEditable ? true : false,
      isMandatory: true,
      isMultiSelect: true,
      isDropdown: true,
      label: "label.current_specialisation",
      placeholder: "label.current_specialisation",
      defaultValues: [],
      isSingleMutliSelect: true,
      options: selectAreaOfInterest,
      validate: (value) => {
        if (!value) {
          return "Current specialisation is required";
        }
      },
    },
    {
      key: "othersSpecialisation",
      label: "label.other_specialisation",
      placeholder: "label.other_specialisation",
    }],
    [{
      key: "currentIndustrySpecialisation",
      value:[],
      showBadgeLabel: isEditable ? true : false,
      isMandatory: true,
      isMultiSelect: true,
      isDropdown: true,
      label: "label.current_industry_specialisation",
      placeholder: "label.current_industry_specialisation",
      defaultValues: [],
      isSingleMutliSelect: true,
      options: selectAreaOfInterest,
      validate: (value) => {
        if (!value) {
          return "Current industry specialisation is required";
        }
      },
    },
    {
      key: "othersIndustrySpecialisation",
      label: "label.other_specialisation",
      placeholder: "label.other_specialisation",
    }],
  ]

   const [workExperiences, setWorkExperiences] = useState([work_experience]);
   const handleAreasOfInterestSelection = (updatedSelectedItems) => {
    console.log("handleAreasOfInterestSelection", updatedSelectedItems)
    const updatedState = selectAreaOfInterest.map((item) => {
      if (item.value === updatedSelectedItems) {
        if (item.isSelected) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
        return item;
      }
      return item;
    });
    setSelectAreaOfInterest(updatedState);
  };

  const handleCurrentSpecialisationSelection = (updatedSelectedItems) => {
    console.log("handleAreasOfInterestSelection", updatedSelectedItems)
    const updatedState = selectAreaOfInterest.map((item) => {
      if (item.value === updatedSelectedItems) {
        if (item.isSelected) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
        return item;
      }
      return item;
    });
    setSelectCurrentSpecialisation(updatedState);
  };

  const handleCurrentIndustrySpecialisationSelection = (updatedSelectedItems) => {
    console.log("handleAreasOfInterestSelection", updatedSelectedItems)
    const updatedState = selectAreaOfInterest.map((item) => {
      if (item.value === updatedSelectedItems) {
        if (item.isSelected) {
          item.isSelected = false;
        } else {
          item.isSelected = true;
        }
        return item;
      }
      return item;
    });
    setSelectCurrentIndustrySpecialisation(updatedState);
  };

  const [current_status_state, setCurrentStatusState] = useState(current_status);

  const handleWorkExperienceDetailBlur = (key, index) => {
    setWorkExperiences(
      validateOnBlur({
        state,
        details: workExperiences,
        key,
        index,
        intl,
      })
    );
  }
  const handleCurrentStatusDetailBlur = (key, index) => {
    setCurrentStatusState(
      validateOnBlur({
        state,
        details: current_status_state,
        key,
        index,
        intl,
      })
    );
  }
  const checkMandatoryFields = () => {
    let error = false;
    [
      ...workExperiences,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };
  return {
    initailWorkExperience: work_experience,
    setWorkExperiences: setWorkExperiences,
     workExperiences: addValueOnField({
      state,
      details: workExperiences,
      isEditable,
    }),
    handleAreasOfInterestSelection: handleAreasOfInterestSelection,
    handleCurrentSpecialisationSelection: handleCurrentSpecialisationSelection,
    handleCurrentIndustrySpecialisationSelection: handleCurrentIndustrySpecialisationSelection,
    current_status: current_status,
    setCurrentStatusState: setCurrentStatusState,
    // current_status : addValueOnField_currentStatus({
    //   state,
    //   details: current_status_state,
    //   isEditable,
    // }),
    //handleWorkExperienceDetailBlur,
   // handleCurrentStatusDetailBlur,
   // isValidAllFields: checkMandatoryFields(),
  };
};
