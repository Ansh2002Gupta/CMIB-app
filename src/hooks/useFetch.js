import { useEffect, useState } from "react";

import useHttpService from "../services/hooks/useHttpService";
import { objectToQueryString } from "../utils/queryParamsHelpers";
import { API_STATUS, STATUS_CODES } from "../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../constants/errorMessages";

/** 
 * 1. useFetch will initiate the API call on component mount automatically so that you don't require to use the useEffect hook in your component explicitly just to call the API.
 * 
 * 2. You can anytime omit this behaviour by passing skipApiCallOnMount: true inside the otherOptions object.
 * 
 * 3. "apiOptions" object is added so that you can pass custom data to the axios get method. For ex- headers.
 * 
 * Example to use this hook
 *  const { data } = useFetch({
    url: API_ENDPOINT,
    apiOptions: {
      headers: {
        sampleHeader: "value",
      },
    },
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
 * */

const useFetch = ({ url, apiOptions = {}, otherOptions = {} }) => {
  const [data, setData] = useState(null);
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState(null);

  const { Http } = useHttpService();

  const { skipApiCallOnMount } = otherOptions || {};

  const fetchData = async ({ overrideUrl, queryParamsObject } = {}) => {
    try {
      let modifiedURL = overrideUrl || url; // Use overrideUrl if provided, otherwise use the default url
      if (queryParamsObject && objectToQueryString(queryParamsObject)) {
        modifiedURL = `${modifiedURL}?${objectToQueryString(
          queryParamsObject
        )}`;
      }
      setApiStatus(API_STATUS.LOADING);
      error && setError("");
      const res = await Http.get(modifiedURL, apiOptions);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setData(res?.data);
        return res?.data;
      }
      setApiStatus(API_STATUS.ERROR);
      setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);
      setError(err?.response || GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    if (skipApiCallOnMount) {
      return;
    }
    fetchData();
  }, [url]);

  useEffect(() => {
    return () => {
      setData(null);
      setApiStatus(STATUS_CODES.API_STATUS);
      setError(null);
    };
  }, []);

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiStatus,
    data,
    error,
    fetchData,
    isError,
    isLoading,
    isSuccess,
    setError,
    setData,
  };
};

export default useFetch;
