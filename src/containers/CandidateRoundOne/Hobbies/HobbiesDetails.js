//Libraries
import React, { useRef } from "react";
//UI & Styling
import MultiRow from "../../../core/layouts/MultiRow";
import styles from "./HobbiesDetails.style";
import { View } from "@unthinkable/react-core-components";
import Achievements from "./Achievements";
import Hobbies from "./Hobbies";

const HobbiesDetails = ({ intl, isWebView, isViewMode = false }) => {
    //refs
    const achievementsRef = useRef();
    const hobbiesRef = useRef();
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
          content: <Achievements ref={achievementsRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
        {
          content: <Hobbies ref={hobbiesRef} intl={intl} isWebView={isWebView} isViewMode={isViewMode}/>,
        },
      ];

  return (
    <View style={styles.main}>
      <MultiRow rows={edDetailsConfig} style={styles.mainContainer}/>
    </View>
  );
};

export default HobbiesDetails;
