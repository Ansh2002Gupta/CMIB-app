import { useState } from "react";

const useApplicationForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const onHandleTab = (direction) => {
    setActiveStep((prevTab) => {
      if (direction === "next") {
        return prevTab + 1;
      } else if (direction === "prev" && prevTab > 0) {
        return prevTab - 1;
      }
      return prevTab;
    });
  };

  return {
    activeStep,
    setActiveStep,
    onHandleTab,
  };
};

export default useApplicationForm;
