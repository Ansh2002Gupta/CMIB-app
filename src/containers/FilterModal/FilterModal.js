import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View, ScrollView, Platform } from "@unthinkable/react-core-components";

import { ThreeRow, TwoColumn } from "../../core/layouts";

import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CheckBox from "../../components/CheckBox/CheckBox";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import useFilterModal from "./controller/useFilterModal";
import classes from "../../theme/styles/CssClassProvider";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./FilterModal.style";
import {
  MAXIMUM_EXPERIENCE_LIMIT,
  MAXIMUM_FRESHNESS_LIMIT,
  MAXIMUM_SALARY_LIMIT,
  MINIMUM_EXPERIENCE_LIMIT,
  MINIMUM_FRESHNESS_LIMIT,
  MINIMUM_SALARY_LIMIT,
} from "../../constants/constants";
import Slider from "../../components/Slider";

const FilterModal = ({
  filterCategory,
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState,
  setShowFilterOptions,
  statusData,
  workModeData,
  jobTypeData,
  experienceData,
  locationData,
  educationData,
  salaryData,
  departmentData,
  freshnessData,
  companyData,
  industryData,
  queryTypeData,
  defaultCategory,
}) => {
  const {
    currentCategory,
    filterData,
    handleCategoryChange,
    handleStatusChange,
    handleQueryTypeChange,
    handleWorkModeChange,
    handleJobTypeChange,
    handleLocationChange,
    handleSalaryChange,
    handleExperienceChange,
    handleEducationChange,
    handleDepartmentChange,
    handleCompanyChange,
    handleIndustryChange,
    handleFreshnessChange,
    handleClearFilter,
    selectedCompany,
    selectedWorkMode,
    selectedJobType,
    selectedExperience,
    selectedLocation,
    selectedSalary,
    selectedEducation,
    selectedDepartment,
    selectedIndustry,
    selectedFreshness,
    selectedStatus,
    selectedQueryType,
    onCancel,
  } = useFilterModal(
    filterState,
    initialFilterState,
    onApplyFilter,
    setFilterState,
    setShowFilterOptions,
    defaultCategory
  );

  const isWeb = Platform.OS.toLowerCase() === "web";
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const webProps = isWeb
    ? { className: classes["account-dropdown__base"] }
    : {};

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: commonStyles.buttonStyle,
          buttonTwoStyle: commonStyles.buttonStyle,
          buttonOneContainerStyle: commonStyles.buttonStyle,
          buttonTwoContainerStyle: commonStyles.buttonStyle,
        }
      : {};

  const handleAllcategorySet = (item) => {
    const status = item?.trim()?.toLowerCase() === "status";
    const query_type = item === "query type";
    const workMode = item?.trim()?.toLowerCase() === "work mode";
    const jobType = item?.trim()?.toLowerCase() === "job type";
    const experience = item?.trim()?.toLowerCase() === "experience";
    const location = item?.trim()?.toLowerCase() === "location";
    const salary = item?.trim()?.toLowerCase() === "salary";
    const education = item?.trim()?.toLowerCase() === "education";
    const department = item?.trim()?.toLowerCase() === "department";
    const companyType = item?.trim()?.toLowerCase() === "company type";
    const industry = item?.trim()?.toLowerCase() === "industry";
    const freshness = item?.trim()?.toLowerCase() === "freshness";

    if (status) {
      const getStatusDataId = statusData?.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedStatus:
          selectedStatus?.length !== getStatusDataId?.length
            ? getStatusDataId
            : [],
      });
    } else if (query_type) {
      const getQueryDataId = queryTypeData.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedQueryType:
          selectedQueryType.length !== getQueryDataId.length
            ? getQueryDataId
            : [],
      });
    } else if (workMode) {
      const getWorkModeDataId = workModeData?.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedWorkMode:
          selectedWorkMode?.length !== getWorkModeDataId?.length
            ? getWorkModeDataId
            : [],
      });
    }
    if (jobType) {
      const jobTypeDataID = jobTypeData?.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedJobType:
          selectedJobType?.length !== jobTypeDataID?.length
            ? jobTypeDataID
            : [],
      });
    }
    if (experience) {
      setFilterState({
        ...filterState,
        selectedExperience: experienceData || 0,
      });
    }
    if (location) {
      const locationDataID = locationData?.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedLocation:
          selectedLocation?.length !== locationDataID?.length
            ? locationDataID
            : [],
      });
    }
    if (salary) {
      setFilterState({
        ...filterState,
        selectedSalary: salaryData || 0,
      });
    }
    if (education) {
      const educationDataID = educationData?.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedEducation:
          selectedEducation?.length !== educationDataID?.length
            ? educationDataID
            : [],
      });
    }
    if (department) {
      const departmentDataID = departmentData?.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedDepartment:
          selectedDepartment?.length !== departmentDataID?.length
            ? departmentDataID
            : [],
      });
    }
    if (companyType) {
      const companyDataID = companyData?.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedCompany:
          selectedCompany?.length !== companyDataID?.length
            ? companyDataID
            : [],
      });
    }
    if (industry) {
      const industryDataID = jobTypeData?.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedIndustry:
          selectedIndustry?.length !== industryDataID?.length
            ? industryDataID
            : [],
      });
    }
    if (freshness) {
      setFilterState({
        ...filterState,
        selectedFreshness: freshnessData || 0,
      });
    }
  };

  const RenderCheckButton = ({ title, item, onChange, isSelected }) => {
    return (
      <View style={styles.renderCheckButton} {...webProps}>
        <CheckBox
          title={title}
          isSelected={isSelected}
          handleCheckbox={() => onChange(item)}
          id={title}
        />
      </View>
    );
  };

  const renderOptionsByCategory = (category) => {
    if (category === "Status") {
      return statusData.map((status) => (
        <RenderCheckButton
          key={status.id}
          item={status}
          title={status.name}
          onChange={() => handleStatusChange(status)}
          isSelected={selectedStatus?.includes(status.id)}
        />
      ));
    } else if (category === "Query Type") {
      return queryTypeData.map((queryType) => (
        <RenderCheckButton
          key={queryType.id}
          title={queryType.name}
          item={queryType}
          onChange={() => handleQueryTypeChange(queryType)}
          isSelected={selectedQueryType?.includes(queryType.id)}
        />
      ));
    } else if (category.trim().toLowerCase() === "work mode") {
      return workModeData?.map((mode) => (
        <RenderCheckButton
          key={mode.id}
          item={mode}
          title={mode.name}
          onChange={() => handleWorkModeChange(mode)}
          isSelected={selectedWorkMode?.includes(mode.id)}
        />
      ));
    } else if (category.trim().toLowerCase() === "job type") {
      return jobTypeData?.map((jobType) => (
        <RenderCheckButton
          key={jobType.id}
          title={jobType.name}
          item={jobType}
          onChange={() => handleJobTypeChange(jobType)}
          isSelected={selectedJobType?.includes(jobType.id)}
        />
      ));
    } else if (category.trim().toLowerCase() === "experience") {
      return (
        <View style={styles.Slider}>
          <Slider
            maximumValue={MAXIMUM_EXPERIENCE_LIMIT}
            minimumValue={MINIMUM_EXPERIENCE_LIMIT}
            step={0.1}
            onChange={() => handleExperienceChange(experienceData)}
            value={+experienceData}
          />
        </View>
      );
    } else if (category.trim().toLowerCase() === "location") {
      return locationData?.map((locations) => (
        <RenderCheckButton
          key={locations.id}
          title={locations.name}
          item={locations}
          onChange={() => handleLocationChange(locations)}
          isSelected={selectedLocation?.includes(locations.id)}
        />
      ));
    } else if (category.trim().toLowerCase() === "salary") {
      return (
        <View style={styles.Slider}>
          <Slider
            maximumValue={MAXIMUM_EXPERIENCE_LIMIT}
            minimumValue={MINIMUM_EXPERIENCE_LIMIT}
            step={0.1}
            onChange={() => handleExperienceChange(experienceData)}
            value={+experienceData}
          />
        </View>
      );
    } else if (category.trim().toLowerCase() === "education") {
      return educationData?.map((education) => (
        <RenderCheckButton
          key={education.id}
          title={education.name}
          item={education}
          onChange={() => handleEducationChange(education)}
          isSelected={selectedEducation?.includes(education.id)}
        />
      ));
    } else if (category.trim().toLowerCase() === "department") {
      return departmentData?.map((department) => (
        <RenderCheckButton
          key={department.id}
          title={department.name}
          item={department}
          onChange={() => handleDepartmentChange(department)}
          isSelected={selectedDepartment?.includes(department.id)}
        />
      ));
    } else if (category.trim().toLowerCase() === "company type") {
      return companyData?.map((company) => (
        <RenderCheckButton
          key={company.id}
          title={company.name}
          item={company}
          onChange={() => handleCompanyChange(company)}
          isSelected={selectedCompany?.includes(company.id)}
        />
      ));
    } else if (category.trim().toLowerCase() === "industry") {
      return industryData?.map((industry) => (
        <RenderCheckButton
          key={industry.id}
          title={industry.name}
          item={industry}
          onChange={() => handleIndustryChange(industry)}
          isSelected={selectedIndustry?.includes(industry.id)}
        />
      ));
    } else
      return (
        <View style={styles.Slider}>
          <Slider
            maximumValue={MAXIMUM_EXPERIENCE_LIMIT}
            minimumValue={MINIMUM_EXPERIENCE_LIMIT}
            step={0.1}
            onChange={() => handleExperienceChange(experienceData)}
            value={+experienceData}
          />
        </View>
      );
  };

  const getCheckBoxesStatus = (title) => {
    const status = title?.trim()?.toLowerCase() === "status";
    const query_type = title === "Query Type";
    const workMode = title?.trim()?.toLowerCase() === "work mode";
    const jobType = title?.trim()?.toLowerCase() === "job type";
    const experience = title?.trim()?.toLowerCase() === "experience";
    const location = title?.trim()?.toLowerCase() === "location";
    const salary = title?.trim()?.toLowerCase() === "salary";
    const education = title?.trim()?.toLowerCase() === "education";
    const department = title?.trim()?.toLowerCase() === "department";
    const companyType = title?.trim()?.toLowerCase() === "company type";
    const industry = title?.trim()?.toLowerCase() === "industry";
    const freshness = title?.trim()?.toLowerCase() === "freshness";

    if (status) {
      if (!selectedStatus?.length) return "empty";
      if (selectedStatus?.length !== statusData?.length) return "partial";
      return "full";
    } else if (query_type) {
      if (!selectedQueryType.length) return "empty";
      if (selectedQueryType.length !== queryTypeData.length) return "partial";
      return "full";
    } else if (workMode) {
      if (!selectedWorkMode?.length) return "empty";
      if (selectedWorkMode?.length !== workModeData?.length) return "partial";
      return "full";
    }
    if (jobType) {
      if (!selectedJobType?.length) return "empty";
      if (selectedJobType?.length !== jobTypeData?.length) return "partial";
      return "full";
    }
    if (experience) {
      if (
        !selectedExperience ||
        selectedExperience === MINIMUM_EXPERIENCE_LIMIT
      )
        return "empty";
      if (selectedExperience < MAXIMUM_EXPERIENCE_LIMIT) return "partial";
      return "full";
    }
    if (location) {
      if (!selectedLocation?.length) return "empty";
      if (selectedLocation?.length !== locationData?.length) return "partial";
      return "full";
    }
    if (salary) {
      if (!selectedSalary || selectedSalary === MINIMUM_SALARY_LIMIT)
        return "empty";
      if (selectedSalary < MAXIMUM_SALARY_LIMIT) return "partial";
      return "full";
    }
    if (education) {
      if (!selectedEducation?.length) return "empty";
      if (selectedEducation?.length !== educationData?.length) return "partial";
      return "full";
    }
    if (department) {
      if (!selectedDepartment?.length) return "empty";
      if (selectedDepartment?.length !== departmentData?.length)
        return "partial";
      return "full";
    }
    if (companyType) {
      if (!selectedCompany?.length) return "empty";
      if (selectedCompany?.length !== companyData?.length) return "partial";
      return "full";
    }
    if (industry) {
      if (!selectedIndustry?.length) return "empty";
      if (selectedIndustry?.length !== industryData?.length) return "partial";
      return "full";
    }
    if (freshness) {
      if (!selectedFreshness || selectedFreshness === MINIMUM_FRESHNESS_LIMIT)
        return "empty";
      if (selectedFreshness < MAXIMUM_FRESHNESS_LIMIT) return "partial";
      return "full";
    }
    return;
  };

  const RenderCategoryButton = ({ title, onClick }) => {
    const isActive = getCheckBoxesStatus(title) === "full" ? true : false;
    const isPartial = getCheckBoxesStatus(title) === "partial" ? true : false;

    return (
      <CheckBox
        isPartial={isPartial}
        title={title}
        isSelected={isActive}
        handleCheckbox={() => onClick(title)}
        id={title}
      />
    );
  };

  const CANCEL_TEXT = intl.formatMessage({ id: "label.cancel" });
  const SHOW_RESULT_TEXT = intl.formatMessage({ id: "label.show_result" });

  return (
    <CustomModal containerStyle={styles.customerInnerContainerStyle}>
      <ThreeRow
        topSection={
          <View style={styles.headerSection}>
            <CommonText fontWeight={"600"} customTextStyle={styles.headerText}>
              {intl.formatMessage({ id: "label.filters" })}
            </CommonText>
            <CustomTouchableOpacity onPress={handleClearFilter}>
              <CommonText customTextStyle={styles.clearAll} isunderLine>
                {intl.formatMessage({ id: "label.clear_all" })}
              </CommonText>
            </CustomTouchableOpacity>
          </View>
        }
        middleSectionStyle={
          isWeb ? styles.middleSectionWeb : styles.middleSectionStyle
        }
        middleSection={
          <TwoColumn
            leftSection={
              <>
                {filterCategory?.map((item) => {
                  return (
                    <View style={styles.renderCheckButton} {...webProps}>
                      <TwoColumn
                        leftSection={
                          <CustomTouchableOpacity
                            onPress={() => {
                              handleCategoryChange(item);
                            }}
                          >
                            <RenderCategoryButton
                              key={item}
                              title={item}
                              onClick={(item) => {
                                handleAllcategorySet(item);
                                handleCategoryChange(item);
                              }}
                            />
                          </CustomTouchableOpacity>
                        }
                        isLeftFillSpace
                        rightSection={
                          <>
                            <CustomImage
                              source={images.iconArrowRight}
                              style={styles.arrowRight}
                            />
                          </>
                        }
                      />
                    </View>
                  );
                })}
              </>
            }
            leftSectionStyle={styles.leftSection}
            rightSectionStyle={styles.rightSection}
            rightSection={
              <ScrollView
                contentContainerStyle={isWeb ? styles.renderOptionCatigory : {}}
              >
                {renderOptionsByCategory(currentCategory)}
              </ScrollView>
            }
          />
        }
        bottomSection={
          <View
            style={{
              ...styles.bottomSection,
              ...(isWebView ? styles.buttonWebStyle : styles.buttonMobileStyle),
            }}
          >
            <View style={isWebView ? styles.subContainerStyle : {}}>
              <ActionPairButton
                buttonOneText={CANCEL_TEXT}
                buttonTwoText={SHOW_RESULT_TEXT}
                customStyles={{
                  ...isWebProps,
                  customContainerStyle: styles.customContainerStyle,
                }}
                displayLoader={false}
                isButtonTwoGreen
                onPressButtonOne={onCancel}
                onPressButtonTwo={filterData}
              />
            </View>
          </View>
        }
      />
    </CustomModal>
  );
};

FilterModal.propTypes = {
  data: PropTypes.array.isRequired,
  filterState: PropTypes.object.isRequired,
  initialFilterState: PropTypes.object.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  setFilterState: PropTypes.func.isRequired,
  setShowFilterOptions: PropTypes.func.isRequired,
};

export default FilterModal;
