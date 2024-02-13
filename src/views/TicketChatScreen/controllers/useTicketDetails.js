import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import useFetch from "../../../hooks/useFetch";
import { PREVIOUS_SCREEN } from "../../../constants/constants";
import { ticket_replies } from "../ticketsRepliesConstant";
import { CORE_TICKET_VIEW_DETAILS } from "../../../services/apiServices/apiEndPoint";

const useTicketDetails = () => {
  const navigate = useNavigate();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isDetailsScreen, setIsDetailScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [ticketData, setTicketData] = useState(ticket_replies.slice(0, 5));
  const [nextIndex, setNextIndex] = useState(5);

  const location = useLocation();
  // const { id, status } = location.state;

  const id = "41";

  const {
    data: ticketViewDetails,
    isLoading: isticketViewDetails,
    fetchData: fetchTicketViewDetails,
  } = useFetch({
    url: `${CORE_TICKET_VIEW_DETAILS}/${id}`,
  });

  console.log("details", ticketViewDetails);

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
    isDetailsScreen,
    loadingMore,
    onGoBack,
    setIsDetailScreen,
    showPopup,
    ticketData,
    ticketViewDetails,
  };
};

export default useTicketDetails;
