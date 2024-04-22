import React, { useContext, useEffect, useState } from "react";

import { Base } from "../../core/layouts";

import CandidateRoundOneContainer from "../../containers/CandidateRoundOne/CandidateRoundOneContainer";
import RoundOneContainer from "../../containers/RoundOne/MainContainer";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { API_STATUS, USER_TYPE_CANDIDATE } from "../../constants/constants";
import useFetch from "../../hooks/useFetch";
import {
  CORE,
  GLOBAL_SESSIONS,
  ROUNDS,
  ROUND_ONE_BOARD,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { setRoundsData } from "../../globalContext/sidebar/sidebarActions";
import { isObjectFilled } from "../../utils/util";
import styles from "./RoundOneView.style";

const RoundOneView = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const savedRoundId = !!sideBarState?.roundsData?.rounds
    ? sideBarState?.roundsData?.rounds[0]?.id
    : null;
  const [roundOneId, setRoundId] = useState(savedRoundId);
  const selectedModule = sideBarState?.selectedModule?.key;
  const sessionId = sideBarState?.selectedSession?.value;
  const savedRoundsData = sideBarState?.roundsData;

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
      `/${roundOneId}` +
      ROUND_ONE_BOARD,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const hasRoundsData = isObjectFilled(savedRoundsData);

  useEffect(() => {
    const fetchRoundsData = async () => {
      if (
        selectedModule &&
        sessionId &&
        (!hasRoundsData || +sessionId !== savedRoundsData?.id)
      ) {
        const roundsData = await fetchData();
        if (roundsData?.rounds && roundsData.rounds.length > 0) {
          const firstRoundId = roundsData.rounds[0].id;
          setRoundId(firstRoundId);
          sideBarDispatch(setRoundsData(roundsData));
        }
      }
    };

    fetchRoundsData();
  }, [selectedModule, sessionId, hasRoundsData, savedRoundsData]);

  useEffect(() => {
    const fetchCards = async () => {
      if (roundOneId) {
        await fetchCardsDetails();
      }
    };
    fetchCards();
  }, [roundOneId]);

  return (
    <Base style={styles.containerViewStyle}>
      {userProfileDetails?.userDetails?.user_type?.toLowerCase() ===
      USER_TYPE_CANDIDATE ? (
        <CandidateRoundOneContainer hasRoundone savedRoundId={savedRoundId} />
      ) : (
        <>
          {(isCardsDataLoading || cardsApiStatus === API_STATUS.IDLE) && (
            <LoadingScreen />
          )}
          {!isCardsDataLoading && !isErrorOnCardsData && !!cardsData && (
            <RoundOneContainer
              cardsData={cardsData}
              hasRoundone
              roundId={roundOneId}
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
    </Base>
  );
};

export default RoundOneView;
