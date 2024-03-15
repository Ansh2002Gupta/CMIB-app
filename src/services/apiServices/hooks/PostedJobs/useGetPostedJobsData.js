import { useState } from "react";

import Http from "../../../http-service";
import {
  COUNTRY_CODE,
  GET_FUNCTIONAL_TYPE,
  GET_JOB_LOCATION,
} from "../../apiEndPoint";
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
  const {
    data: jobLocationData,
    isLoading: isLoadingJobLocation,
    isError: isErrorJobLocation,
    isSuccess: isJobLocationSucces,
    error: errorJobLocation,
  } = useFetch({ url: GET_JOB_LOCATION });

  // Combine the loading states from all hooks
  const isLoading =
    isGettingCountryCodes || isGettingFunctionalType || isLoadingJobLocation;

  // Combine the success states from all hooks
  const isSuccess =
    (isFunctionalDataSucces && isCountryDataSucces) || isJobLocationSucces;

  // Check if any of the hooks encountered an error
  const isError = [
    isErrorFunctionalType,
    isErrorGettingCountryCode,
    // isErrorJobLocation,
  ].some((fetch) => {
    return fetch == true;
  });
  const isErrorData = [
    errorCountryCodes,
    errorFunctionalType,
    // errorJobLocation,
  ].find((error) => error !== null);

  return {
    isLoading,
    isSuccess,
    isError,
    countryData,
    functionalData,
    jobLocationData,
    isErrorData,
  };
};

export default useGetPostedJobsData;
