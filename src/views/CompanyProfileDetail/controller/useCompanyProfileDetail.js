import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { COMPANY_TYPE_OPTIONS_KEYS } from "../../../constants/constants";

const keys = {
  companyName: "companyName",
  entity: "entity",
  firmRegistration: "firmRegistration",
  partnersNo: "partnersNo",
  current_industry: "current_industry",
  addressOfCorrespondence: "addressOfCorrespondence",
  state: "state",
  isd_std_code: "isd_std_code",
  telephoneNumber: "telephoneNumber",

  short_profile_of_the_company: "short_profile_of_the_company",
  website: "website",
  nature_of_supplier: "nature_of_supplier",
  company_type: "company_type",

  contactPersonName: "contactPersonName",
  contactPersonEmail: "contactPersonEmail",
  contactPersonDesignation: "contactPersonDesignation",
  contactPersonCountryCode: "contactPersonCountryCode",
  contactPersonMobileNo: "contactPersonMobileNo",
};

const companyDetail = () => [
  [
    {
      key: keys.companyName,
      isMandatory: true,
      label: "label.company_name",
      placeholder: "label.company_name",
    },
    {
      key: keys.entity,
      isMandatory: true,
      label: "label.entity",
      placeholder: "label.entity",
    },
    {
      key: keys.firmRegistration,
      isMandatory: true,
      label: "label.firmRegistration",
      placeholder: "label.firmRegistration",
    },
  ],
  [
    {
      key: keys.partnersNo,
      isMandatory: true,
      label: "label.partnersNo",
      placeholder: "label.partnersNo",
    },
    {
      key: keys.current_industry,
      isMandatory: true,
      label: "label.current_industry",
      placeholder: "label.current_industry",
    },
    {
      key: keys.addressOfCorrespondence,
      isMandatory: true,
      label: "label.addressOfCorrespondence",
      placeholder: "label.addressOfCorrespondence",
    },
  ],
  [
    {
      key: keys.state,
      isMandatory: true,
      label: "label.state",
      placeholder: "label.state",
    },
    {
      key: keys.isd_std_code,
      isMandatory: true,
      label: "label.isd_std_code",
      placeholder: "label.isd_std_code",
    },
    {
      key: keys.telephoneNumber,
      isMandatory: true,
      label: "label.telephoneNumber",
      placeholder: "label.telephoneNumber",
    },
  ],
];
const otherDetail = () => [
  [
    {
      key: keys.short_profile_of_the_company,
      isMandatory: true,
      label: "label.short_profile_of_the_company",
      placeholder: "label.short_profile_of_the_company",
    },
  ],
  [
    {
      key: keys.website,
      isMandatory: true,
      label: "label.website",
      placeholder: "label.website",
      isLink: true,
    },
    {
      key: keys.nature_of_supplier,
      isMandatory: true,
      label: "label.nature_of_supplier",
      placeholder: "label.nature_of_supplier",
    },
    {
      key: keys.company_type,
      isMandatory: true,
      label: "label.company_type",
      placeholder: "label.company_type",
    },
  ],
];

const contactPersonDetail = () => [
  [
    {
      key: keys.contactPersonName,
      isMandatory: true,
      label: "label.name",
      placeholder: "label.name",
    },
    {
      key: keys.contactPersonEmail,
      isMandatory: true,
      label: "label.email",
      placeholder: "label.email",
    },
    {
      key: keys.contactPersonDesignation,
      isMandatory: true,
      label: "label.designation",
      placeholder: "label.designation",
    },
  ],
  [
    {
      key: keys.contactPersonCountryCode,
      isMandatory: true,
      label: "label.country_code",
      placeholder: "label.country_code",
    },
    {
      key: keys.contactPersonMobileNo,
      isMandatory: true,
      label: "label.mobile_number",
      placeholder: "label.mobile_number",
    },
    { isEmptyView: true },
  ],
];

const addValueOnField = ({ state, details, isEditable }) => {
  return details.map((row, index) => {
    return row.map((item) => {
      const { key, isEmptyView } = item;
      if (isEmptyView) return { ...item };
      let value = isEditable ? state[key] : !state[key] ? "--" : state[key];
      return {
        ...item,
        value,
      };
    });
  });
};

const useCompanyProfileDetail = ({ data }) => {
  const intl = useIntl();
  const [profileData, setProfileData] = useState({});

  const setDataInState = (data) => {
    setProfileData({
      [keys.companyName]: data?.name ?? "",
      [keys.entity]: data?.entity ?? "",
      [keys.firmRegistration]: data?.frn_number ?? "",
      [keys.partnersNo]: data?.number_of_partners ?? "",
      [keys.current_industry]: data?.industry_type?.name ?? "",
      [keys.addressOfCorrespondence]: data?.address ?? "",
      [keys.state]: data?.state ?? "",
      [keys.isd_std_code]: data?.std_country_code ?? "",
      [keys.telephoneNumber]: data?.telephone_number ?? "",
      [keys.short_profile_of_the_company]: data?.company_details ?? "",
      [keys.website]: data?.website ?? "",
      [keys.nature_of_supplier]: data?.nature_of_suppliers ?? "",
      [keys.company_type]: COMPANY_TYPE_OPTIONS_KEYS[data?.type] ?? "",
      [keys.contactPersonName]: data?.contact_person_details?.[0]?.name ?? "",
      [keys.contactPersonEmail]: data?.contact_person_details?.[0]?.email ?? "",
      [keys.contactPersonDesignation]:
        data?.contact_person_details?.[0]?.designation ?? "",
      [keys.contactPersonCountryCode]:
        data?.contact_person_details?.[0]?.mobile_country_code ?? "",
      [keys.contactPersonMobileNo]:
        data?.contact_person_details?.[0]?.mobile ?? "",
    });
  };

  useEffect(() => {
    if (data) {
      setDataInState(data);
    }
  }, [data]);

  return {
    companyDetails: addValueOnField({
      state: profileData,
      details: companyDetail(intl),
    }),
    otherDetails: addValueOnField({
      state: profileData,
      details: otherDetail(intl),
    }),
    contactPersonDetail: addValueOnField({
      state: profileData,
      details: contactPersonDetail(intl),
    }),
  };
};

export default useCompanyProfileDetail;
