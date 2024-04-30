//Libraries
import React, { useImperativeHandle, useRef } from "react";
//UI & Styling
import { useTheme } from "@unthinkable/react-theme";

import EdDetailTemplate from "./EdDetailTemplate";
import MultiRow from "../../../../core/layouts/MultiRow";
import getStyles from "./EdDetail.style";

const EdDetails = (
  { intl, isWebView, isViewMode = false, educationFilledDetails },
  ref
) => {
  //refs
  const edDetailsRef = useRef();
  const theme = useTheme();
  const styles = getStyles(theme);

  useImperativeHandle(ref, () => ({
    getState: () => {
      return edDetailsRef?.current?.getState();
    },
  }));

  const edDetailsConfig = [
    {
      content: (
        <EdDetailTemplate
          ref={edDetailsRef}
          intl={intl}
          isWebView={isWebView}
          isViewMode={isViewMode}
          educationFilledDetails={educationFilledDetails}
        />
      ),
    },
  ];

  return <MultiRow rows={edDetailsConfig} style={styles.mainContainer} />;
};

export default React.forwardRef(EdDetails);
