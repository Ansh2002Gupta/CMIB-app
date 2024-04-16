import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  COMPANY_TICKET_LISTING,
  COMPANY_QUERY_TYPE_TICKET,
  COMPANY_TICKET_STATUS,
} from "../../../services/apiServices/apiEndPoint";
import { formatDate } from "../../../utils/util";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import useAddTicket from "../../../services/apiServices/hooks/Ticket/useAddTicketAPI";
import images from "../../../images";
import { navigations } from "../../../constants/routeNames";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../TicketsListing.style";

const isMob = Platform.OS.toLowerCase() !== "web";

const useTicketListing = () => {
  const { isWebView } = useIsWebView();
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: "",
    query_type: "",
    searchData: "",
  });
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );

  const navigate = useNavigate();

  const {
    data: ticketListingData,
    isLoading: isTicketListingLoading,
    fetchData: fetchDataTicketListing,
    isError: isErrorTicketListing,
    error: errorTicketListing,
  } = useFetch({
    url: COMPANY_TICKET_LISTING,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { handleAddTicket, updationError, setUpdationError } = useAddTicket();

  const {
    data: queryTypeData,
    fetchData: fetchQueryType,
    isError: isErrorQueryType,
    error: errorQueryType,
  } = useFetch({ url: COMPANY_QUERY_TYPE_TICKET });

  const {
    data: statusData,
    fetchData: fetchStatus,
    isError: isErrorStatus,
    error: errorStatus,
  } = useFetch({
    url: COMPANY_TICKET_STATUS,
  });

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  const isError = isErrorTicketListing || isErrorStatus || isErrorQueryType;

  const getErrorDetails = () => {
    if (isErrorTicketListing && isErrorStatus && isErrorQueryType) {
      let errorMessage = "";
      if (
        errorTicketListing === GENERIC_GET_API_FAILED_ERROR_MESSAGE &&
        errorStatus === GENERIC_GET_API_FAILED_ERROR_MESSAGE &&
        errorQueryType === GENERIC_GET_API_FAILED_ERROR_MESSAGE
      ) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorTicketListing?.data?.message} , ${errorStatus?.data?.message}, ${errorQueryType?.data?.message}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchDataTicketListing({});
          fetchQueryType();
          fetchStatus();
        },
      };
    }
    if (isErrorTicketListing)
      return {
        errorMessage: errorTicketListing?.data?.message,
        onRetry: () => fetchDataTicketListing({}),
      };
    if (isErrorStatus)
      return {
        errorMessage: errorStatus?.data?.message,
        onRetry: () => fetchStatus(),
      };
    if (isErrorQueryType)
      return {
        errorMessage: errorQueryType?.data?.message,
        onRetry: () => fetchQueryType(),
      };

    return {
      errorMessage: "",
      onRetry: () => {},
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        perPage: rowsPerPage,
        page: currentPage,
      };
      const initialData = await fetchDataTicketListing({
        queryParamsObject: requestedParams,
      });
      if (initialData && initialData?.records?.length > 0) {
        setCurrentRecords(initialData?.records);
        if (initialData?.records?.length < rowsPerPage && isMob) {
          setAllDataLoaded(true);
        }
      }
      setIsFirstPageReceived(false);
    };

    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    const newData = await fetchDataTicketListing({
      queryParamsObject: params,
    });
    setCurrentRecords(newData?.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchDataTicketListing({
        queryParamsObject: {
          perPage: rowsPerPage,
          page: nextPage,
          status: filterOptions.status,
          queryType: filterOptions.query_type,
        },
      });
      if (newData && newData?.records?.length > 0) {
        setCurrentRecords((prevRecords) => [
          ...prevRecords,
          ...newData.records,
        ]);
      }
      setCurrentPage(nextPage);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      }
    } catch (error) {
      console.error("Error fetching tickets on load more:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handlePageChange = async (page) => {
    handlePagePerChange(page);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: page,
      status: filterOptions.status,
      queryType: filterOptions.query_type,
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
      status: filterOptions.status,
      queryType: filterOptions.query_type,
    });
  };

  const handleSearchResults = async (searchedData) => {
    setIsFirstPageReceived(true);
    setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchDataTicketListing({
        queryParamsObject: {
          q: searchedData,
          status: filterOptions.status,
          queryType: filterOptions.query_type,
        },
      });
      setIsFirstPageReceived(false);
      setCurrentRecords(newData?.records);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      } else {
        setAllDataLoaded(false);
      }
    } else {
      await updateCurrentRecords({
        q: searchedData,
        perPage: rowsPerPage,
        page: currentPage,
        status: filterOptions.status,
        queryType: filterOptions.query_type,
      });
    }
  };

  const onIconPress = (item) => {
    navigate(navigations.TICKETS_VIEW_EDIT, {
      state: item,
    });
  };

  const handleSaveAddTicket = async (queryType, enterQuery) => {
    setIsFirstPageReceived(true);
    handleAddTicket({
      payload: {
        query_type: queryType,
        query: enterQuery,
      },
      onSuccessCallback: async () => {
        if (isMob) {
          setCurrentPage(1);
          const newData = await fetchDataTicketListing({
            queryParamsObject: {
              status: filterOptions.status,
              queryType: filterOptions.query_type,
              perPage: rowsPerPage,
              page: 1,
            },
          });
          if (newData && newData?.records.length > 0) {
            setCurrentRecords(newData?.records);
            setIsFirstPageReceived(false);
          }
          if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
            setAllDataLoaded(true);
          } else {
            setAllDataLoaded(false);
          }
        } else {
          await updateCurrentRecords({
            perPage: rowsPerPage,
            page: currentPage,
          });
        }
      },
    });
  };

  const filterApplyHandler = async ({ selectedStatus, selectedQueryType }) => {
    setIsFirstPageReceived(true);
    setFilterOptions((prev) => ({
      ...prev,
      status: selectedStatus,
      query_type: selectedQueryType,
    }));
    if (isMob) {
      setLoadingMore(false);
      setCurrentPage(1);
      const newData = await fetchDataTicketListing({
        queryParamsObject: {
          q: filterOptions.searchData,
          status: selectedStatus,
          queryType: selectedQueryType,
        },
      });
      setCurrentRecords(newData?.records);
      setIsFirstPageReceived(false);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      } else {
        setAllDataLoaded(false);
      }
    } else {
      await updateCurrentRecords({
        status: selectedStatus,
        queryType: selectedQueryType,
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  const onDateSorting = async (sortField) => {
    setIsAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortField: sortField,
      sortDirection: !isAscendingOrder ? "asc" : "desc",
    });
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
      case "in-progress":
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
            {item?.assigned_to?.name || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onDateSorting("created_at")}>
            <CommonText customTextStyle={tableStyle}>
              {item.created_at}
            </CommonText>
            <CustomImage
              source={
                isAscendingOrder
                  ? images.iconArrowUpSorting
                  : images.iconArrowDownSorting
              }
              style={styles.sortingIcon}
            />
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {formatDate(item.created_at)}
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

  return {
    allDataLoaded,
    currentPage,
    fetchDataTicketListing,
    filterApplyHandler,
    filterCategory,
    getColoumConfigs,
    getStatusStyle,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    handleSaveAddTicket,
    headingTexts,
    getErrorDetails,
    isError,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isTicketListingLoading,
    isFirstPageReceived,
    loadingMore,
    onIconPress,
    queryTypeData,
    queryTypeUrl: COMPANY_QUERY_TYPE_TICKET,
    rowsPerPage,
    setUpdationError,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    ticketListingData: currentRecords,
    totalcards: ticketListingData?.meta?.total,
    updationError,
  };
};

export default useTicketListing;
