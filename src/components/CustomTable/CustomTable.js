import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import AddTicketModal from "../AddTicketModal/AddTicketModal";
import Chip from "../Chip";
import CommonText from "../../components/CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import FilterModal from "../../containers/FilterModal";
import LoadingScreen from "../LoadingScreen";
import PaginationFooter from "../PaginationFooter";
import SearchView from "../../components/SearchView";
import Spinner from "../Spinner";
import TouchableImage from "../../components/TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import { getRenderText } from "../../utils/util";
import images from "../../images";
import styles from "./CustomTable.style";

const initialFilterState = {
  selectedStatus: [],
  selectedQueryType: [],
  activeCategories: [],
};

const CustomTable = ({
  addNewTicket,
  allDataLoaded,
  currentPage,
  data,
  filterApplyHandler,
  filterCategory,
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
  isFirstPageReceived,
  loadingMore,
  onIconPress,
  queryTypeData,
  rowsLimit,
  rowsPerPage,
  statusData,
  showSearchBar,
  statusText,
  subHeadingText,
  tableHeading,
  tableIcon,
  totalcards,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterState, setFilterState] = useState(initialFilterState);

  const isFilterCount =
    !!filterState?.selectedStatus.length ||
    !!filterState?.selectedQueryType.length;

  const handleFilterModal = () => {
    setShowFilterOptions((prev) => !prev);
  };

  const onApplyFilter = ({ selectedStatus, selectedQueryType }) => {
    filterApplyHandler({ selectedStatus, selectedQueryType });
    handleFilterModal();
  };

  const flatlistProps = isWeb
    ? {}
    : {
        onEndReached: handleLoadMore,
        onEndReachedThreshold: 0.1,
      };

  const webProps = isWeb ? { size: "xs" } : {};

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
                  />
                }
                isLeftFillSpace
                rightSection={
                  <CustomTouchableOpacity
                    onPress={handleFilterModal}
                    style={styles.imageParentStyle}
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
                        {filterState?.selectedStatus.length +
                          filterState?.selectedQueryType.length}
                      </CommonText>
                    )}
                  </CustomTouchableOpacity>
                }
                style={styles.filterTopSection(isWebView)}
              />
            )}
            {!isWeb && (
              <View style={styles.ticketTotals}>
                <CommonText
                  fontWeight={"500"}
                  customTextStyle={{
                    ...styles.tableHeadingText,
                    ...styles.textSize,
                  }}
                >
                  {intl.formatMessage({ id: "label.tickets" })}&nbsp;&#58;&nbsp;
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
                {isTicketListingLoading && (isWeb || isFirstPageReceived) ? (
                  <LoadingScreen />
                ) : (
                  <View style={styles.tableSection}>
                    {isWebView && (
                      <MultiColumn
                        columns={getColoumConfigs(tableHeading, isHeading)}
                        style={
                          data.length
                            ? styles.columnHeaderStyle
                            : styles.columnHeaderStyleWithBorder
                        }
                      />
                    )}
                    <FlatList
                      data={data}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => {
                        return (
                          <>
                            {isWebView ? (
                              <MultiColumn
                                columns={getColoumConfigs(item)}
                                style={styles.columnStyleBorder}
                              />
                            ) : (
                              <View style={styles.mobileContainer}>
                                <View>
                                  <CommonText
                                    fontWeight={"600"}
                                    customTextStyle={styles.cellTextStyle()}
                                  >
                                    {getRenderText(item, headingTexts)}
                                  </CommonText>
                                  <CommonText
                                    customTextStyle={styles.tableQueryText}
                                  >
                                    {getRenderText(item, subHeadingText)}
                                  </CommonText>
                                </View>
                                <View style={styles.rowsPerPageWeb}>
                                  <Chip
                                    label={getRenderText(item, statusText)}
                                    style={getStatusStyle(item.status)}
                                  />
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
                        );
                      }}
                      {...flatlistProps}
                      ListFooterComponent={() => {
                        if (!data.length)
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
            data,
            filterCategory,
            filterState,
            initialFilterState,
            setFilterState,
            setShowFilterOptions,
            onApplyFilter,
            statusData,
            queryTypeData,
          }}
        />
      )}
      {addNewTicket && (
        <AddTicketModal
          queryTypeData={queryTypeData}
          onPressButtonOne={handleTicketModal}
          onPressButtonTwo={(queryType, enterQuery) => {
            handleSaveAddTicket(queryType, enterQuery);
            handleTicketModal();
          }}
        />
      )}
    </View>
  );
};

CustomTable.defaultProps = {
  addNewTicket: false,
  headingTexts: [],
  handleTicketModal: () => {},
  showSearchBar: true,
  statusText: "",
  subHeadingText: "",
  totalcards: 0,
};

CustomTable.propTypes = {
  addNewTicket: PropTypes.bool,
  allDataLoaded: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.array,
  filterCategory: PropTypes.array.isRequired,
  getColoumConfigs: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func.isRequired,
  filterApplyHandler: PropTypes.func,
  handlePageChange: PropTypes.func.isRequired,
  handleRowPerPageChange: PropTypes.func.isRequired,
  handleSearchResults: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  handleTicketModal: PropTypes.func,
  headingTexts: PropTypes.array,
  isHeading: PropTypes.bool.isRequired,
  isTicketListingLoading: PropTypes.bool,
  indexOfFirstRecord: PropTypes.number.isRequired,
  indexOfLastRecord: PropTypes.number.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  onIconPress: PropTypes.func.isRequired,
  queryTypeData: PropTypes.array,
  rowsLimit: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  showSearchBar: PropTypes.bool,
  statusData: PropTypes.array,
  statusText: PropTypes.array,
  subHeadingText: PropTypes.array,
  tableHeading: PropTypes.object.isRequired,
  tableIcon: PropTypes.any.isRequired,
  totalcards: PropTypes.number,
};

export default CustomTable;
