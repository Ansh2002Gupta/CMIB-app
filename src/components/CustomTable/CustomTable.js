import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomDropdown from "../../components/CustomDropdown";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import FilterModal from "../../containers/FilterModal";
import Spinner from "../Spinner";
import Pagination from "../../components/Pagination/Pagination";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
import { getRenderText } from "../../utils/util";
import { TicketScreenContext } from "../../globalContext/ticketsScreen/ticketsScreenProvider";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./CustomTable.style";

const CustomTable = ({
  allDataLoaded,
  currentPage,
  currentRecords,
  getColoumConfigs,
  getStatusStyle,
  handleSearchResults,
  handleSelect,
  handleLoadMore,
  headingTexts,
  isHeading,
  loadingMore,
  rowsLimit,
  rowsToShow,
  setCurrentPage,
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
  const [ticketScreenState] = useContext(TicketScreenContext);
  const { ticketScreenList } = ticketScreenState;

  const [showModal, setShowModal] = useState(false);

  const handleFilterModal = () => {
    setShowModal((prev) => !prev);
  };

  const onApplyFilter = (filterData) => {
    setCurrentRecords(filterData);
    handleFilterModal();
  };

  const PaginationFooter = () => {
    return (
      <View
        style={isWebView ? styles.paginationFooterWeb : styles.paginationFooter}
      >
        <View style={isWebView ? styles.rowsPerPageWeb : styles.rowsPerPage}>
          <View style={styles.rowsPerPageWeb}>
            <CommonText customTextStyle={styles.rowsPerPageText}>
              {intl.formatMessage({ id: "label.rows_per_page" })}
            </CommonText>
            <CustomDropdown
              options={rowsLimit}
              onSelect={handleSelect}
              placeholder={rowsToShow}
              dropdownIcon={images.iconArrowDown}
            />
          </View>
        </View>
        <Pagination
          cardsPerPage={rowsToShow}
          totalCards={totalcards}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          siblingCount={1}
          prevNextBtnstyles={
            isWebView ? styles.previousButtonWeb : styles.previousButton
          }
        />
      </View>
    );
  };

  return (
    <View style={isWebView ? styles.container : styles.mobileMainContainer}>
      <TwoRow
        topSection={
          showSearchBar && (
            <TwoColumn
              leftSection={
                <SearchView
                  data={ticketScreenList}
                  onSearch={handleSearchResults}
                />
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
                              <CommonText
                                customTextStyle={getStatusStyle(
                                  item.status,
                                  false,
                                  isWebView
                                )}
                              >
                                {getRenderText(item, statusText)}
                              </CommonText>
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
                  onEndReached={isWebView ? null : handleLoadMore}
                  onEndReachedThreshold={isWebView ? null : 0.1}
                  ListFooterComponent={() => {
                    if (loadingMore) {
                      return (
                        <View style={styles.loadingStyle}>
                          <Spinner />
                        </View>
                      );
                    }
                    if (allDataLoaded) {
                      return (
                        <View style={styles.loadingStyle}>
                          <CommonText customTextStyle={styles.noMoreData}>
                            {intl.formatMessage({ id: "label.no_more_data" })}
                          </CommonText>
                        </View>
                      );
                    }
                    return null;
                  }}
                />
                {isWebView && <PaginationFooter />}
              </View>
            }
            isTopFillSpace
          />
        }
      />
      {showModal && (
        <FilterModal
          onPressIconCross={handleFilterModal}
          data={ticketScreenList}
          onApplyFilter={onApplyFilter}
        />
      )}
    </View>
  );
};

CustomTable.defaultProps = {
  currentPage: 1,
  currentRecords: [],
  getColoumConfigs: () => {},
  getStatusStyle: () => {},
  handleSearchResults: () => {},
  handleSelect: () => {},
  handleLoadMore: () => {},
  isHeading: false,
  loadingMore: true,
  rowsLimit: [],
  rowsToShow: 10,
  setCurrentPage: () => {},
  setCurrentrecords: [],
  showSearchBar: true,
  statusText: "",
  subHeadingText: "",
  tableHeading: {},
  tableIcon: images.ticketIcon,
  totalcards: 0,
};

CustomTable.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentRecords: PropTypes.array.isRequired,
  getColoumConfigs: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func.isRequired,
  handleSearchResults: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  headingTexts: PropTypes.array,
  isHeading: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  rowsLimit: PropTypes.array.isRequired,
  rowsToShow: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setCurrentrecords: PropTypes.array.isRequired,
  showSearchBar: PropTypes.bool,
  statusText: PropTypes.array,
  subHeadingText: PropTypes.array,
  tableHeading: PropTypes.object.isRequired,
  tableIcon: PropTypes.string.isRequired,
  totalcards: PropTypes.number.isRequired,
};

export default CustomTable;
