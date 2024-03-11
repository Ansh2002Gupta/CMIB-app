import { useState } from "react";

import Http from "../../../http-service";
import { COUNTRY_CODE, GET_FUNCTIONAL_TYPE } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import useFetch from "../../../../hooks/useFetch";
import { Platform } from "@unthinkable/react-core-components";

const useGetPostedJobsData = () => {
  const {
    data: countryData,
    isLoading: isGettingCountryCodes,
    isSuccess: isCountryDataSucces,
    isError: isErrorGettingCountryCode,
    error: errorCountryCodes,
  } = useFetch({ url: COUNTRY_CODE });

  const {
    data: functionalData,
    isLoading: isGettingFunctionalType,
    isError: isErrorFunctionalType,
    isSuccess: isFunctionalDataSucces,
    error: errorFunctionalType,
  } = useFetch({ url: GET_FUNCTIONAL_TYPE });

  // Combine the loading states from all hooks
  const isLoading = isGettingCountryCodes || isGettingFunctionalType;

  // Combine the success states from all hooks
  const isSuccess = isFunctionalDataSucces && isCountryDataSucces;

  // Check if any of the hooks encountered an error
  const isError = [isErrorFunctionalType, isErrorGettingCountryCode].some(
    (fetch) => fetch.isError
  );

  return {
    isLoading,
    isSuccess,
    isError,
    countryData,
    functionalData,
  };
};

export default useGetPostedJobsData;
