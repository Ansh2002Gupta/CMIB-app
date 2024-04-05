import React, { useRef, useState } from "react";
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
import PopupMessage from "../PopupMessage/PopupMessage";
import SearchView from "../../components/SearchView";
import Spinner from "../Spinner";
import TouchableImage from "../../components/TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import useOutsideClick from "../../hooks/useOutsideClick";
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
  customFilterInfo,
  customModal,
  data,
  defaultCategory,
  selectedFilterOptions,
  setSelectedFilterOptions,
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
  isStatusTextBoolean,
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
  tableHeading,
  tableIcon,
  totalcards,
  statusLabels,
  showPopUpWithID,
  setShowPopUpWithID,
  popUpMessage,
  setModalData,
  setShowJobOfferResponseModal,
  setShowInterviewTimeModal,
  unit,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";

  const popUpRef = useRef(null);

  useOutsideClick(popUpRef, () => setShowPopUpWithID(-1));
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const isFilterCount = Object.values(selectedFilterOptions).find(
    (state) => !!state.length
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
                  <CustomTouchableOpacity
                    onPress={handleFilterModal}
                    style={styles.imageParentStyle}
                    disabled={isTicketListingLoading}
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
                {isTicketListingLoading && (isWeb || isFirstPageReceived) ? (
                  <LoadingScreen />
                ) : (
                  <View style={styles.tableSection}>
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
                                    label={
                                      isStatusTextBoolean
                                        ? getRenderText(item, statusText) ===
                                          "1"
                                          ? statusLabels[1]
                                          : statusLabels[0]
                                        : getRenderText(item, statusText)
                                    }
                                    style={
                                      isStatusTextBoolean
                                        ? getStatusStyle(
                                            getRenderText(item, statusText) ===
                                              "1"
                                              ? statusLabels[1].toLowerCase()
                                              : statusLabels[0].toLowerCase()
                                          )
                                        : getStatusStyle(item?.status)
                                    }
                                  />
                                  {showPopUpWithID === item?.id && (
                                    <View ref={popUpRef}>
                                      <PopupMessage
                                        message={popUpMessage}
                                        customStyle={styles.mobilePopUpPosition}
                                        onPopupClick={() => {
                                          if (
                                            popUpMessage ===
                                            intl.formatMessage({
                                              id: "label.respond_to_job_offer",
                                            })
                                          ) {
                                            setShowJobOfferResponseModal(
                                              (prev) => !prev
                                            );
                                            setModalData(item);
                                          } else {
                                            setShowInterviewTimeModal(
                                              (prev) => !prev
                                            );
                                          }
                                          setShowPopUpWithID(-1);
                                        }}
                                      />
                                    </View>
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
            filterInfo: customFilterInfo,
            data,
            defaultCategory,
            filterCategory,
            filterState: selectedFilterOptions,
            initialFilterState,
            setFilterState: setSelectedFilterOptions,
            setShowFilterOptions,
            onApplyFilter,
            unit,
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
  headingTexts: [],
  handleTicketModal: () => {},
  showSearchBar: true,
  statusText: "",
  subHeadingText: "",
  totalcards: 0,
  placeholder: "Search",
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
  statusText: PropTypes.array,
  subHeadingText: PropTypes.array,
  tableHeading: PropTypes.object.isRequired,
  tableIcon: PropTypes.any.isRequired,
  totalcards: PropTypes.number,
  placeholder: PropTypes.string,
};

export default CustomTable;
