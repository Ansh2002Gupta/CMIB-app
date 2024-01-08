import React, { useEffect } from "react";
import { View, FlatList, Text } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import MultiColumn from "../../core/layouts/MultiColumn";
import useTicketView from "./controller/useTicketView";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import CustomImage from "../../components/CustomImage";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import styles from "./TicketsView.style";
import { TwoColumn, TwoRow } from "../../core/layouts";
import TouchableImage from "../../components/TouchableImage";
import SearchView from "../../components/SearchView";
import Pagination from "../../components/Pagination/Pagination";
import Dropdown from "../../components/Dropdown";
import CustomDropdown from "../../components/CustomDropdown";

const tableHeading = {
  id: "Ticket ID",
  query_type: "Query Type",
  status: "Status",
  assigned_to: "Assigned To",
  created_at: "Created On",
};

const dataList = ["Apple", "Banana", "Orange", "Mango", "Pineapple", "Grape"];

const Tickets = () => {
  const {
    rowsToShow,
    setRowsToShow,
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
  } = useTicketView();
  const { isWebView } = useIsWebView();

  const PaginationFooter = ({ title = "Rows Per Page:", isWebView }) => {
    return (
      <View
        style={isWebView ? styles.paginationFooterWeb : styles.paginationFooter}
      >
        <View style={isWebView ? styles.rowsPerPageWeb : styles.rowsPerPage}>
          <View style={styles.rowsPerPageWeb}>
            <CommonText
              title={title}
              customTextStyle={styles.rowsPerPageText}
            />
            <CustomDropdown
              options={rowsLimit}
              onSelect={handleSelect}
              placeholder={rowsToShow}
              dropdownIcon={images.iconArrowDown}
            />
          </View>
          {!isWebView && (
            <CommonText
              title={`${indexOfFirstRecord} - ${indexOfLastRecord} of ${totalcards}`}
              customTextStyle={styles.rowsPerPageText}
            />
          )}
        </View>

        <Pagination
          cardsPerPage={rowsToShow}
          totalCards={totalcards}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageStyles
          siblingCount={1}
          isWebView={isWebView}
          prevNextBtnstyles={
            isWebView ? styles.previousButtonWeb : styles.previousButton
          }
        />
      </View>
    );
  };

  const handleSearchResults = (filteredData) => {};
  const handleSelect = (option) => {
    setRowsToShow(option.value);
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
                {isWebView &&   <CommonText title={"Filters"} customTextStyle={styles.filterText} /> }
              
              </View>
            }
            style={{ marginBottom: 16, width: isWebView ? "40%" : "100%" }}
          />
        }
        isTopFillSpace={false}
        isBottomFillSpace={true}
        bottomSection={
          <TwoRow
            style={{ flex: 1 }}
            topSectionStyle={{
              height: isWebView ? "100%" : "85%",
            }}
            topSection={
              <View style={styles.tableSection}>
                {isWebView && (
                  <MultiColumn
                    columns={getColoumConfigs(tableHeading, isHeading)}
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
                                title={item.id}
                                customTextStyle={styles.cellTextStyle()}
                              />
                              <CommonText
                                title={item.query_type}
                                customTextStyle={styles.tableQueryText}
                              />
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <CommonText
                                title={item.status}
                                customTextStyle={getStatusStyle(
                                  item.status,
                                  false,
                                  styles,
                                  isWebView
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

export default Tickets;
