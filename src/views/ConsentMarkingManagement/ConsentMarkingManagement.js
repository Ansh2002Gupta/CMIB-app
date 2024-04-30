import React from "react";

import CommonText from "../../components/CommonText";
import styles from "./ConsentMarkingManagement.styles";
import ConsentMarkingManagementTemplate from "./ConsentMarketingManagementTemplate";
import useContentMarketingManagement from "./controller/useContentMarketingManagement";

const ConsentMarkingManagement = () => {
  const {
    intl,
  } = useContentMarketingManagement();
  return <>
    <ConsentMarkingManagementTemplate
      intl={intl}
    />
  </>;
};

export default ConsentMarkingManagement;
