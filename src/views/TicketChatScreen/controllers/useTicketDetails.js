import useFetch from "../../../hooks/useFetch";
import { useLocation } from "../../../routes";
import { COMPANY_TICKET_VIEW } from "../../../services/apiServices/apiEndPoint";

const useTicketDetails = (id) => {
  const location = useLocation();
  console.log(id, "@@@");
  const {
    data: ticketViewData,
    isLoading: isTicketViewData,
    fetchData: fetchDataTicketListing,
  } = useFetch({
    url: `${COMPANY_TICKET_VIEW}/${id}`,
  });

  return {
    ticketViewData,
    isTicketViewData,
  };
};

export default useTicketDetails;
