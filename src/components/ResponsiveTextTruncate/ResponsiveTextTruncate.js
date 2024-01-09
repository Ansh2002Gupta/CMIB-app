import React from "react";
import { useWindowDimensions } from "@unthinkable/react-theme/src/useWindowDimensions";
import CommonText from "../CommonText";

const ResponsiveTextTruncate = ({
  text,
  maxLength,
  ellipsis = "...",
  style,
  widthPercentage = 1,
}) => {
  const windowDimension = useWindowDimensions();
  const windowWidth = windowDimension.width * widthPercentage;
  const numberOfChars = text.length;

  let truncatedText = text;
  if (numberOfChars > maxLength && windowWidth < 600) {
    const truncatedLength = maxLength - ellipsis.length;
    truncatedText = `${text.substring(0, truncatedLength)}${ellipsis}`;
  }

  return (
    <CommonText customTextStyle={style} fontWeight={style?.fontWeight}>
      {truncatedText}
    </CommonText>
  );
};

export default ResponsiveTextTruncate;
