import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { FlatList, View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import Chip from "../Chip";
import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import FilterModal from "../../containers/FilterModal";
import PaginationFooter from "../PaginationFooter";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
import { getRenderText } from "../../utils/util";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./CustomTable.style";

const initialFilterState = {
  selectedStatus: [],
  selectedQueryType: [],
  activeCategories: [],
};

const CustomTable = ({
  currentPage,
  currentRecords,
  data,
  filterCategory,
  getColoumConfigs,
  getStatusStyle,
  handlePageChange,
  handleRowPerPageChange,
  handleSearchResults,
  headingTexts,
  indexOfFirstRecord,
  indexOfLastRecord,
  isHeading,
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
  const [filterState, setFilterState] = useState(initialFilterState);

  const handleFilterModal = () => {
    setShowModal((prev) => !prev);
  };

  const onApplyFilter = (filterData) => {
    setCurrentRecords(filterData);
    handleFilterModal();
  };

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
                  renderItem={({ item, index }) => {
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
                />
                {isWebView && (
                  <PaginationFooter
                    {...{
                      currentPage,
                      handlePageChange,
                      handleRowPerPageChange,
                      indexOfFirstRecord,
                      indexOfLastRecord,
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
            isBottomFillSpace={false}
            bottomSection={
              !isWebView && (
                <PaginationFooter
                  {...{
                    currentPage,
                    handlePageChange,
                    handleRowPerPageChange,
                    indexOfFirstRecord,
                    indexOfLastRecord,
                    rowsLimit,
                    rowsToShow,
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
      {showModal && (
        <FilterModal
          data={data}
          filterCategory={filterCategory}
          filterState={filterState}
          initialFilterState={initialFilterState}
          setFilterState={setFilterState}
          onPressIconCross={handleFilterModal}
          onApplyFilter={onApplyFilter}
        />
      )}
    </View>
  );
};

CustomTable.defaultProps = {
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
  indexOfFirstRecord: 0,
  indexOfLastRecord: 0,
  isHeading: false,
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
  currentPage: PropTypes.number.isRequired,
  currentRecords: PropTypes.array.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterCategory: PropTypes.array.isRequired,
  getColoumConfigs: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleRowPerPageChange: PropTypes.func.isRequired,
  handleSearchResults: PropTypes.func.isRequired,
  headingTexts: PropTypes.array,
  indexOfFirstRecord: PropTypes.number.isRequired,
  indexOfLastRecord: PropTypes.number.isRequired,
  isHeading: PropTypes.bool.isRequired,
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
