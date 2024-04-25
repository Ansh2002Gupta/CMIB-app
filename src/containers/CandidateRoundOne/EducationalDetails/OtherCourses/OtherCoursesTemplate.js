import React, {useState, useImperativeHandle} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../../components/CardComponent";
import CommonText from "../../../../components/CommonText";
import CustomTextInput from "../../../../components/CustomTextInput";
import { YEARS } from "../../../../constants/constants";
import styles from "./OtherCourses.style";
import CustomLabelView from "../../../../components/CustomLabelView";
import CustomToggleComponent from "../../../../components/CustomToggleComponent";

const OtherCoursesTemplate = ({intl, isWebView, isViewMode}, ref) => {
  const [otherCourseExaminationName, setOtherCourseExaminationName] = useState('');
  const [otherCourseStatus, setOtherCourseStatus] = useState('');
  const [otherCourseBoard, setOtherCourseBoard] = useState('');
  const [otherCourseYear, setOtherCourseYear] = useState('');
  const [otherCourseMarks, setOtherCourseMarks] = useState('');
  const [otherCourseGrade, setOtherCourseGrade] = useState('');

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        "Others": [{
          exam_board: otherCourseBoard,
          exam_name: otherCourseExaminationName,
          passing_percentage: otherCourseMarks,
          passing_cgpa: otherCourseGrade,
          passing_rank: "",
          passing_year: otherCourseYear,
          exam_status: otherCourseStatus,
        }]
      };
    },
  }));

  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.other_courses" })}
          </CommonText>
          <View style={isWebView ? styles.gridView : styles.gap}>
            {/* otherCourse details code starts here */}
            <CustomTextInput
              isViewMode={isViewMode}
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.name_of_examination" })}
              placeholder={intl.formatMessage({ id: "label.name_of_examination_placeholder" })}
              value={otherCourseExaminationName}
              onChangeValue={setOtherCourseExaminationName}
            />
            <CustomTextInput
              isViewMode={isViewMode}
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.board_university" })}
              placeholder={intl.formatMessage({ id: "label.board_university" })}
              isDropdown
              options={YEARS}
              value={otherCourseBoard}
              onChangeText={setOtherCourseBoard}
            />
            <CustomTextInput
              isViewMode={isViewMode}
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.year" })}
              placeholder={intl.formatMessage({ id: "label.year" })}
              isDropdown
              options={YEARS}
              value={otherCourseYear}
              onChangeText={setOtherCourseYear}
            />
            <CustomTextInput
              isViewMode={isViewMode}
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.grade_cgpa" })}
              placeholder={intl.formatMessage({ id: "label.grade_cgpa" })}
              value={otherCourseGrade}
              onChangeValue={setOtherCourseGrade}
            />
            <CustomTextInput
              isViewMode={isViewMode}
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.mark_in_percent" })}
              placeholder={intl.formatMessage({ id: "label.mark_in_percent" })}
              value={otherCourseMarks}
              onChangeValue={setOtherCourseMarks}
            />
          </View>
        </CardComponent>
  )
};

export default  React.forwardRef(OtherCoursesTemplate);