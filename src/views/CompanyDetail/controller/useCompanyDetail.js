import { useContext } from "react";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../../hooks/useFetch";

const useCompanyDetail = ({ centerId, companyId }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const { data, isLoading, error } = useFetch({
    url: `member/${selectedModule.key}/centres/${centerId}/companies/${companyId}/profile`,
  });

  return {
    profileInformation: data,
    isProfileLoading: isLoading,
    profileError: error?.data,
  };
};

export default useCompanyDetail;
