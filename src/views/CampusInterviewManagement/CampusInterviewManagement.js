import React from "react";

import CommonText from "../../components/CommonText";
import CampusInterviewManagementTemplate from "./CampusInterviewManagementTemplate";
import useCampusInterviewManagement from "./controller/useCampusInterviewManagement";

const CampusInterviewManagement = () => {
  const {
    intl,
  } = useCampusInterviewManagement();
  return <>
    <CampusInterviewManagementTemplate
      intl={intl}
    />
  </>;
};

export default CampusInterviewManagement;
