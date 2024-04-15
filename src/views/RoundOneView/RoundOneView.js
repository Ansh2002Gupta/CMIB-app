import React, { useContext, useEffect, useState } from "react";

import { Base } from "../../core/layouts";

import RoundOneContainer from "../../containers/RoundOne/MainContainer";
import styles from "./RoundOneView.style";
import CandidateRoundOneContainer from "../../containers/CandidateRoundOne/CandidateRoundOneContainer";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { USER_TYPE_CANDIDATE } from "../../constants/constants";
import useFetch from "../../hooks/useFetch";
import {
  CORE,
  GLOBAL_SESSIONS,
  ROUNDS,
  ROUND_ONE_DASHBOARD,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { setRoundsData } from "../../globalContext/sidebar/sidebarActions";
import { isObjectFilled } from "../../utils/util";

const RoundOneView = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const [roundOneId, setRoundId] = useState();
  const selectedModule = sideBarState?.selectedModule?.key;
  const sessionId = sideBarState?.selectedSession?.value;
  const savedRoundsData = sideBarState?.roundsData;

  const { data, fetchData } = useFetch({
    url: CORE + `/${selectedModule}` + GLOBAL_SESSIONS + `/${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { data: cardsData, fetchData: fetchCardsDetails } = useFetch({
    url:
      USER_TYPE_COMPANY +
      `/${selectedModule}` +
      ROUNDS +
      `/${roundOneId}` +
      ROUND_ONE_DASHBOARD,
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
        <CandidateRoundOneContainer />
      ) : (
        <RoundOneContainer cardsData={cardsData} />
      )}
    </Base>
  );
};

export default RoundOneView;
