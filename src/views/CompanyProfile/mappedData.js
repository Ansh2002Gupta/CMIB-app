import {
  COMPANY_TYPE_OPTIONS,
  ENTITY_OPTIONS,
  NATURE_OF_SUPPLIER,
  SALUTATION_OPTIONS,
} from "../../constants/constants";

export const mapApiDataToUI = (
  apiData,
  industryOptions,
  isEditMode = false
) => {
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

  const checkValue = (value, showPlaceholder = true) => {
    if (isEditMode) {
      return value || "";
    }
    return value || (showPlaceholder ? "--" : "");
  };

  const formatMobileNumber = (countryCode, mobileNumber) => {
    const code = checkValue(countryCode);
    const number = checkValue(mobileNumber);
    if (code === "--" && number === "--") {
      return "--";
    }
    return (code + "-" + number).replace(/--/g, "-");
  };

  const combinedMobileNumber = formatMobileNumber(
    contact_person_mobile_country_code,
    contact_person_mobile_number
  );

  return {
    companyDetail: [
      {
        key: "companyName",
        label: "label.company_name",
        value: checkValue(name),
        maxLength: 255,
      },
      {
        label: "label.entity",
        value: checkValue(entity),
        isDropdown: true,
        options: ENTITY_OPTIONS,
        inputKey: "label",
      },
      {
        key: "registrationNo",
        label: "label.firm_registration_no",
        value: checkValue(frn_number),
        isNumeric: true,
        maxLength: 10,
        isMajor: true,
      },
      {
        key: "noOfPartners",
        label: "label.no_of_partners",
        value: checkValue(number_of_partner),
        isMinor: true,
        isNumeric: true,
      },
      {
        label: "label.current_industry",
        value: checkValue(industry?.name),
        isDropdown: true,
        options: industryOptions,
        labelField: "name",
        valueField: "name",
        inputKey: "name",
      },
      {
        key: "address",
        label: "label.address_for_correspondence",
        value: checkValue(address),
        isMultiline: true,
        maxLength: 500,
      },
      {
        key: "emailId",
        label: "label.email_id",
        value: checkValue(email),
      },
      {
        key: "code",
        label: "label.isd_std_code",
        isNumeric: true,
        value: checkValue(std_country_code),
        isMinor: true,
        maxLength: 8,
      },
      {
        key: "telephoneNo",
        label: "label.telephone_no",
        isNumeric: true,
        value: checkValue(telephone_number),
        isMajor: true,
        maxLength: 15,
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
        key: "name",
        label: "label.contact_person_name",
        value: checkValue(contact_person_name),
        isMajor: true,
        maxLength: 255,
      },
      {
        key: "designation",
        label: "label.contact_personal_designation",
        value: checkValue(contact_person_designation),
        maxLength: 500,
      },
      {
        key: "mobileNo",
        label: "label.mobile_number",
        isMobileNumber: true,
        value: isEditMode ? contact_person_mobile_number : combinedMobileNumber,
        isNumeric: true,
        maxLength: 10,
      },
      {
        key: "contactEmailId",
        label: "label.enter_contact_person_email_id",
        value: checkValue(contact_person_email),
      },
    ],
    companyProfile: [
      {
        key: "companyDetail",
        label: "label.short_profile_of_the_company",
        value: checkValue(company_details),
        isMultiline: true,
        maxLength: 100,
      },
    ],
    otherDetails: [
      {
        key: "website",
        label: "label.website",
        value: checkValue(website),
        isLink: website && true,
      },
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
