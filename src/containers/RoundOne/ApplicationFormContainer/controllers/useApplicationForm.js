import { useState } from "react";
import { useNavigate } from "../../../../routes";

import { navigations } from "../../../../constants/routeNames";

const useApplicationForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const onHandleTab = (direction) => {
    setActiveStep((prevTab) => {
      if (direction === "next") {
        return prevTab + 1;
      }
      if (direction === "prev" && prevTab > 0) {
        return prevTab - 1;
      }
      if (direction === "prev" && prevTab === 0) {
        navigate(navigations.ROUND_ONE);
      }
      return prevTab;
    });
  };

  return {
    activeStep,
    onHandleTab,
    setActiveStep,
  };
};

export default useApplicationForm;
