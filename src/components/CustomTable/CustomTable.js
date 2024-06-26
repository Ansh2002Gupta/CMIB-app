import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import { Platform, Row, View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import Chip from "../Chip";
import CommonText from "../../components/CommonText";
import CustomFlatList from "../CustomFlatList";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import FilterModal from "../../containers/FilterModal";
import LoadingScreen from "../LoadingScreen";
import PaginationFooter from "../PaginationFooter";
import SearchView from "../../components/SearchView";
import Spinner from "../Spinner";
import TouchableImage from "../../components/TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import useOutsideClick from "../../hooks/useOutsideClick";
import { getRenderText } from "../../utils/util";
import images from "../../images";
import getStyles from "./CustomTable.style";

const CustomTable = ({
  addNewTicket,
  allDataLoaded,
  customTableStyle,
  currentPage,
  customFilterInfo,
  customModal,
  data,
  defaultCategory,
  selectedFilterOptions = {},
  setSelectedFilterOptions,
  formatConfig,
  filterApplyHandler,
  filterCategory,
  initialFilterState = {},
  getColoumConfigs,
  getStatusStyle,
  handleLoadMore,
  handlePageChange,
  handleRowPerPageChange,
  handleSearchResults,
  headingTexts,
  indexOfFirstRecord,
  indexOfLastRecord,
  isHeading,
  isShowPagination,
  isTicketListingLoading,
  isGeetingJobbSeekers,
  isFirstPageReceived,
  mobileComponentToRender,
  loadingMore,
  onIconPress,
  placeholder,
  isRenderFooterComponent,
  renderFooterComponenet,
  rowsLimit,
  rowsPerPage,
  showSearchBar,
  showJobOfferResponseModal,
  showInterviewTimeModal,
  statusText,
  subHeadingText,
  setShowPopUpWithID,
  tableHeading,
  tableIcon,
  totalcards,
  unit,
  extraDetailsText,
  extraDetailsKey,
  renderCalendar,
  containerStyle,
  isTotalCardVisible = true,
  isFilterVisible = true,
  isStatusTextBoolean,
  popUpMessage,
  selectedTabs,
  customTableTopSectionStyle,
  totalCardHeading,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";

  const theme = useTheme();
  const styles = getStyles(theme);

  const popUpRef = useRef(null);

  useOutsideClick(popUpRef, () => setShowPopUpWithID(-1));
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const isFilterCount = Object.values(selectedFilterOptions).find(
    (state) => !!state?.length
  );

  const handleFilterModal = () => {
    setShowFilterOptions((prev) => !prev);
  };

  const onApplyFilter = (customFilterInfo) => {
    filterApplyHandler(customFilterInfo);
    handleFilterModal();
  };

  const flatlistProps = isWeb
    ? {}
    : {
        onEndReached: handleLoadMore,
        onEndReachedThreshold: 0.1,
      };

  const webProps = isWeb ? { size: "xs" } : {};

  const getFilterCount = () => {
    const selectedValue = Object.values(selectedFilterOptions);
    let filterCount = 0;
    for (let key in selectedValue) {
      filterCount += Array.isArray(selectedValue[key])
        ? selectedValue[key].length
        : 0;
    }
    return filterCount;
  };

  return (
    <View
      style={{
        ...(isWebView ? styles.container : styles.mobileMainContainer),
        ...customTableStyle,
      }}
    >
      <TwoRow
        topSection={
          <>
            {showSearchBar && (
              <TwoColumn
                leftSection={
                  <SearchView
                    data={data?.records}
                    customSearchCriteria={handleSearchResults}
                    placeholder={placeholder}
                  />
                }
                isLeftFillSpace
                rightSection={
                  <>
                    {isFilterVisible ? (
                      <CustomTouchableOpacity
                        onPress={handleFilterModal}
                        style={styles.imageParentStyle}
                        disabled={
                          isTicketListingLoading || isGeetingJobbSeekers
                        }
                      >
                        <TouchableImage
                          source={images.iconFilter}
                          parentStyle={styles.iconTicket}
                          onPress={handleFilterModal}
                        />
                        {isWebView && (
                          <CommonText customTextStyle={styles.filterText}>
                            {intl.formatMessage({ id: "label.filters" })}
                          </CommonText>
                        )}
                        {isFilterCount && (
                          <CommonText
                            customContainerStyle={styles.activeTickets}
                            customTextStyle={styles.activeTicketsText}
                            fontWeight={"600"}
                          >
                            {getFilterCount()}
                          </CommonText>
                        )}
                      </CustomTouchableOpacity>
                    ) : null}
                  </>
                }
                style={styles.filterTopSection(isWebView)}
              />
            )}
            {!isWeb && isTotalCardVisible && (
              <View style={styles.ticketTotals}>
                <CommonText
                  fontWeight={"500"}
                  customTextStyle={{
                    ...styles.tableHeadingText,
                    ...styles.textSize,
                  }}
                >
                  {totalCardHeading
                    ? totalCardHeading
                    : intl.formatMessage({ id: "label.tickets" })}
                  &nbsp;&#58;&nbsp;
                </CommonText>

                <CommonText
                  fontWeight={"600"}
                  customTextStyle={styles.textSize}
                >
                  {totalcards}
                </CommonText>
              </View>
            )}
          </>
        }
        isTopFillSpace={false}
        isBottomFillSpace
        bottomSection={
          <TwoRow
            style={{ ...styles.tableTopSection, ...customTableTopSectionStyle }}
            topSectionStyle={styles.tableTopSectionStyle(isWebView)}
            topSection={
              <>
                {(isTicketListingLoading || isGeetingJobbSeekers) &&
                (isWeb || isFirstPageReceived) ? (
                  <LoadingScreen />
                ) : (
                  <View
                    style={{
                      ...styles.tableSection,
                      ...containerStyle,
                    }}
                  >
                    <View style={isWebView ? styles.tableSectionForweb : {}}>
                      {isWebView && tableHeading && (
                        <MultiColumn
                          columns={getColoumConfigs(
                            tableHeading,
                            isHeading,
                            0,
                            selectedTabs
                          )}
                          style={
                            !!data
                              ? styles.columnHeaderStyle
                              : styles.columnHeaderStyleWithBorder
                          }
                        />
                      )}
                      <CustomFlatList
                        data={data || []}
                        showsVerticalScrollIndicator={false}
                        style={styles.flatListStyle}
                        keyExtractor={(item, index) => index?.toString()}
                        renderItem={({ item, index }) => {
                          return (
                            <>
                              {isWebView ? (
                                <MultiColumn
                                  columns={getColoumConfigs(
                                    item,
                                    !isHeading,
                                    index,
                                    selectedTabs
                                  )}
                                  style={{
                                    ...((tableHeading || index > 0) &&
                                      styles.columnStyleBorder),
                                  }}
                                />
                              ) : (
                                <>
                                  {mobileComponentToRender ? (
                                    mobileComponentToRender(item, index)
                                  ) : (
                                    <View style={styles.mobileContainer}>
                                      <View style={styles.mobileDetailRow}>
                                        <CommonText
                                          fontWeight={"600"}
                                          customTextStyle={styles.cellTextStyle()}
                                        >
                                          {getRenderText(item, headingTexts) ||
                                            "-"}
                                        </CommonText>
                                        <Row style={styles.rowStyling}>
                                          <CommonText
                                            customTextStyle={
                                              styles.tableQueryText
                                            }
                                          >
                                            {getRenderText(
                                              item,
                                              subHeadingText
                                            ) || "-"}
                                          </CommonText>
                                          {!!extraDetailsText && (
                                            <>
                                              <View style={styles.dot} />
                                              <CommonText
                                                customTextStyle={
                                                  styles.tableQueryText
                                                }
                                              >
                                                {extraDetailsText +
                                                  ": " +
                                                  getRenderText(
                                                    item,
                                                    extraDetailsKey
                                                  )}
                                              </CommonText>
                                            </>
                                          )}
                                        </Row>
                                      </View>
                                      <View style={styles.rowsPerPageWeb}>
                                        {!!item.status && (
                                          <Chip
                                            label={getRenderText(
                                              item,
                                              statusText
                                            )}
                                            style={getStatusStyle(
                                              !!item?.active
                                                ? item.active
                                                : item.status
                                            )}
                                          />
                                        )}
                                        <TouchableImage
                                          onPress={() => {
                                            onIconPress(item);
                                          }}
                                          source={tableIcon}
                                          style={styles.iconTicket}
                                        />
                                      </View>
                                    </View>
                                  )}
                                </>
                              )}
                            </>
                          );
                        }}
                        {...flatlistProps}
                        ListFooterComponent={() => {
                          if ((!data || !!data) && !data?.length)
                            return (
                              <CommonText
                                customContainerStyle={styles.loadingStyleNoData}
                                customTextStyle={styles.noMoreData}
                              >
                                {intl.formatMessage({ id: "label.no_data" })}
                              </CommonText>
                            );
                          if (isRenderFooterComponent) {
                            return renderFooterComponenet();
                          }
                          if (loadingMore && !isFirstPageReceived) {
                            return (
                              <View style={styles.loadingStyle}>
                                <Spinner thickness={2} {...webProps} />
                              </View>
                            );
                          }
                          if (allDataLoaded) {
                            return (
                              <CommonText
                                customContainerStyle={styles.loadingStyle}
                                customTextStyle={styles.noMoreData}
                              >
                                {intl.formatMessage({
                                  id: "label.no_more_data",
                                })}
                              </CommonText>
                            );
                          }
                          return null;
                        }}
                      />
                    </View>
                    {isWebView && isShowPagination && (
                      <PaginationFooter
                        {...{
                          currentPage,
                          handlePageChange,
                          handleRowPerPageChange,
                          rowsLimit,
                          rowsPerPage,
                          siblingCount: 1,
                          totalcards,
                        }}
                      />
                    )}
                  </View>
                )}
              </>
            }
            isTopFillSpace
            isBottomFillSpace={false}
            bottomSection={
              isWeb &&
              !isWebView &&
              isShowPagination && (
                <PaginationFooter
                  {...{
                    currentPage,
                    handlePageChange,
                    handleRowPerPageChange,
                    indexOfFirstRecord,
                    indexOfLastRecord,
                    rowsLimit,
                    rowsPerPage,
                    siblingCount: 1,
                    totalcards,
                  }}
                />
              )
            }
            bottomSectionStyle={styles.bottomPaginationStyle}
          />
        }
      />
      {showFilterOptions && (
        <FilterModal
          {...{
            defaultCategory,
            filterInfo: customFilterInfo,
            filterCategory,
            filterState: selectedFilterOptions,
            initialFilterState,
            onApplyFilter,
            setFilterState: setSelectedFilterOptions,
            setShowFilterOptions,
            unit,
            renderCalendar,
          }}
        />
      )}
      {(addNewTicket || showJobOfferResponseModal || showInterviewTimeModal) &&
        customModal}
    </View>
  );
};

CustomTable.defaultProps = {
  isRenderFooterComponent: false,
  renderFooterComponenet: () => {},
  addNewTicket: false,
  data: [],
  formatConfig: {},
  headingTexts: [],
  handleTicketModal: () => {},
  showSearchBar: true,
  statusText: "",
  subHeadingText: "",
  selectedFilterOptions: [],
  totalcards: 0,
  isShowPagination: true,
  onIconPress: () => {},
  placeholder: "Search",
  getStatusStyle: () => {},
  isTotalCardVisible: true,
  indexOfFirstRecord: 0,
  indexOfLastRecord: 0,
};

CustomTable.propTypes = {
  addNewTicket: PropTypes.bool,
  allDataLoaded: PropTypes.bool,
  currentPage: PropTypes.number,
  data: PropTypes.array,
  formatConfig: PropTypes.object,
  filterCategory: PropTypes.array,
  getColoumConfigs: PropTypes.func,
  getStatusStyle: PropTypes.func,
  isShowPagination: PropTypes.bool,
  filterApplyHandler: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleRowPerPageChange: PropTypes.func,
  handleSearchResults: PropTypes.func,
  handleLoadMore: PropTypes.func,
  handleTicketModal: PropTypes.func,
  headingTexts: PropTypes.array,
  isHeading: PropTypes.bool,
  isTicketListingLoading: PropTypes.bool,
  isGeetingJobbSeekers: PropTypes.bool,
  indexOfFirstRecord: PropTypes.number,
  indexOfLastRecord: PropTypes.number,
  loadingMore: PropTypes.bool,
  onIconPress: PropTypes.func,
  queryTypeData: PropTypes.array,
  isRenderFooterComponent: PropTypes.bool,
  renderFooterComponenet: PropTypes.func,
  rowsLimit: PropTypes.array,
  rowsPerPage: PropTypes.number,
  showSearchBar: PropTypes.bool,
  statusData: PropTypes.array,
  workModeData: PropTypes.array,
  jobTypeData: PropTypes.array,
  experienceData: PropTypes.array,
  locationData: PropTypes.array,
  educationData: PropTypes.array,
  salaryData: PropTypes.array,
  departmentData: PropTypes.array,
  freshnessData: PropTypes.array,
  companyData: PropTypes.array,
  industryData: PropTypes.array,
  statusText: PropTypes.string,
  selectedFilterOptions: PropTypes.array,
  subHeadingText: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  tableHeading: PropTypes.object,
  tableIcon: PropTypes.any,
  totalcards: PropTypes.number,
  placeholder: PropTypes.string,
};

export default CustomTable;
