import { useState } from "react";

import Http from "../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../constants/constants";
import { COUNTRY_CODE } from "../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";

const useGetCountryCodeApi = () => {
  const [getCountryCodeStatus, setGetCountryCodeStatus] = useState(
    API_STATUS.IDLE
  );
  const [countryCodeResult, setCountryCodeResult] = useState(null);
  const [erorrWhileGettingCode, setErrorWhileGettingCode] = useState("");

  const getCountryCode = async () => {
    try {
      setGetCountryCodeStatus(API_STATUS.LOADING);
      setErrorWhileGettingCode("");
      const res = await Http.get(COUNTRY_CODE);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        setGetCountryCodeStatus(API_STATUS.SUCCESS);
        setCountryCodeResult(res.data);
        return;
      }
      setGetCountryCodeStatus(API_STATUS.ERROR);
      setErrorWhileGettingCode(res);
    } catch (err) {
      setGetCountryCodeStatus(API_STATUS.ERROR);
      setErrorWhileGettingCode(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
    }
  };

  const isLoading = getCountryCodeStatus === API_STATUS.LOADING;
  const isSuccess = getCountryCodeStatus === API_STATUS.SUCCESS;
  const isError = getCountryCodeStatus === API_STATUS.ERROR;

  return {
    countryCodeResult,
    erorrWhileGettingCode,
    getCountryCode,
    getCountryCodeStatus,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useGetCountryCodeApi;
