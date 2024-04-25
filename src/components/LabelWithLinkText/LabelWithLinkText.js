import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View, TouchableOpacity } from "@unthinkable/react-core-components";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import getStyles from "./LabelWithLinkText.style";

const LabelWithLinkText = ({ labelText, linkText, onLinkClick }) => {
  const theme = useTheme();
  const style = getStyles(theme);
  return (
    <View style={style.textContainer}>
      {!!labelText && (
        <CommonText customTextStyle={style.labelTextStyle}>
          {labelText}
        </CommonText>
      )}
      {!!linkText && (
        <TouchableOpacity onPress={() => onLinkClick()}>
          <CommonText customTextStyle={style.linkTextStyle} fontWeight="600">
            {linkText}
          </CommonText>
        </TouchableOpacity>
      )}
    </View>
  );
};

LabelWithLinkText.defaultProps = {
  labelText: "",
  linkText: "",
  onLinkClick: () => {},
};

LabelWithLinkText.propTypes = {
  labelText: PropTypes.string,
  linkText: PropTypes.string,
  onLinkClick: PropTypes.func,
};

export default LabelWithLinkText;
