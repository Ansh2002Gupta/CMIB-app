import React from "react";

import PreInterviewPreferencesTemplate from "./PreInterviewPreferencesTemplate";
import usePreInterviewForm from "./controllers/usePreInterviewForm";

const PreInterviewPreferences = ({ tabhandler }) => {
  const { handleInterviewPreferences, preInterviewDetails } =
    usePreInterviewForm();

  return (
    <PreInterviewPreferencesTemplate
      {...{
        tabhandler,
        handleInterviewPreferences,
        preInterviewDetails,
      }}
    />
  );
};

export default PreInterviewPreferences;
