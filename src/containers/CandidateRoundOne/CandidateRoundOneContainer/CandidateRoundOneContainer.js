import React from "react";
import CandidateRoundOneContainerTemplate from "./CandidateRoundOneContainerTemplate";
import useCandidateRoundOneCards from  "./controllers/useCandidateRoundOneCards";

const CandidateRoundOneContainer = () => {

    let {roundOneCards} = useCandidateRoundOneCards();

    return <CandidateRoundOneContainerTemplate roundOneCards={roundOneCards}/>
};

export default CandidateRoundOneContainer;