import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import style from "./SavedJobComponent.style";

const SavedJobComponent = () => {
  return (
    <View style={style.mainContainer}>
      <CommonText>SavedJobComponent</CommonText>
    </View>
  );
};

export default SavedJobComponent;
