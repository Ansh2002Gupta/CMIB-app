import React, { useEffect, useState } from "react";
import { Platform, View } from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import TouchableImage from "../../../components/TouchableImage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import usePagination from "../../../hooks/usePagination";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { urlService } from "../../../services/urlService";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { POST_JOB } from "../../../services/apiServices/apiEndPoint";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import colors from "../../../assets/colors";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../ViewPostedJobDetails.styles";

const isMob = Platform.OS.toLowerCase() !== "web";

const useGetScheduleList = (id) => {
  const { isWebView } = useIsWebView();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    activeorInctive: "",
    approvedorNot: "",
    searchData: "",
  });
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(urlService.getQueryStringValue("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(urlService.getQueryStringValue("page"))
  );

  const {
    data: postedJobData,
    isLoading: isTicketListingLoading,
    fetchData: fetchPostedJobs,
    isError: isErrorGetPostedJob,
    error: errorGetPostedJobs,
  } = useFetch({
    url: `company/jobs/${id}/schedule-interview`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const statusData = [];

  const queryTypeData = [
    {
      id: 1,
      name: "Active",
    },
    {
      id: 2,
      name: "InActive",
    },
  ];
  const getErrorDetails = () => {
    if (isErrorGetPostedJob) {
      let errorMessage = "";
      if (errorGetPostedJobs === GENERIC_GET_API_FAILED_ERROR_MESSAGE) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorGetPostedJobs?.data?.message}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchPostedJobs({});
        },
      };
    }
    if (isErrorGetPostedJob)
      return {
        errorMessage: errorGetPostedJobs?.data?.message,
        onRetry: () => fetchPostedJobs({}),
      };
  };

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        perPage: rowsPerPage,
        page: currentPage,
      };
      const initialData = await fetchPostedJobs({
        queryParamsObject: requestedParams,
      });
      if (initialData && initialData?.records?.length > 0) {
        setCurrentRecords(initialData?.records);
      }
      setIsFirstPageReceived(false);
    };

    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    const newData = await fetchPostedJobs({
      queryParamsObject: params,
    });
    setCurrentRecords(newData.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchPostedJobs({
        queryParamsObject: {
          perPage: rowsPerPage,
          page: nextPage,
          status: filterOptions.activeorInctive,
          queryType: filterOptions.approvedorNot,
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
    // handlePagePerChange(page);
    // await updateCurrentRecords({
    //   perPage: rowsPerPage,
    //   page: page,
    //   status: filterOptions.activeorInctive,
    //   queryType: filterOptions.approvedorNot,
    // });
  };

  const handleRowPerPageChange = async (option) => {
    // handleRowsPerPageChange(option.value);
    // await updateCurrentRecords({
    //   perPage: option.value,
    //   page: currentPage,
    //   status: filterOptions.activeorInctive,
    //   queryType: filterOptions.approvedorNot,
    // });
  };

  const handleSearchResults = async (searchedData) => {
    setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchPostedJobs({
        queryParamsObject: {
          search: searchedData,
          status: filterOptions.activeorInctive,
          queryType: filterOptions.approvedorNot,
        },
      });
      setCurrentRecords(newData?.records);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      } else {
        setAllDataLoaded(false);
      }
    } else {
      await updateCurrentRecords({
        search: searchedData,
        perPage: rowsPerPage,
        page: currentPage,
        status: filterOptions.activeorInctive,
        queryType: filterOptions.approvedorNot,
      });
    }
  };

  const filterApplyHandler = async ({ selectedStatus, selectedQueryType }) => {
    setFilterOptions((prev) => ({
      ...prev,
      query_type: selectedQueryType,
    }));
    if (isMob) {
      setLoadingMore(false);
      setCurrentPage(1);
      const newData = await fetchPostedJobs({
        queryParamsObject: {
          search: filterOptions.searchData,
          status: selectedStatus,
          queryType: selectedQueryType,
        },
      });
      setCurrentRecords(newData?.records);
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
    // setIsAscendingOrder((prev) => !prev);
    // await updateCurrentRecords({
    //   perPage: rowsPerPage,
    //   page: currentPage,
    //   sortField: sortField,
    //   sortDirection: !isAscendingOrder ? "asc" : "desc",
    // });
  };

  let headingTexts = ["name"];
  let subHeadingText = ["applicant_id"];
  let statusText = ["status"];
  let tableIcon = images.iconMore;
  let filterCategory = ["Date", "Status"];
  let isHeading = true;

  function getStatusStyle(status) {
    switch (status) {
      case 0:
        return {
          ...(!isWebView ? styles.pending : styles.pendingWeb),
          ...(!isWebView ? styles.cellTextStyle(14) : styles.cellTextStyle(12)),
        };
      case 1:
        return {
          ...(!isWebView ? styles.close : styles.closeWeb),
          ...(!isWebView ? styles.cellTextStyle(14) : styles.cellTextStyle(12)),
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
            {item?.name ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("18%"),
          ...styles.justifyContentCenter,
          ...{ paddingLeft: 24, paddingRight: 5 },
        }, // isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.applicant_id ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("17%"),
          ...styles.justifyContentCenter,
          ...{ paddingLeft: 5, paddingRight: 5 },
        }, // isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
            }}
          >
            {item?.status ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("13%"),
          ...styles.justifyContentCenter,
          ...{ paddingLeft: 5, paddingRight: 5 },
        },
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
            }}
          >
            {item?.type ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("15%"),
          ...styles.justifyContentCenter,
          ...{ paddingLeft: 5, paddingRight: 5 },
        },
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
            }}
          >
            {item?.primary_interview_date ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("15%"),
          ...styles.justifyContentCenter,
          ...{ paddingLeft: 5, paddingRight: 5 },
        },
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
            }}
          >
            {item?.primary_interview_time ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("16%"),
          ...styles.justifyContentCenter,
          ...{ paddingLeft: 5, paddingRight: 5 },
        },
      },

      {
        content: (
          <View>
            {!isHeading && (
              <PopupMessage
                message={["Download Profile and Resume", "View Details"]}
              />
            )}
          </View>
        ),
        style: {
          ...commonStyles.columnStyle("15%"),
          ...styles.justifyContentCenter,
          ...{ paddingLeft: 5, paddingRight: 25 },
        },
      },
    ];
  };

  return {
    allDataLoaded,
    currentPage,
    fetchPostedJobs,
    filterApplyHandler,
    filterCategory,
    getColoumConfigs,
    getStatusStyle,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    getErrorDetails,
    isErrorGetPostedJob,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isTicketListingLoading,
    isFirstPageReceived,
    loadingMore,
    queryTypeData,
    rowsPerPage,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    postedJobData: currentRecords,
    totalcards: postedJobData?.meta?.total,
  };
};

export default useGetScheduleList;
