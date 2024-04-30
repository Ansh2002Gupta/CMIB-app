import React from "react";
import { useTheme } from "@unthinkable/react-theme";

import { Base } from "../../core/layouts";

import Spinner from "../Spinner";
import getStyles from "./LoadingScreen.style";

const LoadingScreen = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Base style={styles.loadingContainer}>
      <Spinner />
    </Base>
  );
};

export default LoadingScreen;
