import {
  COMPANY_TYPE_OPTIONS,
  ENTITY_OPTIONS,
  NATURE_OF_SUPPLIER,
  SALUTATION_OPTIONS,
} from "../../constants/constants";

export const mapApiDataToUI = (apiData, industryOptions) => {
  const {
    name,
    entity,
    frn_number,
    number_of_partner,
    credit_amount,
    industry,
    std_country_code,
    telephone_number,
    address,
    email,
    type,
    contact_person_salutation,
    contact_person_name,
    contact_person_designation,
    contact_person_mobile_country_code,
    contact_person_mobile_number,
    contact_person_email,
    company_details,
    website,
    nature_of_supplier,
    source_of_information,
    company_logo,
  } = apiData;

  const checkValue = (value) => (value ? value : "--");

  const formatMobileNumber = (countryCode, mobileNumber) => {
    const code = checkValue(countryCode);
    const number = checkValue(mobileNumber);
    if (code === "--" && number === "--") {
      return "--";
    }
    return (code + "-" + number).replace(/--/g, "-"); // Replace double hyphens with single
  };

  const combinedMobileNumber = formatMobileNumber(
    contact_person_mobile_country_code,
    contact_person_mobile_number
  );

  return {
    companyDetail: [
      { label: "label.company_name", value: checkValue(name) },
      {
        label: "label.entity",
        value: checkValue(entity),
        isDropdown: true,
        options: ENTITY_OPTIONS,
      },
      {
        label: "label.firm_registration_no",
        value: checkValue(frn_number),
        isMajor: true,
      },
      {
        label: "label.no_of_partners",
        value: checkValue(number_of_partner),
        isMinor: true,
      },
      {
        label: "label.current_industry",
        value: checkValue(industry?.name),
        isDropdown: true,
        options: industryOptions,
        labelField: "name",
        valueField: "name",
        inputKey: "id",
      },
      {
        label: "label.address_for_correspondence",
        value: checkValue(address),
        isMultiline: true,
      },
      { label: "label.email_id", value: checkValue(email) },
      {
        label: "label.isd_std_code",
        value: checkValue(std_country_code),
        isMinor: true,
      },
      {
        label: "label.telephone_no",
        value: checkValue(telephone_number),
        isMajor: true,
      },
    ],
    contactPersonInfo: [
      {
        label: "label.salutation",
        value: checkValue(contact_person_salutation),
        isMinor: true,
        isDropdown: true,
        options: SALUTATION_OPTIONS,
      },
      {
        label: "label.contact_person_name",
        value: checkValue(contact_person_name),
        isMajor: true,
      },
      {
        label: "label.contact_personal_designation",
        value: checkValue(contact_person_designation),
      },
      {
        label: "label.mobile_number",
        isMobileNumber: true,
        value: combinedMobileNumber,
      },
      { label: "label.email_id", value: checkValue(contact_person_email) },
    ],
    companyProfile: [
      {
        label: "label.short_profile_of_the_company",
        value: checkValue(company_details),
        isMultiline: true,
      },
    ],
    otherDetails: [
      { label: "label.website", value: checkValue(website), isLink: true },
      {
        label: "label.nature_of_supplier",
        value: checkValue(nature_of_supplier),
        isDropdown: true,
        options: NATURE_OF_SUPPLIER,
      },
      {
        label: "label.company_type",
        value: checkValue(type),
        isDropdown: true,
        options: COMPANY_TYPE_OPTIONS,
      },
    ],
    sourceOfInfo: source_of_information,
    companyLogo: company_logo,
    balanceCredit: credit_amount,
  };
};

export const sourceOfInfo = [
  "Campus",
  "Based on Previous Participation",
  "Telephonic Call",
];
