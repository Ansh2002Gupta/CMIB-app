import { useState, useEffect } from "react";

import { mapApiDataToUI } from "../mapPreInterviewData";
import useGetCurrentUser from "../../../../../hooks/useGetCurrentUser";

const usePreInterviewForm = () => {
  const [preInterviewDetails, setPreInterviewDetails] = useState({});
  const { currentModule } = useGetCurrentUser();

  useEffect(() => {
    setPreInterviewDetails(mapApiDataToUI(currentModule));
  }, [currentModule]);

  const handleInterviewPreferences = (fieldName, value) => {
    setPreInterviewDetails((prevDetails) => ({
      ...prevDetails,
      preInterviewPrefrences: prevDetails.preInterviewPrefrences.map((detail) =>
        detail.label === fieldName ? { ...detail, value } : detail
      ),
    }));
  };

  console.log("preInterviewDetails", preInterviewDetails);

  return {
    handleInterviewPreferences,
    preInterviewDetails,
  };
};

export default usePreInterviewForm;
