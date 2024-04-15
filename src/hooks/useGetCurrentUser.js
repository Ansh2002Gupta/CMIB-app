import { useContext } from "react";

import { UserProfileContext } from "../globalContext/userProfile/userProfileProvider";
import { COMPANY } from "../constants/constants";
import { SideBarContext } from "../globalContext/sidebar/sidebarProvider";

const useGetCurrentUser = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const [sideBarState] = useContext(SideBarContext);
  const isCompany =
    userProfileDetails?.userDetails?.user_type.toLowerCase() === COMPANY;
  const currentModule = sideBarState?.selectedModule?.key;

  return { isCompany, currentModule };
};

export default useGetCurrentUser;
