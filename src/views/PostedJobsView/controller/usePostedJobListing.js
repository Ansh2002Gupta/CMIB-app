import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";
import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  COMPANY_QUERY_TYPE_TICKET,
  GET_POSTED_JOBS,
} from "../../../services/apiServices/apiEndPoint";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import useAddTicket from "../../../services/apiServices/hooks/Ticket/useAddTicketAPI";
import images from "../../../images";
import { navigations } from "../../../constants/routeNames";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../PostedJobsView.styles";
import colors from "../../../assets/colors";

const isMob = Platform.OS.toLowerCase() !== "web";

const usePostedJobListing = () => {
  const { isWebView } = useIsWebView();
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    activeorInctive: "",
    approvedorNot: "",
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
    data: postedJobData,
    isLoading: isTicketListingLoading,
    fetchData: fetchPostedJobs,
  } = useFetch({
    url: GET_POSTED_JOBS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { handleAddTicket } = useAddTicket();

  //   const { data: queryTypeData } = useFetch({ url: COMPANY_QUERY_TYPE_TICKET });
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

  //   const { data: statusData } = useFetch({ url: COMPANY_TICKET_STATUS });
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
        queryParamsObject: { perPage: rowsPerPage, page: nextPage },
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
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
    });
  };

  const handleSearchResults = async (searchedData) => {
    await updateCurrentRecords({
      search: searchedData,
      perPage: rowsPerPage,
      page: currentPage,
      status: filterOptions.activeorInctive,
      queryType: filterOptions.query_type,
    });
  };

  const onIconPress = (item) => {
    navigate(navigations.TICKETS_VIEW_EDIT, {
      state: item,
    });
  };

  const handleSaveAddTicket = async (queryType, enterQuery) => {
    // await handleAddTicket({ query_type: queryType, query: enterQuery });
    // if (isMob) {
    //   const newData = await fetchPostedJobs();
    //   if (newData && newData.records.length > 0) {
    //     setCurrentRecords((prevRecords) => [
    //       ...prevRecords,
    //       ...newData.records,
    //     ]);
    //   }
    // } else {
    //   await updateCurrentRecords({
    //     perPage: rowsPerPage,
    //     page: currentPage,
    //   });
    // }
  };

  const filterApplyHandler = async ({ selectedStatus, selectedQueryType }) => {
    setFilterOptions({
      activeorInctive: selectedStatus,
      query_type: selectedQueryType,
    });
    await updateCurrentRecords({
      status: selectedStatus,
      queryType: selectedQueryType,
      perPage: rowsPerPage,
      page: currentPage,
    });
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
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item.job_id}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("16%"),
          ...styles.justifyContentCenter,
        }, // isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.designation}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("14%"),
          ...styles.justifyContentCenter,
        }, // isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
              ...(!isHeading && { color: colors.darkBlue }),
            }}
            isunderLine={!isHeading}
            fontWeight={!isHeading && 600}
            underLineStyle={styles.underLineStyle}
          >
            {item.number_of_applications ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("13%"),
          ...styles.justifyContentCenter,
        },
      },

      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
              ...(!isHeading && { color: colors.darkBlue }),
            }}
            isunderLine={!isHeading}
            fontWeight={!isHeading && 600}
            underLineStyle={styles.underLineStyle}
          >
            {item?.number_of_interviews ?? "-"}
          </CommonText>
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
                {item.status}
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
                {item.approve}
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
                  // onIconPress && onIconPress(item);
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
                  console.log("i am presed");
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
    handleSaveAddTicket,
    headingTexts,
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
    statusData,
    statusText,
    subHeadingText,
    tableIcon,
    postedJobData: currentRecords,
    totalcards: postedJobData?.meta?.total,
  };
};

export default usePostedJobListing;
