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
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../ViewPostedJobDetails.styles";
import colors from "../../../assets/colors";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import { items } from "../../../constants/sideBarHelpers";

const isMob = Platform.OS.toLowerCase() !== "web";

const useGetApplicantList = () => {
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
    data: x,
    isLoading: isTicketListingLoading,
    fetchData: fetchDataTicketListing,
  } = useFetch({
    url: "company/jobs/175/applicants",
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const postedJobData = [
    {
      id: 22,
      name: "User382067",
      applicant_id: "APP20240321_1_22",
      status: "Shortlisted",
      actions: [
        "Download Profile and Resume",
        "View Details",
        "Schedule Interview",
      ],
    },
    {
      id: 23,
      name: "User827698",
      applicant_id: "APP20240321_1_23",
      status: "Pending",
      actions: [
        "Download Profile and Resume",
        "View Details",
        "Shortlist Candidate",
        "Reject Candidate",
      ],
    },
    {
      id: 25,
      name: "User248863",
      applicant_id: null,
      status: "Pending",
      actions: [
        "Download Profile and Resume",
        "View Details",
        "Shortlist Candidate",
        "Reject Candidate",
      ],
    },
    {
      id: 27,
      name: "User328148",
      applicant_id: null,
      status: "Rejected",
      actions: ["Download Profile and Resume", "View Details"],
    },
  ];

  //   const { handleAddTicket } = useAddTicket();

  const { data: queryTypeData } = useFetch({ url: COMPANY_QUERY_TYPE_TICKET });

  const { data: statusData } = useFetch({ url: COMPANY_TICKET_STATUS });

  //   const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
  //     shouldSetQueryParamsOnMount: true,
  //     setCurrentPage,
  //     setRowPerPage,
  //   });

  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        perPage: rowsPerPage,
        page: currentPage,
      };
      const initialData = await fetchDataTicketListing({
        queryParamsObject: requestedParams,
      });
      setCurrentRecords(postedJobData);
      if (initialData && initialData?.records?.length > 0) {
        setCurrentRecords(postedJobData);
      }
      setIsFirstPageReceived(false);
    };

    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    // const newData = await fetchDataTicketListing({
    //   queryParamsObject: params,
    // });
    // setCurrentRecords(newData?.records);
  };

  const handleLoadMore = async () => {
    //   if (loadingMore || allDataLoaded) return;
    //   setLoadingMore(true);
    //   const nextPage = currentPage + 1;
    //   try {
    //     const newData = await fetchDataTicketListing({
    //       queryParamsObject: { perPage: rowsPerPage, page: nextPage },
    //     });
    //     if (newData && newData?.records?.length > 0) {
    //       setCurrentRecords((prevRecords) => [
    //         ...prevRecords,
    //         ...newData.records,
    //       ]);
    //     }
    //     setCurrentPage(nextPage);
    //     if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
    //       setAllDataLoaded(true);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching tickets on load more:", error);
    //   } finally {
    //     setLoadingMore(false);
    //   }
  };

  const handlePageChange = async (page) => {
    // handlePagePerChange(page);
    // await updateCurrentRecords({
    //   perPage: rowsPerPage,
    //   page: page,
    // });
  };

  const handleRowPerPageChange = async (option) => {
    // handleRowsPerPageChange(option.value);
    // await updateCurrentRecords({
    //   perPage: option.value,
    //   page: currentPage,
    // });
  };

  const handleSearchResults = async (searchedData) => {
    // await updateCurrentRecords({
    //   q: searchedData,
    //   perPage: rowsPerPage,
    //   page: currentPage,
    //   status: filterOptions.status,
    //   queryType: filterOptions.query_type,
    // });
  };

  const onIconPress = (item) => {
    // navigate(navigations.TICKETS_VIEW_EDIT, {
    //   state: item,
    // });
  };

  const handleSaveAddTicket = async (queryType, enterQuery) => {
    // await handleAddTicket({ query_type: queryType, query: enterQuery });
    // if (isMob) {
    //   const newData = await fetchDataTicketListing();
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
    // setFilterOptions({ status: selectedStatus, query_type: selectedQueryType });
    // await updateCurrentRecords({
    //   status: selectedStatus,
    //   queryType: selectedQueryType,
    //   perPage: rowsPerPage,
    //   page: currentPage,
    // });
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
  let tableIcon = images.iconTicket;
  let filterCategory = ["Active/Inactive", "Approved/Not Approved"];
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
    console.log("item", item);
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
          ...commonStyles.columnStyle("40%"),
          ...styles.justifyContentCenter,
        }, // isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.applicant_id ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("33%"),
          ...styles.justifyContentCenter,
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
          ...commonStyles.columnStyle("20%"),
          ...styles.justifyContentCenter,
        },
      },

      {
        content: (
          <View>{!isHeading && <PopupMessage message={item?.actions} />}</View>
        ),
        style: {
          ...commonStyles.columnStyle("20%"),
          ...styles.justifyContentCenter,
        },
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
    headingTexts,
    // getErrorDetails,
    // isErrorGetPostedJob,
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

export default useGetApplicantList;
