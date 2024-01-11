import React, { useState, useMemo } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import { ThreeRow, TwoColumn } from "../../core/layouts";
import ActionPairButton from "../../components/ActionPairButton";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./FilterModal.style";
import CheckBox from "../../components/CheckBox/CheckBox";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";

const FilterModal = ({ onPressIconCross, data, onApplyFilter }) => {
  const [filterState, setFilterState] = useState({
    selectedStatus: [],
    selectedButton: null,
    selectedQueryType: [],
    activeCategory: null,
  });

  const { selectedStatus, selectedButton, selectedQueryType, activeCategory } = filterState;

  const { statusCounts, queryTypeCounts } = useMemo(() => {
    const statusCounters = {};
    const queryTypeCounters = {};

    data.forEach((item) => {
      statusCounters[item.status] = (statusCounters[item.status] || 0) + 1;
      queryTypeCounters[item.query_type] = (queryTypeCounters[item.query_type] || 0) + 1;
    });

    return { statusCounts: statusCounters, queryTypeCounts: queryTypeCounters };
  }, [data]);

  const handleCategoryChange = (category) => {
    const newSelectedButton = category === selectedButton ? null : category;
    setFilterState(prevState => ({ ...prevState, selectedButton: newSelectedButton, activeCategory: newSelectedButton }));
  };

  const handleStatusChange = (status) => {
    setFilterState(prevState => {
      const newSelectedStatus = prevState.selectedStatus.includes(status)
        ? prevState.selectedStatus.filter(s => s !== status)
        : [...prevState.selectedStatus, status];
      return { ...prevState, selectedStatus: newSelectedStatus };
    });
  };

  const handleQueryTypeChange = (queryType) => {
    setFilterState(prevState => {
      const newSelectedQueryType = prevState.selectedQueryType.includes(queryType)
        ? prevState.selectedQueryType.filter(q => q !== queryType)
        : [...prevState.selectedQueryType, queryType];
      return { ...prevState, selectedQueryType: newSelectedQueryType };
    });
  };

  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const RenderCheckButton = React.memo(({ title, count, onChange, isSelected }) => {
    const displayTitle = count ? `${title} (${count})` : title;
    return (
      <View style={styles.renderCheckButton}>
        <CheckBox
          title={displayTitle}
          isSelected={isSelected}
          handleCheckbox={() => onChange(title)}
          id={"1"}
        />
      </View>
    );
  });

  const RenderCategoryButton = React.memo(({ title, isLeftArrow = true, onClick }) => {
    return (
      <View style={styles.renderCheckButton}>
        <CheckBox
          title={title}
          isSelected={selectedButton === title}
          handleCheckbox={() => onClick(title)}
          id={"1"}
        />
        {isLeftArrow && (
          <CustomImage
            source={images.iconArrowRight}
            style={styles.arrowRight}
          />
        )}
      </View>
    );
  });

  const renderOptionsByCategory = () => {
    switch (activeCategory) {
      case "Status":
        return Object.keys(statusCounts).map((status) => (
          <RenderCheckButton
            key={status}
            title={status}
            count={statusCounts[status]}
            onChange={handleStatusChange}
            isSelected={selectedStatus.includes(status)}
          />
        ));
      case "Query Type":
        return Object.keys(queryTypeCounts).map((queryType) => (
          <RenderCheckButton
            key={queryType}
            title={queryType}
            count={queryTypeCounts[queryType]}
            onChange={handleQueryTypeChange}
            isSelected={selectedQueryType.includes(queryType)}
          />
        ));
      default:
        return null;
    }
  };

  const filterData = () => {
    const filteredData = data.filter((item) => {
      return (
        (!selectedStatus.length || selectedStatus.includes(item.status)) &&
        (!selectedQueryType.length || selectedQueryType.includes(item.query_type))
      );
    });
    // onApplyFilter(filteredData);
    console.log("filtered data", filteredData);
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
            <CustomTouchableOpacity>
              <CommonText customTextStyle={styles.clearAll} isunderLine>
                {intl.formatMessage({ id: "label.clear_all" })}
              </CommonText>
            </CustomTouchableOpacity>
          </View>
        }
        middleSectionStyle={styles.middleSectionStyle}
        middleSection={
          <TwoColumn
            leftSection={
              <>
                <RenderCategoryButton
                  title={"Status"}
                  onClick={handleCategoryChange}
                />
                <RenderCategoryButton
                  title={"Query Type"}
                  onClick={handleCategoryChange}
                />
              </>
            }
            leftSectionStyle={styles.leftSection}
            rightSectionStyle={styles.rightSection}
            rightSection={renderOptionsByCategory()}
          />
        }
        bottomSection={
          <View
            style={
              isWebView ? styles.bottomSection : styles.bottomSectionMobile
            }
          >
            {isWebView && <View style={styles.bottomView} />}
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

export default FilterModal;
