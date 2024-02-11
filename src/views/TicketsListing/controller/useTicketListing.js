import React, { useState } from "react";
import { useNavigate, useSearchParams } from "../../../routes";
import { View } from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import usePagination from "../../../hooks/usePagination";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import { ticketData } from "../constant";
import { navigations } from "../../../constants/routeNames";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../TicketsListing.style";
import {
  COMPANY_TICKET_LISTING,
  COMPANY_QUERY_TYPE_TICKET,
  COMPANY_TICKET_STATUS,
} from "../../../services/apiServices/apiEndPoint";
import useAddTicket from "../../../services/apiServices/hooks/Ticket/useAddTicketAPI";

const useTicketListing = () => {
  const { isWebView } = useIsWebView();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );

  const {
    data: ticketListingData,
    isLoading: isTicketListingLoading,
    isError: isErrorTicketListing,
    error: errorTicketListing,
    fetchData: fetchDataTicketListing,
  } = useFetch({ url: COMPANY_TICKET_LISTING });

  const {
    data: queryTypeData,
    isLoading: isLoadingQueryType,
    isError: isErrorQueryType,
    error: errorQueryType,
    fetchData: fetchDataQueryType,
  } = useFetch({ url: COMPANY_QUERY_TYPE_TICKET });

  const {
    data: statusData,
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
    error: errorStatus,
    fetchData: fetchDataStatus,
  } = useFetch({ url: COMPANY_TICKET_STATUS });

  const {
    handleAddTicket,
    isError,
    isLoading,
    isSuccess,
    setUpdationError,
    updateAddTicketResult,
    updationError,
    updateAddTicketStatus,
  } = useAddTicket();

  const navigate = useNavigate();

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  //TODO: We use this hook when we implementing API

  const handleLoadMore = () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    fetchDataTicketListing();
  };

  const handlePageChange = (page) => {
    console.log(page, "page@");
    //TODO : we fetch data on changing page
    fetchDataTicketListing(page);
    handlePagePerChange(page);
  };

  const handleRowPerPageChange = (option) => {
    console.log(option, "page@");
    //TODO : we fetch data on row changing per page
    fetchDataTicketListing(option.value);
    handleRowsPerPageChange(option.value);
  };

  const handleSearchResults = (searchedData) => {
    //TODO: Implement searching
  };

  const onIconPress = (item) => {
    navigate(navigations.TICKETS_VIEW_EDIT, { state: item });
  };

  let headingTexts = ["readable_id"];
  let subHeadingText = ["query_type"];
  let statusText = ["status"];
  let tableIcon = images.iconTicket;
  let filterCategory = ["Status", "Query Type"];
  let isHeading = true;

  function getStatusStyle(status) {
    status = status.toLowerCase();
    switch (status) {
      case "pending":
        return {
          ...(!isWebView ? styles.pending : styles.pendingWeb),
          ...styles.cellTextStyle(12),
        };
      case "closed":
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
            {item.readable_id}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.query_type}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
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
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.assigned_to}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.created_at}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <TouchableImage
            onPress={() => {
              onIconPress(item);
            }}
            source={images.iconTicket}
            imageStyle={styles.iconTicket}
            isSvg={true}
          />
        ),
        style: {
          ...commonStyles.columnStyle("10%"),
          ...styles.iconTicketColoum,
        },
        isFillSpace: true,
      },
    ];
  };

  console.log(
    ticketListingData?.meta?.total,
    " ticketListingData?.meta?.total"
  );
  return {
    ticketListingData,
    allDataLoaded,
    // currentRecords,
    currentPage,
    getColoumConfigs,
    getStatusStyle,
    filterCategory,
    headingTexts,
    handleAddTicket,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    handleLoadMore,
    isHeading,
    indexOfFirstRecord,
    indexOfLastRecord,
    loadingMore,
    onIconPress,
    queryTypeData,
    statusData,
    rowsPerPage,
    statusText,
    subHeadingText,
    tableIcon,
    fetchDataTicketListing,
    // setCurrentRecords,
    totalcards: ticketListingData?.meta?.total,
    queryTypeUrl: COMPANY_QUERY_TYPE_TICKET,
  };
};

export default useTicketListing;
