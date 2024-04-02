import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import CustomImage from "../../../components/CustomImage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  COMPANY_QUERY_TYPE_TICKET,
  COMPANY_TICKET_STATUS,
  MEMBER_JOBS_LISTING,
} from "../../../services/apiServices/apiEndPoint";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import {
  DEFAULT_CATEGORY_FOR_FILTER_MODAL,
  ROWS_PER_PAGE_ARRAY,
} from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import useAddTicket from "../../../services/apiServices/hooks/Ticket/useAddTicketAPI";
import images from "../../../images";
import { navigations } from "../../../constants/routeNames";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../AppliedJobsView.style";
import { useIntl } from "react-intl";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";

const isMob = Platform.OS.toLowerCase() !== "web";

const useAppliedJobsListing = () => {
  const intl = useIntl();
  const defaultCategory = DEFAULT_CATEGORY_FOR_FILTER_MODAL;
  const { isWebView } = useIsWebView();
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [showPopUpWithID, setShowPopUpWithID] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    status: "",
    work_mode: "",
    job_type: "",
    experience: 0,
    location: "",
    salary: 0,
    department: "",
    freshness: 0,
    company: "",
    industry: "",
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
  } = useFetch({
    url: MEMBER_JOBS_LISTING,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { handleAddTicket } = useAddTicket();

  const { data: statusData } = useFetch({ url: COMPANY_TICKET_STATUS });

  const { data: workModeData } = useFetch({
    url: COMPANY_TICKET_STATUS,
  });

  const { data: jobTypeData } = useFetch({ url: COMPANY_TICKET_STATUS });

  const experienceData = 20;

  const { data: locationData } = useFetch({ url: COMPANY_TICKET_STATUS });

  const salaryData = 40;

  const { data: educationData } = useFetch({ url: COMPANY_TICKET_STATUS });

  const { data: departmentData } = useFetch({
    url: COMPANY_TICKET_STATUS,
  });

  const { data: companyData } = useFetch({ url: COMPANY_TICKET_STATUS });

  const { data: industryData } = useFetch({
    url: COMPANY_TICKET_STATUS,
  });

  const freshnessData = 60;

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
      const initialData = await fetchDataTicketListing({
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
      q: searchedData,
      perPage: rowsPerPage,
      page: currentPage,
      status: filterOptions.status,
      workMode: filterOptions.work_mode,
      jobType: filterOptions.job_type,
      experience: filterOptions.experience,
      location: filterOptions.location,
      salary: filterOptions.salary,
      education: filterOptions.education,
      department: filterOptions.department,
      companyType: filterOptions.companyType,
      industry: filterOptions.industry,
      freshness: filterOptions.freshness,
    });
  };

  const onIconPress = (item) => {
    setShowPopUpWithID(item?.id);
    item?.status === "pending"
      ? setPopUpMessage(
          intl.formatMessage({ id: "label.select_interview_time" })
        )
      : setPopUpMessage(
          intl.formatMessage({ id: "label.respond_to_job_offer" })
        );
  };

  const handleSaveAddTicket = async (queryType, enterQuery) => {
    await handleAddTicket({ query_type: queryType, query: enterQuery });
    if (isMob) {
      const newData = await fetchDataTicketListing();
      if (newData && newData.records.length > 0) {
        setCurrentRecords((prevRecords) => [
          ...prevRecords,
          ...newData.records,
        ]);
      }
    } else {
      await updateCurrentRecords({
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  const filterApplyHandler = async ({
    selectedStatus,
    selectedWorkMode,
    selectedJobType,
    selectedExperience,
    selectedLocation,
    selectedSalary,
    selectedEducation,
    selectedDepartment,
    selectedCompany,
    selectedIndustry,
    selectedFreshness,
  }) => {
    setFilterOptions({
      status: selectedStatus,
      work_mode: selectedWorkMode,
      job_type: selectedJobType,
      experience: selectedExperience,
      location: selectedLocation,
      salary: selectedSalary,
      education: selectedEducation,
      department: selectedDepartment,
      companyType: selectedCompany,
      industry: selectedIndustry,
      freshness: selectedFreshness,
    });
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      status: filterOptions.status,
      workMode: filterOptions.work_mode,
      jobType: filterOptions.job_type,
      experience: filterOptions.experience,
      location: filterOptions.location,
      salary: filterOptions.salary,
      education: filterOptions.education,
      department: filterOptions.department,
      companyType: filterOptions.companyType,
      industry: filterOptions.industry,
      freshness: filterOptions.freshness,
    });
  };

  const onCompanySorting = async (sortField) => {
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
  let filterCategory = [
    "Work Mode",
    "Job Type",
    "Experience",
    "Location",
    "Salary",
    "Education",
    "Department",
    "Company Type",
    "Industry",
    "Freshness",
  ];
  let isHeading = true;

  function getStatusStyle(status) {
    status = !!status ? status?.toLowerCase() : '-"';
    switch (status) {
      case "pending":
        return {
          ...(!isWebView ? styles.pending : styles.pendingWeb),
          ...styles.cellTextStyle(12),
        };
      case "closed" || "inactive":
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
        content: isHeading ? (
          <CustomTouchableOpacity
            onPress={() => onCompanySorting("company_name")}
          >
            <CommonText customTextStyle={tableStyle}>
              {item.company_name}
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
            {item.company_name}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      // {
      //   content: (
      //     <CommonText customTextStyle={tableStyle}>
      //       {item.company_name}
      //     </CommonText>
      //   ),
      //   style: commonStyles.columnStyle("20%"),
      //   isFillSpace: true,
      // },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.designation}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>{item.vacancies}</CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>{item.status}</CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.statusStyle}>
            {isHeading ? (
              <CommonText customTextStyle={tableStyle}>
                {item.active_status}
              </CommonText>
            ) : (
              <Chip
                label={item.active_status}
                style={getStatusStyle(item.status)}
              />
            )}
          </View>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <>
            {showPopUpWithID === item?.id && (
              <PopupMessage
                message={popUpMessage}
                customStyle={styles.popUpMessagePosition}
              />
            )}
            <TouchableImage
              onPress={() => {
                onIconPress(item);
              }}
              source={images.iconMore}
              imageStyle={styles.iconTicket}
              isSvg={true}
            />
          </>
        ),
        style: {
          ...styles.iconMoreColumn,
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
    indexOfFirstRecord,
    indexOfLastRecord,
    isHeading,
    isTicketListingLoading,
    isFirstPageReceived,
    loadingMore,
    onIconPress,
    queryTypeUrl: COMPANY_QUERY_TYPE_TICKET,
    rowsPerPage,
    defaultCategory,
    showPopUpWithID,
    popUpMessage,
    statusData,
    workModeData,
    jobTypeData,
    experienceData,
    locationData,
    educationData,
    salaryData,
    departmentData,
    freshnessData,
    companyData,
    industryData,
    statusText,
    subHeadingText,
    tableIcon,
    ticketListingData: currentRecords,
    totalcards: ticketListingData?.meta?.total,
  };
};

export default useAppliedJobsListing;
