export const mapApiDataToUI = (apiData) => {
  const {
    name,
    entity,
    frn_number,
    number_of_partner,
    industry_type,
    std_country_code,
    telephone_number,
    address,
    email,
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

  return {
    companyDetail: [
      { title: "label.company_name", value: name },
      { title: "label.entity", value: entity },
      { title: "label.firm_registration_no", value: frn_number, isMajor: true },
      {
        title: "label.no_of_partners",
        value: number_of_partner,
        isMinor: true,
      },
      { title: "label.current_industry", value: industry_type },
      { title: "label.address_for_correspondence", value: address },
      { title: "label.email_id", value: email },
      { title: "label.isd_std_code", value: std_country_code, isMinor: true },
      { title: "label.telephone_no", value: telephone_number, isMajor: true },
    ],
    contactPersonInfo: [
      {
        title: "label.salutation",
        value: contact_person_salutation,
        isMinor: true,
      },
      {
        title: "label.contact_person_name",
        value: contact_person_name,
        isMajor: true,
      },
      {
        title: "label.contact_personal_designation",
        value: contact_person_designation,
      },
      {
        title: "label.mobile_number",
        value:
          contact_person_mobile_country_code +
          "-" +
          contact_person_mobile_number,
      },
      { title: "label.email_id", value: contact_person_email },
    ],
    companyProfile: [
      { title: "label.short_profile_of_the_company", value: company_details },
    ],
    otherDetails: [
      { title: "label.website", value: website, isLink: true },
      { title: "label.nature_of_supplier", value: nature_of_supplier },
    ],
    sourceOfInfo: source_of_information,
    companyLogo: company_logo,
  };
};

export const sourceOfInfo = [
  "Campus",
  "Based on Previous Participation",
  "Telephonic Call",
];
