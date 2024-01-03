import React from "react";

import MainContainerTemplate from "./MainContainerTemplate";
import useMainContainerTabs from "./controller/useMainContainerTabs";

const MainContainer = () => {
  const { containers, onPressCard, selectedContainer } = useMainContainerTabs();

  return (
    <MainContainerTemplate
      containers={containers}
      onPressCard={onPressCard}
      selectedContainer={selectedContainer}
    />
  );
};

export default MainContainer;
