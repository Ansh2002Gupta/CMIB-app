import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../../components/CardComponent";
import CommonText from "../../../../components/CommonText";
import CustomTextInput from "../../../../components/CustomTextInput";
import MultiRow from "../../../../core/layouts/MultiRow";
import { ATTEMPTS, MONTHS, YEARS } from "../../../../constants/constants";
import getStyles from "./Exams.style";

const ExamsTemplate = ({
  finalGroup1Attempt,
  finalGroup1Count,
  finalGroup1Month,
  finalGroup1Year,
  finalGroup2Attempt,
  finalGroup2Count,
  finalGroup2Month,
  finalGroup2Year,
  finalMark,
  finalMonth,
  finalYear,
  finalRank,
  foundationAttempt,
  foundationAttemptCount,
  foundationMark,
  foundationMonth,
  foundationRank,
  foundationYear,
  interGroup1Attempt,
  interGroup1Count,
  interGroup1Month,
  interGroup1Year,
  interGroup2Attempt,
  interGroup2Count,
  interGroup2Month,
  interGroup2Year,
  interMark,
  interMonth,
  interRank,
  interYear,
  intl,
  isWebView,
  onChangeFinalGroup1Attempt,
  onChangeFinalGroup1Count,
  onChangeFinalGroup1Month,
  onChangeFinalGroup1Year,
  onChangeFinalGroup2Attempt,
  onChangeFinalGroup2Count,
  onChangeFinalGroup2Month,
  onChangeFinalGroup2Year,
  onChangeFinalMark,
  onChangeFinalMonth,
  onChangeFinalRank,
  onChangeFinalYear,
  onChangeFoundationAttempt,
  onChangeFoundationAttemptCount,
  onChangeFoundationMark,
  onChangeFoundationMonth,
  onChangeFoundationRank,
  onChangeFoundationYear,
  onChangeInterGroup1Attempt,
  onChangeInterGroup1Count,
  onChangeInterGroup1Month,
  onChangeInterGroup1Year,
  onChangeInterGroup2Attempt,
  onChangeInterGroup2Count,
  onChangeInterGroup2Month,
  onChangeInterGroup2Year,
  onChangeInterMark,
  onChangeInterMonth,
  onChangeInterRank,
  onChangeInterYear,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const examDetailsConfig = [
    {
      content: (
        <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.ca_foundation" })}
          </CommonText>
          <View style={isWebView ? styles.gridView : styles.gap}>
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.month" })}
              placeholder={intl.formatMessage({ id: "label.month" })}
              isDropdown
              noOfRows={2}
              value={foundationMonth}
              options={MONTHS}
              onChangeValue={onChangeFoundationMonth}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.year" })}
              placeholder={intl.formatMessage({ id: "label.year" })}
              isDropdown
              options={YEARS}
              value={foundationYear}
              onChangeValue={onChangeFoundationYear}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.mark_in_percent" })}
              placeholder={intl.formatMessage({ id: "label.mark_in_percent" })}
              value={foundationMark}
              onChangeText={onChangeFoundationMark}
            />
            <CustomTextInput
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.rank_medal" })}
              placeholder={intl.formatMessage({ id: "label.rank_medal" })}
              value={foundationRank}
              onChangeText={onChangeFoundationRank}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.attempt" })}
              placeholder={intl.formatMessage({ id: "label.attempt" })}
              isDropdown
              value={foundationAttempt}
              options={ATTEMPTS}
              onChangeValue={onChangeFoundationAttempt}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({
                id: "label.foundation_attempt_count",
              })}
              placeholder={intl.formatMessage({
                id: "label.foundation_attempt_count",
              })}
              isCounterInput
              value={foundationAttemptCount}
              onChangeText={onChangeFoundationAttemptCount}
            />
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
        <CardComponent customStyle={styles.cardContainer}>
          <View>
            <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
              {intl.formatMessage({ id: "label.ca_inter" })}
            </CommonText>
            <View style={isWebView ? styles.gridView : styles.gap}>
              <CustomTextInput
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.month" })}
                placeholder={intl.formatMessage({ id: "label.month" })}
                isDropdown
                noOfRows={2}
                value={interMonth}
                options={MONTHS}
                onChangeValue={onChangeInterMonth}
              />
              <CustomTextInput
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.year" })}
                placeholder={intl.formatMessage({ id: "label.year" })}
                isDropdown
                value={interYear}
                options={YEARS}
                onChangeValue={onChangeInterYear}
              />
              <CustomTextInput
                customStyle={styles.textInputContainer(false)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.mark_in_percent" })}
                placeholder={intl.formatMessage({
                  id: "label.mark_in_percent",
                })}
                value={interMark}
                onChangeText={onChangeInterMark}
              />
              <CustomTextInput
                isPaddingNotRequired
                customStyle={styles.textInputContainer(isWebView)}
                label={intl.formatMessage({ id: "label.rank_medal" })}
                placeholder={intl.formatMessage({ id: "label.rank_medal" })}
                value={interRank}
                onChangeText={onChangeInterRank}
              />
            </View>
          </View>
          <CardComponent customStyle={styles.cardContainer}>
            <View>
              <CommonText
                customTextStyle={styles.groupTitleText}
                fontWeight={"600"}
              >
                {intl.formatMessage({ id: "label.group1" })}
              </CommonText>
              <View style={isWebView ? styles.groupGridView : styles.gap}>
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.month" })}
                  placeholder={intl.formatMessage({ id: "label.month" })}
                  isDropdown
                  noOfRows={2}
                  value={interGroup1Month}
                  options={MONTHS}
                  onChangeValue={onChangeInterGroup1Month}
                />
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.year" })}
                  placeholder={intl.formatMessage({ id: "label.year" })}
                  isDropdown
                  value={interGroup1Year}
                  options={YEARS}
                  onChangeValue={onChangeInterGroup1Year}
                />
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.attempt" })}
                  placeholder={intl.formatMessage({ id: "label.attempt" })}
                  isDropdown
                  value={interGroup1Attempt}
                  options={ATTEMPTS}
                  onChangeValue={onChangeInterGroup1Attempt}
                />
                <CustomTextInput
                  isPaddingNotRequired
                  customStyle={styles.textInputContainer(false)}
                  label={intl.formatMessage({ id: "label.1_15" })}
                  placeholder={intl.formatMessage({ id: "label.1_15" })}
                  isCounterInput
                  value={interGroup1Count}
                  onChangeText={onChangeInterGroup1Count}
                />
              </View>
            </View>
          </CardComponent>
          <CardComponent customStyle={styles.cardContainer}>
            <View>
              <CommonText
                customTextStyle={styles.groupTitleText}
                fontWeight={"600"}
              >
                {intl.formatMessage({ id: "label.group2" })}
              </CommonText>
              <View style={isWebView ? styles.groupGridView : styles.gap}>
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.month" })}
                  placeholder={intl.formatMessage({ id: "label.month" })}
                  isDropdown
                  noOfRows={2}
                  value={interGroup2Month}
                  options={MONTHS}
                  onChangeValue={onChangeInterGroup2Month}
                />
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.year" })}
                  placeholder={intl.formatMessage({ id: "label.year" })}
                  isDropdown
                  value={interGroup2Year}
                  options={YEARS}
                  onChangeValue={onChangeInterGroup2Year}
                />
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.attempt" })}
                  placeholder={intl.formatMessage({ id: "label.attempt" })}
                  isDropdown
                  value={interGroup2Attempt}
                  options={ATTEMPTS}
                  onChangeValue={onChangeInterGroup2Attempt}
                />
                <CustomTextInput
                  isPaddingNotRequired
                  customStyle={styles.textInputContainer(false)}
                  label={intl.formatMessage({ id: "label.1_15" })}
                  placeholder={intl.formatMessage({ id: "label.1_15" })}
                  isCounterInput
                  value={interGroup2Count}
                  onChangeText={onChangeInterGroup2Count}
                />
              </View>
            </View>
          </CardComponent>
        </CardComponent>
      ),
    },
    {
      content: (
        <CardComponent customStyle={styles.cardContainer}>
          <View>
            <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
              {intl.formatMessage({ id: "label.ca_final_exam" })}
            </CommonText>
            <View style={isWebView ? styles.gridView : styles.gap}>
              <CustomTextInput
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.month" })}
                placeholder={intl.formatMessage({ id: "label.month" })}
                isDropdown
                noOfRows={2}
                isEditable={false}
                value={finalMonth}
                options={MONTHS}
                onChangeValue={onChangeFinalMonth}
              />
              <CustomTextInput
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.year" })}
                placeholder={intl.formatMessage({ id: "label.year" })}
                isDropdown
                value={finalYear}
                isEditable={false}
                options={YEARS}
                onChangeValue={onChangeFinalYear}
              />
              <CustomTextInput
                customStyle={styles.textInputContainer(false)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.mark_in_percent" })}
                placeholder={intl.formatMessage({
                  id: "label.mark_in_percent",
                })}
                value={finalMark}
                isEditable={false}
                onChangeText={onChangeFinalMark}
              />
              <CustomTextInput
                isPaddingNotRequired
                customStyle={styles.textInputContainer(isWebView)}
                label={intl.formatMessage({ id: "label.rank_medal" })}
                placeholder={intl.formatMessage({ id: "label.rank_medal" })}
                value={finalRank}
                onChangeText={onChangeFinalRank}
              />
            </View>
          </View>
          <CardComponent customStyle={styles.cardContainer}>
            <View>
              <CommonText
                customTextStyle={styles.groupTitleText}
                fontWeight={"600"}
              >
                {intl.formatMessage({ id: "label.group1" })}
              </CommonText>
              <View style={isWebView ? styles.groupGridView : styles.gap}>
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.month" })}
                  placeholder={intl.formatMessage({ id: "label.month" })}
                  isDropdown
                  noOfRows={2}
                  value={finalGroup1Month}
                  isEditable={false}
                  options={MONTHS}
                  onChangeValue={onChangeFinalGroup1Month}
                />
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.year" })}
                  placeholder={intl.formatMessage({ id: "label.year" })}
                  isDropdown
                  value={finalGroup1Year}
                  isEditable={false}
                  options={YEARS}
                  onChangeValue={onChangeFinalGroup1Year}
                />
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.attempt" })}
                  placeholder={intl.formatMessage({ id: "label.attempt" })}
                  isDropdown
                  value={finalGroup1Attempt}
                  isEditable={false}
                  options={ATTEMPTS}
                  onChangeValue={onChangeFinalGroup1Attempt}
                />
                <CustomTextInput
                  isPaddingNotRequired
                  customStyle={styles.textInputContainer(false)}
                  label={intl.formatMessage({ id: "label.1_15" })}
                  placeholder={intl.formatMessage({ id: "label.1_15" })}
                  isCounterInput
                  value={finalGroup1Count}
                  onChangeText={onChangeFinalGroup1Count}
                />
              </View>
            </View>
          </CardComponent>
          <CardComponent customStyle={styles.cardContainer}>
            <View>
              <CommonText
                customTextStyle={styles.groupTitleText}
                fontWeight={"600"}
              >
                {intl.formatMessage({ id: "label.group2" })}
              </CommonText>
              <View style={isWebView ? styles.groupGridView : styles.gap}>
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.month" })}
                  placeholder={intl.formatMessage({ id: "label.month" })}
                  isDropdown
                  noOfRows={2}
                  value={finalGroup2Month}
                  isEditable={false}
                  options={MONTHS}
                  onChangeValue={onChangeFinalGroup2Month}
                />
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.year" })}
                  placeholder={intl.formatMessage({ id: "label.year" })}
                  isDropdown
                  value={finalGroup2Year}
                  isEditable={false}
                  options={YEARS}
                  onChangeValue={onChangeFinalGroup2Year}
                />
                <CustomTextInput
                  customStyle={styles.textInputContainer(isWebView)}
                  isPaddingNotRequired
                  label={intl.formatMessage({ id: "label.attempt" })}
                  placeholder={intl.formatMessage({ id: "label.attempt" })}
                  isDropdown
                  value={finalGroup2Attempt}
                  isEditable={false}
                  options={ATTEMPTS}
                  onChangeText={onChangeFinalGroup2Attempt}
                />
                <CustomTextInput
                  isPaddingNotRequired
                  customStyle={styles.textInputContainer(false)}
                  label={intl.formatMessage({ id: "label.1_15" })}
                  placeholder={intl.formatMessage({ id: "label.1_15" })}
                  isCounterInput
                  value={finalGroup2Count}
                  onChangeText={onChangeFinalGroup2Count}
                />
              </View>
            </View>
          </CardComponent>
        </CardComponent>
      ),
    },
  ];
  return <MultiRow rows={examDetailsConfig} style={styles.mainContainer} />;
};

export default ExamsTemplate;
