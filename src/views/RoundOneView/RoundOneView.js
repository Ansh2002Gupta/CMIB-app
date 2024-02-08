import React from "react";

import { Base } from "../../core/layouts";

import RoundOneContainer from "../../containers/RoundOne/MainContainer";
import styles from "./RoundOneView.style";
import CandidateRoundOneContainer from "../../containers/CandidateRoundOne/CandidateRoundOneContainer/CandidateRoundOneContainer";

const RoundOneView = () => {
  return (
    <Base style={styles.containerViewStyle}>
      <CandidateRoundOneContainer />
    </Base>
  );
};

export default RoundOneView;
