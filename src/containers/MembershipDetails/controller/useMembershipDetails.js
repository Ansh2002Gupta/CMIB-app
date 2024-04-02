import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { booleanToYesNo, formatDateToDDMMYYYY, formatDateToMonthNameYear, getCurrentYear } from "../../../utils/util";

const membership_detail = [
  {
    key: "membership_enrollment_date",
    isMandatory: true,
    isCalendar: true,
    minDate: getCurrentYear() - 50, //need to confirm with B.E
    format: "mm/dd/yyyy",
    label: "label.dateOfEmrollmentAsMember",
    placeholder: "label.dateOfEmrollmentAsMember",
    validate: (value) => {
      if (!value) {
        return "Date of Enrollment is required";
      }
    },
  },
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((item) => {
    return {
      ...item,
      defaultValue:  !isEditable && state?.[item?.key] === null ? "--" : getRefineValueByKey(item?.key, state?.[item?.key]),
      value: !isEditable && state?.[item?.key] === null ? "--" :state?.[item?.key],
    };
  });
};

const getRefineValueByKey = (key, value) => {
  switch (key) {
    case "membership_enrollment_date":
    case "fellow_member_admission_date":
      return formatDateToDDMMYYYY(value);
    case "is_fellow_member":
    case "is_practising":
      return (typeof value === "boolean") ? booleanToYesNo(value ?? "--") : (value === 0 ? "Yes" : "No");
    case "practising_start_date" :
      return formatDateToMonthNameYear(value)
    default:
      return value;
  }
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

export const useMembershipDetails = ({ state, isEditable}) => {
  useEffect(() => {
    const fellow_member_detail = [
      {
        key: "is_fellow_member",
        isMandatory: false,
        isToggle: true,
        label: "label.areYouAFellowMember",
        placeholder: "label.areYouAFellowMember",
        validate: (value) => {
          if (!value) {
            return "Fellow member is required";
          }
        },
      },
      ...(state.is_fellow_member === 0 || state.is_fellow_member === true ? [{
        key: "fellow_member_admission_date",
        isMandatory: true,
        isCalendar: true,
        minDate: getCurrentYear() - 50, //need to confirm with B.E
        format: "mm/dd/yyyy",
        label: "label.fellowMemberDateOfAdmission",
        placeholder: "label.fellowMemberDateOfAdmission",
        validate: (value) => {
          if (!value) {
            return "Fellow member date of admission is required";
          }
        },
      }] : []),
    ];
    setFellowMemberDetailState(fellow_member_detail);
  }, [state.is_fellow_member]);

  useEffect(() => {
    const practice_detail = [
      {
        key: "is_practising",
        isMandatory: false,
        isToggle: true,
        label: "label.whetherInPractice",
        placeholder: "label.whetherInPractice",
        validate: (value) => {
          if (!value) {
            return "Whether in practice is required";
          }
        },
      },
      ...(state.is_practising === 0 || state.is_practising === true ? [{
        key: "practising_start_date",
        isMandatory: true,
        isCalendar: true,
        minDate: getCurrentYear() - 50, //need to confirm with B.E
        format: "MMMM/yyyy",
        label: "label.sinceWhenHaveYouBeenPracticing",
        placeholder: "label.sinceWhenHaveYouBeenPracticing",
        validate: (value) => {
          if (!value) {
            return "since when have you been practicing is required";
          }
        },
      },] : []),
    ];
    setPracticeDetailState(practice_detail);
  }, [state.is_practising]);

  const intl = useIntl();
  const [membership_detail_state, setMembershipDetailState] = useState(membership_detail);
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
  }

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
  }

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
  }
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
      isEditable
    }),
    practice_detail: addValueOnField({
      state,
      details: practice_detail_state,
      isEditable
    }),
    handleMembershipDetailBlur,
    handleFellowMemberDetailBlur,
    handlePracticeDetailBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
