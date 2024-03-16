import { useEffect, useState } from "react";
import {
  GENDER,
  MARITAL_STATUS,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  numRegex,
} from "../../../constants/constants";
import useFetch from "../../../hooks/useFetch";
import { COUNTRY_CODE } from "../../../services/apiServices/apiEndPoint";
import { useIntl } from "react-intl";

const personal_detail = [
  {
    key: "gender",
    isMandatory: true,
    isDropDown: true,
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
    isDropDown: true,
    options: MARITAL_STATUS,
    label: "label.marital_status",
    placeholder: "label.marital_status",
  },
  {
    key: "date_of_birth",
    isMandatory: true,
    isDate: true,
    label: "label.date_of_birth",
    placeholder: "label.date_of_birth",
  },
  {
    key: "email",
    isMandatory: true,
    isEmail: true,
    label: "label.email",
    placeholder: "label.email",
  },
  {
    key: "passport",
    isMandatory: true,
    isRadio: true,
    label: "label.passport",
    placeholder: "label.passport",
  },
  {
    key: "phone",
    isMandatory: true,
    isPhone: true,
    label: "label.passport_number",
    placeholder: "label.passport_number",
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
  },
  {
    key: "address2",
    isMandatory: true,
    isMultiline: true,
    noOfRows: 2,
    label: "label.address2",
    placeholder: "label.address2",
  },
  {
    key: "address3",
    isMandatory: true,
    isMultiline: true,
    noOfRows: 2,
    label: "label.address3",
    placeholder: "label.address3",
  },
  {
    key: "country",
    isMandatory: true,
    isDropDown: true,
    label: "label.country",
    placeholder: "label.country",
  },
  {
    key: "state",
    isMandatory: true,
    isDropDown: true,
    label: "label.state",
    placeholder: "label.state",
  },
  {
    key: "city",
    isMandatory: true,
    isDropDown: true,
    label: "label.city",
    placeholder: "label.city",
  },
  {
    key: "pincode",
    isMandatory: true,
    isNumeric: true,
    label: "label.pincode",
    placeholder: "label.pincode",
  },
  {
    key: "mobile_number",
    isMandatory: true,
    isMobileNumber: true,
    label: "label.mobile_number",
    placeholder: "label.mobile_number",
    codeValue: "+91",
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
  },
  {
    key: "permanent_address2",
    isMandatory: true,
    isMultiline: true,
    noOfRows: 2,
    label: "label.address2",
    placeholder: "label.address2",
  },
  {
    key: "permanent_address3",
    isMandatory: true,
    isMultiline: true,
    noOfRows: 2,
    label: "label.address3",
    placeholder: "label.address3",
  },
  {
    key: "permanent_country",
    isMandatory: true,
    isDropDown: true,
    label: "label.country",
    placeholder: "label.country",
  },
  {
    key: "permanent_state",
    isMandatory: true,
    isDropDown: true,
    label: "label.state",
    placeholder: "label.state",
  },
  {
    key: "permanent_city",
    isMandatory: true,
    isDropDown: true,
    label: "label.city",
    placeholder: "label.city",
  },
  {
    key: "permanent_pincode",
    isMandatory: true,
    isNumeric: true,
    label: "label.pincode",
    placeholder: "label.pincode",
  },
];

const addValueOnField = ({ state, details }) => {
  return details.map((item) => {
    return {
      ...item,
      value: state[item.key],
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

export const usePersonalDetails = ({ state, setState }) => {
  const intl = useIntl();
  const { data: countryData } = useFetch({ url: COUNTRY_CODE });
  const [personal_detail_state, setPersonalDetailState] =
    useState(personal_detail);
  const [correspondence_address_state, setCorrespondenceAddressState] =
    useState(correspondence_address(countryData));
  const [permanent_address_state, setPermanentAddressState] =
    useState(permanent_address);

  useEffect(() => {
    setCorrespondenceAddressState(correspondence_address(countryData));
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

  return {
    personal_detail: addValueOnField({ state, details: personal_detail_state }),
    correspondence_address: addValueOnField({
      state,
      details: correspondence_address_state,
    }),
    permanent_address: addValueOnField({
      state,
      details: permanent_address_state,
    }),
    handlePersonalDetailBlur,
    handleCorrespondenceAddressBlur,
    handlePermanentAddressBlur,
  };
};
