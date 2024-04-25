import React, {useState, useRef, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../../components/CardComponent";
import CommonText from "../../../../components/CommonText";
import CustomTextInput from "../../../../components/CustomTextInput";
import { YEARS, Education_Status_Options } from "../../../../constants/constants";
import styles from "./EdDetail.style";
import CustomLabelView from "../../../../components/CustomLabelView";
import CustomToggleComponent from "../../../../components/CustomToggleComponent";
import { capitalizeFirstLetter } from "../../../../utils/util";

const EdDetailTemplate = ({intl, isWebView, isViewMode}, ref) => {
  //metric states
  const [metricExaminationName, setMetricExaminationName] = useState('');
  const [metricStatus, setMetricStatus] = useState('');
  const [metricBoard, setMetricBoard] = useState('');
  const [metricYear, setMetricYear] = useState('');
  const [metricMarks, setMetricMarks] = useState('');
  const [metricRank, setMetricRank] = useState('');
  //higher secondary states
  const [higherSecondaryExaminationName, setHigherSecondaryExaminationName] = useState('');
  const [higherSecondaryStatus, setHigherSecondaryStatus] = useState('');
  const [higherSecondaryBoard, setHigherSecondaryBoard] = useState('');
  const [higherSecondaryYear, setHigherSecondaryYear] = useState('');
  const [higherSecondaryMarks, setHigherSecondaryMarks] = useState('');
  const [higherSecondaryRank, setHigherSecondaryRank] = useState(''); 
  //graduation states
  const [isGraduated, setIsGraduated] = useState(1);
  const [graduationExaminationName, setGraduationExaminationName] = useState('');
  const [graduationStatus, setGraduationStatus] = useState('');
  const [graduationBoard, setGraduationBoard] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [graduationMarks, setGraduationMarks] = useState('');
  const [graduationRank, setGraduationRank] = useState('');
  //post graduation states
  const [isPostGraduated, setIsPostGraduated] = useState(1);
  const [postGraduationExaminationName, setPostGraduationExaminationName] = useState('');
  const [postGraduationStatus, setPostGraduationStatus] = useState('');
  const [postGraduationBoard, setPostGraduationBoard] = useState('');
  const [postGraduationYear, setPostGraduationYear] = useState('');
  const [postGraduationMarks, setPostGraduationMarks] = useState('');
  const [postGraduationRank, setPostGraduationRank] = useState(''); 

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        // Metric states
        "Class 10" : {
          exam_name: metricExaminationName,
          exam_status: capitalizeFirstLetter(metricStatus),
          exam_board: metricBoard,
          passing_year: metricYear,
          passing_percentage: metricMarks,
          passing_rank: metricRank,
        },
        // Higher secondary states
        "Class 12" : {
          exam_name: higherSecondaryExaminationName,
          exam_status: capitalizeFirstLetter(higherSecondaryStatus),
          exam_board: higherSecondaryBoard,
          passing_year: higherSecondaryYear,
          passing_percentage: higherSecondaryMarks,
          passing_rank:   higherSecondaryRank,
        },
        // Graduation states
        "Graduation": {
          isGraduated,
          exam_name: graduationExaminationName,
          exam_status: capitalizeFirstLetter(graduationStatus),
          exam_board: graduationBoard,
          passing_year: graduationYear,
          passing_percentage: graduationMarks,
          passing_rank: graduationRank,
        },
        // Post graduation states
        "Post Graduation": {
          isPostGraduated,
          exam_name: postGraduationExaminationName,
          exam_status: capitalizeFirstLetter(postGraduationStatus),
          exam_board: postGraduationBoard,
          passing_year: postGraduationYear,
          passing_percentage: postGraduationMarks,
          passing_rank: postGraduationRank,
        }
      };
    },
  }));

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
        {intl.formatMessage({ id: "label.educational_details" })}
      </CommonText>
      <View >
        <View style={isWebView ? styles.gridView : styles.gap}>
          {/* metric details code starts here */}
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.name_of_examination" })}
            placeholder={intl.formatMessage({ id: "label.name_of_examination_placeholder" })}
            value={metricExaminationName}
            isEditable={false}
            onChangeValue={setMetricExaminationName}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.status" })}
            placeholder={intl.formatMessage({ id: "label.status" })}
            isDropdown
            options={Education_Status_Options}
            value={metricStatus}
            onChangeValue={setMetricStatus}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(false)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.board_university" })}
            placeholder={intl.formatMessage({ id: "label.board_university" })}
            value={metricBoard}
            onChangeText={setMetricBoard}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            isPaddingNotRequired
            customStyle={styles.textInputContainer(isWebView)}
            label={intl.formatMessage({ id: "label.year" })}
            placeholder={intl.formatMessage({ id: "label.year" })}
            isDropdown
            options={YEARS}
            value={metricYear}
            onChangeValue={setMetricYear}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.mark_in_percent" })}
            placeholder={intl.formatMessage({ id: "label.mark_in_percent" })}
            value={metricMarks}
            onChangeText={setMetricMarks}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.rank_medal" })}
            placeholder={intl.formatMessage({ id: "label.rank_medal" })}
            value={metricRank}
            onChangeText={setMetricRank}
          />
          {/* metric details code ends here */}
        </View>
        <View style={[isWebView ? styles.gridView : styles.gap, styles.extraStyle]}>
          {/* higher secondary details code starts here */}
          <CustomTextInput
            isViewMode={isViewMode}
            isPaddingNotRequired
            customStyle={styles.textInputContainer(isWebView)}
            label={intl.formatMessage({ id: "label.name_of_examination" })}
            placeholder={intl.formatMessage({ id: "label.name_of_examination" })}
            value={higherSecondaryExaminationName}
            onChangeText={setHigherSecondaryExaminationName}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.status" })}
            placeholder={intl.formatMessage({ id: "label.status" })}
            isDropdown
            options={Education_Status_Options}
            value={higherSecondaryStatus}
            onChangeValue={setHigherSecondaryStatus}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(false)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.board_university" })}
            placeholder={intl.formatMessage({ id: "label.board_university" })}
            value={higherSecondaryBoard}
            onChangeText={setHigherSecondaryBoard}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            isPaddingNotRequired
            customStyle={styles.textInputContainer(isWebView)}
            label={intl.formatMessage({ id: "label.year" })}
            placeholder={intl.formatMessage({ id: "label.year" })}
            isDropdown
            options={YEARS}
            value={higherSecondaryYear}
            onChangeValue={setHigherSecondaryYear}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.mark_in_percent" })}
            placeholder={intl.formatMessage({ id: "label.mark_in_percent" })}
            value={higherSecondaryMarks}
            onChangeText={setHigherSecondaryMarks}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.rank_medal" })}
            placeholder={intl.formatMessage({ id: "label.rank_medal" })}
            value={higherSecondaryRank}
            onChangeText={setHigherSecondaryRank}
          />
          {/* higher secondary details code ends here */}
        </View>
        <View style={[isWebView ? styles.gridView : styles.gap, styles.extraStyle]}>
          {/* graduation details code starts here */}
          <View style={styles.textInputContainer(isWebView)}>
            <CustomLabelView
              label={intl.formatMessage({ id: "label.graduation" })}
              isMandatory
            />
            <CustomToggleComponent
              isMandatory
              customToggleStyle={styles.customToggleStyle}
              value={isGraduated}
              onValueChange={setIsGraduated}
            />
          </View>
          {!Boolean(isGraduated) && 
          <>
          <CustomTextInput
            isViewMode={isViewMode}
            isPaddingNotRequired
            customStyle={styles.textInputContainer(isWebView)}
            label={intl.formatMessage({ id: "label.name_of_examination" })}
            placeholder={intl.formatMessage({ id: "label.name_of_examination" })}
            value={graduationExaminationName}
            onChangeText={setGraduationExaminationName}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.status" })}
            placeholder={intl.formatMessage({ id: "label.status" })}
            isDropdown
            options={Education_Status_Options}
            value={graduationStatus}
            onChangeValue={setGraduationStatus}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(false)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.board_university" })}
            placeholder={intl.formatMessage({ id: "label.board_university" })}
            value={graduationBoard}
            onChangeText={setGraduationBoard}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            isPaddingNotRequired
            customStyle={styles.textInputContainer(isWebView)}
            label={intl.formatMessage({ id: "label.year" })}
            placeholder={intl.formatMessage({ id: "label.year" })}
            isDropdown
            options={YEARS}
            value={graduationYear}
            onChangeValue={setGraduationYear}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.mark_in_percent" })}
            placeholder={intl.formatMessage({ id: "label.mark_in_percent" })}
            value={graduationMarks}
            onChangeText={setGraduationMarks}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.rank_medal" })}
            placeholder={intl.formatMessage({ id: "label.rank_medal" })}
            value={graduationRank}
            onChangeText={setGraduationRank}
          />
          </>
          }
          {/* graduation details code ends here */}
        </View>
        <View style={[isWebView ? styles.gridView : styles.gap, styles.extraStyle]}>
          {/* post graduation details code starts here */}
          <View style={styles.textInputContainer(isWebView)}>
            <CustomLabelView
              label={intl.formatMessage({ id: "label.post_graduation" })}
              isMandatory
            />
            <CustomToggleComponent
              isMandatory
              customToggleStyle={styles.customToggleStyle}
              value={isPostGraduated}
              onValueChange={setIsPostGraduated}
            />
          </View>
          {!Boolean(isPostGraduated) && 
          <>
          <CustomTextInput
            isViewMode={isViewMode}
            isPaddingNotRequired
            customStyle={styles.textInputContainer(isWebView)}
            label={intl.formatMessage({ id: "label.name_of_examination" })}
            placeholder={intl.formatMessage({ id: "label.name_of_examination" })}
            value={postGraduationExaminationName}
            onChangeText={setPostGraduationExaminationName}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.status" })}
            placeholder={intl.formatMessage({ id: "label.status" })}
            isDropdown
            options={Education_Status_Options}
            value={postGraduationStatus}
            onChangeValue={setPostGraduationStatus}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(false)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.board_university" })}
            placeholder={intl.formatMessage({ id: "label.board_university" })}
            value={postGraduationBoard}
            onChangeText={setPostGraduationBoard}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            isPaddingNotRequired
            customStyle={styles.textInputContainer(isWebView)}
            label={intl.formatMessage({ id: "label.year" })}
            placeholder={intl.formatMessage({ id: "label.year" })}
            isDropdown
            options={YEARS}
            value={postGraduationYear}
            onChangeValue={setPostGraduationYear}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.mark_in_percent" })}
            placeholder={intl.formatMessage({ id: "label.mark_in_percent" })}
            value={postGraduationMarks}
            onChangeText={setPostGraduationMarks}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.rank_medal" })}
            placeholder={intl.formatMessage({ id: "label.rank_medal" })}
            value={postGraduationRank}
            onChangeText={setPostGraduationRank}
          />
          </>}
          {/* post graduation details code ends here */}
        </View>
      </View>
    </CardComponent>
  )
};

export default  React.forwardRef(EdDetailTemplate);