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
import images from "../../images";
import styles from "./FilterModal.style";

const FilterModal = ({
  filterCategory,
  filterState,
  initialFilterState,
  onApplyFilter,
  setFilterState,
  setShowFilterOptions,
  statusData,
  queryTypeData,
}) => {
  const {
    activeCategories,
    filterData,
    handleCategoryChange,
    handleStatusChange,
    handleQueryTypeChange,
    handleClearFilter,
    selectedStatus,
    selectedQueryType,
    onCancel,
  } = useFilterModal(
    filterState,
    initialFilterState,
    onApplyFilter,
    setFilterState,
    setShowFilterOptions
  );

  const isWeb = Platform.OS.toLowerCase() === "web";
  const intl = useIntl();

  const webProps = isWeb
    ? { className: classes["account-dropdown__base"] }
    : {};

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

  const renderOptionsByCategory = () => {
    const options = [];
    if (activeCategories.includes("Status")) {
      options.push(
        statusData.map((status) => (
          <RenderCheckButton
            key={status.id}
            item={status}
            title={status.name}
            onChange={() => handleStatusChange(status)}
            isSelected={selectedStatus.includes(status.id)}
          />
        ))
      );
    }

    if (activeCategories.includes("Query Type")) {
      options.push(
        queryTypeData.map((queryType) => (
          <RenderCheckButton
            key={queryType.id}
            title={queryType.name}
            item={queryType}
            onChange={() => handleQueryTypeChange(queryType)}
            isSelected={selectedQueryType.includes(queryType.id)}
          />
        ))
      );
    }
    return options.length > 0 ? options : null;
  };

  const RenderCategoryButton = ({ title, isLeftArrow = true, onClick }) => {
    const isActive = activeCategories.includes(title);
    return (
      <View style={styles.renderCheckButton} {...webProps}>
        <TwoColumn
          leftSection={
            <CheckBox
              title={title}
              isSelected={isActive}
              handleCheckbox={() => onClick(title)}
              id={title}
            />
          }
          isLeftFillSpace
          rightSection={
            <>
              {isLeftArrow && isActive && (
                <CustomImage
                  source={images.iconArrowRight}
                  style={styles.arrowRight}
                />
              )}
            </>
          }
        />
      </View>
    );
  };

  const CANCEL_TEXT = intl.formatMessage({ id: "label.cancel" });
  const SHOW_RESULT_TEXT = intl.formatMessage({ id: "label.show_result" });

  return (
    <CustomModal customInnerContainerStyle={styles.customerInnerContainerStyle}>
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
                {filterCategory.map((item) => {
                  return (
                    <RenderCategoryButton
                      key={item}
                      title={item}
                      onClick={handleCategoryChange}
                    />
                  );
                })}
              </>
            }
            leftSectionStyle={styles.leftSection}
            rightSectionStyle={styles.rightSection}
            rightSection={
              isWeb ? (
                <ScrollView contentContainerStyle={styles.renderOptionCatigory}>
                  {renderOptionsByCategory()}
                </ScrollView>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {renderOptionsByCategory()}
                </ScrollView>
              )
            }
          />
        }
        bottomSection={
          <View style={styles.bottomSection}>
            <ActionPairButton
              buttonOneText={CANCEL_TEXT}
              buttonTwoText={SHOW_RESULT_TEXT}
              displayLoader={false}
              isButtonTwoGreen
              onPressButtonOne={onCancel}
              onPressButtonTwo={filterData}
            />
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
