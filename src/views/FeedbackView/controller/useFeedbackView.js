import React, { useState } from "react";
import { useSearchParams } from "../../../routes";
import { View } from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useIsWebView from "../../../hooks/useIsWebView";
import usePagination from "../../../hooks/usePagination";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import { feedbackData } from "../constant";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../FeedbackView.style";

const useFeedbackView = () => {
  const { isWebView } = useIsWebView();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );

  const [currentRecords, setCurrentRecords] = useState(
    feedbackData.slice(0, rowsPerPage)
  );

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  //TODO: We use this hook when we implementing API
  // const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch();

  const handlePageChange = (page) => {
    //TODO : we fetch data on changing page
    // fetchData()
    handlePagePerChange(page);
  };

  const handleRowPerPageChange = (option) => {
    //TODO : we fetch data on row changing per page
    // fetchData()
    handleRowsPerPageChange(option.value);
  };

  const handleSearchResults = (searchedData) => {
    //TODO: Implement searching
  };

  let headingTexts = ["id"];
  let subHeadingText = ["created_at"];
  let statusText = ["status"];
  let tableIcon = images.iconEye;
  let filterCategory = ["Status", "Role"];
  let isHeading = true;

  function getStatusStyle(status) {
    status = status.toLowerCase();
    switch (status) {
      case "published":
        return {
          ...(!isWebView ? styles.published : styles.publishedWeb),
          ...styles.cellTextStyle(12),
        };
      case "not published":
        return {
          ...(!isWebView ? styles.notPublished : styles.notPublishedWeb),
          ...styles.cellTextStyle(12),
        };
      case "pending":
        return {
          ...(!isWebView ? styles.pending : styles.pendingWeb),
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
        style: commonStyles.columnStyle("25%"),
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
        style: commonStyles.columnStyle("25%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.created_at}
          </CommonText>
        ),
        style: commonStyles.columnStyle("30%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <TouchableImage source={tableIcon} style={styles.iconTicket} />
        ),
        style: {
          ...commonStyles.columnStyle("10%"),
          ...styles.iconTicketColoum,
        },
        isFillSpace: true,
      },
    ];
  };

  return {
    currentRecords,
    currentPage,
    getColoumConfigs,
    getStatusStyle,
    filterCategory,
    headingTexts,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    isHeading,
    rowsPerPage,
    statusText,
    subHeadingText,
    tableIcon,
    setCurrentRecords,
    totalcards: feedbackData.length,
  };
};

export default useFeedbackView;
