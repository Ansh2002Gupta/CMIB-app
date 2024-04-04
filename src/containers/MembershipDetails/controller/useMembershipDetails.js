import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { COUNTRY_CODE } from "../../../services/apiServices/apiEndPoint";
import { useIntl } from "react-intl";

const membership_detail = [
  {
    key: "date_of_enrollment",
    isMandatory: true,
    isCalendar: true,
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

export const useMembershipDetails = ({ state, isEditable}) => {
  useEffect(() => {
    const fellow_member_detail = [
      {
        key: "isFellowMember",
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
      ...(state.isFellowMember === 0 ? [{
        key: "fellow_member_admission_date",
        isMandatory: true,
        isCalendar: true,
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
  }, [state.isFellowMember]);

  useEffect(() => {
    const practice_detail = [
      {
        key: "inPractice",
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
      ...(state.inPractice === 0 ? [{
        key: "sinceWhenPracticing",
        isMandatory: true,
        isCalendar: true,
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
  }, [state.inPractice]);

  const intl = useIntl();
  const { data: countryData } = useFetch({ url: COUNTRY_CODE });
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
