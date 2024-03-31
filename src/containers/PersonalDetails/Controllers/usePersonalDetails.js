import { useEffect, useState } from "react";
import {
  GENDER,
  MARITAL_STATUS,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  numRegex,
} from "../../../constants/constants";
import useFetch from "../../../hooks/useFetch";
import {
  COUNTRY_CODE,
  MEMBER_CATEGORY,
} from "../../../services/apiServices/apiEndPoint";
import { useIntl } from "react-intl";
import { validateEmail } from "../../../utils/validation";

const accessibility_information = [
  {
    key: "has_disability",
    isMandatory: true,
    isToggle: true,
    label: "label.has_disability",
    placeholder: "label.has_disability",
    validate: (value) => {
      if (!value) {
        return "This Field is required";
      }
    },
  },
  {
    key: "handicap_description",
    isMandatory: true,
    label: "label.handicap_description",
    placeholder: "label.handicap_description",
    validate: (value) => {
      if (!value) {
        return "Handicap Description is required";
      }
    },
  },
  {
    key: "handicap_percentage",
    isCounterInput: true,
    isMandatory: true,
    label: "label.handicap_percentage",
    placeholder: "label.handicap_percentage",
    validate: (value) => {
      if (!value) {
        return "Handicap Percentage is required";
      }
    },
  },
];

const personal_detail = (categoryData) => [
  {
    key: "gender",
    isMandatory: true,
    isDropdown: true,
    options: GENDER,
    label: "label.gender",
    placeholder: "label.gender",
    validate: (value) => {
      if (!value) {
        return "Gender is required";
      }
    },
  },
  {
    key: "marital_status",
    isMandatory: true,
    isDropdown: true,
    options: MARITAL_STATUS,
    label: "label.marital_status",
    placeholder: "label.marital_status",
    validate: (value) => {
      if (!value) {
        return "Marital Status is required";
      }
    },
  },
  {
    key: "date_of_birth",
    isMandatory: true,
    isDate: true,
    label: "label.date_of_birth",
    placeholder: "label.date_of_birth",
    validate: (value) => {
      if (!value) {
        return "Date of Birth is required";
      }
    },
  },
  {
    key: "email",
    isMandatory: true,
    isEmail: true,
    label: "label.email",
    placeholder: "label.email",
    validate: (value) => {
      if (!value) {
        return "Email is required";
      }
      const err = validateEmail(value);
      if (err) {
        return err;
      }
    },
  },
  {
    key: "has_passport",
    isMandatory: true,
    isToggle: true,
    label: "label.passport",
    placeholder: "label.passport",
    validate: (value) => {
      if (!value) {
        return "Passport is required";
      }
    },
  },
  {
    key: "passport_number",
    isMandatory: true,
    label: "label.passport_number",
    placeholder: "label.passport_number",
    validate: (value) => {
      if (!value) {
        return "Passport Number is required";
      }
    },
  },
  {
    key: "category_id",
    isMandatory: true,
    isDropdown: true,
    labelField: "name",
    valueField: "id",
    inputKey: "id",
    options: categoryData,
    label: "label.category",
    placeholder: "label.category",
    validate: (value) => {
      if (!value) {
        return "Category is required";
      }
    },
  },
];
const correspondence_address = (countryData) => [
  {
    key: "address1",
    isMandatory: true,
    isMultiline: true,
    noOfRows: 2,
    label: "label.address1",
    placeholder: "label.address1",
    validate: (value) => {
      if (!value) {
        return "Address is required";
      }
    },
  },
  {
    key: "address2",
    isMultiline: true,
    noOfRows: 2,
    label: "label.address2",
    placeholder: "label.address2",
  },
  {
    key: "address3",
    isMultiline: true,
    noOfRows: 2,
    label: "label.address3",
    placeholder: "label.address3",
  },
  {
    key: "country",
    isMandatory: true,
    label: "label.country",
    placeholder: "label.country",
    validate: (value) => {
      if (!value) {
        return "Country is required";
      }
    },
  },
  {
    key: "state",
    isMandatory: true,
    label: "label.state",
    placeholder: "label.state",
    validate: (value) => {
      if (!value) {
        return "State is required";
      }
    },
  },
  {
    key: "city",
    isMandatory: true,
    label: "label.city",
    placeholder: "label.city",
    validate: (value) => {
      if (!value) {
        return "City is required";
      }
    },
  },
  {
    key: "pincode",
    isMandatory: true,
    isNumeric: true,
    label: "label.pincode",
    placeholder: "label.pincode",
    validate: (value) => {
      if (!value) {
        return "Pincode is required";
      }
    },
  },
  {
    key: "mobile_number",
    isMandatory: true,
    isMobileNumber: true,
    isNumeric: true,
    label: "label.mobile_number",
    placeholder: "label.mobile_number",
    options: countryData,
    validate: (value, intl) => {
      if (
        !numRegex.test(String(value)) ||
        value.length > NUMBER_MAX_LENGTH ||
        value.length < NUMBER_MIN_LENGTH
      ) {
        return intl.formatMessage({
          id: "label.telephone_no_validation",
        });
      }
    },
  },
  {
    key: "nationality",
    isMandatory: true,
    label: "label.nationality",
    placeholder: "label.nationality",
    validate: (value) => {
      if (!value) {
        return "Nationality is required";
      }
    },
  },
];

