import React, { useContext } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";

import useIsWebView from "../../../../hooks/useIsWebView";

import CardComponent from "../../../../components/CardComponent/CardComponent";
import CheckBox from "../../../../components/CheckBox";
import CommonText from "../../../../components/CommonText";
import CustomImage from "../../../../components/CustomImage";
import CustomTextInput from "../../../../components/CustomTextInput";
import CustomTextEditor from "../../../../components/CustomTextEditor/CustomTextEditor";
import CustomToggleComponent from "../../../../components/CustomToggleComponent/CustomToggleComponent";
import DetailCard from "../../../../components/DetailCard";
import MultiRow from "../../../../core/layouts/MultiRow";
import TwoColumn from "../../../../core/layouts/TwoColumn/TwoColumn";
import { gridStyles } from "../../../../theme/styles/commonStyles";
import images from "../../../../images";
import styles from "./JobDetails.style";

const JobDetailsTemplate = ({
  addDesignation,
  bondPeriod,
  compensation,
  CTCDetail,
  designationName,
  exitAmount,
  handleBondPeriod,
  handleCompensation,
  handleCTCDetail,
  handleDesignationName,
  handleExitAmount,
  handleMonthlyData,
  handleStartingSalary,
  handleYearlyData,
  handleToggle,
  jobDetailData,
  onClickAddDesignation,
  selectionProcess,
  startingSalary,
}) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const columnCount = isWebView && gridStyles[currentBreakpoint];
  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.containerStyle;

  const renderSelectionProcess = () => {
    return (
      <View style={styles.checkBoxStyle}>
        {selectionProcess.map((item, index) => (
          <CheckBox
            key={item.id}
            id={item.id}
            index={index}
            title={item.title}
            isSelected={item.isSelected}
            handleCheckbox={handleToggle}
          />
        ))}
      </View>
    );
  };

  const JobDetailsConfig = [
    {
      content: (
        <View style={styles.addDesignationStyle}>
          <TouchableOpacity onPress={onClickAddDesignation}>
            <CardComponent customStyle={styles.customCardComponentStyle}>
              <CustomImage
                Icon={images.iconAdd}
                isSvg
                source={images.iconAdd}
              />
              <CommonText customTextStyle={styles.addDesignationTextStyle}>
                {intl.formatMessage({ id: "label.add_designation" })}
              </CommonText>
            </CardComponent>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      content: (
        <CardComponent customStyle={styles.bottomMargin}>
          <CustomTextInput
            label={intl.formatMessage({ id: "label.designationName" })}
            placeholder={intl.formatMessage({ id: "label.designationName" })}
            isMandatory
            value={designationName}
            onChangeText={(val) => handleDesignationName(val)}
          />
          <View style={{ ...containerStyle }}>
            <CustomTextInput
              customStyle={[isWebView && styles.customStyleCompensation]}
              label={intl.formatMessage({ id: "label.compensation" })}
              placeholder={intl.formatMessage({ id: "label.compensation" })}
              isMandatory
              value={compensation}
              onChangeText={(val) => handleCompensation(val)}
            />
            <CustomTextInput
              label={intl.formatMessage({
                id: "label.starting_salary_including_perks",
              })}
              placeholder={intl.formatMessage({
                id: "label.starting_salary_including_perks",
              })}
              isMandatory
              value={startingSalary}
              onChangeText={(val) => handleStartingSalary(val)}
            />
          </View>
          <CustomTextEditor
            label={intl.formatMessage({
              id: "label.roles_and_responsibility",
            })}
            isMandatory
          />
          <CustomTextInput
            customStyle={styles.ctcTextInputStyle}
            label={intl.formatMessage({
              id: "label.details_of_ctc",
            })}
            placeholder={intl.formatMessage({
              id: "label.details_of_ctc",
            })}
            isMandatory
            value={CTCDetail}
            onChangeText={(val) => handleCTCDetail(val)}
          />
        </CardComponent>
      ),
    },
    {
      content: (
        <View style={styles.bottomMargin}>
          <DetailCard
            headerId="label.monthly"
            details={jobDetailData?.Monthly}
            handleChange={handleMonthlyData}
            isEditProfile
            customCardStyle={styles.monthlyCustomCardStyle}
          />
          <DetailCard
            headerId="label.yearly"
            details={jobDetailData?.Yearly}
            handleChange={handleYearlyData}
            isEditProfile
            customCardStyle={styles.yearlyCustomCardStyle}
          />
        </View>
      ),
    },
    {
      content: (
        <CardComponent customStyle={styles.bottomMargin}>
          <View style={styles.bottomMargin}>
            <CommonText customTextStyle={styles.bondIfAnyText}>
              {intl.formatMessage({
                id: "label.bond_if_any",
              })}
            </CommonText>
          </View>
          <View style={{ ...containerStyle }}>
            <CustomToggleComponent
              label={intl.formatMessage({
                id: "label.bond_required",
              })}
              isMandatory
              customToggleStyle={styles.customToggleStyle}
            />
            <View style={{ flexDirection: "row" }}>
              <CustomTextInput
                customStyle={styles.bondCustomInputStyle}
                label={intl.formatMessage({
                  id: "label.months_bond_period",
                })}
                placeholder={intl.formatMessage({
                  id: "label.months_bond_period",
                })}
                isMandatory
                value={bondPeriod}
                onChangeText={(val) => handleBondPeriod(val)}
              />
              <CustomTextInput
                customStyle={styles.bondCustomInputStyle}
                label={intl.formatMessage({
                  id: "label.exit_amount",
                })}
                placeholder={intl.formatMessage({
                  id: "label.exit_amount",
                })}
                isMandatory
                value={exitAmount}
                onChangeText={(val) => handleExitAmount(val)}
              />
            </View>
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
        <CardComponent customStyle={styles.bottomMargin}>
          <CommonText
            customContainerStyle={styles.selectionProcessTextStyle}
            customTextStyle={styles.selectionProcessStyle}
          >
            {intl.formatMessage({
              id: "label.selection_process",
            })}
          </CommonText>

          {renderSelectionProcess()}
        </CardComponent>
      ),
    },
  ];

  let filteredJobDetailsConfig = [];
  let filteredWebJobDetailsConfig = [];
  if (currentBreakpoint === "xs") {
    if (!addDesignation) {
      filteredJobDetailsConfig = JobDetailsConfig.slice(0, 1);
    } else {
      filteredJobDetailsConfig = JobDetailsConfig.filter(
        (_, index) => index !== 0
      );
    }
  } else {
    filteredWebJobDetailsConfig = JobDetailsConfig.filter(
      (_, index) => index !== 0
    );
  }

  return (
    <ScrollView style={{ marginBottom: 64 }}>
      {currentBreakpoint === "xs" ? (
        <MultiRow
          rows={filteredJobDetailsConfig}
          style={{ marginLeft: 16, marginRight: 16 }}
        />
      ) : (
        <TwoColumn
          leftSection={[]}
          leftSectionStyle={{ flex: 3 }}
          rightSection={<MultiRow rows={filteredWebJobDetailsConfig} />}
          rightSectionStyle={{ flex: 7 }}
        />
      )}
    </ScrollView>
  );
};

export default JobDetailsTemplate;
