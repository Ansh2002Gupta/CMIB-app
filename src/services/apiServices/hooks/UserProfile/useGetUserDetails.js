import { useContext } from "react";

import Http from "../../../http-service";
import { UserProfileContext } from "../../../../globalContext/userProfile/userProfileProvider";
import { useHeader } from "../../../../hooks/useHeader";
import {
  setErrorGetingUserDetails,
  setIsGettingUserDetails,
  setUserDetails,
} from "../../../../globalContext/userProfile/userProfileActions";
import { COMPANY_PROFILE } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import { STATUS_CODES } from "../../../../constants/constants";

const useGetUserDetails = () => {
  const [, userProfileDispatch] = useContext(UserProfileContext);
  const { onLogout } = useHeader();

  const getUserDetails = async () => {
    try {
      userProfileDispatch(setIsGettingUserDetails(true));
      userProfileDispatch(setErrorGetingUserDetails(""));
      const res = await Http.get(COMPANY_PROFILE);
      userProfileDispatch(setIsGettingUserDetails(false));
      if (
        res.status === STATUS_CODES.SUCCESS_STATUS ||
        res.code === STATUS_CODES.SUCCESS_STATUS
      ) {
        userProfileDispatch(setUserDetails(res.data));
        return;
      }
      userProfileDispatch(
        setErrorGetingUserDetails(GENERIC_GET_API_FAILED_ERROR_MESSAGE)
      );
      onLogout();
    } catch (err) {
      onLogout();
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      userProfileDispatch(setErrorGetingUserDetails(errorMessage));
    }
  };

  return { getUserDetails };
};

export default useGetUserDetails;
