import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";

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

// const initialFilterState = {
//   selectedStatus: [],
//   selectedQueryType: [],
//   activeCategories: [],
// };

const CustomTable = ({
  addNewTicket,
  allDataLoaded,
  containerStyle,
  currentPage,
  customFilterInfo,
  customModal,
  data,
  defaultCategory,
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
  isFirstPageReceived,
  isFilterVisible = true,
  isTotalCardVisible,
  isStatusTextBoolean,
  loadingMore,
  mobileComponentToRender,
  onIconPress,
  placeholder,
  popUpMessage,
  rowsLimit,
  rowsPerPage,
  renderCalendar,
  selectedFilterOptions,
  setSelectedFilterOptions,
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
  ThirdSection,
  unit,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";

  const popUpRef = useRef(null);

  useOutsideClick(popUpRef, () => setShowPopUpWithID(-1));
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const isFilterCount = !!selectedFilterOptions
    ? Object.values(selectedFilterOptions).find((state) => !!state.length)
    : 0;

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
                  <View style={styles.flexDirectionRow}>
                    <SearchView
                      data={data?.records}
                      customSearchCriteria={handleSearchResults}
                      placeholder={placeholder}
                      customParentStyle={styles.getParentStyle(isWebView)}
                    />
                    {isFilterVisible && (
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
                    )}
                  </View>
                }
                rightSection={ThirdSection ? ThirdSection : <></>}
                isLeftFillSpace={true}
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
                  <View style={{ ...styles.tableSection, ...containerStyle }}>
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
                      renderItem={({ item, index }) => {
                        return (
                          <>
                            {isWebView ? (
                              <MultiColumn
                                columns={getColoumConfigs(item)}
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
                                            ? getRenderText(
                                                item,
                                                statusText
                                              ) === "1"
                                              ? statusLabels[1]
                                              : statusLabels[0]
                                            : getRenderText(item, statusText)
                                        }
                                        style={
                                          isStatusTextBoolean
                                            ? getStatusStyle(
                                                getRenderText(
                                                  item,
                                                  statusText
                                                ) === "1"
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
                                            customStyle={
                                              styles.mobilePopUpPosition
                                            }
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
                            )}
                          </>
                        );
                      }}
                      {...flatlistProps}
                      ListFooterComponent={() => {
                        if (!data?.length)
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
  containerStyle: {},
  headingTexts: [],
  handleTicketModal: () => {},
  showSearchBar: true,
  statusText: "",
  subHeadingText: "",
  totalcards: 0,
  placeholder: "Search",
  isTotalCardVisible: true,
};

CustomTable.propTypes = {
  addNewTicket: PropTypes.bool,
  containerStyle: PropTypes.object,
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
  mobileComponentToRender: PropTypes.func,
  isHeading: PropTypes.bool.isRequired,
  isTicketListingLoading: PropTypes.bool,
  indexOfFirstRecord: PropTypes.number.isRequired,
  indexOfLastRecord: PropTypes.number.isRequired,
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
  statusText: PropTypes.array,
  subHeadingText: PropTypes.array,
  tableHeading: PropTypes.object.isRequired,
  tableIcon: PropTypes.any.isRequired,
  totalcards: PropTypes.number,
  ThirdSection: PropTypes.elementType,
  placeholder: PropTypes.string,
  isTotalCardVisible: PropTypes.bool,
};

export default CustomTable;
