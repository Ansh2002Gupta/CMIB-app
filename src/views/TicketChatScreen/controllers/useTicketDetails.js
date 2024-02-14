import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import useFetch from "../../../hooks/useFetch";
import { PREVIOUS_SCREEN } from "../../../constants/constants";
import { ticket_replies } from "../ticketsRepliesConstant";
import { COMPANY_TICKET_LISTING } from "../../../services/apiServices/apiEndPoint";
import useTicketReplies from "../../../services/apiServices/hooks/TicketViewEditDetails/useTicketReplies";

const useTicketDetails = () => {
  const navigate = useNavigate();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isDetailsScreen, setIsDetailScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ticketData, setTicketData] = useState(ticket_replies.slice(0, 5));
  const [nextIndex, setNextIndex] = useState(5);

  const location = useLocation();
  // const { id, status } = location.state;

  const id = "32";

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
  });

  console.log("chatRecords", chatRecords);

  const {
    apiStatus,
    errorWhileSendingMessage,
    handleTicketReplies,
    isError,
    isLoading,
    isSuccess,
    ticketReplies,
    setTicketReplies,
  } = useTicketReplies(id);

  const handleSendButton = async (messageValue) => {
    await handleTicketReplies({ reply_text: messageValue });
    fetchChatData();
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

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      const startIndex = nextIndex;
      const endIndex = Math.min(startIndex + 3, ticket_replies.length);
      const moreData = ticket_replies.slice(startIndex, endIndex);
      setTicketData((prevData) => [...moreData, ...prevData]);

      setNextIndex(endIndex);
      setLoadingMore(false);
    }, 1000);
  };

  return {
    handleLoadMore,
    handlePopup,
    handleSendButton,
    isDetailsScreen,
    loadingMore,
    onGoBack,
    setIsDetailScreen,
    showPopup,
    ticketData,
    ticketViewDetails,
    chatRecords,
  };
};

export default useTicketDetails;
