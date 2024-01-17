import React, { useMemo } from "react";
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
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./FilterModal.style";

const FilterModal = ({
  onPressIconCross,
  data,
  onApplyFilter,
  filterCategory,
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
  } = useFilterModal(data, onApplyFilter);

  const isWeb = Platform.OS.toLowerCase() === "web";
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const { statusCounts, queryTypeCounts } = useMemo(() => {
    const statusCounters = {};
    const queryTypeCounters = {};
    data.forEach((item) => {
      statusCounters[item.status] = (statusCounters[item.status] || 0) + 1;
      queryTypeCounters[item.query_type] =
        (queryTypeCounters[item.query_type] || 0) + 1;
    });
    return { statusCounts: statusCounters, queryTypeCounts: queryTypeCounters };
  }, [data]);

  const RenderCheckButton = ({ title, count, onChange, isSelected }) => {
    const displayTitle = count ? `${title} (${count})` : title;
    return (
      <View style={styles.renderCheckButton}>
        <CheckBox
          title={displayTitle}
          isSelected={isSelected}
          handleCheckbox={() => onChange(title)}
          id={title}
        />
      </View>
    );
  };

  const renderOptionsByCategory = () => {
    const options = [];
    if (activeCategories.includes("Status")) {
      options.push(
        ...Object.keys(statusCounts).map((status) => (
          <RenderCheckButton
            key={status}
            title={status}
            count={statusCounts[status]}
            onChange={handleStatusChange}
            isSelected={selectedStatus.includes(status)}
          />
        ))
      );
    }
    if (activeCategories.includes("Query Type")) {
      options.push(
        ...Object.keys(queryTypeCounts).map((queryType) => (
          <RenderCheckButton
            key={queryType}
            title={queryType}
            count={queryTypeCounts[queryType]}
            onChange={handleQueryTypeChange}
            isSelected={selectedQueryType.includes(queryType)}
          />
        ))
      );
    }
    return options.length > 0 ? options : null;
  };

  const RenderCategoryButton = ({ title, isLeftArrow = true, onClick }) => {
    const isActive = activeCategories.includes(title);
    return (
      <View style={styles.renderCheckButton}>
        <CheckBox
          title={title}
          isSelected={isActive}
          handleCheckbox={() => onClick(title)}
          id={title}
        />
        {isLeftArrow && isActive && (
          <CustomImage
            source={images.iconArrowRight}
            style={styles.arrowRight}
          />
        )}
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
                renderOptionsByCategory()
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
              onPressButtonOne={onPressIconCross}
              onPressButtonTwo={filterData}
            />
          </View>
        }
      />
    </CustomModal>
  );
};

FilterModal.propTypes = {
  onPressIconCross: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};

export default FilterModal;
