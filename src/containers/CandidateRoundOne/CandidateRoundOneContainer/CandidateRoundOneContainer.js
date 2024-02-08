import React from "react";
import CandidateRoundOneContainerTemplate from "./CandidateRoundOneContainerTemplate";
import useCandidateRoundOneCards from "./controllers/useCandidateRoundOneCards";

const CandidateRoundOneContainer = () => {
  let { roundOneCards, onPressCard } = useCandidateRoundOneCards();

  return (
    <CandidateRoundOneContainerTemplate
      roundOneCards={roundOneCards}
      onPressCard={onPressCard}
    />
  );
};

export default CandidateRoundOneContainer;
