import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { FlatList, View } from "@unthinkable/react-core-components";

import MultiColumn from "../../core/layouts/MultiColumn";
import { TwoColumn, TwoRow } from "../../core/layouts";

import Chip from "../Chip";
import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import PaginationFooter from "../PaginationFooter";
import SearchView from "../../components/SearchView";
import TouchableImage from "../../components/TouchableImage";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./CustomTable.style";

//TODO: adding searching data here
const dataList = [""];

const CustomTable = ({
  currentPage,
  currentRecords,
  handlePageChange,
  getColoumConfigs,
  getStatusStyle,
  handleSearchResults,
  handleSelect,
  indexOfFirstRecord,
  indexOfLastRecord,
  isHeading,
  rowsLimit,
  rowsToShow,
  tableHeading,
  totalcards,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

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
              <CustomTouchableOpacity style={styles.imageParentStyle}>
                <TouchableImage
                  source={images.iconFilter}
                  parentStyle={styles.iconTicket}
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
                              <Chip
                                label={item.status}
                                style={getStatusStyle(
                                  item.status,
                                  false,
                                  styles
                                )}
                              />
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
                {isWebView && (
                  <PaginationFooter
                    {...{
                      currentPage,
                      handlePageChange,
                      handleSelect,
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
                    handleSelect,
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
  handlePageChange: () => {},
  indexOfFirstRecord: 0,
  indexOfLastRecord: 0,
  isHeading: false,
  rowsLimit: [],
  rowsToShow: 10,
  tableHeading: {},
  totalcards: 0,
};

CustomTable.propTypes = {
  currentPage: PropTypes.number.isRequired,
  currentRecords: PropTypes.array.isRequired,
  getColoumConfigs: PropTypes.func.isRequired,
  getStatusStyle: PropTypes.func.isRequired,
  handleSearchResults: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  indexOfFirstRecord: PropTypes.number.isRequired,
  indexOfLastRecord: PropTypes.number.isRequired,
  isHeading: PropTypes.bool.isRequired,
  rowsLimit: PropTypes.array.isRequired,
  rowsToShow: PropTypes.number.isRequired,
  tableHeading: PropTypes.object.isRequired,
  totalcards: PropTypes.number.isRequired,
};

export default CustomTable;
