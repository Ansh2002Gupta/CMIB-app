import React from "react";
import { useIntl } from "react-intl";
import { View, FlatList } from "@unthinkable/react-core-components";

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

const dataList = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape"];

const CustomTable = ({
  rowsToShow,
  getStatusStyle,
  getColoumConfigs,
  isHeading,
  currentPage,
  setCurrentPage,
  currentRecords,
  totalcards,
  rowsLimit,
  indexOfFirstRecord,
  indexOfLastRecord,
  handleSearchResults,
  handleSelect,
  tableHeading,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const PaginationFooter = ({ isWebView }) => {
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
          isWebView={isWebView}
          prevNextBtnstyles={
            isWebView ? styles.previousButtonWeb : styles.previousButton
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TwoRow
        topSection={
          <TwoColumn
            leftSection={
              <SearchView data={dataList} onSearch={handleSearchResults} />
            }
            isLeftFillSpace={true}
            isRightFillSpace={false}
            rightSection={
              <View style={styles.imageParentStyle}>
                <TouchableImage
                  source={images.iconFilter}
                  parentStyle={styles.iconTicket}
                />
                {isWebView && (
                  <CommonText customTextStyle={styles.filterText}>
                    {"Filters"}
                  </CommonText>
                )}
              </View>
            }
            style={styles.filterTopSection(isWebView)}
          />
        }
        isTopFillSpace={false}
        isBottomFillSpace={true}
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
                {isWebView && <PaginationFooter isWebView={isWebView} />}
              </View>
            }
            isTopFillSpace={false}
            isBottomFillSpace={true}
            bottomSection={
              !isWebView && <PaginationFooter isWebView={isWebView} />
            }
            bottomSectionStyle={styles.bottomPaginationStyle}
          />
        }
      />
    </View>
  );
};

export default CustomTable;
