import React from "react";

import commonStyles from "../../../../theme/styles/commonStyles";
import useCentralDetailsForm from "./controllers/useCentralDetailsForm";
import CentralDetailsTemplate from "./CentralDetailsTemplate";
import useCentralDetails from "./controllers/useCentralDetails";

const CentralDetailsForm = ({ isEditable, tabHandler }) => {
  const centerDetails = useCentralDetails({ tabHandler });
  return (
    <CentralDetailsTemplate {...{ ...centerDetails, isEditable, tabHandler }} />
  );
};

export default CentralDetailsForm;
