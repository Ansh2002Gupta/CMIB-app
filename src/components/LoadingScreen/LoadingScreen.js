import React from "react";

import { Base } from "../../core/layouts";

import Spinner from "../Spinner";
import styles from "./LoadingScreen.style";

const LoadingScreen = () => {
  return (
    <Base style={styles.loadingContainer}>
      <Spinner />
    </Base>
  );
};

export default LoadingScreen;
