import React, { useContext, useEffect, useState } from "react";

import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useFetch from "../../hooks/useFetch";
import {
  APPLICATION,
  CENTRES,
  OVERVIEW_DATA,
  ROUNDS,
} from "../../services/apiServices/apiEndPoint";
import { COMPANY } from "../../constants/constants";

const useShortlistingConsentInterview = ({ roundId, centreId }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;

  const {
    data: diagramData,
    fetchData: fetchDiagramData,
    isLoading: isDiagramDataLoading,
    isError: isErrorDiagramData,
    error: errorDiagramData,
    setData: setDiagramData,
  } = useFetch({
    url: `${COMPANY}/${selectedModule?.key}${ROUNDS}/${roundId}${APPLICATION}${CENTRES}/${centreId}/${OVERVIEW_DATA}`,
    /*TODO:: PLEASE REMOVE THE HARD CODED API AND USE THE ABOVE API CALL.*/
    // url: `${COMPANY}/${selectedModule?.key}${ROUNDS}/264${APPLICATION}${CENTRES}/43/${OVERVIEW_DATA}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (!!selectedModule?.key) {
      callFetchFunction();
    }
  }, [selectedModule?.key]);

  const callFetchFunction = () => {
    fetchDiagramData();
  };

  return {
    diagramData,
    fetchDiagramData,
    isDiagramDataLoading,
    isErrorDiagramData,
    errorDiagramData,
  };
};

export default useShortlistingConsentInterview;
