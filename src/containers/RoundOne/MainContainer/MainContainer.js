import React from "react";

import MainContainerTemplate from "./MainContainerTemplate";
import useMainContainerTabs from "./controller/useMainContainerTabs";

const MainContainer = () => {
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
