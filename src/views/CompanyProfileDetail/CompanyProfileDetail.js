import React from "react";
import useCompanyProfileDetail from "./controller/useCompanyProfileDetail";
import CompanyProfileDetailUI from "./CompanyProfileDetailUI";

const CompanyProfileDetail = ({ data }) => {
  const companyProfile = useCompanyProfileDetail({ data });

  return <CompanyProfileDetailUI {...companyProfile} />;
};

export default CompanyProfileDetail;
