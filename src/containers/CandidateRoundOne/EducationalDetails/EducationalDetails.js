import React, {useImperativeHandle, useRef, useEffect} from "react";

import EducationalDetailsTemplate from "./EducationalDetailsTemplate";
import useEducationalDetails from "./controllers/useEducationalDetails";

const EducationalDetails = ({intl, isWebView, handleSave}, ref) => {
  const { educationalTabList, onChangeTab, selectedTab } = useEducationalDetails();
  console.log("educationalTabList", educationalTabList, "selectedTab", selectedTab);

  const edDetailTemplateRef = useRef();

  useImperativeHandle(ref, () => ({
    getAllData: () => {
      return edDetailTemplateRef?.current?.getAllData();
    }
  }));

  useEffect(() => {
    // no fields in this tab are required so making it by default true
    handleSave(true);
  }, []);

  return (
    <EducationalDetailsTemplate
      educationalTabList={educationalTabList}
      intl={intl}
      isWebView={isWebView}
      onChangeTab={onChangeTab}
      selectedTab={selectedTab}
      ref={edDetailTemplateRef}
      handleSave={handleSave}
    />
  );
};

export default React.forwardRef(EducationalDetails);
