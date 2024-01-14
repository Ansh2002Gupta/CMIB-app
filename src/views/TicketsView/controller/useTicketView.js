import React, { useEffect, useState } from "react";
import { View } from "@unthinkable/react-core-components";
import { useSearchParams } from "../../../routes";

import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import { gridData } from "../constant";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import { getValidCurrentPage } from "../../../utils/queryParamsHelpers";
import images from "../../../images";
import styles from "../TicketsView.style";

const useTicketView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rowsToShow, setRowsToShow] = useState(parseInt(searchParams.get("rowsPerPage")) || ROWS_PER_PAGE_ARRAY[0].value);
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );
  const [currentRecords, setCurrentRecords] = useState([]);

  const indexOfLastRecord = currentPage * rowsToShow;
  const indexOfFirstRecord = indexOfLastRecord - rowsToShow;

  useEffect(() => {
    let newRecords = gridData.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(newRecords);
  }, [rowsToShow, currentPage]);

  useEffect(() => {
    setSearchParams({ page: currentPage, rowsPerPage: rowsToShow });
  }, [currentPage, rowsToShow, setSearchParams]);

  const totalcards = gridData.length;

  let isHeading = true;

  const handleSearchResults = (filteredData) => {};

  const handleSelect = (option) => {
    setRowsToShow(option.value);
  };

  const handlePageChange=()=>{
    setCurrentPage(currentPage+1);
  }

  function getStatusStyle(status, isHeading, styles, isWebView) {
    status = status.toLowerCase();

    if (isHeading) {
      return styles.tableHeadingText;
    }
    switch (status) {
      case "pending":
        return [
          !isWebView ? styles.pending : styles.pendingWeb,
          styles.cellTextStyle(12),
        ];
      case "close":
        return [
          !isWebView ? styles.close : styles.closeWeb,
          styles.cellTextStyle(12),
        ];
      case "in progress":
        return [
          !isWebView ? styles.inProgress : styles.inProgressWeb,
          styles.cellTextStyle(12),
        ];
      default:
        return styles.cellTextStyle(12);
    }
  }

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item.id}
          </CommonText>
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.query_type}
          </CommonText>
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.statusStyle}>
            <CommonText
              customTextStyle={getStatusStyle(
                item.status,
                isHeading,
                styles,
                true
              )}
            >
              {item.status}
            </CommonText>
          </View>
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.assigned_to}
          </CommonText>
        ),
        style: styles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.created_at}
          </CommonText>
        ),
        style: styles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <TouchableImage
            source={images.iconTicket}
            style={styles.iconTicket}
          />
        ),
        style: styles.columnStyle("10%"),
        isFillSpace: true,
      },
    ];
  };

  return {
    rowsToShow,
    setRowsToShow,
    getStatusStyle,
    getColoumConfigs,
    handleSearchResults,
    handleSelect,
    handlePageChange,
    isHeading,
    currentPage,
    setCurrentPage,
    currentRecords,
    totalcards,
    indexOfFirstRecord,
    indexOfLastRecord,
  };
};

export default useTicketView;
