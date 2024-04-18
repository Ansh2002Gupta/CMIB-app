import React from "react";

import commonStyles from "../../../../theme/styles/commonStyles";
import useCentralDetailsForm from "./controllers/useCentralDetailsForm";
import CentralDetailsTemplate from "./CentralDetailsTemplate";
import useCentralDetails from "./controllers/useCentralDetails";

const CentralDetailsForm = ({ tabHandler }) => {
  const centerDetails = useCentralDetails({ tabHandler });

  return <CentralDetailsTemplate {...centerDetails} />;
};

export default CentralDetailsForm;
