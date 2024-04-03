import { useEffect, useMemo, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useIntl } from "react-intl";
import {
  BOOLEAN_OPTION,
  numRegex,
} from "../../../constants/constants";
import { formatDate, yesNoToBoolean } from "../../../utils/util";

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((workExp, index) => {
    return workExp.map((item) => {
      //format date form view only
      if (["from_date", "to_date"].includes(item.key)) {
        return {
          ...item,
          value: isEditable
            ? state[index]?.[item?.key]
            : state[index]?.[item?.key] === null
            ? "--"
            : formatDate(state[index]?.[item?.key], "DD-MM-YYYY"),
        };
      }
      let value = isEditable
        ? state[index]?.[item?.key]
        : state[index]?.[item?.key] === null
        ? "--"
        : state[index]?.[item?.key];
      return {
        ...item,
        value,
      };
    });
  });
};

const addValueOnField_currentStatus = ({ state, details, isEditable }) => {
  return details.map((item) => {
    let array_fields = [
      "functional_areas_specialisation",
      "industry_specialisation",
    ];
    return item.map((val) => ({
      ...val,
      value: isEditable
        ? state?.[val?.key]
        : state?.[val?.key] === null && !array_fields.includes(val.key)
        ? "--"
        : state?.[val?.key],
    }));
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

export const doHaveWorkExperience = (state) => {
  return yesNoToBoolean(
    state.work_experiences?.[0]?.haveWorkExperience ?? false
  );
};

export const useWorkExperience = ({
  state,
  isEditable,
  functionalAreas,
  industryTypes,
  formError,
  currentStatusError,
}) => {
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

  const [selectCurrentSpecialisation, setSelectCurrentSpecialisation] =
    useState([
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

  const [
    selectCurrentIndustrySpecialisation,
    setSelectCurrentIndustrySpecialisation,
  ] = useState([
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

  let showOtherFields = doHaveWorkExperience(state);

  const work_experience_fields = showOtherFields
    ? [
        {
          key: "name_of_organisation",
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
          key: "from_date",
          isMandatory: true,
          isDate: true,
          isCalendar: true,
          label: "label.from",
          placeholder: "label.from",
          validate: (value) => {
            if (!value) {
              return "From date is required";
            }
          },
        },
        {
          key: "to_date",
          isMandatory: true,
          isDate: true,
          isCalendar: true,
          label: "label.to",
          placeholder: "label.to",
          validate: (value) => {
            if (!value) {
              return "To date is required";
            }
          },
        },
        {
          key: "emp_strength",
          label: "label.empStrength",
          placeholder: "label.empStrength",
          validate: (value) => {
            if (value.length > 0 && !numRegex.test(String(value))) {
              return "Enter valid input";
            }
          },
        },
        {
          key: "gross_salary_drawn",
          label: "label.grossSalary",
          placeholder: "label.grossSalary",
          validate: (value) => {
            if (value.length > 0 && !numRegex.test(String(value))) {
              return "Enter valid input";
            }
          },
        },
        {
          key: "areas_of_work",
          label: "label.areasOfWork",
          value: [],
          showBadgeLabel: true,
          isMandatory: true,
          isMultiSelect: true,
          isDropdown: true,
          placeholder: "label.select_module",
          defaultValues: [],
          options: [],
          isSingleMutliSelect: true,
          validate: (value) => {
            if (value.length === 0) {
              return "Areas of work is required";
            }
          },
        },
      ]
    : [];

  const work_experience = [
    ...(isEditable || !showOtherFields
      ? [
          {
            key: "haveWorkExperience",
            isMandatory: true,
            label: "label.haveAnyWorkExperience",
            isDropdown: true,
            options: BOOLEAN_OPTION,
            placeholder: "label.haveAnyWorkExperience",
            validate: (value) => {
              if (value.length === 0) {
                return "Work experience is required";
              }
            },
          },
        ]
      : []),
    ...work_experience_fields,
  ];

  const current_status = [
    [
      {
        key: "functional_areas_specialisation",
        value: [],
        label: "label.current_specialisation",
        placeholder: "label.current_specialisation",
        validate: (value) => {
          if (value.length === 0) {
            return "Current specialisation is required";
          }
        },
        showBadgeLabel: true,
        isMandatory: true,
        isMultiSelect: true,
        isDropdown: true,
        placeholder: "label.select_module",
        defaultValues: [],
        options: [],
        isSingleMutliSelect: true,
      },
      {
        key: "other_specialisation",
        label: "label.other_specialisation",
        placeholder: "label.other_specialisation",
      },
    ],
    [
      {
        key: "industry_specialisation",
        value: [],
        showBadgeLabel: true,
        isMandatory: true,
        isMultiSelect: true,
        isDropdown: true,
        label: "label.current_industry_specialisation",
        placeholder: "label.current_industry_specialisation",
        defaultValues: [],
        isSingleMutliSelect: true,
        options: [],
        validate: (value) => {
          if (value.length === 0) {
            return "Current industry specialisation is required";
          }
        },
      },
      {
        key: "other_industry_specialisation",
        label: "label.other_specialisation",
        placeholder: "label.other_specialisation",
      },
    ],
  ];

  const [workExperiences, setWorkExperiences] = useState([work_experience]);

  const createModuleOptions = (module, contact) => {
    return {
      label: module.name,
      name: module.name,
      value: module.name,
      isSelected: contact?.includes(module.name),
      selectedIndex: null,
    };
  };

  const current_status_data = useMemo(() => {
    return current_status.map((row) => {
      return row.map((data) => {
        const prevError = currentStatusError?.[data.key];
        if (data.key === "functional_areas_specialisation") {
          return {
            ...data,
            error: prevError,
            options: functionalAreas?.map((area) => {
              return createModuleOptions(
                area,
                state.functional_areas_specialisation
              );
            }),
          };
        }
        if (data.key === "industry_specialisation") {
          return {
            ...data,
            error: prevError,
            options: industryTypes?.map((area) => {
              return createModuleOptions(area, state.industry_specialisation);
            }),
          };
        }

        return data;
      });
    });
  }, [state, isEditable, currentStatusError]);

  const workExperiencs_data = useMemo(() => {
    let initailWorkExperienceArr = [];
    for (let i = 0; i < state?.work_experiences?.length - 1; i++) {
      initailWorkExperienceArr.push([...work_experience_fields]);
    }
    let work_experience_template = [
      work_experience,
      // show second workexperience form only when hasWorkExperience in first true(showOtherFields===true)
      // and state?.work_experiences?.length>1 and use work_experience_fields( i.e. work_experience without hasWorkExperience field)
      ...(showOtherFields && state?.work_experiences?.length - 1 > 0
        ? initailWorkExperienceArr
        : []),
    ];

    return work_experience_template.map((work, index) => {
      return work?.map((fields) => {
        let prevError = formError[index]?.[fields.key];

        if (fields.key === "areas_of_work") {
          return {
            ...fields,
            options: functionalAreas?.map((area) => {
              return createModuleOptions(
                area,
                state.work_experiences[index].areas_of_work,
                intl,
                index
              );
            }),
          };
        }

        //set minDate in to_date to from_date
        if (fields?.key === "to_date") {
          fields = {
            ...fields,
            minDate: state.work_experiences[index]?.from_date,
          };
        }

        return { ...fields, error: prevError };
      });
    });
  }, [state, isEditable, formError]);

  useEffect(() => {
    setWorkExperiences(workExperiencs_data);
  }, [workExperiencs_data]);

  const handleAreasOfInterestSelection =
    (_, index) => (updatedSelectedItems, fieldIndex) => {
      workExperiences[index][fieldIndex].options = [
        ...workExperiences[index][fieldIndex]?.options.map((item) => {
          if (item.value === updatedSelectedItems) {
            if (item.isSelected) {
              item.isSelected = false;
            } else {
              item.isSelected = true;
            }
            return item;
          }
          return item;
        }),
      ];

      setWorkExperiences([...workExperiences]);
    };

  const handleCurrentSpecialisationSelection = (updatedSelectedItems) => {
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

  const handleCurrentIndustrySpecialisationSelection = (
    updatedSelectedItems
  ) => {
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

  const [current_status_state, setCurrentStatusState] =
    useState(current_status);

  useEffect(() => {
    setCurrentStatusState([...current_status_data]);
  }, [current_status_data]);

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
  };

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
  };

  const checkMandatoryFields = () => {
    let error = false;
    workExperiences?.forEach((work, index) => {
      work.forEach((fields) => {
        if (fields.isMandatory) {
          if (
            !state.work_experiences?.[index]?.[fields.key] ||
            (["areas_of_work"].includes(fields.key) &&
              state.work_experiences?.[index]?.[fields.key].length === 0)
          )
            error = true;
        }
      });
    });

    current_status_state.map((row) => {
      return row.map((data) => {
        if (data && data?.isMandatory && state?.[data.key]?.length === 0) {
          error = true;
        }
      });
    });
    return error;
  };

  return {
    initailWorkExperience: work_experience,
    setWorkExperiences: setWorkExperiences,
    workExperiences: addValueOnField({
      state: state.work_experiences ?? [],
      details: workExperiences,
      isEditable,
    }),
    handleAreasOfInterestSelection: handleAreasOfInterestSelection,
    handleCurrentSpecialisationSelection: handleCurrentSpecialisationSelection,
    handleCurrentIndustrySpecialisationSelection:
      handleCurrentIndustrySpecialisationSelection,
    setCurrentStatusState: setCurrentStatusState,
    current_status: addValueOnField_currentStatus({
      state,
      details: current_status_state,
      isEditable,
    }),
    //handleWorkExperienceDetailBlur,
    // handleCurrentStatusDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
