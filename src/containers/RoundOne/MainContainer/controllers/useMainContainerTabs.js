import { useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "../../../../routes";

import images from "../../../../images";
import { navigations } from "../../../../constants/routeNames";
import {
  ROUND_ONE_CARD,
  getCompanyRoundCards,
} from "../../../../constants/constants";

const useMainContainerTabs = ({ cardsData }) => {
  const intl = useIntl();
  const { is_editable, is_filled } = cardsData;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(null);

  const roundOneTabs = getCompanyRoundCards({ is_filled }).map((card) => ({
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
