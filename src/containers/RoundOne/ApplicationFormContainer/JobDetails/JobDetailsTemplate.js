import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";

import useIsWebView from "../../../../hooks/useIsWebView";

import CardComponent from "../../../CardComponent/CardComponent";
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
  jobDetailData,
  handleMonthlyData,
  handleYearlyData,
  onClickAddDesignation,
  options,
}) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const [designationName, setDesignationName] = useState(null);
  const [compensation, setCompensation] = useState(null);
  const [startingSalary, setStartingSalary] = useState(null);
  const [CTCDetail, setCTCDetail] = useState(null);

  const columnCount = isWebView && gridStyles[currentBreakpoint];
  const containerStyle = isWebView
    ? styles.containerGridStyle(columnCount)
    : styles.containerStyle;

  const renderSelectionProcess = () => {
    return (
      <View style={styles.contentStyle}>
        {options.map((item, index) => (
          <CheckBox
            key={item.id}
            id={item.id}
            index={index}
            title={item.title}
            isSelected={item.isSelected}
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
            <CardComponent
              customCardComponentStyle={styles.customCardComponentStyle}
            >
              <CustomImage
                Icon={images.iconAdd}
                isSvg
                source={images.iconAdd}
              />
              <CommonText
                title={intl.formatMessage({ id: "label.add_designation" })}
                customTextStyle={styles.addDesignationTextStyle}
              />
            </CardComponent>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      content: (
        <CardComponent>
          <CustomTextInput
            label={intl.formatMessage({ id: "label.designationName" })}
            placeholder={intl.formatMessage({ id: "label.designationName" })}
            isMandatory
            value={designationName}
            onChangeText={(val) => setDesignationName(val)}
          />
          <View style={{ ...containerStyle }}>
            <CustomTextInput
              customStyle={{ marginRight: 10 }}
              label={intl.formatMessage({ id: "label.compensation" })}
              placeholder={intl.formatMessage({ id: "label.compensation" })}
              isMandatory
              value={compensation}
              onChangeText={(val) => setCompensation(val)}
            />
            <CustomTextInput
              customStyle={{ marginRight: 10 }}
              label={intl.formatMessage({
                id: "label.starting_salary_including_perks",
              })}
              placeholder={intl.formatMessage({
                id: "label.starting_salary_including_perks",
              })}
              isMandatory
              value={startingSalary}
              onChangeText={(val) => setStartingSalary(val)}
            />
          </View>
          <CustomTextEditor
            label={intl.formatMessage({
              id: "label.roles_and_responsibility",
            })}
            isMandatory
          />
          <CustomTextInput
            customStyle={{ marginRight: 10, marginTop: 24 }}
            label={intl.formatMessage({
              id: "label.details_of_ctc",
            })}
            placeholder={intl.formatMessage({
              id: "label.details_of_ctc",
            })}
            isMandatory
            value={CTCDetail}
            onChangeText={(val) => setCTCDetail(val)}
          />
        </CardComponent>
      ),
    },
    {
      content: (
        <View>
          <DetailCard
            headerId="Monthly"
            details={jobDetailData?.Monthly}
            handleChange={handleMonthlyData}
            isEditProfile
          />
          <DetailCard
            headerId="Yearly"
            details={jobDetailData?.Yearly}
            handleChange={handleYearlyData}
            isEditProfile
          />
        </View>
      ),
    },
    {
      content: (
        <CardComponent>
          <View style={{ marginBottom: 24 }}>
            <CommonText
              title={intl.formatMessage({
                id: "label.bond_if_any",
              })}
              customTextStyle={{ fontSize: 16, fontWeight: "600" }}
            />
          </View>
          <View style={{ ...containerStyle }}>
            <CustomToggleComponent
              label={intl.formatMessage({
                id: "label.bond_required",
              })}
              isMandatory
              customToggleStyle={{ paddingTop: 16, marginBottom: 12 }}
            />

            <CustomTextInput
              customStyle={{ marginRight: 10 }}
              label={intl.formatMessage({
                id: "label.months_bond_period",
              })}
              placeholder={intl.formatMessage({
                id: "label.months_bond_period",
              })}
              isMandatory
            />
            <CustomTextInput
              customStyle={{ marginRight: 10 }}
              label={intl.formatMessage({
                id: "label.exit_amount",
              })}
              placeholder={intl.formatMessage({
                id: "label.exit_amount",
              })}
              isMandatory
              onChangeText={(val) => setStartingSalary(val)}
            />
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
        <CardComponent>
          <CommonText
            title={intl.formatMessage({
              id: "label.selection_process",
            })}
          />
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
    <ScrollView style={{ marginBottom: 24 }}>
      {currentBreakpoint === "xs" ? (
        <MultiRow
          rows={filteredJobDetailsConfig}
          style={{ marginLeft: 16, marginRight: 16 }}
        />
      ) : (
        <TwoColumn
          leftSection={
            <CardComponent
              customCardComponentStyle={styles.customCardComponentStyle}
            >
              <CommonText
                title={intl.formatMessage({ id: "label.designation" })}
                customTextStyle={styles.addDesignationTextStyle}
              />
              <CustomImage
                Icon={images.iconAdd}
                isSvg
                source={images.iconAdd}
              />
            </CardComponent>
          }
          leftSectionStyle={{ flex: 3, marginLeft: 24, marginRight: 16 }}
          rightSection={<MultiRow rows={filteredWebJobDetailsConfig} />}
          rightSectionStyle={{ flex: 7, marginRight: 16 }}
        />
      )}
    </ScrollView>
  );
};

export default JobDetailsTemplate;
