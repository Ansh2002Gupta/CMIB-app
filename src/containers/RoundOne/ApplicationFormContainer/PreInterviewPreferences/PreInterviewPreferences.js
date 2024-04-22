import React from "react";

import PreInterviewPreferencesTemplate from "./PreInterviewPreferencesTemplate";
import usePreInterviewForm from "./controllers/usePreInterviewForm";

const PreInterviewPreferences = ({ tabHandler }) => {
  const { handleInterviewPreferences, preInterviewDetails } =
    usePreInterviewForm();

  return (
    <PreInterviewPreferencesTemplate
      {...{
        tabHandler,
        handleInterviewPreferences,
        preInterviewDetails,
      }}
    />
  );
};

export default PreInterviewPreferences;
