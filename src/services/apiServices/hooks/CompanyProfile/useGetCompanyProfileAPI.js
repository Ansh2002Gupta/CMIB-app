import { useState } from "react";

import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_PROFILE } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useGetCompanyProfileAPI = () => {
  const [profileResult, setProfileResult] = useState({});
  const [errorWhileGettingResult, setErrorWhileGettingResult] = useState("");
  const [companyProfileApiStatus, setCompanyProfileApiStatus] = useState(
    API_STATUS.IDLE
  );

  const { Http } = useHttpService();

  const onGetProfile = async () => {
    try {
      setCompanyProfileApiStatus(API_STATUS.LOADING);
      errorWhileGettingResult && setErrorWhileGettingResult("");
      const res = await Http.get(COMPANY_PROFILE);
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        setCompanyProfileApiStatus(API_STATUS.SUCCESS);
        setProfileResult(res.data);
        return;
      }
      setCompanyProfileApiStatus(API_STATUS.ERROR);
      setErrorWhileGettingResult(res);
    } catch (err) {
      setCompanyProfileApiStatus(API_STATUS.ERROR);
      setErrorWhileGettingResult(
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
      );
    }
  };

  const isLoading = companyProfileApiStatus === API_STATUS.LOADING;
  const isSuccess = companyProfileApiStatus === API_STATUS.SUCCESS;
  const isError = companyProfileApiStatus === API_STATUS.ERROR;

  return {
    companyProfileApiStatus,
    errorWhileGettingResult,
    isError,
    isLoading,
    isSuccess,
    onGetProfile,
    profileResult,
    setErrorWhileGettingResult,
    setProfileResult,
  };
};

export default useGetCompanyProfileAPI;
