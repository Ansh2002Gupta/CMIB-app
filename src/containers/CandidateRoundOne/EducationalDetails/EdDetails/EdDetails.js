//Libraries
import React, { useRef } from "react";
//UI & Styling
import EdDetailTemplate from "./EdDetailTemplate";
import useExamDetailsAPI from "../../../../services/apiServices/hooks/CandidateRoundeOne/useExamDetailsAPI";
import MultiRow from "../../../../core/layouts/MultiRow";
import styles from "./EdDetail.style";

const EdDetails = ({ intl, isWebView, isViewMode = false }) => {
    //refs
    const edDetailsRef = useRef();
    // const { handleExamDetails} = useExamDetailsAPI();

    // useEffect(() => {
    //     handleExamDetails ({
    //       successCallback: (examDetails) => {
    //         updateExamDetails(examDetails);
    //       },
    //       errorCallback: () => {},
    //     });
    //   }, []);

    const edDetailsConfig = [
        {
          content: <EdDetailTemplate ref={edDetailsRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        }
      ];

  return (
    <MultiRow rows={edDetailsConfig} style={styles.mainContainer}/>
  );
};

export default EdDetails;
