import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { View, ScrollView, Platform } from "@unthinkable/react-core-components";

import { ThreeRow, TwoColumn } from "../../core/layouts";

import ActionPairButton from "../../components/ActionPairButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import DatePickerModal from "../../components/DatePickerModel";
import Slider from "../../components/Slider";
import useFilterModal from "./controller/useFilterModal";
import { FILTER_TYPE_ENUM } from "../../constants/constants";
import classes from "../../theme/styles/CssClassProvider";
import useIsWebView from "../../hooks/useIsWebView";
import commonStyles from "../../theme/styles/commonStyles";
import images from "../../images";
import getStyles from "./FilterModal.style";

const FilterModal = ({
  defaultCategory,
  filterCategory,
  filterInfo,
  filterState,
  initialFilterState,
  onApplyFilter,
  renderCalendar = false,
  setFilterState,
  setShowFilterOptions,
  unit,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const {
    currentCategory,
    handleCategoryChange,
    handleClearFilter,
    filterData,
    onCancel,
  } = useFilterModal({
    ...{
      defaultCategory,
      filterCategory,
      filterInfo,
      filterState,
      initialFilterState,
      onApplyFilter,
      setFilterState,
      setShowFilterOptions,
      renderCalendar,
    },
  });

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
    category = getFilterName(category);
    const filterObj = returnFilterObj(filterInfo, category);

    if (renderCalendar) {
      {
        return (
          <View style={styles.datePickerModalView}>
            <DatePickerModal
              customStyles={styles.datePickerStyle}
              value={
                Array.isArray(filterState?.selectedDate)
                  ? filterState?.selectedDate[0]
                  : ""
              }
              datePickerViewStyle={styles.datePickerInner}
              minDate={null}
              onChangeValue={(value) => {
                const obj = {
                  Date: value,
                };
                filterObj?.handler(obj, "Date", "Date");
              }}
            />
          </View>
        );
      }
    }
    return filterObj?.type?.trim().toLowerCase() ===
      FILTER_TYPE_ENUM.CHECKBOX ? (
      filterObj?.options.map((option) => {
        return (
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
        );
      })
    ) : (
      <View style={styles.slider}>
        <View style={styles.customExperienceContainer}>
          <CommonText customTextStyle={styles.customExperience}>
            {`${
              !!filterState[`selected${filterObj?.name}`]
                ? filterState[`selected${filterObj?.name}`]
                : 0
            } ${filterObj?.unit ?? "Years"}`}
          </CommonText>
        </View>
        <Slider
          isTrackBgGreen
          maximumValue={filterObj?.maximumSliderLimit}
          minimumValue={filterObj?.minimumSliderLimit}
          step={1}
          onChange={(val) =>
            filterObj?.handler(
              { value: val },
              filterObj?.name ?? "Experience",
              "value"
            )
          }
          value={
            !!filterState[`selected${filterObj?.name}`]
              ? filterState[`selected${filterObj?.name}`]
              : 0
          }
        />
        <View style={styles.limitsContainer}>
          <CommonText customTextStyle={styles.sliderLimitLabel}>
            {`${filterObj?.minimumSliderLimit} ${filterObj?.unit ?? "Years"}`}
          </CommonText>
          <CommonText customTextStyle={styles.sliderLimitLabel}>
            {`${filterObj?.maximumSliderLimit} ${filterObj?.unit ?? "Years"}`}
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
    const newTitle = getFilterName(title);
    const isActive = getCheckBoxesStatus(newTitle) === "full" ? true : false;
    const isPartial =
      getCheckBoxesStatus(newTitle) === "partial" ? true : false;

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
    if (typeof item === "string") {
      const words = item.split(" ");
      return words.join("");
    } else {
      return "";
    }
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
                {filterCategory &&
                  filterCategory?.map((item) => {
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
                            <CustomImage
                              source={images.iconArrowRight}
                              style={styles.arrowRight}
                            />
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
  filterState: PropTypes.object.isRequired,
  initialFilterState: PropTypes.object.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  setFilterState: PropTypes.func.isRequired,
  setShowFilterOptions: PropTypes.func.isRequired,
  renderCalendar: PropTypes.bool,
  unit: PropTypes.string,
};

export default FilterModal;
