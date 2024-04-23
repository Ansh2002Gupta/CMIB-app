import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CandidateRoundOneContainer from "../../containers/CandidateRoundOne/CandidateRoundOneContainer";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import RoundTwoContainer from "../../containers/RoundOne/MainContainer";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  API_STATUS,
  API_VERSION_QUERY_PARAM,
  SESSION_ID_QUERY_PARAM,
  UPDATED_API_VERSION,
  USER_TYPE_CANDIDATE,
} from "../../constants/constants";
import { setRoundsData } from "../../globalContext/sidebar/sidebarActions";
import useFetch from "../../hooks/useFetch";
import {
  CORE,
  GLOBAL_SESSIONS,
  ROUNDS,
  ROUND_ONE_BOARD,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { isObjectFilled } from "../../utils/util";
import styles from "./RoundTwo.style";

function RoundTwoUI(props) {
  const [userProfileDetails] = useContext(UserProfileContext);

  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const selectedModule = sideBarState?.selectedModule?.key;
  const sessionId = sideBarState?.selectedSession?.value;
  const savedRoundsData = sideBarState?.roundsData;
  const savedRoundId = !!sideBarState?.roundsData?.rounds
    ? sideBarState?.roundsData?.rounds[1]?.id
    : null;
  const [roundTwoId, setRoundTwoId] = useState(savedRoundId);

  const { data, fetchData } = useFetch({
    url: CORE + `/${selectedModule}` + GLOBAL_SESSIONS + `/${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    apiStatus: cardsApiStatus,
    data: cardsData,
    fetchData: fetchCardsDetails,
    isLoading: isCardsDataLoading,
    isError: isErrorOnCardsData,
    error: errorWhileOnCardsData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${selectedModule}` +
      ROUNDS +
      `/${roundTwoId}` +
      `${ROUND_ONE_BOARD}?${SESSION_ID_QUERY_PARAM}=${sessionId}`,
    apiOptions: {
      headers: {
        [API_VERSION_QUERY_PARAM]: UPDATED_API_VERSION,
      },
    },
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const hasRoundsData = isObjectFilled(savedRoundsData);

  useEffect(() => {
    const fetchRoundsDetails = async () => {
      if (
        selectedModule &&
        sessionId &&
        (!hasRoundsData || +sessionId !== savedRoundsData?.id)
      ) {
        const roundsData = await fetchData();
        if (roundsData?.rounds && roundsData.rounds.length > 0) {
          const firstRoundId = roundsData.rounds[1].id;
          setRoundTwoId(firstRoundId);
          sideBarDispatch(setRoundsData(roundsData));
        }
      }
    };
    fetchRoundsDetails();
  }, [selectedModule, sessionId, hasRoundsData, savedRoundsData]);

  useEffect(() => {
    const fetchCards = async () => {
      if (roundTwoId) {
        await fetchCardsDetails();
      }
    };
    fetchCards();
  }, [roundTwoId]);

  return (
    <View style={styles.container}>
      {userProfileDetails?.userDetails?.user_type?.toLowerCase() ===
      USER_TYPE_CANDIDATE ? (
        <CandidateRoundOneContainer hasRoundone={false} />
      ) : (
        <>
          {(isCardsDataLoading || cardsApiStatus === API_STATUS.IDLE) && (
            <LoadingScreen />
          )}
          {!isCardsDataLoading && !isErrorOnCardsData && !!cardsData && (
            <RoundTwoContainer
              cardsData={cardsData?.application_form}
              hasRoundone={false}
              roundId={roundTwoId}
            />
          )}
          {isErrorOnCardsData && (
            <ErrorComponent
              errorMsg={errorWhileOnCardsData?.data?.message}
              onRetry={() => fetchCardsDetails()}
            />
          )}
        </>
      )}
    </View>
  );
}

export default RoundTwoUI;
