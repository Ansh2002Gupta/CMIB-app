import React from "react";

import PreInterviewPreferencesTemplate from "./PreInterviewPreferencesTemplate";
import usePreInterviewForm from "./controllers/usePreInterviewForm";

const PreInterviewPreferences = () => {
  const { handleInterviewPreferences, preInterviewDetails } =
    usePreInterviewForm();

  return (
    <PreInterviewPreferencesTemplate
      {...{
        handleInterviewPreferences,
        preInterviewDetails,
      }}
    />
  );
};

export default PreInterviewPreferences;
