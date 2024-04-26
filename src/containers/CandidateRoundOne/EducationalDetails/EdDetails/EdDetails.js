//Libraries
import React, { useImperativeHandle, useRef } from "react";
//UI & Styling
import EdDetailTemplate from "./EdDetailTemplate";
import useExamDetailsAPI from "../../../../services/apiServices/hooks/CandidateRoundeOne/useExamDetailsAPI";
import MultiRow from "../../../../core/layouts/MultiRow";
import styles from "./EdDetail.style";

const EdDetails = ({ intl, isWebView, isViewMode = false, educationFilledDetails }, ref) => {
    //refs
    const edDetailsRef = useRef();

    useImperativeHandle(ref, () => ({
      getState: () => {
        return edDetailsRef?.current?.getState()
      }
    }))

    const edDetailsConfig = [
        {
          content: <EdDetailTemplate ref={edDetailsRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode} educationFilledDetails={educationFilledDetails}/>,
        }
      ];

  return (
    <MultiRow rows={edDetailsConfig} style={styles.mainContainer}/>
  );
};

export default React.forwardRef(EdDetails);
