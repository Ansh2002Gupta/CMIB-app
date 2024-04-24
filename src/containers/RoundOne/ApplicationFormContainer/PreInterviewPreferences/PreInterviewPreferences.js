import React from "react";

import PreInterviewPreferencesTemplate from "./PreInterviewPreferencesTemplate";
import usePreInterviewForm from "./controllers/usePreInterviewForm";

const PreInterviewPreferences = ({ tabHandler, isEditable, setIsEditable }) => {
  const { handleInterviewPreferences, preInterviewDetails } =
    usePreInterviewForm();

  return (
    <PreInterviewPreferencesTemplate
      {...{
        isEditable,
        tabHandler,
        handleInterviewPreferences,
        preInterviewDetails,
        setIsEditable,
      }}
    />
  );
};

export default PreInterviewPreferences;
