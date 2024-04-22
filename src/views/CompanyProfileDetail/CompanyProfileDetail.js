import { View } from "@unthinkable/react-core-components";
import React from "react";
import useCompanyProfileDetail from "./controller/useCompanyProfileDetail";
import CompanyProfileDetailUI from "./CompanyProfileDetailUI";
import { useParams } from "react-router";

const CompanyProfileDetail = ({ centerId, companyId }) => {
  const companyProfile = useCompanyProfileDetail({ centerId, companyId });
  const params = useParams();

  return (
    <View>
      <CompanyProfileDetailUI {...companyProfile} />
    </View>
  );
};

export default CompanyProfileDetail;
