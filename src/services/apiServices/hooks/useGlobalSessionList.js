import { useContext } from "react";
import Http from "../../http-service";
import Storage from "../../cookie-and-storage-service";

import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import {
  setGlobalSessionList,
  setSelectedSession,
} from "../../../globalContext/sidebar/sidebarActions";
import { CORE, GLOBAL_SESSIONS } from "../apiEndPoint";
import { SESSION_KEY, STATUS_CODES } from "../../../constants/constants";

const useGlobalSessionListApi = () => {
  const [, sideBarDispatch] = useContext(SideBarContext);

  const getGlobalSessionList = async (selectedModule) => {
    const savedSessionId = await Storage.get({ key: SESSION_KEY });
    try {
      const url =
        CORE + `/${selectedModule}` + GLOBAL_SESSIONS + "?perPage=9999";
      const res = await Http.get(url);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        sideBarDispatch(setGlobalSessionList(res?.data?.records));

        if (savedSessionId) {
          let session = res?.data?.records?.find(
            (ele) => ele?.id === +savedSessionId
          );
          if (session) {
            sideBarDispatch(
              setSelectedSession({
                value: session?.id.toString(),
                label: session?.name,
                is_editable: session?.is_editable,
                status: session?.status,
              })
            );
          }
        } else {
          if (res?.data?.records?.length) {
            const firstSession = res.data.records[0];
            sideBarDispatch(
              setSelectedSession({
                value: firstSession.id.toString(),
                label: firstSession.name,
                is_editable: firstSession?.is_editable,
                status: firstSession?.status,
              })
            );
          }
        }
        return;
      }
    } catch (err) {}
  };

  return {
    getGlobalSessionList,
  };
};

export default useGlobalSessionListApi;
