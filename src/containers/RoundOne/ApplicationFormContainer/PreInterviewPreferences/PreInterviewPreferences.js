import React from "react";

import PreInterviewPreferencesTemplate from "./PreInterviewPreferencesTemplate";
import usePreInterviewForm from "./controllers/usePreInterviewForm";

const PreInterviewPreferences = ({ tabHandler, isEditable }) => {
  const { handleInterviewPreferences, preInterviewDetails } =
    usePreInterviewForm();

  return (
    <PreInterviewPreferencesTemplate
      {...{
        isEditable,
        tabHandler,
        handleInterviewPreferences,
        preInterviewDetails,
      }}
    />
  );
};

export default PreInterviewPreferences;
