import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "../../../routes";
import {
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import {
  DEFAULT_CATEGORY_FOR_FILTER_MODAL,
  FILTER_TYPE_ENUM,
  POSTED_JOB_LISTING_ENUM,
  ROWS_PER_PAGE_ARRAY,
} from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../PostedJobsView.styles";
import colors from "../../../assets/colors";
import { POST_JOB } from "../../../services/apiServices/apiEndPoint";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import { navigations } from "../../../constants/routeNames";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import Switch from "../../../components/Switch";
import useChangeJobStatusApi from "../../../services/apiServices/hooks/useChangeJobStatusApi";

const isMob = Platform.OS.toLowerCase() !== "web";

const initialFilterState = {
  ["selectedActive/Inactive"]: [],
  ["selectedApproved/NotApproved"]: [],
};

const usePostedJobListing = (onViewPress, onEditPress) => {
  const { isWebView } = useIsWebView();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [filterOptions, setFilterOptions] = useState({
    [POSTED_JOB_LISTING_ENUM.activeorInactive]: "",
    [POSTED_JOB_LISTING_ENUM.approvedNotApproved]: "",
    searchData: "",
  });

  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );
  const defaultCategory = DEFAULT_CATEGORY_FOR_FILTER_MODAL.PostedJobs;

  const {
    data: postedJobData,
    isLoading,
    fetchData: fetchPostedJobs,
    isError: isErrorGetPostedJob,
    error: errorGetPostedJobs,
  } = useFetch({
    url: POST_JOB,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const {
    handleUseChangeJob,
    isError: ischangeJobStatusError,
    isLoading: changeJobStatusLoading,
    isSuccess,
    errorWhileJobChange,
  } = useChangeJobStatusApi();

  const isTicketListingLoading = changeJobStatusLoading || isLoading;
  const isError = isErrorGetPostedJob || ischangeJobStatusError;
  const statusData = [
    {
      id: 1,
      name: "Active",
    },
    {
      id: 0,
      name: "InActive",
    },
  ];

  const queryTypeData = [
    {
      id: 1,
      name: "Approved",
    },
    {
      id: 0,
      name: "Not Approved",
    },
  ];
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
      name: POSTED_JOB_LISTING_ENUM.activeorInactive,
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: statusData,
      selectedOptions: filterState?.["selectedActive/Inactive"],
      handler: handleFilterChange,
    },
    {
      refKey: "id",
      name: POSTED_JOB_LISTING_ENUM.approvedNotApproved,
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: queryTypeData,
      selectedOptions: filterState?.["selectedApproved/NotApproved"],
      handler: handleFilterChange,
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
    if (ischangeJobStatusError)
      return {
        errorMessage: errorWhileJobChange,
        onRetry: () => {},
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
          status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
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
      search: filterOptions.searchData,
      perPage: rowsPerPage,
      page: page,
      status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
      approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
      status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
      approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
      search: filterOptions.searchData,
    });
  };

  const handleSearchResults = async (searchedData) => {
    setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchPostedJobs({
        queryParamsObject: {
          search: searchedData,
          status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
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
        status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
        approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
      });
    }
  };

  const returnSelectedFilterOption = (filterInfo, filterName) => {
    const filterObj = filterInfo?.find((obj) => obj.name === filterName);
    return filterObj?.selectedOptions;
  };

  const filterApplyHandler = async (filterInfo) => {
    const currentFilterOptions = {
      [POSTED_JOB_LISTING_ENUM.activeorInactive]: returnSelectedFilterOption(
        filterInfo,
        POSTED_JOB_LISTING_ENUM.activeorInactive
      ),
      [POSTED_JOB_LISTING_ENUM.approvedNotApproved]: returnSelectedFilterOption(
        filterInfo,
        POSTED_JOB_LISTING_ENUM.approvedNotApproved
      ),
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
      const newData = await fetchPostedJobs({
        queryParamsObject: {
          search: filterOptions.searchData,
          status:
            currentFilterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          approved:
            currentFilterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
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
        search: filterOptions.searchData,
        status: currentFilterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
        approved:
          currentFilterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  let headingTexts = ["job_id"];
  let subHeadingText = ["designation"];
  let statusText = ["status"];
  let tableIcon = images.iconMore;
  let filterCategory = [
    POSTED_JOB_LISTING_ENUM.activeorInactive,
    "Approved/Not Approved",
  ];
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
          <>
            {isHeading ? (
              <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                {item?.job_id ?? "-"}
              </CommonText>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigate(
                    `/${selectedModule.key}/${navigations.POSTED_JOBS}/${item.id}?mode=view&activeTab=0`
                  );
                }}
                style={styles.cursorStyle}
              >
                <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                  {item?.job_id ?? "-"}
                </CommonText>
              </TouchableOpacity>
            )}
          </>
        ),
        style: {
          ...commonStyles.columnStyle("16%"),
          ...styles.justifyContentCenter,
        }, // isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.designation ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("14%"),
          ...styles.justifyContentCenter,
        }, // isFillSpace: true,
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
                {item?.number_of_applications ?? "-"}
              </CommonText>
            ) : (
              <CustomTouchableOpacity
                onPress={() => {
                  navigate(
                    `/${selectedModule.key}/${navigations.POSTED_JOBS}/${item.id}?mode=view&activeTab=1`
                  );
                }}
                style={styles.underLineStyle}
              >
                <CommonText
                  customTextStyle={{
                    ...tableStyle,
                    ...(!isHeading && { color: colors.darkBlue }),
                  }}
                  fontWeight={!isHeading && 600}
                >
                  {item?.number_of_applications ?? "-"}
                </CommonText>
              </CustomTouchableOpacity>
            )}
          </>
        ),
        style: {
          ...commonStyles.columnStyle("13%"),
          ...styles.justifyContentCenter,
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
                {item?.number_of_interviews ?? "-"}
              </CommonText>
            ) : (
              <CustomTouchableOpacity
                onPress={() => {
                  navigate(
                    `/${selectedModule.key}/${navigations.POSTED_JOBS}/${item.id}?mode=view&activeTab=2`,
                    {
                      replace: true,
                    }
                  );
                }}
                style={styles.underLineStyle}
              >
                <CommonText
                  customTextStyle={{
                    ...tableStyle,
                    ...(!isHeading && { color: colors.darkBlue }),
                  }}
                  fontWeight={!isHeading && 600}
                >
                  {item?.number_of_interviews ?? "-"}
                </CommonText>
              </CustomTouchableOpacity>
            )}
          </>
        ),
        style: {
          ...commonStyles.columnStyle("13%"),
          ...styles.justifyContentCenter,
        },
      },

      {
        content: (
          <View style={styles.statusStyle}>
            {isHeading ? (
              <CommonText
                customTextStyle={{
                  ...tableStyle,
                }}
              >
                {item?.status ?? "-"}
              </CommonText>
            ) : (
              <Switch
                disabled={changeJobStatusLoading}
                isToggled={item.status == 1}
                onChange={() => {
                  handleUseChangeJob(item.id);
                  let temp = currentRecords.map((items) => {
                    if (items.id === item.id) {
                      return { ...items, status: item.status == 0 ? 1 : 0 };
                    }
                    return items;
                  });
                  setCurrentRecords(temp);
                }}
              />
            )}
          </View>
        ),
        style: {
          ...commonStyles.columnStyle("14%"),
          ...styles.justifyContentCenter,
        },
      },

      {
        content: (
          <View>
            {isHeading ? (
              <CommonText customTextStyle={tableStyle}>
                {item?.approve ?? "-"}
              </CommonText>
            ) : (
              <CommonText customTextStyle={tableStyle}>
                {item?.approve == 1
                  ? queryTypeData[0].name
                  : queryTypeData[1].name ?? "-"}
              </CommonText>
            )}
          </View>
        ),
        style: {
          ...commonStyles.columnStyle("15%"),
          ...styles.justifyContentCenter,
        }, // isFillSpace: true,
      },
      {
        content: (
          <View>
            {!isHeading && (
              <TouchableImage
                onPress={() => {
                  onViewPress && onViewPress(item);
                }}
                source={images.iconView}
              />
            )}
          </View>
        ),
        style: {
          ...commonStyles.columnStyle("5%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <View>
            {!isHeading && (
              <TouchableImage
                onPress={() => {
                  onEditPress && onEditPress(item);
                }}
                source={images.iconEdit}
              />
            )}
          </View>
        ),
        style: {
          ...commonStyles.columnStyle("5%"),
          ...styles.justifyContentCenter,
        },
      },
    ];
  };

  return {
    allDataLoaded,
    currentPage,
    customFilterInfo,
    defaultCategory,
    fetchPostedJobs,
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
    changeJobStatusLoading,
    isFirstPageReceived,
    loadingMore,
    queryTypeData,
    rowsPerPage,
    statusData,
    statusText,
    setFilterState,
    subHeadingText,
    tableIcon,
    postedJobData: currentRecords,
    totalcards: postedJobData?.meta?.total,
    initialFilterState,
  };
};

export default usePostedJobListing;
