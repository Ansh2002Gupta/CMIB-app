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
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import {
  DEFAULT_CATEGORY_FOR_FILTER_MODAL,
  FILTER_TYPE_ENUM,
  ROWS_PER_PAGE_ARRAY,
} from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import { usePatch } from "../../../hooks/useApiRequest";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useAddTicket from "../../../services/apiServices/hooks/Ticket/useAddTicketAPI";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../JobSeekers.style";

const isMob = Platform.OS.toLowerCase() !== "web";

const initialFilterState = {
  selectedWorkMode: [],
  selectedExperience: 0,
  selectedJobType: [],
  selectedLocation: [],
};

const useJobSeekersListing = () => {
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
  const popUpRef = useRef(null);

  useOutsideClick(popUpRef, () => setShowPopUpWithID(-1));

  const [showJobOfferResponseModal, setShowJobOfferResponseModal] =
    useState(false);
  const [showInterviewTimeModal, setShowInterviewTimeModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    isShow: false,
    decision: -1,
  });
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );
  const [candidateDecision, setCandidateDecision] = useState({
    decision: null,
    applicantID: null,
  });

  const navigate = useNavigate();

  const {
    data: appliedJobsData,
    isLoading: isAppliedJobsListingLoading,
    fetchData: fetchDataAppliedJobs,
  } = useFetch({
    url: "/",
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { handleAddTicket } = useAddTicket();

  const { data: workModeData } = useFetch({
    url: "/",
  });

  const { data: jobTypeData } = useFetch({ url: "/" });

  const experienceData = 20;

  const { data: locationData } = useFetch({ url: "/" });

  const {
    makeRequest: patchAcceptRejectOfferDecision,
    error: toastMsg,
    setError: setToastMsg,
    isLoading: isPatching,
    isSuccess: isPatchingSuccess,
    isError: isPatchingError,
  } = usePatch({
    url: "/",
  });

  const handleConfirmation = () => {
    const { decision, applicantID } = candidateDecision;
    patchAcceptRejectOfferDecision({
      overrideUrl: "/",
      body: { status: decision ? 7 : 8 },
      onErrorCallback: (error) => {
        setConfirmationModal((prev) => ({
          ...prev,
          isShow: false,
        }));
        setShowJobOfferResponseModal(false);
      },
      onSuccessCallback: () => {
        setConfirmationModal((prev) => ({
          ...prev,
          isShow: false,
        }));
        setShowJobOfferResponseModal(false);
      },
    });
  };

  const handleAcceptRejectOffer = ({ decision, applicantID }) => {
    setConfirmationModal((prev) => ({
      ...prev,
      isShow: true,
      decision: decision,
    }));
    setCandidateDecision({ decision, applicantID });
  };

  const handleFilterChange = (selectedFilter, filterName) => {
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
            selectedFilter.id
          )
            ? existingSelectedOptions?.filter((id) => id !== selectedFilter.id)
            : [...existingSelectedOptions, selectedFilter.id];
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

  const extractLocation = ({ data, keyName }) => {
    const locationArr = !!data
      ? data?.map((obj, index) => {
          return { id: index + 1, name: obj?.[keyName] };
        })
      : [];
    return locationArr;
  };

  const customFilterInfo = [
    {
      name: "WorkMode",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: workModeData,
      selectedOptions: filterState?.selectedWorkMode,
      handler: handleFilterChange,
    },
    {
      name: "JobType",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: jobTypeData,
      selectedOptions: filterState?.selectedJobType,
      handler: handleFilterChange,
    },
    {
      name: "Experience",
      type: FILTER_TYPE_ENUM.SLIDER,
      minimumSliderLimit: 0,
      maximumSliderLimit: 40,
      options: experienceData,
      selectedOptions: filterState?.selectedExperience,
      handler: handleFilterChange,
    },
    {
      name: "Location",
      type: FILTER_TYPE_ENUM.CHECKBOX,
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
      search: searchedData,
      perPage: rowsPerPage,
      page: currentPage,
      multiFacet: 1,
      work_mode: filterOptions.work_mode,
      job_type: filterOptions.job_type,
      experience: filterOptions.experience,
      location: filterOptions.location,
      department: filterOptions.department,
    });
  };

  const onIconPress = (item) => {
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

  const returnSelectedFilterOption = (filterInfo, filterName) => {
    const filterObj = filterInfo?.find((obj) => obj.name === filterName);
    return filterObj?.selectedOptions;
  };

  const filterApplyHandler = async (filterInfo) => {
    const currentFilterOptions = {
      work_mode: returnSelectedFilterOption(filterInfo, "WorkMode"),
      job_type: returnSelectedFilterOption(filterInfo, "JobType"),
      experience: returnSelectedFilterOption(filterInfo, "Experience"),
      location: returnSelectedFilterOption(filterInfo, "Location"),
      education: returnSelectedFilterOption(filterInfo, "Education"),
    };
    setFilterOptions(currentFilterOptions);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      multiFacet: 1,
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

  let headingTexts = ["candidate_name"];
  let subHeadingText = ["candidate_id"];
  let statusText = ["experience"];
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
    console.log("item:", item);
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity
            onPress={() => onCompanySorting("company_name")}
          >
            <CommonText customTextStyle={tableStyle}>
              {item.candidate_name}
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
            {item.candidate_name ? item.candidate_name : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item.readable_id || item.job_id || item.candidate_id
              ? item.readable_id || item.job_id || item.candidate_id
              : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },

      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.totalExprience ? item.totalExprience : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.functionalArea ? item.functionalArea : "-"}
          </CommonText>
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
                      setShowJobOfferResponseModal(true);
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
    confirmationModal,
    currentPage,
    customFilterInfo,
    fetchDataAppliedJobs,
    filterApplyHandler,
    filterCategory,
    filterState,
    getColoumConfigs,
    getStatusStyle,
    handleConfirmation,
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
    isPatching,
    isPatchingSuccess,
    isPatchingError,
    loadingMore,
    onIconPress,
    queryTypeUrl: "/",
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
    toastMsg,
    appliedJobsData: currentRecords,
    totalcards: appliedJobsData?.meta?.total,
    showJobOfferResponseModal,
    setShowJobOfferResponseModal,
    setConfirmationModal,
    showInterviewTimeModal,
    setShowInterviewTimeModal,
    handleAcceptRejectOffer,
    modalData,
    isLoading,
    setIsLoading,
    setToastMsg,
    setFilterState,
    showPopUpWithID,
    setModalData,
    setShowPopUpWithID,
  };
};

export default useJobSeekersListing;