const permanent_address = [
  {
    key: "permanent_address1",
    isMandatory: true,
    isMultiline: true,
    noOfRows: 2,
    label: "label.address1",
    placeholder: "label.address1",
    validate: (value) => {
      if (!value) {
        return "Address is required";
      }
    },
  },
  {
    key: "permanent_address2",
    isMultiline: true,
    noOfRows: 2,
    label: "label.address2",
    placeholder: "label.address2",
  },
  {
    key: "permanent_address3",
    isMultiline: true,
    noOfRows: 2,
    label: "label.address3",
    placeholder: "label.address3",
  },
  {
    key: "permanent_country",
    isMandatory: true,
    label: "label.country",
    placeholder: "label.country",
    validate: (value) => {
      if (!value) {
        return "Country is required";
      }
    },
  },
  {
    key: "permanent_state",
    isMandatory: true,
    label: "label.state",
    placeholder: "label.state",
    validate: (value) => {
      if (!value) {
        return "State is required";
      }
    },
  },
  {
    key: "permanent_city",
    isMandatory: true,
    label: "label.city",
    placeholder: "label.city",
    validate: (value) => {
      if (!value) {
        return "City is required";
      }
    },
  },
  {
    key: "permanent_pincode",
    isMandatory: true,
    isNumeric: true,
    label: "label.pincode",
    placeholder: "label.pincode",
    validate: (value) => {
      if (!value) {
        return "Pincode is required";
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

export const usePersonalDetails = ({ state, isEditable }) => {
  const intl = useIntl();
  const { data: countryData } = useFetch({ url: COUNTRY_CODE });
  const { data: categoryData } = useFetch({ url: MEMBER_CATEGORY });
  const [accessibility_information_state, setAccessibility_information_state] =
    useState(accessibility_information);
  const [personal_detail_state, setPersonalDetailState] = useState(
    personal_detail(categoryData)
  );
  const [correspondence_address_state, setCorrespondenceAddressState] =
    useState(correspondence_address(countryData));
  const [permanent_address_state, setPermanentAddressState] =
    useState(permanent_address);

  useEffect(() => {
    setCorrespondenceAddressState(correspondence_address(countryData));
    setPersonalDetailState(personal_detail(categoryData));
  }, [countryData]);

  const handlePersonalDetailBlur = (key, index) => {
    setPersonalDetailState(
      validateOnBlur({
        state,
        details: personal_detail_state,
        key,
        index,
        intl,
      })
    );
  };
  const handlePermanentAddressBlur = (key, index) => {
    setPermanentAddressState(
      validateOnBlur({
        state,
        details: permanent_address_state,
        key,
        index,
        intl,
      })
    );
  };
  const handleCorrespondenceAddressBlur = (key, index) => {
    setCorrespondenceAddressState(
      validateOnBlur({
        state,
        details: correspondence_address_state,
        key,
        index,
        intl,
      })
    );
  };

  const handleAccessibilityInformationBlur = (key, index) => {
    setAccessibility_information_state(
      validateOnBlur({
        state,
        details: accessibility_information_state,
        key,
        index,
        intl,
      })
    );
  };

  const checkMandatoryFields = () => {
    let error = false;
    [
      ...accessibility_information_state,
      ...personal_detail_state,
      ...correspondence_address_state,
      ...permanent_address_state,
    ].forEach((item) => {
      if (item.isMandatory && !state[item.key]) {
        error = true;
      }
    });
    return error;
  };

  return {
    accessibility_information: addValueOnField({
      state,
      details: accessibility_information_state,
      isEditable,
    }),
    personal_detail: addValueOnField({
      state,
      details: personal_detail_state,
      isEditable,
    }),
    correspondence_address: addValueOnField({
      state,
      details: correspondence_address_state,
      isEditable,
    }),
    permanent_address: addValueOnField({
      state,
      details: permanent_address_state,
      isEditable,
    }),
    handleAccessibilityInformationBlur,
    handlePersonalDetailBlur,
    handleCorrespondenceAddressBlur,
    handlePermanentAddressBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
