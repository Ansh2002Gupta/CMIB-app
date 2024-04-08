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
import { FILTER_TYPE_ENUM } from "../../constants/constants";
import Slider from "../../components/Slider";

const FilterModal = ({
  filterInfo,
  filterCategory,
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState,
  setShowFilterOptions,
  defaultCategory,
  unit,
}) => {
  const {
    currentCategory,
    filterData,
    handleCategoryChange,
    handleClearFilter,
    onCancel,
  } = useFilterModal(
    filterInfo,
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

  const handleAllcategorySet = (filterName) => {
    const keyName = `selected` + filterName;
    const filterObj = returnFilterObj(filterInfo, filterName);
    if (filterObj?.type?.trim()?.toLowerCase() === FILTER_TYPE_ENUM.CHECKBOX) {
      const getFilterData = filterObj?.options?.map(
        (item) => item?.[filterObj?.refKey]
      );
      setFilterState((prev) => ({
        ...prev,
        [keyName]:
          filterObj?.selectedOptions?.length !== getFilterData?.length
            ? getFilterData
            : [],
      }));
    }
    if (filterObj?.type?.trim()?.toLowerCase() === FILTER_TYPE_ENUM.SLIDER) {
      const getFilterData = filterObj?.options;
      setFilterState((prev) => ({
        ...prev,
        [keyName]: getFilterData,
      }));
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

  const returnFilterObj = (filterInfo, filterName) => {
    return filterInfo?.find(
      (obj) =>
        obj?.name?.trim().toLowerCase() === filterName?.trim().toLowerCase()
    );
  };

  const renderOptionsByCategory = (category) => {
    console.log("currentCategory: ", currentCategory);
    console.log("category|renderOptionsByCategory:", category);
    console.log("filterInfo:", filterInfo);
    category = getFilterName(category);
    console.log("category|getFilterName:", category);
    const filterObj = returnFilterObj(filterInfo, category);
    return filterObj?.type?.trim().toLowerCase() ===
      FILTER_TYPE_ENUM.CHECKBOX ? (
      filterObj?.options.map((option) => (
        <RenderCheckButton
          key={option.id}
          item={option}
          title={option.name}
          onChange={() =>
            filterObj?.handler(option, category, filterObj?.refKey)
          }
          isSelected={filterObj?.selectedOptions?.includes(
            option?.[filterObj?.refKey]
          )}
        />
      ))
    ) : (
      <View style={styles.slider}>
        <View style={styles.customExperienceContainer}>
          <CommonText customTextStyle={styles.customExperience}>
            {`${
              !!filterState?.selectedCurrentSalary
                ? filterState?.selectedCurrentSalary
                : 0
            } ${unit}`}
          </CommonText>
        </View>
        <Slider
          maximumValue={filterObj?.maximumSliderLimit}
          minimumValue={filterObj?.minimumSliderLimit}
          step={1}
          onChange={(val) =>
            filterObj?.handler({ value: val }, "CurrentSalary", "value")
          }
          value={
            !!filterState?.selectedCurrentSalary
              ? filterState?.selectedCurrentSalary
              : 0
          }
        />
        <View style={styles.limitsContainer}>
          <CommonText customTextStyle={styles.sliderLimitLabel}>
            {`${filterObj?.minimumSliderLimit} ${unit}`}
          </CommonText>
          <CommonText customTextStyle={styles.sliderLimitLabel}>
            {`${filterObj?.maximumSliderLimit} ${unit}`}
          </CommonText>
        </View>
      </View>
    );
  };

  const getCheckBoxesStatus = (title) => {
    title = getFilterName(title);
    const filterObj = returnFilterObj(filterInfo, title);
    if (!filterObj?.selectedOptions?.length) return "empty";
    else if (filterObj?.selectedOptions?.length !== filterObj?.options?.length)
      return "partial";
    else if (filterObj?.selectedOptions?.length === filterObj?.options?.length)
      return "full";
    else return;
  };

  const RenderCategoryButton = ({ title, onClick }) => {
    title = getFilterName(title);
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

  const getFilterName = (item) => {
    const words = item.split(" ");
    let filterName = "";
    if (words.length > 1) {
      for (let i = 0; i < words.length; i++) filterName += words[i];
    } else filterName = words[0];
    return filterName;
  };

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
                              handleCategoryChange(getFilterName(item));
                            }}
                          >
                            <RenderCategoryButton
                              key={item}
                              title={item}
                              onClick={(item) => {
                                handleAllcategorySet(getFilterName(item));
                                handleCategoryChange(getFilterName(item));
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
  unit: PropTypes.string,
};

export default FilterModal;
