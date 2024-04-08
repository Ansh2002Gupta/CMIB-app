import React from "react";

import CommonText from "../CommonText";
import style from "./SavedJobComponent.style";

export const LocationConfig = (data) => {
  return data?.map((item, index) => {
    return {
      content: (
        <CommonText customTextStyle={[style.blackText, style.webJobLocation]}>
          {item?.name}
          {index !== data?.length - 1 && "/"}
        </CommonText>
      ),
    };
  });
};
