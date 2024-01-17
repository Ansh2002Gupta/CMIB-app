import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "../../../routes";
import { View } from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { setTicketScreenList } from "../../../globalContext/ticketsScreen/ticketScreenActions";
import { TicketScreenContext } from "../../../globalContext/ticketsScreen/ticketsScreenProvider";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import images from "../../../images";
import styles from "../TicketsView.style";

const useTicketView = (data) => {
  const [, ticketScreenDispatch] = useContext(TicketScreenContext);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const { isWebView } = useIsWebView();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rowsToShow, setRowsToShow] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );
  const [currentRecords, setCurrentRecords] = useState([]);


  let indexOfLastRecord;
  let indexOfFirstRecord;

  const fetchData = (pageNumber, rowPerPage) => {
    // TODO: Integrate an API call here
    indexOfLastRecord = pageNumber * rowPerPage;
    indexOfFirstRecord = indexOfLastRecord - rowPerPage;
    let newRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(newRecords);
    ticketScreenDispatch(setTicketScreenList(data));
  };

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("page", getValidCurrentPage(+searchParams.get("page")));
      return prev;
    });
    setSearchParams((prev) => {
      prev.set(
        "rowsPerPage",
        getValidRowPerPage(+searchParams.get("rowsPerPage"))
      );
      return prev;
    });
    fetchData(currentPage, rowsToShow);
  }, []);

  const handleLoadMore = () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    setTimeout(() => {
      const startIndex = currentRecords.length;
      const endIndex = startIndex + rowsToShow;
      const additionalRecords = data.slice(startIndex, endIndex);
      if (additionalRecords.length > 0) {
        const newRecords = currentRecords.concat(additionalRecords);
        setCurrentRecords(newRecords);
      } else {
        setAllDataLoaded(true);
      }
      setLoadingMore(false);
    }, 1000);
  };

  let isHeading = true;

  const handleSearchResults = (searchedData) => {
    //TODO: Implement searching
  };

  const handleRowPerPageChange = (option) => {
    setRowsToShow(option.value);
    setSearchParams((prev) => {
      prev.set("rowsPerPage", option.value);
      return prev;
    });
    fetchData(currentPage, option.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams((prev) => {
      prev.set("page", page);
      return prev;
    });
    fetchData(page, rowsToShow);
  };

  let headingTexts = ["id"];
  let subHeadingText = ["query_type"];
  let statusText = ["status"];
  let tableIcon = images.iconTicket;
  let filterCategory = ["Status", "Query Type"];

  function getStatusStyle(status) {
    status = status.toLowerCase();
    switch (status) {
      case "pending":
        return {
          ...(!isWebView ? styles.pending : styles.pendingWeb),
          ...styles.cellTextStyle(12),
        };
      case "close":
        return {
          ...(!isWebView ? styles.close : styles.closeWeb),
          ...styles.cellTextStyle(12),
        };
      case "in progress":
        return {
          ...(!isWebView ? styles.inProgress : styles.inProgressWeb),
          ...styles.cellTextStyle(12),
        };
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
            {isHeading ? (
              <CommonText customTextStyle={tableStyle}>
                {item.status}
              </CommonText>
            ) : (
              <Chip label={item.status} style={getStatusStyle(item.status)} />
            )}
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
            imageStyle={styles.iconTicket}
            isSvg={true}
          />
        ),
        style: { ...styles.columnStyle("10%"), ...styles.iconTicketColoum },
        isFillSpace: true,
      },
    ];
  };

  return {
    allDataLoaded,
    currentPage,
    currentRecords,
    getColoumConfigs,
    getStatusStyle,
    filterCategory,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    handleLoadMore,
    isHeading,
    loadingMore,
    rowsToShow,
    setCurrentRecords,
    statusText,
    subHeadingText,
    tableIcon,
    totalcards: data.length,
  };
};

export default useTicketView;
