import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import useFetch from "../../../hooks/useFetch";
import { PREVIOUS_SCREEN } from "../../../constants/constants";
import { COMPANY_TICKET_LISTING } from "../../../services/apiServices/apiEndPoint";
import useTicketReplies from "../../../services/apiServices/hooks/TicketViewEditDetails/useTicketReplies";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";

const useTicketDetails = () => {
  const navigate = useNavigate();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isDetailsScreen, setIsDetailScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [userProfileDetails] = useContext(UserProfileContext);

  //ToDO : we will get id by ticketlisting API
  const id = "2";

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
    url: `${COMPANY_TICKET_LISTING}/${id}/replies`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

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

  const handleSendButton = async (messageValue) => {
    const qureyParams = {
      id: id,
      payload: {
        reply_text: messageValue,
        file_name: "",
      },
      successCallback: async () => {
        const new_data = await fetchChatData();
        setCurrentRecords(new_data?.records);
      },
    };
    await handleTicketReplies(qureyParams);
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
      if (newData.meta.currentPage === newData.meta.lastPage) {
        setAllDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching tickets on load more:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    handleLoadMore,
    handlePopup,
    handleSendButton,
    isDetailsScreen,
    loadingMore,
    isticketViewDetails,
    isFirstPageReceived,
    isChatLoading,
    onGoBack,
    setIsDetailScreen,
    showPopup,
    ticketViewDetails,
    chatRecords: currentRecords,
    userDetails: userProfileDetails?.userDetails,
  };
};

export default useTicketDetails;
