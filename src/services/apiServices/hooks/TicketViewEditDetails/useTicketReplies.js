import { useEffect, useState } from "react";

import Http from "../../../http-service";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_TICKET_LISTING } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useTicketReplies = (id) => {
  const [errorWhileSendingMessage, setErrorWhileSendingMessage] = useState("");
  const [ticketReplies, setTicketReplies] = useState({});
  const [apiStatus, setAPIStatus] = useState(API_STATUS.IDLE);

  const handleTicketReplies = async (payload, errorCallback) => {
    try {
      setAPIStatus(API_STATUS.LOADING);
      errorWhileSendingMessage && setErrorWhileSendingMessage("");
      const res = await Http.post(
        `${COMPANY_TICKET_LISTING}/${id}/replies`,
        payload
      );
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setAPIStatus(API_STATUS.SUCCESS);
        setTicketReplies(res.data);
        return;
      } else {
        setAPIStatus(API_STATUS.ERROR);
        errorCallback(res);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      errorCallback(errorMessage);
      setAPIStatus(API_STATUS.ERROR);
      if (err.response?.data?.message) {
        setErrorWhileSendingMessage(err.response?.data?.message);
        return;
      }
      setErrorWhileSendingMessage(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiStatus,
    errorWhileSendingMessage,
    handleTicketReplies,
    isError,
    isLoading,
    isSuccess,
    ticketReplies,
    setTicketReplies,
  };
};

export default useTicketReplies;
