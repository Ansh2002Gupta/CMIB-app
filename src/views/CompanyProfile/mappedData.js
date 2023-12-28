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

  console.log("INDU", industryOptions);
  return {
    companyDetail: [
      { label: "label.company_name", value: name },
      {
        label: "label.entity",
        value: entity,
        isDropdown: true,
        options: ENTITY_OPTIONS,
      },
      { label: "label.firm_registration_no", value: frn_number, isMajor: true },
      {
        label: "label.no_of_partners",
        value: number_of_partner,
        isMinor: true,
      },
      {
        label: "label.current_industry",
        value: industry?.name,
        isDropdown: true,
        options: industryOptions,
        labelField: "name",
        valueField: "name",
        inputKey: "id",
      },
      {
        label: "label.address_for_correspondence",
        value: address,
        isMultiline: true,
      },
      { label: "label.email_id", value: email },
      { label: "label.isd_std_code", value: std_country_code, isMinor: true },
      { label: "label.telephone_no", value: telephone_number, isMajor: true },
    ],
    contactPersonInfo: [
      {
        label: "label.salutation",
        value: contact_person_salutation,
        isMinor: true,
        isDropdown: true,
        options: SALUTATION_OPTIONS,
      },
      {
        label: "label.contact_person_name",
        value: contact_person_name,
        isMajor: true,
      },
      {
        label: "label.contact_personal_designation",
        value: contact_person_designation,
      },
      {
        label: "label.mobile_number",
        value:
          contact_person_mobile_country_code +
          "-" +
          contact_person_mobile_number,
      },
      { label: "label.email_id", value: contact_person_email },
    ],
    companyProfile: [
      {
        label: "label.short_profile_of_the_company",
        value: company_details,
        isMultiline: true,
      },
    ],
    otherDetails: [
      { label: "label.website", value: website, isLink: true },
      {
        label: "label.nature_of_supplier",
        value: nature_of_supplier,
        isDropdown: true,
        options: NATURE_OF_SUPPLIER,
      },
      {
        label: "label.company_type",
        value: type,
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
