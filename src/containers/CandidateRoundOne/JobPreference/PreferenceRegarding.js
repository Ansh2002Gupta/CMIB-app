import React, { useState, useImperativeHandle, useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./JobPreferenceDetails.style";
import { BOOLEAN_OPTION, CATEGORIES } from "../../../constants/constants";
import useFetch from "../../../hooks/useFetch";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import CustomChipCard from "../../../components/CustomChipCard/CustomChipCard";

const PreferenceRegarding = (
  { intl, isWebView, isViewMode = false, onValidationChange = () => {} },
  ref
) => {
  //states
  const [isPostedAnywhere, setIsPostedAnywhere] = useState(1);
  const [whetherTransferable, setWhetherTransferable] = useState(1);
  const [
    participatedInResidentialProgram,
    setParticipatedInResidentialProgram,
  ] = useState(1);
  const [isReadyToPlacedOutside, setIsReadyToPlacedOutside] = useState(1);
  const [preferredRegion, setPreferredRegion] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [industryPreference, setIndustryPreference] = useState([]);
  const [workAreaPreference, setWorkAreaPreference] = useState([]);
  const [category, setCategory] = useState("");
  const [ews, setEws] = useState(1);
  const [physicallyImpaired, setphysicallyImpaired] = useState(1);

  //custom functions
  const onSelectIndustry = (val) => {
    if (!industryPreference.includes(val)) {
      setIndustryPreference((prev) => [...prev, val]);
    }
  };

  const { data: industryData } = useFetch({
    url: "core/industry-types",
  });
  const { data: jobData } = useFetch({
    url: "company/functional-areas",
  });

  const onSelectWorkArea = (val) => {
    if (!workAreaPreference.includes(val)) {
      setWorkAreaPreference((prev) => [...prev, val]);
    }
  };

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        posting_anywhere_in_india: isPostedAnywhere,
        transferable_post_acceptable: whetherTransferable,
        participate_in_icai_residential_program:
          participatedInResidentialProgram,
        posting_outside_india: isReadyToPlacedOutside,
        preferred_region: preferredRegion,
        expected_annual_salary: expectedSalary,
        industry_preference: [industryPreference],
        functional_area_preference: [workAreaPreference],
        category,
        economical_weaker_section: ews,
        physically_impaired: physicallyImpaired,
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    let res =
      expectedSalary.length > 0 &&
      industryPreference.length > 0 &&
      workAreaPreference.length > 0 &&
      category.length > 0;
    if (Boolean(isReadyToPlacedOutside)) {
      onValidationChange(res);
    } else {
      onValidationChange(res && preferredRegion.length > 0);
    }
  }, [
    isReadyToPlacedOutside,
    preferredRegion,
    expectedSalary,
    industryPreference,
    workAreaPreference,
    category,
    onValidationChange,
  ]);

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
        {intl.formatMessage({ id: "label.preferences_regarging_job" })}
      </CommonText>
      <View style={isWebView ? styles.gridView : styles.gap}>
        <View style={styles.textInputContainer(isWebView)}>
          <CustomLabelView
            label={intl.formatMessage({
              id: "label.posting_anywhere_in_india",
            })}
            isMandatory={!isViewMode}
          />
          <CustomToggleComponent
            isMandatory={!isViewMode}
            customToggleStyle={styles.customToggleStyle}
            value={isPostedAnywhere}
            onValueChange={setIsPostedAnywhere}
          />
        </View>
        <View style={styles.textInputContainer(isWebView)}>
          <CustomLabelView
            label={intl.formatMessage({
              id: "label.whether_transferable_post_acceptable",
            })}
            isMandatory={!isViewMode}
          />
          <CustomToggleComponent
            isMandatory={!isViewMode}
            customToggleStyle={styles.customToggleStyle}
            value={whetherTransferable}
            onValueChange={setWhetherTransferable}
          />
        </View>
        <View style={styles.textInputContainer(isWebView)}>
          <CustomLabelView
            label={intl.formatMessage({
              id: "label.haveYouParticipatedInResidential",
            })}
            isMandatory={!isViewMode}
          />
          <CustomToggleComponent
            isMandatory={!isViewMode}
            customToggleStyle={styles.customToggleStyle}
            value={participatedInResidentialProgram}
            onValueChange={setParticipatedInResidentialProgram}
          />
        </View>
        <View style={styles.textInputContainer(isWebView)}>
          <CustomLabelView
            label={intl.formatMessage({
              id: "label.ready_to_place_outside_india",
            })}
            isMandatory={!isViewMode}
          />
          <CustomToggleComponent
            isMandatory={!isViewMode}
            customToggleStyle={styles.customToggleStyle}
            value={isReadyToPlacedOutside}
            onValueChange={setIsReadyToPlacedOutside}
          />
        </View>
        {!Boolean(isReadyToPlacedOutside) && (
          <CustomTextInput
            isViewMode={isViewMode}
            viewText={preferredRegion}
            isMandatory={!isViewMode}
            customStyle={styles.textInputContainer(isWebView)}
            isPaddingNotRequired
            label={intl.formatMessage({ id: "label.preferred_region" })}
            placeholder={intl.formatMessage({ id: "label.preferred_region" })}
            value={preferredRegion}
            isDropdown
            options={BOOLEAN_OPTION}
            onChangeValue={setPreferredRegion}
          />
        )}
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={expectedSalary}
          isMandatory={!isViewMode}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.expected_annual_salary" })}
          placeholder={intl.formatMessage({
            id: "label.expected_annual_salary",
          })}
          value={expectedSalary}
          onChangeText={setExpectedSalary}
        />
      </View>
      <View style={isWebView ? styles.twoColumnSingleElement : styles.gap}>
        <View style={{ marginBottom: 24 }}>
          <CustomTextInput
            isViewMode={isViewMode}
            viewText={industryPreference}
            isMandatory={!isViewMode}
            customStyle={styles.textInputContainerWithoutBottomMargin(
              isWebView
            )}
            isPaddingNotRequired
            label={intl.formatMessage({
              id: "label.preferences_kind_of_industry",
            })}
            placeholder={intl.formatMessage({
              id: "label.selectIndustryPreference",
            })}
            isDropdown
            options={industryData}
            onChangeValue={onSelectIndustry}
            valueField={"name"}
            labelField={"name"}
            inputKey={"name"}
          />
          <View style={styles.chipContainer}>
            {industryPreference.map((item, index) => {
              return (
                <CustomChipCard
                  key={index}
                  message={item}
                  isEditable={!isViewMode}
                  onPress={() => {
                    let newPref = industryPreference.filter(
                      (i, ind) => index !== ind
                    );
                    setIndustryPreference(newPref);
                  }}
                />
              );
            })}
          </View>
        </View>
        <View></View>
        <View style={{ marginBottom: 24 }}>
          <CustomTextInput
            isViewMode={isViewMode}
            viewText={workAreaPreference}
            isMandatory={!isViewMode}
            customStyle={styles.textInputContainerWithoutBottomMargin(
              isWebView
            )}
            isPaddingNotRequired
            label={intl.formatMessage({
              id: "label.preference_for_area_of_work",
            })}
            placeholder={intl.formatMessage({
              id: "label.selectWorkAreaPreference",
            })}
            isDropdown
            options={jobData}
            onChangeValue={onSelectWorkArea}
            valueField={"name"}
            labelField={"name"}
            inputKey={"name"}
          />
          <View style={styles.chipContainer}>
            {workAreaPreference.map((item, index) => {
              return (
                <CustomChipCard
                  key={index}
                  message={item}
                  isEditable={!isViewMode}
                  onPress={() => {
                    let newPref = workAreaPreference.filter(
                      (i, ind) => index !== ind
                    );
                    setWorkAreaPreference(newPref);
                  }}
                />
              );
            })}
          </View>
        </View>
        <View></View>
      </View>
      <View style={isWebView ? styles.threeColumnGrid : styles.gap}>
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={category}
          isMandatory={!isViewMode}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.category" })}
          placeholder={intl.formatMessage({ id: "label.category" })}
          value={category}
          isDropdown
          options={CATEGORIES}
          onChangeValue={setCategory}
        />
        <View style={styles.textInputContainer(isWebView)}>
          <CustomLabelView
            label={intl.formatMessage({ id: "label.ews" })}
            isMandatory={!isViewMode}
          />
          <CustomToggleComponent
            isMandatory={!isViewMode}
            customToggleStyle={styles.customToggleStyle}
            value={ews}
            onValueChange={setEws}
          />
        </View>
        <View style={styles.textInputContainer(isWebView)}>
          <CustomLabelView
            label={intl.formatMessage({ id: "label.physicallyImpaired" })}
            isMandatory={!isViewMode}
          />
          <CustomToggleComponent
            isMandatory={!isViewMode}
            customToggleStyle={styles.customToggleStyle}
            value={physicallyImpaired}
            onValueChange={setphysicallyImpaired}
          />
        </View>
      </View>
    </CardComponent>
  );
};

export default React.forwardRef(PreferenceRegarding);
