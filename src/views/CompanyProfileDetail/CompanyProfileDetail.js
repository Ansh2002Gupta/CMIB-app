import { View } from "@unthinkable/react-core-components";
import React from "react";
import useCompanyProfileDetail from "./controller/useCompanyProfileDetail";
import CompanyProfileDetailUI from "./CompanyProfileDetailUI";

const CompanyProfileDetail = () => {
  const companyProfile = useCompanyProfileDetail();
  
  return (
    <View>
      <CompanyProfileDetailUI {...companyProfile} />
    </View>
  );
};

export default CompanyProfileDetail;
