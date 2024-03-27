import React, { useContext, useEffect } from "react";

import { Base } from "../../core/layouts";

import RoundOneContainer from "../../containers/RoundOne/MainContainer";
import styles from "./RoundOneView.style";
import CandidateRoundOneContainer from "../../containers/CandidateRoundOne/CandidateRoundOneContainer";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { USER_TYPE_CANDIDATE } from "../../constants/constants";
import useFetch from "../../hooks/useFetch";
import { CORE, GLOBAL_SESSIONS } from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { setRoundsData } from "../../globalContext/sidebar/sidebarActions";
import { isObjectFilled } from "../../utils/util";

const RoundOneView = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  const selectedModule = sideBarState?.selectedModule?.key;
  const sessionId = sideBarState?.selectedSession?.value;
  const savedRoundsData = sideBarState?.roundsData;

  const { data, fetchData } = useFetch({
    url: CORE + `/${selectedModule}` + GLOBAL_SESSIONS + `/${sessionId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  console.log("roundone", savedRoundsData?.rounds?.[0]);

  const hasRoundsData = isObjectFilled(savedRoundsData);

  useEffect(async () => {
    if (
      selectedModule &&
      sessionId &&
      (!hasRoundsData || +sessionId !== savedRoundsData?.id)
    ) {
      const roundsData = await fetchData();
      sideBarDispatch(setRoundsData(roundsData));
    }
  }, [selectedModule, sessionId]);

  return (
    <Base style={styles.containerViewStyle}>
      {userProfileDetails?.userDetails?.user_type?.toLowerCase() ===
      USER_TYPE_CANDIDATE ? (
        <CandidateRoundOneContainer />
      ) : (
        <RoundOneContainer />
      )}
    </Base>
  );
};

export default RoundOneView;
