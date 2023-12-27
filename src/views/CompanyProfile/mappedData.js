export const mapApiDataToUI = (apiData) => {
  const {
    name,
    entity,
    frn_number,
    number_of_partner,
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
      { title: "Company Name", value: name },
      { title: "Entity", value: entity },
      { title: "Firm Registration No.[FRN]", value: frn_number, isMajor: true },
      { title: "Partners(No.)", value: number_of_partner, isMinor: true },
      { title: "Current Industry", value: number_of_partner },
      { title: "Address of Correspondence", value: address },
      { title: "Email ID", value: email },
      { title: "ISD/STD Code", value: std_country_code, isMajor: true },
      { title: "Telephone Number", value: telephone_number, isMinor: true },
    ],
    contactPersonInfo: [
      { title: "Salutation", value: contact_person_salutation, isMinor: true },
      {
        title: "Contact Person Name",
        value: contact_person_name,
        isMajor: true,
      },
      {
        title: "Contact Person Designation",
        value: contact_person_designation,
      },
      {
        title: "Mobile Number",
        value:
          contact_person_mobile_country_code +
          "-" +
          contact_person_mobile_number,
      },
      { title: "Email ID", value: contact_person_email },
    ],
    companyProfile: [
      { title: "Short Profile of the Company", value: company_details },
    ],
    otherDetails: [
      { title: "Website", value: website, isLink: true },
      { title: "Nature of Supplier", value: nature_of_supplier },
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
