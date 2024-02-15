import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import useFetch from "../../../hooks/useFetch";
import { PREVIOUS_SCREEN } from "../../../constants/constants";
import {
  COMPANY_TICKET_LISTING,
  TICKET_REPLIES_SUB_ROUTES,
} from "../../../services/apiServices/apiEndPoint";
import useTicketReplies from "../../../services/apiServices/hooks/TicketViewEditDetails/useTicketReplies";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import useSaveLogo from "../../../services/apiServices/hooks/CompanyLogo/useSaveLogoAPI";
import useUploadedFileValidations from "../../../hooks/useUploadedFileValidations";

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
  const [userProfileDetails] = useContext(UserProfileContext);

  const {
    data: ticketViewDetails,
    isLoading: isticketViewDetails,
    fetchData: fetchTicketViewDetails,
  } = useFetch({
    url: `${COMPANY_TICKET_LISTING}/${id}`,
  });

  const {
    data: chatRecords,
    isLoading: isChatLoading,
    fetchData: fetchChatData,
  } = useFetch({
    url: `${COMPANY_TICKET_LISTING}/${id}/${TICKET_REPLIES_SUB_ROUTES}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    errorWhileUpload,
    handleFileUpload,
    fileUploadResult,
    isLoading: isUploadingImageToServer,
    setErrorWhileUpload,
  } = useSaveLogo();

  const {
    fileTooLargeError,
    invalidFormatError,
    initiateFileUpload,
    nonUploadableImageError,
  } = useUploadedFileValidations();

  const fileUploadError =
    fileTooLargeError || invalidFormatError || nonUploadableImageError;

  const { handleTicketReplies } = useTicketReplies();

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
    isFirstPageReceived,
    isChatLoading,
    isDetailsScreen,
    isticketViewDetails,
    loadingMore,
    onGoBack,
    setIsDetailScreen,
    showPopup,
    ticketViewDetails,
    userDetails: userProfileDetails?.userDetails,
    initiateFileUpload,
    handleFileUpload,
    fileUploadResult,
    fileUploadError,
  };
};

export default useTicketDetails;
