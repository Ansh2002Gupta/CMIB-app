import React from "react";

import MainContainerTemplate from "./MainContainerTemplate";
import useMainContainerTabs from "./controllers/useMainContainerTabs";

const MainContainer = ({ cardsData, hasRoundone, roundId }) => {
  const { onPressCard, roundOneTabs, selectedTab } = useMainContainerTabs({
    cardsData,
    roundId,
    hasRoundone,
  });

  return (
    <MainContainerTemplate
      hasRoundone={hasRoundone}
      onPressCard={onPressCard}
      roundOneTabs={roundOneTabs}
      selectedTab={selectedTab}
    />
  );
};

export default MainContainer;
