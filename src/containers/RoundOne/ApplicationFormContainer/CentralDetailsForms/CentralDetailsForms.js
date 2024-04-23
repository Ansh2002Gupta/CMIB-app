import React from "react";

import commonStyles from "../../../../theme/styles/commonStyles";
import useCentralDetailsForm from "./controllers/useCentralDetailsForm";
import CentralDetailsTemplate from "./CentralDetailsTemplate";
import useCentralDetails from "./controllers/useCentralDetails";

const CentralDetailsForm = ({ isEditable, tabHandler, setIsEditable }) => {
  const centerDetails = useCentralDetails({ tabHandler });
  return (
    <CentralDetailsTemplate
      {...{ ...centerDetails, isEditable, setIsEditable, tabHandler }}
    />
  );
};

export default CentralDetailsForm;
