import React from "react";

import CandidateRoundOneContainerTemplate from "./CandidateRoundOneContainerTemplate";
import useCandidateRoundOneCards from "./controllers/useCandidateRoundOneCards";

const CandidateRoundOneContainer = ({ hasRoundone }) => {
  const { roundCards, onPressCard } = useCandidateRoundOneCards({
    hasRoundone,
  });

  return (
    <CandidateRoundOneContainerTemplate
      cardsData={roundCards}
      onPressCard={onPressCard}
      hasRoundone={hasRoundone}
    />
  );
};

export default CandidateRoundOneContainer;
