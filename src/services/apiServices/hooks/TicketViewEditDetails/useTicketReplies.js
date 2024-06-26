import { useState } from "react";

import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import {
  COMPANY_TICKET_LISTING,
  TICKET_REPLIES_SUB_ROUTES,
} from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useTicketReplies = () => {
  const [errorWhileSendingMessage, setErrorWhileSendingMessage] = useState("");
  const [ticketReplies, setTicketReplies] = useState({});
  const [apiStatus, setAPIStatus] = useState(API_STATUS.IDLE);

  const { Http } = useHttpService();

  const handleTicketReplies = async ({ id, payload, successCallback }) => {
    try {
      setAPIStatus(API_STATUS.LOADING);
      errorWhileSendingMessage && setErrorWhileSendingMessage("");
      const res = await Http.post(
        `${COMPANY_TICKET_LISTING}/${id}/${TICKET_REPLIES_SUB_ROUTES}`,
        payload
      );
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setAPIStatus(API_STATUS.SUCCESS);
        setTicketReplies(res.data);
        successCallback && successCallback();
        return res.data;
      } else {
        setAPIStatus(API_STATUS.ERROR);
      }
    } catch (err) {
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
    setErrorWhileSendingMessage,
  };
};

export default useTicketReplies;
