import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import ActionPairButton from "../ActionPairButton";
import Chip from "../Chip";
import CommonText from "../../components/CommonText";
import CustomModal from "../CustomModal";
import CustomTextInput from "../CustomTextInput";
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
  allDataLoaded,
  currentPage,
  data,
  fetchDataTicketListing,
  filterApplyHandler,
  filterCategory,
  getColoumConfigs,
  getStatusStyle,
  handleAddTicket,
  handleLoadMore,
  handlePageChange,
  handleRowPerPageChange,
  handleSearchResults,
  headingTexts,
  indexOfFirstRecord,
  indexOfLastRecord,
  isHeading,
  isTicketListingLoading,
  loadingMore,
  onIconPress,
  queryTypeData,
  rowsLimit,
  rowsPerPage,
  showSearchBar,
  statusData,
  statusText,
  subHeadingText,
  tableHeading,
  tableIcon,
  ticketListingData,
  totalcards,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [addNewTicket, setAddNewTicket] = useState(false);
  const [enterQuery, setEnterQuery] = useState("");
  const [queryType, setQueryType] = useState();

  const handleFilterModal = () => {
    setShowFilterOptions((prev) => !prev);
  };

  const onApplyFilter = ({ selectedStatus, selectedQueryType }) => {
    filterApplyHandler({ selectedStatus, selectedQueryType });
    handleFilterModal();
  };

  const handleTicketModal = () => {
    setAddNewTicket(true);
  };

  const handleSaveAddTicket = () => {
    handleAddTicket({
      payload: { query_type: queryType, query: enterQuery },
      succesCallBack: fetchDataTicketListing,
    });
    setAddNewTicket(false);
    setEnterQuery("");
    setQueryType();
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
          showSearchBar && (
            <TwoColumn
              style={{ justifyContent: "space-between" }}
              isLeftFillSpace
              leftSection={
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
                    </CustomTouchableOpacity>
                  }
                  style={styles.filterTopSection(isWebView)}
                />
              }
              rightSection={
                <CustomTouchableOpacity
                  style={styles.addNewButton}
                  onPress={handleTicketModal}
                >
                  <CommonText customTextStyle={styles.addNewText}>
                    {intl.formatMessage({ id: "label.add_new_ticket" })}
                  </CommonText>
                </CustomTouchableOpacity>
              }
            />
          )
        }
        isTopFillSpace={false}
        isBottomFillSpace
        bottomSection={
          <TwoRow
            style={styles.tableTopSection}
            topSectionStyle={styles.tableTopSectionStyle(isWebView)}
            topSection={
              <View style={styles.tableSection}>
                {isWebView && (
                  <MultiColumn
                    columns={getColoumConfigs(tableHeading, isHeading)}
                    style={styles.columnHeaderStyle}
                  />
                )}
                {isTicketListingLoading ? (
                  <LoadingScreen />
                ) : (
                  <FlatList
                    data={ticketListingData?.records}
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
                      if (isWeb) return <></>;
                      if (loadingMore) {
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
                )}

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
        <CustomModal headerText={intl.formatMessage({ id: "label.addTicket" })}>
          <View>
            <CustomTextInput
              isDropdown
              label={intl.formatMessage({ id: "label.query_type" })}
              placeholder={intl.formatMessage({
                id: "label.select",
              })}
              options={queryTypeData}
              valueField="id"
              labelField="name"
              value={queryType}
              onChangeValue={(val) => {
                setQueryType(val);
              }}
            />
            <CustomTextInput
              label={intl.formatMessage({ id: "label.enterQuery" })}
              placeholder={intl.formatMessage({
                id: "label.enterQuery",
              })}
              value={enterQuery}
              onChangeText={(val) => {
                setEnterQuery(val);
              }}
              isMultiline
            />
            <ActionPairButton
              onPressButtonTwo={() => {
                handleSaveAddTicket();
              }}
              onPressButtonOne={() => {
                setAddNewTicket(false);
              }}
              isButtonTwoGreen
              isDisabled={!enterQuery || !queryType}
              buttonOneText={intl.formatMessage({ id: "label.cancel" })}
              buttonTwoText={intl.formatMessage({ id: "label.add" })}
            ></ActionPairButton>
          </View>
        </CustomModal>
      )}
    </View>
  );
};

CustomTable.defaultProps = {
  allDataLoaded: false,
  currentPage: 1,
  data: [{}],
  filterCategory: [],
  getColoumConfigs: () => {},
  getStatusStyle: () => {},
  handlePageChange: () => {},
  handleRowPerPageChange: () => {},
  handleSearchResults: () => {},
  headingTexts: [],
  handleLoadMore: () => {},
  isHeading: false,
  indexOfFirstRecord: 0,
  indexOfLastRecord: 0,
  loadingMore: true,
  onIconPress: () => {},
  rowsLimit: [],
  rowsPerPage: 10,
  showSearchBar: true,
  statusText: "",
  subHeadingText: "",
  tableHeading: {},
  tableIcon: images.ticketIcon,
  totalcards: 0,
};

CustomTable.propTypes = {
  allDataLoaded: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterCategory: PropTypes.array.isRequired,
  getColoumConfigs: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleRowPerPageChange: PropTypes.func.isRequired,
  handleSearchResults: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  headingTexts: PropTypes.array,
  isHeading: PropTypes.bool.isRequired,
  indexOfFirstRecord: PropTypes.number.isRequired,
  indexOfLastRecord: PropTypes.number.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  onIconPress: PropTypes.func.isRequired,
  rowsLimit: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  showSearchBar: PropTypes.bool,
  statusText: PropTypes.array,
  subHeadingText: PropTypes.array,
  tableHeading: PropTypes.object.isRequired,
  tableIcon: PropTypes.any.isRequired,
  totalcards: PropTypes.number.isRequired,
};

export default CustomTable;
