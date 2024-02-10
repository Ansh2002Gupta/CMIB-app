import React from "react";
import useFetch from "../../../hooks/useFetch";

import AddApplicationTemplate from "./AddApplicationTemplate";
import useAddApplication from "./controller/useAddApplication";
import useIsWebView from "../../../hooks/useIsWebView";
import { COUNTRY_CODE } from "../../../services/apiServices/apiEndPoint";

const AddApplication = () => {
  const {
    intl,
    onChangeStepper,
    onClickBack,
    onClickCancel,
    selectedStepper,
    stepperData,
  } = useAddApplication();

  const { data } = useFetch({ url: COUNTRY_CODE });
  const { isWebView } = useIsWebView();

  return (
    <AddApplicationTemplate
      countryCodeData={data}
      intl={intl}
      isWebView={isWebView}
      onChangeStepper={onChangeStepper}
      onClickCancel={onClickCancel}
      onClickBack={onClickBack}
      selectedStepper={selectedStepper}
      stepperData={stepperData}
    />
  );
};

export default AddApplication;
