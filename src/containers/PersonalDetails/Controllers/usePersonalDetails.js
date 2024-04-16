import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import {
  COUNTRY_CODE,
  MEMBER_CATEGORY,
} from "../../../services/apiServices/apiEndPoint";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import {
  isValueEmpty,
  formatCountryCode,
  getNameById,
  booleanToYesNo,
} from "../../../utils/util";
import useFetch from "../../../hooks/useFetch";
import {
  ADDRESS_MAX_LENGTH,
  GENDER,
  MARITAL_STATUS,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  numRegex,
} from "../../../constants/constants";
import { validateEmail } from "../../../utils/validation";
import dayjs from "dayjs";
import useIsWebView from "../../../hooks/useIsWebView";

const accessibility_information = (has_disability) => {
  const commonFields = [
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
  ];
  const otherFileds = [
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
      isNumeric: true,
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
  if (has_disability) {
    return [...commonFields, ...otherFileds];
  } else {
    return commonFields;
  }
};

const personal_detail = (categoryData, has_passport, isWebView) => {
  const commonFields = [
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
      key: "dob",
      isMandatory: true,
      isDate: true,
      format: "DD/MM/YYYY",
      isCalendar: true,
      maxDate: Date.now(),
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
  ];
  const categoryId = {
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
  };

  const passportField = {
    key: "passport_number",
    isMandatory: true,
    label: "label.passport_number",
    placeholder: "label.passport_number",
    maxLength: 10,
    validate: (value) => {
      if (!value) {
        return "Passport Number is required";
      }
    },
  };

  if (has_passport) {
    return [
      ...commonFields,
      ...(isWebView
        ? [categoryId, passportField]
        : [passportField, categoryId]),
    ];
  } else {
    return [...commonFields, categoryId];
  }
};

const commonAddressToggleButton = [
  {
    key: "isCommonPermanentAddress",
    isToggle: true,
    label: "Is Permanent Address same as Correspondence Address?",
    placeholder: "label.address1",
  },
  { isEmptyField: true },
];

const correspondence_address = (countryData, isEditable) => [
  //only show this toggle button in edit mode
  ...(isEditable ? commonAddressToggleButton : []),
  {
    key: "address1",
    isMandatory: true,
    isMultiline: true,
    maxLength: ADDRESS_MAX_LENGTH,
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
    maxLength: ADDRESS_MAX_LENGTH,
    noOfRows: 2,
    label: "label.address2",
    placeholder: "label.address2",
  },
  {
    key: "address3",
    isMultiline: true,
    maxLength: ADDRESS_MAX_LENGTH,
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
        value?.length > NUMBER_MAX_LENGTH ||
        value?.length < NUMBER_MIN_LENGTH
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
    maxLength: ADDRESS_MAX_LENGTH,
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
    maxLength: ADDRESS_MAX_LENGTH,
    noOfRows: 2,
    label: "label.address2",
    placeholder: "label.address2",
  },
  {
    key: "permanent_address3",
    isMultiline: true,
    maxLength: ADDRESS_MAX_LENGTH,
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

const addValueOnField = ({
  state,
  details,
  isEditable,
  countryData,
  categoryData,
  intl,
}) => {
  return details.map((item) => {
    if (item?.isMobileNumber) {
      return {
        ...item,
        value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
        codeValue: formatCountryCode(state?.mobile_country_code, countryData),
      };
    }

    if (item.key === "dob") {
      return {
        ...item,
        value: isEditable
          ? state?.[item?.key]
          : state?.[item?.key] === null
          ? "--"
          : dayjs(state?.[item?.key]).format(item?.format),
      };
    }

    if (item.isToggle) {
      return {
        ...item,
        value: isEditable
          ? Boolean(state?.[item?.key] ?? false)
          : state?.[item?.key] === undefined
          ? "-"
          : booleanToYesNo(Boolean(state?.[item?.key])),
      };
    }
    if (item?.key === "category_id") {
      return {
        ...item,
        value: !isEditable
          ? !state?.[item?.key]
            ? "--"
            : getNameById(categoryData, state?.[item?.key])
          : state?.[item?.key],
        codeValue: formatCountryCode(state?.mobile_country_code, countryData),
      };
    }
    return {
      ...item,
      value: !isEditable && !state?.[item?.key] ? "--" : state?.[item?.key],
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
  const { isWebView } = useIsWebView();
  const { isCompany, currentModule } = useGetCurrentUser();
  const {
    data: countryData,
    isLoading: countryLoading,
    fetchData: fetchingCountryCode,
  } = useFetch({
    url: COUNTRY_CODE,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const {
    data: categoryData,
    isLoading: categoryLoading,
    fetchData: fetchingCategories,
  } = useFetch({
    url: MEMBER_CATEGORY,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const [accessibility_information_state, setAccessibility_information_state] =
    useState(accessibility_information(state?.has_disability));
  const [personal_detail_state, setPersonalDetailState] = useState(
    personal_detail(categoryData, state?.has_passport, isWebView)
  );
  const [correspondence_address_state, setCorrespondenceAddressState] =
    useState(correspondence_address(countryData, isEditable));
  const [permanent_address_state, setPermanentAddressState] =
    useState(permanent_address);

  useEffect(async () => {
    if (currentModule) {
      if (!isCompany) {
        await fetchingCategories();
        await fetchingCountryCode();
      }
    }
  }, [currentModule]);

  useEffect(() => {
    setAccessibility_information_state(
      accessibility_information(state?.has_disability)
    );
    setPersonalDetailState(personal_detail(categoryData, state?.has_passport));
    setCorrespondenceAddressState(
      correspondence_address(countryData, isEditable)
    );
    setPermanentAddressState(permanent_address);
  }, [countryData, categoryData, state, isEditable]);

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
      if (item.isMandatory && isValueEmpty(state[item.key])) {
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
      intl,
    }),
    personal_detail: addValueOnField({
      state,
      details: personal_detail_state,
      isEditable,
      categoryData,
      intl,
    }),
    correspondence_address: addValueOnField({
      state,
      details: correspondence_address_state,
      isEditable,
      countryData,
      intl,
    }),
    permanent_address: addValueOnField({
      state,
      details: permanent_address_state,
      isEditable,
      intl,
    }),
    isLoading: categoryLoading || countryLoading,
    handleAccessibilityInformationBlur,
    handlePersonalDetailBlur,
    handleCorrespondenceAddressBlur,
    handlePermanentAddressBlur,
    isValidAllFields: checkMandatoryFields(),
  };
};
