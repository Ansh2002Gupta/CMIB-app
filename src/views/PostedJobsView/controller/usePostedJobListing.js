import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";
import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
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

const isMob = Platform.OS.toLowerCase() !== "web";

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
  const [filterOptions, setFilterOptions] = useState({
    activeorInctive: "",
    approvedorNot: "",
    searchData: "",
  });
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );

  const {
    data: postedJobData,
    isLoading: isTicketListingLoading,
    fetchData: fetchPostedJobs,
    isError: isErrorGetPostedJob,
    error: errorGetPostedJobs,
  } = useFetch({
    url: POST_JOB,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const statusData = [
    {
      id: 1,
      name: "Active",
    },
    {
      id: 2,
      name: "InActive",
    },
  ];

  const queryTypeData = [
    {
      id: 1,
      name: "Approved",
    },
    {
      id: 2,
      name: "Not Approved",
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
          approved: filterOptions.approvedorNot,
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
      status: filterOptions.activeorInctive,
      approved: filterOptions.approvedorNot,
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
      status: filterOptions.activeorInctive,
      approved: filterOptions.approvedorNot,
    });
  };

  const handleSearchResults = async (searchedData) => {
    setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchPostedJobs({
        queryParamsObject: {
          search: searchedData,
          status: filterOptions.activeorInctive,
          approved: filterOptions.approvedorNot,
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
        approved: filterOptions.approvedorNot,
      });
    }
  };

  const filterApplyHandler = async ({ selectedStatus, selectedQueryType }) => {
    const temporaryArray = selectedQueryType
      ? selectedQueryType.map((item) => {
          return item - 1;
        })
      : "";
    setFilterOptions((prev) => ({
      ...prev,
      query_type: temporaryArray,
    }));
    if (isMob) {
      setLoadingMore(false);
      setCurrentPage(1);
      const newData = await fetchPostedJobs({
        queryParamsObject: {
          search: filterOptions.searchData,
          status: selectedStatus,
          approved: temporaryArray,
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
        approved: temporaryArray,
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  let headingTexts = ["job_id"];
  let subHeadingText = ["designation"];
  let statusText = ["status"];
  let tableIcon = images.iconMore;
  let filterCategory = ["Active/Inactive", "Approved/Not Approved"];
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
              <CustomTouchableOpacity
                onPress={() => {
                  navigate(navigations.JOB_PROFILE);
                }}
              >
                <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                  {item?.job_id ?? "-"}
                </CommonText>
              </CustomTouchableOpacity>
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
                    `/${selectedModule.key}/${navigations.POSTED_JOBS}/${item.id}?mode=view&activeTab=2`
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
              <Chip
                label={
                  item.status == 1 ? statusData[0].name : statusData[1].name
                }
                style={{
                  ...getStatusStyle(item.status),
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
                {item?.approve == 0
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
                source={images.iconEye}
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

export default usePostedJobListing;
