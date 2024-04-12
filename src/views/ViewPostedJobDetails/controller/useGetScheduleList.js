import React, { useEffect, useState } from "react";
import { useSearchParams } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";
import CommonText from "../../../components/CommonText";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import {
  DEFAULT_CATEGORY_FOR_FILTER_MODAL,
  FILTER_TYPE_ENUM,
  JOB_STATUS_RESPONSE_CODE,
  ROWS_PER_PAGE_ARRAY,
} from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../ViewPostedJobDetails.styles";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import dayjs from "dayjs";
import { useIntl } from "react-intl";
import useChangeApplicantStatusApi from "../../../services/apiServices/hooks/useChangeApplicantStatusApi";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";

const isMob = Platform.OS.toLowerCase() !== "web";

const initialFilterState = {
  selectedDate: [],
};

const useGetScheduleList = (id, onClickAction) => {
  const { isWebView } = useIsWebView();
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const defaultCategory = DEFAULT_CATEGORY_FOR_FILTER_MODAL.GetSchedule;
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const intl = useIntl();

  const [filterOptions, setFilterOptions] = useState({
    status: "",
    date: "",
    searchData: "",
  });
  const [filterState, setFilterState] = useState(initialFilterState);
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );

  const {
    data: scheduleInterviewData,
    isLoading: isScheduleInterviewLoading,
    fetchData: fetchScheduleInterviews,
    isError: isErrorGetScheduleInterview,
    error: errorGetPostedJobs,
  } = useFetch({
    url: `company/jobs/${id}/schedule-interview`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const {
    handleUseApplicantStatus,
    isLoading,
    isError: isErrorApplicantStatusChange,
    errorWhileApplicantStatusChange,
  } = useChangeApplicantStatusApi();

  const statusData = [];

  const queryTypeData = [];
  const getErrorDetails = () => {
    if (isErrorGetScheduleInterview) {
      let errorMessage = "";
      if (errorGetPostedJobs === GENERIC_GET_API_FAILED_ERROR_MESSAGE) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorGetPostedJobs?.data?.message}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchScheduleInterviews({});
        },
      };
    }
    if (isErrorGetScheduleInterview)
      return {
        errorMessage: errorGetPostedJobs?.data?.message,
        onRetry: () => fetchScheduleInterviews({}),
      };
    if (isErrorApplicantStatusChange)
      return {
        errorMessage: errorWhileApplicantStatusChange,
        onRetry: () => {},
      };
  };
  const isTicketListingLoading = isLoading || isScheduleInterviewLoading;
  const isError = isErrorGetScheduleInterview || isErrorApplicantStatusChange;

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
      const initialData = await fetchScheduleInterviews({
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

  const handleFilterChange = (selectedFilter, filterName, keyName) => {
    setFilterState((prevState) => {
      const filterObj = customFilterInfo.find(
        (info) => info.name === filterName
      );
      const filterKey = `selected${filterObj?.name}`;
      const existingSelectedOptions = prevState[filterKey];
      let newSelectedOptions = [];
      if (!!existingSelectedOptions) {
        if (filterObj?.type === FILTER_TYPE_ENUM.CHECKBOX) {
          newSelectedOptions = existingSelectedOptions?.includes(
            selectedFilter?.[keyName]
          )
            ? existingSelectedOptions?.filter((item) => {
                return item !== selectedFilter?.[keyName];
              })
            : [...existingSelectedOptions, selectedFilter?.[keyName]];
        } else {
          newSelectedOptions = selectedFilter.value;
        }
      }

      return {
        ...prevState,
        [filterKey]: newSelectedOptions,
      };
    });
  };

  const customFilterInfo = [
    {
      refKey: "id",
      name: "Date",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: statusData,
      selectedOptions: filterState?.selectedDate,
      handler: handleFilterChange,
    },
  ];

  const updateCurrentRecords = async (params) => {
    const newData = await fetchScheduleInterviews({
      queryParamsObject: params,
    });
    setCurrentRecords(newData.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchScheduleInterviews({
        queryParamsObject: {
          perPage: rowsPerPage,
          page: nextPage,
          status: filterOptions.status,
          date: filterOptions.date,
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
      date: filterOptions.date,
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
      status: filterOptions.status,
      date: filterOptions.date,
    });
  };

  const handleSearchResults = async (searchedData) => {
    setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchScheduleInterviews({
        queryParamsObject: {
          search: searchedData,
          status: filterOptions.status,
          date: filterOptions.date,
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
        status: filterOptions.status,
        date: filterOptions.date,
      });
    }
  };

  const returnSelectedFilterOption = (filterInfo, filterName) => {
    const filterObj = filterInfo?.find((obj) => obj.name === filterName);
    return filterObj?.selectedOptions;
  };

  const filterApplyHandler = async (filterInfo) => {
    const currentFilterOptions = {
      date: returnSelectedFilterOption(filterInfo, "Date"),
    };
    setFilterOptions((prev) => {
      return {
        ...prev,
        ...currentFilterOptions,
      };
    });
    if (isMob) {
      setLoadingMore(false);
      setCurrentPage(1);
      const newData = await fetchScheduleInterviews({
        queryParamsObject: {
          date: currentFilterOptions.date,
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
        date: currentFilterOptions.date,
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  const onDateSorting = async (sortField) => {
    //TODO: required in future.
    // setIsAscendingOrder((prev) => !prev);
    // await updateCurrentRecords({
    //   perPage: rowsPerPage,
    //   page: currentPage,
    //   sortField: sortField,
    //   sortDirection: !isAscendingOrder ? "asc" : "desc",
    // });
  };

  const onNameSorting = async (sortField) => {
    setIsAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortField: sortField,
      sortDirection: !isAscendingOrder ? "asc" : "desc",
    });
  };

  let headingTexts = ["name"];
  let subHeadingText = ["applicant_id"];
  let statusText = ["status"];
  let tableIcon = images.iconMore;
  let filterCategory = ["Date"];
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
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  function convertDateFormat(dateStr) {
    return dateStr.split(".").join("/");
  }

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    const optionArray = [
      intl.formatMessage({ id: "label.view_interview_details" }),
      intl.formatMessage({ id: "label.edit_interview_details" }),
    ];
    if (
      item.is_primary_schedule_accepted ||
      item.is_alternate_schedule_accepted
    ) {
      optionArray.push(intl.formatMessage({ id: "label.offer_job" }));
    }
    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {item?.name ?? "-"}
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
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.name ?? "-"}
          </CommonText>
        ),

        style: {
          ...commonStyles.columnStyle("25%"),
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
          ...commonStyles.columnStyle("25%"),
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
          <>
            {isHeading ? (
              <CommonText
                customTextStyle={{
                  ...tableStyle,
                }}
              >
                {item?.primary_interview_date ?? "-"}
              </CommonText>
            ) : (
              <CommonText
                customTextStyle={{
                  ...tableStyle,
                }}
              >
                {item?.primary_interview_date
                  ? convertDateFormat(item?.primary_interview_date)
                  : "-"}
              </CommonText>
            )}
          </>
        ),
        style: {
          ...commonStyles.columnStyle("15%"),
          ...styles.justifyContentCenter,
          ...{ paddingLeft: 5, paddingRight: 5 },
        },
      },
      {
        content: (
          <>
            {isHeading ? (
              <CommonText
                customTextStyle={{
                  ...tableStyle,
                }}
              >
                {item?.primary_interview_time ?? "-"}
              </CommonText>
            ) : (
              <CommonText
                customTextStyle={{
                  ...tableStyle,
                }}
              >
                {item?.primary_interview_time
                  ? tConvert(item?.primary_interview_time)
                  : "-"}
              </CommonText>
            )}
          </>
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
                message={optionArray}
                onPopupClick={(selectedItem) => {
                  if (
                    selectedItem ===
                    intl.formatMessage({ id: "label.offer_job" })
                  ) {
                    const request = {
                      status: JOB_STATUS_RESPONSE_CODE[selectedItem],
                    };
                    handleUseApplicantStatus(item.id, request);
                  } else {
                    onClickAction(selectedItem, item);
                  }
                }}
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
    customFilterInfo,
    defaultCategory,
    fetchScheduleInterviews,
    filterApplyHandler,
    filterCategory,
    filterState,
    getColoumConfigs,
    getStatusStyle,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    getErrorDetails,
    isError,
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isTicketListingLoading,
    isFirstPageReceived,
    loadingMore,
    queryTypeData,
    rowsPerPage,

    setFilterState,
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    scheduleInterviewData: currentRecords,
    totalcards: scheduleInterviewData?.meta?.total,
  };
};

export default useGetScheduleList;
