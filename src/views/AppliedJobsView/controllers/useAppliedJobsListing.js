import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useSearchParams } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import ToastComponent from "../../../components/ToastComponent/ToastComponent";
import TouchableImage from "../../../components/TouchableImage";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  COMPANY_QUERY_TYPE_TICKET,
  JOB_LOCATION_OPTIONS,
  JOB_TYPE_OPTIONS,
  MEMBER_JOBS_LISTING,
  OFFER_RESPONSE,
  WORK_MODE_OPTIONS,
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
import { usePatch } from "../../../hooks/useApiRequest";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useAddTicket from "../../../services/apiServices/hooks/Ticket/useAddTicketAPI";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../AppliedJobsView.style";

const isMob = Platform.OS.toLowerCase() !== "web";

const initialFilterState = {
  selectedWorkMode: [],
  selectedCompany: [],
  selectedDepartment: [],
  selectedExperience: 0,
  selectedEducation: [],
  selectedJobType: [],
  selectedLocation: [],
  activeCategories: [],
};

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
  const [filterState, setFilterState] = useState(initialFilterState);
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
  const [modalData, setModalData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const popUpRef = useRef(null);

  useOutsideClick(popUpRef, () => setShowPopUpWithID(-1));

  const [showJobOfferResponseModal, setShowJobOfferResponseModal] =
    useState(false);
  const [showInterviewTimeModal, setShowInterviewTimeModal] = useState(false);
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );

  const navigate = useNavigate();

  const {
    data: appliedJobsData,
    isLoading: isAppliedJobsListingLoading,
    fetchData: fetchDataAppliedJobs,
  } = useFetch({
    url: MEMBER_JOBS_LISTING,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { handleAddTicket } = useAddTicket();

  const { data: workModeData } = useFetch({
    url: WORK_MODE_OPTIONS,
  });

  const { data: jobTypeData } = useFetch({ url: JOB_TYPE_OPTIONS });

  const experienceData = 20;

  const { data: locationData } = useFetch({ url: JOB_LOCATION_OPTIONS });

  const { makeRequest: patchAcceptRejectOfferDecision } = usePatch({
    url: OFFER_RESPONSE,
  });

  const handleAcceptRejectOffer = ({ decision, applicantID }) => {
    setIsLoading(true);
    patchAcceptRejectOfferDecision({
      url: OFFER_RESPONSE + `/${applicantID}/status`,
      body: { status: decision ? 7 : 8 },
      onErrorCallback: () => {
        showToast && (
          <ToastComponent
            toastMessage={intl.formatMessage({
              id: "label.some_error_occured",
            })}
            onDismiss={() => {
              setShowToast((prev) => !prev);
            }}
          />
        );
      },
      onSuccessCallback: () => {
        showToast && (
          <ToastComponent
            toastMessage={intl.formatMessage({
              id: "label.success.acceptOffer",
            })}
            onDismiss={() => {
              setShowToast((prev) => !prev);
            }}
          />
        );
      },
    });
    setIsLoading(false);
  };

  const handleFilterChange = (selectedFilter, filterName) => {
    console.log("selectedFilter, filterName", selectedFilter, filterName);
    setFilterState((prevState) => {
      const filterInfo = customFilterInfo.find(
        (info) => info.name === filterName
      );
      const filterKey = `selected${filterInfo?.name}`;
      console.log("filterKey", filterKey);
      const existingSelectedOptions = prevState[filterKey];
      console.log("prevState:", prevState);
      console.log("existingSelectedOptions:", existingSelectedOptions);
      let newSelectedOptions;

      if (filterInfo?.type === "checkbox") {
        newSelectedOptions = existingSelectedOptions.includes(selectedFilter.id)
          ? existingSelectedOptions.filter((id) => id !== selectedFilter.id)
          : [...existingSelectedOptions, selectedFilter.id];
      } else {
        newSelectedOptions = selectedFilter.value;
      }

      return {
        ...prevState,
        [filterKey]: newSelectedOptions,
      };
    });
  };

  const extractLocation = ({ data, keyName }) => {
    const locationArr = !!data
      ? data?.map((obj, index) => {
          return { id: index + 1, name: obj?.[keyName] };
        })
      : [];
    console.log("locationArr:", locationArr);
    return locationArr;
  };

  const customFilterInfo = [
    {
      name: "WorkMode",
      type: "checkbox",
      options: workModeData,
      selectedOptions: filterState?.selectedWorkMode,
      handler: handleFilterChange,
    },
    {
      name: "JobType",
      type: "checkbox",
      options: jobTypeData,
      selectedOptions: filterState?.selectedJobType,
      handler: handleFilterChange,
    },
    {
      name: "Experience",
      type: "slider",
      minimumSliderLimit: 0,
      maximumSliderLimit: 40,
      options: experienceData,
      selectedOptions: filterState?.selectedExperience,
      handler: handleFilterChange,
    },
    {
      name: "Location",
      type: "checkbox",
      options: extractLocation({ data: locationData, keyName: "country" }),
      selectedOptions: filterState?.selectedLocation,
      handler: handleFilterChange,
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
      const initialData = await fetchDataAppliedJobs({
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
    const newData = await fetchDataAppliedJobs({
      queryParamsObject: params,
    });
    setCurrentRecords(newData?.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchDataAppliedJobs({
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
      work_mode: filterOptions.work_mode,
      job_type: filterOptions.job_type,
      experience: filterOptions.experience,
      location: filterOptions.location,
      department: filterOptions.department,
    });
  };

  const onIconPress = (item) => {
    console.log("item:", item);
    showPopUpWithID !== item?.id
      ? setShowPopUpWithID(item?.id)
      : setShowPopUpWithID(-1);
    if (!item?.status) {
      setPopUpMessage(intl.formatMessage({ id: "label.respond_to_job_offer" }));
      return;
    }
    item?.status.trim().toLowerCase() ===
    intl.formatMessage({ id: "label.no_response_from_applicant" })
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
      const newData = await fetchDataAppliedJobs();
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

  const returnSelectedFilterOption = (filterName) => {
    const filterObj = customFilterInfo?.find((obj) => obj.name === filterName);
    return filterObj?.selectedOptions;
  };

  const filterApplyHandler = async (filterInfo) => {
    const currentFilterOptions = {
      work_mode: returnSelectedFilterOption("WorkMode"),
      job_type: returnSelectedFilterOption("JobType"),
      experience: returnSelectedFilterOption("Experience"),
      location: returnSelectedFilterOption("Location"),
      education: returnSelectedFilterOption("Education"),
    };
    setFilterOptions(currentFilterOptions);
    console.log("curretnFilterOptions:", currentFilterOptions);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      work_mode: currentFilterOptions.work_mode,
      job_type: currentFilterOptions.job_type,
      experience: currentFilterOptions.experience,
      location: currentFilterOptions.location,
      department: currentFilterOptions.department,
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

  let headingTexts = ["id"];
  let subHeadingText = ["company_name"];
  let statusText = ["active"];
  let tableIcon = images.iconTicket;
  let filterCategory = ["Work Mode", "Job Type", "Experience", "Location"];
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
      case "active":
        return {
          ...(!isWebView ? styles.active : styles.activeWeb),
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
            {item.readable_id || item.job_id
              ? item.readable_id || item.job_id
              : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
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
            {item.company_name ? item.company_name : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.designation ? item.designation : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.vacancy ? item.vacancy : "0"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.status ? item.status : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.statusStyle}>
            {isHeading ? (
              <CommonText customTextStyle={tableStyle}>
                {item.active_status ? item.active_status : "No status"}
              </CommonText>
            ) : (
              <Chip
                label={
                  item.active
                    ? intl.formatMessage({ id: "label.active" })
                    : intl.formatMessage({ id: "label.inactive" })
                }
                style={getStatusStyle(item?.active ? "active" : "inactive")}
              />
            )}
          </View>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <>
            {showPopUpWithID === item?.id && (
              <View ref={popUpRef}>
                <PopupMessage
                  message={popUpMessage}
                  customStyle={styles.popUpMessagePosition}
                  onPopupClick={() => {
                    if (
                      popUpMessage ===
                      intl.formatMessage({ id: "label.respond_to_job_offer" })
                    ) {
                      setShowJobOfferResponseModal((prev) => !prev);
                      setModalData(item);
                    } else {
                      setShowInterviewTimeModal((prev) => !prev);
                    }
                    setShowPopUpWithID(-1);
                  }}
                />
              </View>
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
        style: commonStyles.columnStyle("8%"),
        isFillSpace: true,
      },
    ];
  };

  return {
    allDataLoaded,
    currentPage,
    customFilterInfo,
    fetchDataAppliedJobs,
    filterApplyHandler,
    filterCategory,
    filterState,
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
    isAppliedJobsListingLoading,
    isFirstPageReceived,
    loadingMore,
    onIconPress,
    queryTypeUrl: COMPANY_QUERY_TYPE_TICKET,
    rowsPerPage,
    defaultCategory,
    showPopUpWithID,
    popUpMessage,
    workModeData,
    jobTypeData,
    experienceData,
    locationData,
    statusText,
    subHeadingText,
    tableIcon,
    appliedJobsData: currentRecords,
    totalcards: appliedJobsData?.meta?.total,
    showJobOfferResponseModal,
    setShowJobOfferResponseModal,
    showInterviewTimeModal,
    setShowInterviewTimeModal,
    handleAcceptRejectOffer,
    modalData,
    isLoading,
    setIsLoading,
    showPopUpWithID,
    setModalData,
    setShowPopUpWithID,
  };
};

export default useAppliedJobsListing;
