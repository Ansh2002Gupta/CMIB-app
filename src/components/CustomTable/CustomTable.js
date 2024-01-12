import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { FlatList, View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import CommonText from "../../components/CommonText";
import CustomDropdown from "../../components/CustomDropdown";
import CustomImage from "../../components/CustomImage";
import Pagination from "../../components/Pagination/Pagination";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./CustomTable.style";

//TODO: adding searching data here
const dataList = [""]

const CustomTable = ({
  currentPage,
  currentRecords,
  getColoumConfigs,
  getStatusStyle,
  handleSearchResults,
  handleSelect,
  indexOfFirstRecord,
  indexOfLastRecord,
  isHeading,
  rowsLimit,
  rowsToShow,
  setCurrentPage,
  tableHeading,
  totalcards,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

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
          {!isWebView && (
            <CommonText customTextStyle={styles.rowsPerPageText}>
              {`${indexOfFirstRecord} - ${indexOfLastRecord} of ${totalcards}`}
            </CommonText>
          )}
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
          <TwoColumn
            leftSection={
              <SearchView data={dataList} onSearch={handleSearchResults} />
            }
            isLeftFillSpace
            isRightFillSpace={false}
            rightSection={
              <View style={styles.imageParentStyle}>
                <TouchableImage
                  source={images.iconFilter}
                  parentStyle={styles.iconTicket}
                />
                {isWebView && (
                  <CommonText customTextStyle={styles.filterText}>
                    {intl.formatMessage({ id: "label.filters" })}
                  </CommonText>
                )}
              </View>
            }
            style={styles.filterTopSection(isWebView)}
          />
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
                                {item.id}
                              </CommonText>
                              <CommonText
                                customTextStyle={styles.tableQueryText}
                              >
                                {item.query_type}
                              </CommonText>
                            </View>
                            <View style={styles.rowsPerPageWeb}>
                              <CommonText
                                customTextStyle={getStatusStyle(
                                  item.status,
                                  false,
                                  styles,
                                  isWebView
                                )}
                              >
                                {item.status}
                              </CommonText>
                              <CustomImage
                                source={images.iconTicket}
                                style={styles.iconTicket}
                              />
                            </View>
                          </View>
                        )}
                      </>
                    );
                  }}
                />
                {isWebView && <PaginationFooter />}
              </View>
            }
            isTopFillSpace
            isBottomFillSpace={false}
            bottomSection={!isWebView && <PaginationFooter />}
            bottomSectionStyle={styles.bottomPaginationStyle}
          />
        }
      />
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
  indexOfFirstRecord: 0,
  indexOfLastRecord: 0,
  isHeading: false,
  rowsLimit: [],
  rowsToShow: 10,
  setCurrentPage: () => {},
  tableHeading: [],
  totalcards: 0,
};

CustomTable.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentRecords: PropTypes.array.isRequired,
  getColoumConfigs: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func.isRequired,
  handleSearchResults: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  indexOfFirstRecord: PropTypes.number.isRequired,
  indexOfLastRecord: PropTypes.number.isRequired,
  isHeading: PropTypes.bool.isRequired,
  rowsLimit: PropTypes.array.isRequired,
  rowsToShow: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  tableHeading: PropTypes.array.isRequired,
  totalcards: PropTypes.number.isRequired,
};

export default CustomTable;
