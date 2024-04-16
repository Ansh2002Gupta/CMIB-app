import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CandidateRoundOneContainer from "../../containers/CandidateRoundOne/CandidateRoundOneContainer";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { USER_TYPE_CANDIDATE } from "../../constants/constants";
import { setRoundsData } from "../../globalContext/sidebar/sidebarActions";
import useFetch from "../../hooks/useFetch";
import { CORE, GLOBAL_SESSIONS } from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { isObjectFilled } from "../../utils/util";
import styles from "./RoundTwo.style";

function RoundTwoUI(props) {
  const [userProfileDetails] = useContext(UserProfileContext);

  const intl = useIntl();
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

  const hasRoundsData = isObjectFilled(savedRoundsData);

  useEffect(() => {
    const fetchRoundsDetails = async () => {
      if (
        selectedModule &&
        sessionId &&
        (!hasRoundsData || +sessionId !== savedRoundsData?.id)
      ) {
        const roundsData = await fetchData();
        sideBarDispatch(setRoundsData(roundsData));
      }
    };
    fetchRoundsDetails();
  }, [selectedModule, sessionId, hasRoundsData]);

  return (
    <View style={styles.container}>
      {userProfileDetails?.userDetails?.user_type?.toLowerCase() ===
      USER_TYPE_CANDIDATE ? (
        <CandidateRoundOneContainer hasRoundone={false} />
      ) : (
        <CommonText>Company</CommonText>
      )}
    </View>
  );
}

export default RoundTwoUI;
