import { useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../../routes";

import { ROUND_ONE_CARD } from "../../../../constants/constants";
import { navigations } from "../../../../constants/routeNames";
import images from "../../../../images";

const useMainContainerTabs = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(null);

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
