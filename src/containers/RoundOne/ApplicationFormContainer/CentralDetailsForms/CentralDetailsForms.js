import React from "react";
import { useLocation } from "../../../../routes";

import commonStyles from "../../../../theme/styles/commonStyles";
import useCentralDetailsForm from "./controllers/useCentralDetailsForm";
import CentralDetailsTemplate from "./CentralDetailsTemplate";
import useCentralDetails from "./controllers/useCentralDetails";

const CentralDetailsForm = ({ isEditable, tabHandler, setIsEditable }) => {
  const location = useLocation();
  const hasRoundTwo = location?.pathname.includes("round-two");
  const centerDetails = useCentralDetails({ tabHandler, hasRoundTwo });
  return (
    <CentralDetailsTemplate
      {...{
        ...centerDetails,
        isEditable,
        setIsEditable,
        tabHandler,
        hasRoundTwo,
      }}
    />
  );
};

export default CentralDetailsForm;
