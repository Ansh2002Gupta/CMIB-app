//Libraries
import React, { useRef, useImperativeHandle } from "react";
import { useTheme } from "@unthinkable/react-theme";
//UI & Styling
import OtherCoursesTemplate from "./OtherCoursesTemplate";
import useExamDetailsAPI from "../../../../services/apiServices/hooks/CandidateRoundeOne/useExamDetailsAPI";
import MultiRow from "../../../../core/layouts/MultiRow";
import getStyles from "./OtherCourses.style";

const OtherCourses = ({ intl, isWebView, isViewMode = false }, ref) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  //refs
  const otherCoursesRef = useRef();
  // const { handleExamDetails} = useExamDetailsAPI();

  // useEffect(() => {
  //     handleExamDetails ({
  //       successCallback: (examDetails) => {
  //         updateExamDetails(examDetails);
  //       },
  //       errorCallback: () => {},
  //     });
  //   }, []);
  useImperativeHandle(ref, () => ({
    getState: () => {
      return otherCoursesRef?.current?.getState();
    },
  }));
  const otherCourseDetailsConfig = [
    {
      content: (
        <OtherCoursesTemplate
          ref={otherCoursesRef}
          intl={intl}
          isWebView={isWebView}
          isViewMode={isViewMode}
        />
      ),
    },
  ];

  return (
    <MultiRow rows={otherCourseDetailsConfig} style={styles.mainContainer} />
  );
};

export default React.forwardRef(OtherCourses);
