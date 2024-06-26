import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  booleanToYesNo,
  formatDateToDDMMYYYY,
  getCurrentYear,
} from "../../../utils/util";
import dayjs from "dayjs";

const membership_detail = [
  {
    key: "membership_enrollment_date",
    isCalendar: true,
    minDate: getCurrentYear() - 50, //need to confirm with B.E
    format: "DD/MM/YYYY",
    label: "label.dateOfEmrollmentAsMember",
    placeholder: "label.dateOfEmrollmentAsMember",
    validate: (value) => {
      if (!value) {
        return "label.dateOfEmrollmentAsMemberRequired";
      }
    },
  },
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((item) => {
    if (item?.isToggle) {
      return {
        ...item,
        value: isEditable
          ? Boolean(state?.[item?.key] ?? false)
          : state?.[item?.key] === undefined
          ? "-"
          : booleanToYesNo(Boolean(state?.[item?.key])),
      };
    }
    return {
      ...item,
      defaultValue:
        !isEditable && state?.[item?.key] === null
          ? "--"
          : getRefineValueByKey(item?.key, state?.[item?.key], item),
      value:
        !isEditable && state?.[item?.key] === null ? "--" : state?.[item?.key],
    };
  });
};

const getRefineValueByKey = (key, value, item) => {
  switch (key) {
    case "membership_enrollment_date":
    case "fellow_member_admission_date":
      return formatDateToDDMMYYYY(value);
    case "is_fellow_member":
    case "is_practising":
      return typeof value === "boolean"
        ? booleanToYesNo(value ?? "--")
        : value === 0
        ? "Yes"
        : "No";
    case "practising_start_date":
      return dayjs(value).format(item?.format);
    default:
      return value;
  }
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

export const useMembershipDetails = ({ state, isEditable }) => {
  useEffect(() => {
    const fellow_member_detail = [
      {
        key: "is_fellow_member",
        isToggle: true,
        label: "label.areYouAFellowMember",
        placeholder: "label.areYouAFellowMember",
        validate: (value) => {
          if (!value) {
            return "label.areYouAFellowMemberRequired";
          }
        },
      },
      ...(state.is_fellow_member === 0 || state.is_fellow_member === true
        ? [
            {
              key: "fellow_member_admission_date",
              isCalendar: true,
              minDate: getCurrentYear() - 50, //need to confirm with B.E
              format: "DD/MM/YYYY",
              label: "label.fellowMemberDateOfAdmission",
              placeholder: "label.fellowMemberDateOfAdmission",
              validate: (value) => {
                if (!value) {
                  return "label.fellowMemberDateOfAdmissionRequired";
                }
              },
            },
          ]
        : []),
    ];
    setFellowMemberDetailState(fellow_member_detail);
  }, [state.is_fellow_member]);

  useEffect(() => {
    const practice_detail = [
      {
        key: "is_practising",
        isToggle: true,
        label: "label.whetherInPractice",
        placeholder: "label.whetherInPractice",
        validate: (value) => {
          if (!value) {
            return "label.whetherInPracticeRequired";
          }
        },
      },
      ...(state.is_practising === 0 || state.is_practising === true
        ? [
            {
              key: "practising_start_date",
              isCalendar: true,
              minDate: getCurrentYear() - 50, //need to confirm with B.E
              format: "MMMM, YYYY",
              showMonthYearPicker: true,
              label: "label.sinceWhenHaveYouBeenPracticing",
              placeholder: "label.sinceWhenHaveYouBeenPracticing",
              validate: (value) => {
                if (!value) {
                  return "label.sinceWhenHaveYouBeenPracticingRequired";
                }
              },
            },
          ]
        : []),
    ];
    setPracticeDetailState(practice_detail);
  }, [state.is_practising]);

  const intl = useIntl();
  const [membership_detail_state, setMembershipDetailState] =
    useState(membership_detail);
  const [fellow_member_detail_state, setFellowMemberDetailState] = useState([]);
  const [practice_detail_state, setPracticeDetailState] = useState([]);
  const handleMembershipDetailBlur = (key, index) => {
    setMembershipDetailState(
      validateOnBlur({
        state,
        details: membership_detail_state,
        key,
        index,
        intl,
      })
    );
  };

  const handleFellowMemberDetailBlur = (key, index) => {
    setFellowMemberDetailState(
      validateOnBlur({
        state,
        details: fellow_member_detail_state,
        key,
        index,
        intl,
      })
    );
  };

  const handlePracticeDetailBlur = (key, index) => {
    setPracticeDetailState(
      validateOnBlur({
        state,
        details: practice_detail_state,
        key,
        index,
        intl,
      })
    );
  };
  const checkMandatoryFields = () => {
    let error = false;
    [
      ...membership_detail_state,
      ...fellow_member_detail_state,
      ...practice_detail_state,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    membership_detail: addValueOnField({
      state,
      details: membership_detail_state,
      isEditable,
    }),
    fellow_member_detail: addValueOnField({
      state,
      details: fellow_member_detail_state,
      isEditable,
    }),
    practice_detail: addValueOnField({
      state,
      details: practice_detail_state,
      isEditable,
    }),
    handleMembershipDetailBlur,
    handleFellowMemberDetailBlur,
    handlePracticeDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
