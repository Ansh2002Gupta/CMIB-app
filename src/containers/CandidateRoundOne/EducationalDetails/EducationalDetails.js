import React from "react";

import EducationalDetailsTemplate from "./EducationalDetailsTemplate";
import useEducationalDetails from "./controllers/useEducationalDetails";

const EducationalDetails = ({intl, isWebView}) => {
  const { educationalTabList, onChangeTab, selectedTab } =
    useEducationalDetails();
  return (
    <EducationalDetailsTemplate
      educationalTabList={educationalTabList}
      intl={intl}
      isWebView={isWebView}
      onChangeTab={onChangeTab}
      selectedTab={selectedTab}
    />
  );
};

export default EducationalDetails;
