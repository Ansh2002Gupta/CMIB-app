import { useState } from "react";

import useHttpService from "../services/hooks/useHttpService";
import { objectToQueryString } from "../utils/queryParamsHelpers";
import { API_STATUS, STATUS_CODES } from "../constants/constants";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../constants/errorMessages";

const useApiRequest = ({ method, url, apiOptions = {}, otherOptions = {} }) => {
  const [data, setData] = useState(null);
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState(null);
  const { Http } = useHttpService();

  const makeRequest = async ({
    overrideUrl, // Allows the user to override the default URL if needed
    body,
    queryParamsObject = {},
    onSuccessCallback,
    onErrorCallback,
  }) => {
    const requestUrl = overrideUrl || url; // Use overrideUrl if provided, otherwise use the default url
    let modifiedURL = requestUrl;
    if (queryParamsObject && objectToQueryString(queryParamsObject)) {
      modifiedURL = `${requestUrl}?${objectToQueryString(queryParamsObject)}`;
    }
    try {
      setApiStatus(API_STATUS.LOADING);
      error && setError("");
      const response = await Http[method](modifiedURL, body, apiOptions);
      if (
        response.code === STATUS_CODES.SUCCESS_STATUS ||
        response.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setApiStatus(API_STATUS.SUCCESS);
        setData(response.data);
        onSuccessCallback && onSuccessCallback(response.data);
        return response.data;
      }
      setApiStatus(API_STATUS.ERROR);
      setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      onErrorCallback && onErrorCallback(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    } catch (err) {
      setApiStatus(API_STATUS.ERROR);

      if (!!err.response?.data?.message) {
        setError(err.response?.data?.message);
        if (
          err.response?.data?.data &&
          err.response?.data?.data?.errors &&
          Object.entries(err.response?.data?.data?.errors).length > 0
        ) {
          onErrorCallback && onErrorCallback(err.response?.data?.data);
        } else {
          onErrorCallback && onErrorCallback(err.response?.data?.message);
        }
        return;
      }
      setError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      onErrorCallback &&
        onErrorCallback(
          err?.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
        );
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiStatus,
    data,
    error,
    makeRequest,
    isError,
    isLoading,
    isSuccess,
    setData,
    setError,
  };
};

export const usePost = ({ url, apiOptions, otherOptions }) =>
  useApiRequest({ method: "post", url, apiOptions, otherOptions });
export const usePut = ({ url, apiOptions, otherOptions }) =>
  useApiRequest({ method: "put", url, apiOptions, otherOptions });
export const usePatch = ({ url, apiOptions, otherOptions }) =>
  useApiRequest({ method: "patch", url, apiOptions, otherOptions });
export const useDelete = ({ url, apiOptions, otherOptions }) =>
  useApiRequest({ method: "delete", url, apiOptions, otherOptions });
