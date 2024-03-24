import { useState, useEffect } from "react";

import { mapApiDataToUI } from "../mapPreInterviewData";

const usePreInterviewForm = () => {
  const [preInterviewDetails, setPreInterviewDetails] = useState(null);

  useEffect(() => {
    setPreInterviewDetails(mapApiDataToUI);
  }, []);

  const handleInterviewPreferences = (fieldName, value) => {
    setPreInterviewDetails((prevDetails) => ({
      ...prevDetails,
      preInterviewPrefrences: prevDetails.preInterviewPrefrences.map((detail) =>
        detail.label === fieldName ? { ...detail, value } : detail
      ),
    }));
  };

  return {
    handleInterviewPreferences,
    preInterviewDetails,
  };
};

export default usePreInterviewForm;
