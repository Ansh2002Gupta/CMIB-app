import React from "react";

import { Base } from "../../core/layouts";

import RoundOneContainer from "../../containers/RoundOne/MainContainer";
import styles from "./RoundOneView.style";

const RoundOneView = () => {
  return (
    <Base style={styles.containerViewStyle}>
      <RoundOneContainer />
    </Base>
  );
};

export default RoundOneView;
