import { useIntl } from "react-intl";
import useFetch from "../../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";

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

const useCompanyProfileDetail = ({ centerId, companyId }) => {
  const intl = useIntl();
  const [profileData, setProfileData] = useState({});
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const { data, fetchData: fetchCompanyDetail } = useFetch({
    url: `member/${selectedModule.key}/centres/${centerId}/companies/${companyId}/profile`,
  });

  const setDataInState = (data) => {
    setProfileData({
      [keys.companyName]: data.name,
      [keys.entity]: data.entity,
      [keys.firmRegistration]: data.frn_number,
      [keys.partnersNo]: data.number_of_partners,
      [keys.current_industry]: data.industry_type?.name,
      [keys.addressOfCorrespondence]: data.address,
      [keys.state]: "",
      [keys.isd_std_code]: data.std_country_code,
      [keys.telephoneNumber]: data.telephone_number,
      [keys.short_profile_of_the_company]: data.company_details,
      [keys.website]: data.website,
      [keys.nature_of_supplier]: data.nature_of_suppliers,
      [keys.company_type]: "",
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
  };
};

export default useCompanyProfileDetail;
