import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  FlatList,
  Platform,
  Row,
  View,
} from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import Chip from "../Chip";
import CommonText from "../../components/CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import FilterModal from "../../containers/FilterModal";
import LoadingScreen from "../LoadingScreen";
import PaginationFooter from "../PaginationFooter";
import PopupMessage from "../PopupMessage/PopupMessage";
import SearchView from "../../components/SearchView";
import Spinner from "../Spinner";
import TouchableImage from "../../components/TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import useOutsideClick from "../../hooks/useOutsideClick";
import { getRenderText } from "../../utils/util";
import images from "../../images";
import styles from "./CustomTable.style";

const CustomTable = ({
  addNewTicket,
  allDataLoaded,
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
  handleTicketModal,
  handleRowPerPageChange,
  handleSearchResults,
  headingTexts,
  handleSaveAddTicket,
  indexOfFirstRecord,
  indexOfLastRecord,
  isHeading,
  isTicketListingLoading,
  isGeetingJobbSeekers,
  isFirstPageReceived,
  mobileComponentToRender,
  loadingMore,
  onIconPress,
  placeholder,
  rowsLimit,
  rowsPerPage,
  showSearchBar,
  showJobOfferResponseModal,
  showInterviewTimeModal,
  statusText,
  subHeadingText,
  statusLabels,
  showPopUpWithID,
  setShowPopUpWithID,
  setModalData,
  setShowJobOfferResponseModal,
  setShowInterviewTimeModal,
  tableHeading,
  tableIcon,
  totalcards,
  unit,
  extraDetailsText,
  extraDetailsKey,
  renderCalendar,
  statusData,
  queryTypeData,
  showFliter,
  containerStyle,
  isTotalCardVisible = true,
  isFilterVisible = true,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";

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
    <View style={isWebView ? styles.container : styles.mobileMainContainer}>
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
                  {intl.formatMessage({ id: "label.tickets" })}
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
            style={styles.tableTopSection}
            topSectionStyle={styles.tableTopSectionStyle(isWebView)}
            topSection={
              <>
                {isTicketListingLoading ||
                (isGeetingJobbSeekers && (isWeb || isFirstPageReceived)) ? (
                  <LoadingScreen />
                ) : (
                  <View
                    style={{
                      ...styles.tableSection,
                      ...containerStyle,
                    }}
                  >
                    {isWebView && (
                      <MultiColumn
                        columns={getColoumConfigs(tableHeading, isHeading)}
                        style={
                          !!data
                            ? styles.columnHeaderStyle
                            : styles.columnHeaderStyleWithBorder
                        }
                      />
                    )}
                    <FlatList
                      data={data || []}
                      showsVerticalScrollIndicator={false}
                      style={styles.flatListStyle}
                      keyExtractor={(item, index) => index?.toString()}
                      renderItem={({ item, index }) => {
                        const statusRenderText = getRenderText(
                          item,
                          statusText,
                          formatConfig
                        );
                        return (
                          <>
                            {isWebView ? (
                              <MultiColumn
                                columns={getColoumConfigs(
                                  item,
                                  !isHeading,
                                  index
                                )}
                                style={styles.columnStyleBorder}
                              />
                            ) : (
                              <>
                                {mobileComponentToRender ? (
                                  mobileComponentToRender(item, index)
                                ) : (
                                  <View style={styles.mobileContainer}>
                                    <View>
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
                                            subHeadingText,
                                            formatConfig
                                          )}
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
                              {intl.formatMessage({ id: "label.no_more_data" })}
                            </CommonText>
                          );
                        }
                        return null;
                      }}
                    />
                    {isWebView && (
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
              !isWebView && (
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
  onIconPress: () => {},
  placeholder: "Search",
  isTotalCardVisible: true,
  indexOfFirstRecord: 0,
  indexOfLastRecord: 0,
};

CustomTable.propTypes = {
  addNewTicket: PropTypes.bool,
  allDataLoaded: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.array,
  formatConfig: PropTypes.object,
  filterCategory: PropTypes.array.isRequired,
  getColoumConfigs: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func,
  filterApplyHandler: PropTypes.func,
  handlePageChange: PropTypes.func.isRequired,
  handleRowPerPageChange: PropTypes.func.isRequired,
  handleSearchResults: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  handleTicketModal: PropTypes.func,
  headingTexts: PropTypes.array,
  isHeading: PropTypes.bool.isRequired,
  isTicketListingLoading: PropTypes.bool,
  isGeetingJobbSeekers: PropTypes.bool,
  indexOfFirstRecord: PropTypes.number,
  indexOfLastRecord: PropTypes.number,
  loadingMore: PropTypes.bool.isRequired,
  onIconPress: PropTypes.func,
  queryTypeData: PropTypes.array,
  rowsLimit: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
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
  subHeadingText: PropTypes.array,
  tableHeading: PropTypes.object.isRequired,
  tableIcon: PropTypes.any.isRequired,
  totalcards: PropTypes.number,
  placeholder: PropTypes.string,
};

export default CustomTable;
