import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, Platform, View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import Chip from "../Chip";
import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import FilterModal from "../../containers/FilterModal";
import PaginationFooter from "../PaginationFooter";
import SearchView from "../../components/SearchView";
import Spinner from "../Spinner";
import TouchableImage from "../../components/TouchableImage";
import { getRenderText } from "../../utils/util";
import useHandleInfiniteScroll from "../../hooks/useHandleInfiniteScroll";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./CustomTable.style";

const CustomTable = ({
  allDataLoaded,
  currentPage,
  currentRecords,
  data,
  filterCategory,
  getColoumConfigs,
  getStatusStyle,
  handlePageChange,
  handleRowPerPageChange,
  handleSearchResults,
  handleLoadMore,
  headingTexts,
  isHeading,
  loadingMore,
  rowsLimit,
  rowsToShow,
  setCurrentRecords,
  showSearchBar,
  statusText,
  subHeadingText,
  tableHeading,
  tableIcon,
  totalcards,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const [showModal, setShowModal] = useState(false);

  const handleFilterModal = () => {
    setShowModal((prev) => !prev);
  };

  const onApplyFilter = (filterData) => {
    setCurrentRecords(filterData);
    handleFilterModal();
  };

  useHandleInfiniteScroll(handleLoadMore);

  const flatlistProps =
    Platform.OS.toLowerCase() === "web"
      ? {}
      : {
          onEndReached: handleLoadMore,
          onEndReachedThreshold: 0.1,
        };

  const webProps = Platform.OS === "web" ? { size: "xs" } : {};

  return (
    <View style={isWebView ? styles.container : styles.mobileMainContainer}>
      <TwoRow
        topSection={
          showSearchBar && (
            <TwoColumn
              leftSection={
                <SearchView data={data} onSearch={handleSearchResults} />
              }
              isLeftFillSpace
              isRightFillSpace={false}
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
                <FlatList
                  data={currentRecords}
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
                              <CustomImage
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
                {isWebView && (
                  <PaginationFooter
                    {...{
                      currentPage,
                      handlePageChange,
                      handleRowPerPageChange,
                      rowsLimit,
                      rowsToShow,
                      siblingCount: 1,
                      totalcards,
                    }}
                  />
                )}
              </View>
            }
            isTopFillSpace
          />
        }
      />
      {showModal && (
        <FilterModal
          filterCategory={filterCategory}
          data={data}
          onPressIconCross={handleFilterModal}
          onApplyFilter={onApplyFilter}
        />
      )}
    </View>
  );
};

CustomTable.defaultProps = {
  allDataLoaded: false,
  currentPage: 1,
  currentRecords: [],
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
  loadingMore: true,
  rowsLimit: [],
  rowsToShow: 10,
  setCurrentrecords: [],
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
  currentRecords: PropTypes.array.isRequired,
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
  loadingMore: PropTypes.bool.isRequired,
  rowsLimit: PropTypes.array.isRequired,
  rowsToShow: PropTypes.number.isRequired,
  setCurrentrecords: PropTypes.array.isRequired,
  showSearchBar: PropTypes.bool,
  statusText: PropTypes.array,
  subHeadingText: PropTypes.array,
  tableHeading: PropTypes.object.isRequired,
  tableIcon: PropTypes.string.isRequired,
  totalcards: PropTypes.number.isRequired,
};

export default CustomTable;
