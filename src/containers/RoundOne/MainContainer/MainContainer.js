import React from "react";

import MainContainerTemplate from "./MainContainerTemplate";
import useMainContainerTabs from "./controllers/useMainContainerTabs";

const MainContainer = ({ cardsData }) => {
  const { onPressCard, roundOneTabs, selectedTab } = useMainContainerTabs();

  return (
    <MainContainerTemplate
      onPressCard={onPressCard}
      roundOneTabs={roundOneTabs}
      selectedTab={selectedTab}
    />
  );
};

export default MainContainer;
