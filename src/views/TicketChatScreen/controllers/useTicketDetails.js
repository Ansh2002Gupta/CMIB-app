import { useEffect, useState } from "react";
import { useNavigate } from "../../../routes";

import useTicketReplies from "../../../services/apiServices/hooks/TicketViewEditDetails/useTicketReplies";
import useSaveLogo from "../../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useUploadedFileValidations from "../../../hooks/useUploadedFileValidations";
import useFetch from "../../../hooks/useFetch";
import {
  COMPANY_TICKET_LISTING,
  TICKET_REPLIES_SUB_ROUTES,
} from "../../../services/apiServices/apiEndPoint";
import { PREVIOUS_SCREEN } from "../../../constants/constants";

const useTicketDetails = (location) => {
  const { id } = location;
  const navigate = useNavigate();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isDetailsScreen, setIsDetailScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: ticketViewDetails,
    isLoading: isticketViewDetails,
    fetchData: fetchTicketViewDetails,
    error: erroticketViewDetails,
    isError: isErrorticketViewDetails,
  } = useFetch({
    url: `${COMPANY_TICKET_LISTING}/${id}`,
  });

  const {
    data: chatRecords,
    isLoading: isChatLoading,
    fetchData: fetchChatData,
    error: ErrorChatData,
    isError: isErrorChatData,
  } = useFetch({
    url: `${COMPANY_TICKET_LISTING}/${id}/${TICKET_REPLIES_SUB_ROUTES}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    errorWhileUpload,
    handleFileUpload,
    isLoading: isUploadingImageToServer,
    isError: isErrorWhileUploading,
    setErrorWhileUpload,
    setFileUploadResult,
  } = useSaveLogo();

  const {
    fileTooLargeError,
    invalidFormatError,
    initiateFileUpload,
    nonUploadableImageError,
  } = useUploadedFileValidations();

  const fileUploadError =
    fileTooLargeError || invalidFormatError || nonUploadableImageError;

  const {
    handleTicketReplies,
    isLoading: isMessageSending,
    errorWhileSendingMessage,
    isError: isErrorWhileSend,
    setErrorWhileSendingMessage,
  } = useTicketReplies();

  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        page: currentPage,
      };
      const initialData = await fetchChatData({
        queryParamsObject: requestedParams,
      });
      if (initialData && initialData?.records.length > 0) {
        setCurrentRecords(initialData?.records);
      }
      setIsFirstPageReceived(false);
    };
    fetchData();
  }, []);

  const handleSendButton = async ({ messageValue, file_name }) => {
    if (isMessageSending) {
      return;
    }
    let newRecords = [];
    const queryParams = {
      id: id,
      payload: {
        reply_text: messageValue,
        file_name: file_name,
      },
    };
    const newData = await handleTicketReplies(queryParams);
    newRecords.push(newData?.data);
    setCurrentRecords((prevRecords) => [...newRecords, ...prevRecords]);
    setErrorWhileUpload("");
    setErrorWhileSendingMessage("");
  };

  const onGoBack = () => {
    if (isDetailsScreen) {
      setIsDetailScreen(false);
    } else {
      navigate(PREVIOUS_SCREEN);
    }
  };

  const handlePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handleLoadMore = async () => {
    if (chatRecords?.meta?.currentPage === chatRecords?.meta?.lastPage) {
      setAllDataLoaded(true);
      return;
    }
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchChatData({
        queryParamsObject: { page: nextPage },
      });
      if (newData && newData.records.length > 0) {
        setCurrentRecords((prevRecords) => [
          ...prevRecords,
          ...newData.records,
        ]);
      }
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error fetching tickets on load more:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    allDataLoaded,
    chatRecords: currentRecords,
    handleLoadMore,
    handlePopup,
    handleSendButton,
    ErrorChatData,
    isErrorChatData,
    erroticketViewDetails,
    isErrorticketViewDetails,
    isFirstPageReceived,
    isChatLoading,
    isDetailsScreen,
    isticketViewDetails,
    loadingMore,
    onGoBack,
    setIsDetailScreen,
    showPopup,
    setFileUploadResult,
    ticketViewDetails,
    initiateFileUpload,
    handleFileUpload,
    fileUploadError,
    isSending: isMessageSending || isUploadingImageToServer,
    isErrorWhileSending: isErrorWhileSend || isErrorWhileUploading,
    errorWhileSendingMessage: errorWhileUpload || errorWhileSendingMessage,
    setErrorWhileSendingMessages: {
      setErrorWhileSendingMessage,
      setErrorWhileUpload,
    },
  };
};

export default useTicketDetails;
