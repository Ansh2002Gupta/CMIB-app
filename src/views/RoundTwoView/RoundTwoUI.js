import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import styles from "./RoundTwo.style";
import { setRoundsData } from "../../globalContext/sidebar/sidebarActions";
import useFetch from "../../hooks/useFetch";
import { CORE, GLOBAL_SESSIONS } from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { isObjectFilled } from "../../utils/util";

function RoundTwoUI(props) {
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
  useEffect(async () => {
    if (
      selectedModule &&
      sessionId &&
      (!hasRoundsData || +sessionId !== savedRoundsData?.id)
    ) {
      const roundsData = await fetchData();
      sideBarDispatch(setRoundsData(roundsData));
    }
  }, [selectedModule, sessionId, hasRoundsData]);

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.header}>
        {intl.formatMessage({ id: "label.round2" })}
      </CommonText>
    </View>
  );
}

export default RoundTwoUI;
