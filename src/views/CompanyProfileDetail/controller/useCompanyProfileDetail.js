import { useIntl } from "react-intl";

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
};

const companyDetail = (intl) => [
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
const otherDetail = (intl) => [
  [
    {
      key: keys.short_profile_of_the_company,
      isMandatory: true,
      label: "label.short_profile_of_the_company",
      placeholder: "label.short_profile_of_the_company",
    },
    { isEmptyView: true },
    { isEmptyView: true },
  ],
  [
    {
      key: keys.website,
      isMandatory: true,
      label: "label.website",
      placeholder: "label.website",
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

const useCompanyProfileDetail = () => {
  const intl = useIntl();

  return {
    companyDetails: addValueOnField({
      state: {},
      details: companyDetail(intl),
    }),
    otherDetails: addValueOnField({ state: {}, details: otherDetail(intl) }),
  };
};

export default useCompanyProfileDetail;
