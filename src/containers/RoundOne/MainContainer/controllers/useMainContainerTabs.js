import { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "../../../../routes";

import useFetch from "../../../../hooks/useFetch";
import { SideBarContext } from "../../../../globalContext/sidebar/sidebarProvider";
import images from "../../../../images";
import {
  ROUNDS,
  ROUND_ONE_DASHBOARD,
  USER_TYPE_COMPANY,
} from "../../../../services/apiServices/apiEndPoint";
import { navigations } from "../../../../constants/routeNames";
import { ROUND_ONE_CARD } from "../../../../constants/constants";

const useMainContainerTabs = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(null);

  const [sideBarState] = useContext(SideBarContext);
  const selectedModule = sideBarState?.selectedModule?.key;
  const selectedSession = sideBarState?.selectedSession;
  const savedRoundsData = sideBarState?.roundsData;
  const roundOneId = savedRoundsData?.rounds[0]?.id;

  const { data, fetchData } = useFetch({
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

  useEffect(async () => {
    if (!!selectedSession?.value && !!selectedModule) {
      await fetchData();
    }
  }, [savedRoundsData]);

  const roundOneTabs = ROUND_ONE_CARD.map((card) => ({
    title: intl.formatMessage({ id: card.title }),
    id: card.id,
    image: images[card.image],
    subTitle: intl.formatMessage({ id: card.subTitle }),
  }));

  const onPressCard = (id) => {
    setSelectedTab(id);
    switch (id) {
      case 1:
        navigate(navigations.APPLICATION_FORM);
        break;
      case 2:
        break;
      case 3:
      default:
        break;
    }
  };

  return {
    onPressCard,
    roundOneTabs,
    selectedTab,
  };
};

export default useMainContainerTabs;
