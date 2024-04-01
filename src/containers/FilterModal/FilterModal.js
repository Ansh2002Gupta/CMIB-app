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
    currentCategory,
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
    setShowFilterOptions,
    filterCategory
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
    const status = item === filterCategory[0];
    const query_type = item === filterCategory[1];

    if (status) {
      const getStatusDataId = statusData.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedStatus:
          selectedStatus.length !== getStatusDataId.length
            ? getStatusDataId
            : [],
      });
    }
    if (query_type) {
      const getQueryDataId = queryTypeData.map((item) => item.id);
      setFilterState({
        ...filterState,
        selectedQueryType:
          selectedQueryType.length !== getQueryDataId.length
            ? getQueryDataId
            : [],
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
    if (category === filterCategory[0]) {
      return statusData.map((status) => (
        <RenderCheckButton
          key={status.id}
          item={status}
          title={status.name}
          onChange={() => handleStatusChange(status)}
          isSelected={selectedStatus.includes(status.id)}
        />
      ));
    } else if (category === filterCategory[1]) {
      return queryTypeData.map((queryType) => (
        <RenderCheckButton
          key={queryType.id}
          title={queryType.name}
          item={queryType}
          onChange={() => handleQueryTypeChange(queryType)}
          isSelected={selectedQueryType.includes(queryType.id)}
        />
      ));
    }
  };

  const getCheckBoxesStatus = (title) => {
    const status = title === filterCategory[0];
    const query_type = title === filterCategory[1];

    if (status) {
      if (!selectedStatus.length) return "empty";
      if (selectedStatus.length !== statusData.length) return "partial";
      return "full";
    }

    if (query_type) {
      if (!selectedQueryType.length) return "empty";
      if (selectedQueryType.length !== queryTypeData.length) return "partial";
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
                {filterCategory.map((item) => {
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
