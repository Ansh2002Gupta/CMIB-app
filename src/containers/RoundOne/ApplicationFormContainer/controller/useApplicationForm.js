import { useState } from "react";

const useApplicationForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const onHandleTab = (direction) => {
    setActiveStep((prevTab) => {
      if (direction === "next") {
        return prevTab + 1;
      }
      if (direction === "prev" && prevTab > 0) {
        return prevTab - 1;
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
