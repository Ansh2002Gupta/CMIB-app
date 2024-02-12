import useFetch from "../../../hooks/useFetch";
import { COMPANY_TICKET_VIEW } from "../../../services/apiServices/apiEndPoint";

const useTicketDetails = (id) => {
  const { data: ticketViewData, isLoading: isTicketViewData } = useFetch({
    url: `${COMPANY_TICKET_VIEW}/${id}`,
  });

  return {
    ticketViewData,
    isTicketViewData,
  };
};

export default useTicketDetails;
