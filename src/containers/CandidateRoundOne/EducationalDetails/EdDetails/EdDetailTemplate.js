import React, {useState, useRef, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../../components/CardComponent";
import CommonText from "../../../../components/CommonText";
import CustomTextInput from "../../../../components/CustomTextInput";
import { YEARS } from "../../../../constants/constants";
import styles from "./EdDetail.style";
import CustomLabelView from "../../../../components/CustomLabelView";
import CustomToggleComponent from "../../../../components/CustomToggleComponent";

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
  const [isGraduated, setIsGraduated] = useState(true);
  const [graduationExaminationName, setGraduationExaminationName] = useState('');
  const [graduationStatus, setGraduationStatus] = useState('');
  const [graduationBoard, setGraduationBoard] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [graduationMarks, setGraduationMarks] = useState('');
  const [graduationRank, setGraduationRank] = useState('');
  //post graduation states
  const [isPostGraduated, setIsPostGraduated] = useState(true);
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
        metricExaminationName,
        metricStatus,
        metricBoard,
        metricYear,
        metricMarks,
        metricRank,
        // Higher secondary states
        higherSecondaryExaminationName,
        higherSecondaryStatus,
        higherSecondaryBoard,
        higherSecondaryYear,
        higherSecondaryMarks,
        higherSecondaryRank,
        // Graduation states
        isGraduated,
        graduationExaminationName,
        graduationStatus,
        graduationBoard,
        graduationYear,
        graduationMarks,
        graduationRank,
        // Post graduation states
        isPostGraduated,
        postGraduationExaminationName,
        postGraduationStatus,
        postGraduationBoard,
        postGraduationYear,
        postGraduationMarks,
        postGraduationRank,
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
            options={YEARS}
            value={metricStatus}
            onChangeValue={setMetricStatus}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(false)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.board_university" })}
            placeholder={intl.formatMessage({ id: "label.board_university" })}
            isDropdown
            options={YEARS}
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
            onChangeText={setMetricYear}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.mark_in_percent" })}
            placeholder={intl.formatMessage({ id: "label.mark_in_percent" })}
            value={metricMarks}
            onChangeValue={setMetricMarks}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.rank_medal" })}
            placeholder={intl.formatMessage({ id: "label.rank_medal" })}
            value={metricRank}
            onChangeValue={setMetricRank}
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
            options={YEARS}
            value={higherSecondaryStatus}
            onChangeValue={setHigherSecondaryStatus}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(false)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.board_university" })}
            placeholder={intl.formatMessage({ id: "label.board_university" })}
            isDropdown
            options={YEARS}
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
            onChangeText={setHigherSecondaryYear}
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
            options={YEARS}
            value={graduationStatus}
            onChangeValue={setGraduationStatus}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(false)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.board_university" })}
            placeholder={intl.formatMessage({ id: "label.board_university" })}
            isDropdown
            options={YEARS}
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
            onChangeText={setGraduationYear}
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
            options={YEARS}
            value={postGraduationStatus}
            onChangeValue={setPostGraduationStatus}
          />
          <CustomTextInput
            isViewMode={isViewMode}
            customStyle={styles.textInputContainer(false)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.board_university" })}
            placeholder={intl.formatMessage({ id: "label.board_university" })}
            isDropdown
            options={YEARS}
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
            onChangeText={setPostGraduationYear}
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
          {/* post graduation details code ends here */}
        </View>
      </View>
    </CardComponent>
  )
};

export default  React.forwardRef(EdDetailTemplate);