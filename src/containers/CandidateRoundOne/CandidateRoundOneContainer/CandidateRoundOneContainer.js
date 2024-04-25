import React from "react";

import CandidateRoundOneContainerTemplate from "./CandidateRoundOneContainerTemplate";
import useCandidateRoundOneCards from "./controllers/useCandidateRoundOneCards";

const CandidateRoundOneContainer = ({ hasRoundone, savedRoundId }) => {
  const { roundCards, onPressCard } = useCandidateRoundOneCards({
    hasRoundone,
    savedRoundId,
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
