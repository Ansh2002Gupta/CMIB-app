import { useState } from "react";

import useHttpService from "../../../hooks/useHttpService";
import { API_STATUS, STATUS_CODES } from "../../../../constants/constants";
import { COMPANY_TICKET_LISTING } from "../../apiEndPoint";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";

const useAddTicket = () => {
  const [updateAddTicketStatus, setUpdateAddTicketStatus] = useState(
    API_STATUS.IDLE
  );
  const [updateAddTicketResult, setUpdateAddTicketResult] = useState([]);
  const [updationError, setUpdationError] = useState("");

  const { Http } = useHttpService();

  const handleAddTicket = async ({
    payload,
    onSuccessCallback,
    onErrorCallback,
  }) => {
    setUpdateAddTicketStatus(API_STATUS.LOADING);
    setUpdationError("");
    try {
      const res = await Http.post(COMPANY_TICKET_LISTING, payload);
      if (res.status === STATUS_CODES.SUCCESS_STATUS) {
        setUpdateAddTicketStatus(API_STATUS.SUCCESS);
        setUpdateAddTicketResult(res.data);
        onSuccessCallback && onSuccessCallback();
      } else {
        setUpdateAddTicketStatus(API_STATUS.ERROR);
        setUpdationError(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
        onErrorCallback &&
          onErrorCallback(GENERIC_GET_API_FAILED_ERROR_MESSAGE);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      setUpdationError(errorMessage);
      setUpdateAddTicketStatus(API_STATUS.ERROR);
    }
  };
  const isLoading = updateAddTicketStatus === API_STATUS.LOADING;
  const isSuccess = updateAddTicketStatus === API_STATUS.SUCCESS;
  const isError = updateAddTicketStatus === API_STATUS.ERROR;

  return {
    handleAddTicket,
    isError,
    isLoading,
    isSuccess,
    setUpdationError,
    updateAddTicketResult,
    updationError,
    updateAddTicketStatus,
  };
};

export default useAddTicket;
