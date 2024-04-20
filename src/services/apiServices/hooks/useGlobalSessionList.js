import { useContext, useState } from "react";
import Http from "../../http-service";
import Storage from "../../cookie-and-storage-service";

import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import {
  setGlobalSessionList,
  setSelectedSession,
} from "../../../globalContext/sidebar/sidebarActions";
import { CORE, GLOBAL_SESSIONS, USER_TYPE_MEMBER } from "../apiEndPoint";
import {
  NEWLY_QUALIFIED,
  SESSION_KEY,
  STATUS_CODES,
} from "../../../constants/constants";
import useFetch from "../../../hooks/useFetch";

const useGlobalSessionListApi = () => {
  const [, sideBarDispatch] = useContext(SideBarContext);
  const [errorGettingGlobalSession, setErrorGettingGlobalSession] =
    useState(null);
  const {
    error: errorGettingSession,
    isError: isErrorGettingSesssion,
    fetchData,
    setError: setErrorGettingSession,
  } = useFetch({
    url: "",
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const getSessionList = async (selectedModule) => {
    const url = `/${USER_TYPE_MEMBER}/${selectedModule}` + GLOBAL_SESSIONS;
    return fetchData({ overrideUrl: url }).then((res) => {
      return res;
    });
  };

  const setSideBarDispatch = (firstSession) => {
    sideBarDispatch(
      setSelectedSession({
        value: firstSession.id.toString(),
        label: firstSession.name,
        is_editable: firstSession?.is_editable,
        status: firstSession?.status,
        participated: firstSession?.participated ?? true,
      })
    );
  };
  const setSessionData = (tempSessionArray) => {
    const firstSession = tempSessionArray.find(
      (item) => item.status === 1 || item.participated
    );

    if (Object.keys(firstSession).length) {
      setSideBarDispatch(firstSession);
    } else {
      sideBarDispatch(setSelectedSession({}));
    }
  };

  const getGlobalSessionList = async (selectedModule) => {
    const savedSessionId = await Storage.get({ key: SESSION_KEY });
    const url = CORE + `/${selectedModule}` + GLOBAL_SESSIONS + "?perPage=9999";
    try {
      const res = await Http.get(url);
      if (
        res.code === STATUS_CODES.SUCCESS_STATUS ||
        res.status === STATUS_CODES.SUCCESS_STATUS
      ) {
        const selectedModuleData = await getSessionList(selectedModule);
        const tempSessionArray = res?.data?.records.map((user) => {
          let participated = selectedModuleData.some(
            (otherUser) => otherUser.id === user.id
          );
          return {
            ...user,
            participated: participated,
          };
        });
        sideBarDispatch(setGlobalSessionList(tempSessionArray));
        if (selectedModule === NEWLY_QUALIFIED) {
          if (selectedModuleData.length) {
            setSideBarDispatch(selectedModuleData[0]);
          } else {
            setSessionData(tempSessionArray);
          }
        } else {
          if (savedSessionId) {
            let session = tempSessionArray?.find(
              (ele) => ele?.id === +savedSessionId
            );
            if (session) {
              setSideBarDispatch(session);
            } else {
              setSessionData(tempSessionArray);
            }
          } else {
            if (tempSessionArray.length) {
              setSessionData(tempSessionArray);
            }
          }
        }

        return;
      }
    } catch (err) {
      setErrorGettingGlobalSession(err);
    }
  };
  const error = errorGettingSession?.data || errorGettingGlobalSession || null;
  const isError =
    isErrorGettingSesssion || errorGettingGlobalSession != null || false;

  return {
    getGlobalSessionList,
    error,
    isError,
    setErrorGettingGlobalSession,
    setErrorGettingSession,
  };
};

export default useGlobalSessionListApi;
