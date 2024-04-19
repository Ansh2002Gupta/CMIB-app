import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../routes";
import {
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import Chip from "../../../components/Chip";
import CommonText from "../../../components/CommonText";
import CustomImage from "../../../components/CustomImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import TouchableImage from "../../../components/TouchableImage";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  ACCEPTED,
  APPLICANT,
  INTERVIEW,
  INTERVIEWS,
  JOBS,
  JOB_LOCATION_OPTIONS,
  JOB_TYPE_OPTIONS,
  MEMBER_JOBS_LISTING,
  OFFER_RESPONSE,
  USER_TYPE_MEMBER,
  WORK_MODE_OPTIONS,
} from "../../../services/apiServices/apiEndPoint";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import {
  DEFAULT_CATEGORY_FOR_FILTER_MODAL,
  FILTER_TYPE_ENUM,
  ROWS_PER_PAGE_ARRAY,
  STATUS_OPTIONS,
} from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { usePatch } from "../../../hooks/useApiRequest";
import { urlService } from "../../../services/urlService";
import { navigations } from "../../../constants/routeNames";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../AppliedJobsView.style";

const isMob = Platform.OS.toLowerCase() !== "web";

const initialFilterState = {
  selectedWorkMode: [],
  selectedExperience: 0,
  selectedJobType: [],
  selectedLocation: [],
};

const useAppliedJobsListing = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [userProfileDetails] = useContext(UserProfileContext);
  const applicantID = userProfileDetails?.userDetails?.id;
  const defaultCategory = DEFAULT_CATEGORY_FOR_FILTER_MODAL.AppliedJobs;
  const { isWebView } = useIsWebView();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [showPopUpWithID, setShowPopUpWithID] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [filterState, setFilterState] = useState(initialFilterState);
  const [filterOptions, setFilterOptions] = useState({
    work_mode: "",
    job_type: "",
    experience: 0,
    location: "",
  });
  const [modalData, setModalData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isPatching, setIsPatching] = useState(false);
  const [isPatchingSuccess, setIsPatchingSuccess] = useState(false);
  const [isPatchingError, setIsPatchingError] = useState(false);
  const popUpRef = useRef(null);

  useOutsideClick(popUpRef, () => setShowPopUpWithID(-1));

  const [showJobOfferResponseModal, setShowJobOfferResponseModal] =
    useState(false);
  const [showInterviewTimeModal, setShowInterviewTimeModal] = useState(false);
  const [showInterviewDetailModal, setShowInterviewDetailModal] =
    useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    isShow: false,
    decision: -1,
  });

  useOutsideClick(popUpRef, () => setShowPopUpWithID(-1));

  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(urlService.getQueryStringValue("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(urlService.getQueryStringValue("page"))
  );
  const [candidateDecision, setCandidateDecision] = useState({
    decision: null,
    applicantID: null,
  });

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

  const { data: workModeData } = useFetch({
    url: WORK_MODE_OPTIONS,
  });

  const { data: jobTypeData } = useFetch({ url: JOB_TYPE_OPTIONS });

  const experienceData = 0;

  const { data: locationData } = useFetch({ url: JOB_LOCATION_OPTIONS });

  const {
    makeRequest: patchAcceptRejectOfferDecision,
    error: OfferDecisionPatchingError,
    isLoading: isPatchingAcceptRejectOfferDecision,
    isSuccess: isPatchingSuccessAcceptRejectOfferDecision,
    isError: isPatchingErrorAcceptRejectOfferDecision,
  } = usePatch({
    url: OFFER_RESPONSE,
  });

  const {
    makeRequest: saveInterviewDetails,
    error: saveInterviewDetailsPatchingError,
    isLoading: isPatchingSaveInterviewDetails,
    isSuccess: isPatchingSuccessSaveInterviewDetails,
    isError: isPatchingErrorSaveInterviewDetails,
  } = usePatch({
    url: USER_TYPE_MEMBER,
  });

  const {
    data: interviewDatesData,
    fetchData: fetchInterviewDates,
    isLoading: isGettingDatesData,
    isError: isErrorInDatesData,
  } = useFetch({
    url: USER_TYPE_MEMBER + `/${JOBS}` + `/${applicantID}` + INTERVIEWS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const handleConfirmation = () => {
    const { decision, applicantID } = candidateDecision;
    patchAcceptRejectOfferDecision({
      overrideUrl: OFFER_RESPONSE + `/${applicantID}`,
      body: { status: decision },
      onErrorCallback: () => {
        setConfirmationModal((prev) => ({
          ...prev,
          isShow: false,
        }));
        setShowJobOfferResponseModal(false);
        setIsPatchingError(isPatchingErrorAcceptRejectOfferDecision);
        setToastMsg(OfferDecisionPatchingError);
      },
      onSuccessCallback: () => {
        setConfirmationModal((prev) => ({
          ...prev,
          isShow: false,
        }));
        setShowJobOfferResponseModal(false);
        setIsPatchingSuccess(isPatchingSuccessAcceptRejectOfferDecision);
        const requestedParams = {
          perPage: rowsPerPage,
          page: currentPage,
        };
        updateCurrentRecords(requestedParams);
      },
    });
  };

  const patchSelectedInterview = (selectedInterviewDetails) => {
    const {
      id: interview_id,
      isPrimary: isPrimarySchedule,
      mode,
    } = selectedInterviewDetails;
    saveInterviewDetails({
      overrideUrl:
        USER_TYPE_MEMBER +
        `/${JOBS}` +
        `${INTERVIEW}` +
        `/${interview_id}` +
        `${ACCEPTED}`,
      body: { accepted_schedule: isPrimarySchedule ? "primary" : "alternate" },
      onErrorCallback: (error) => {
        setShowInterviewTimeModal(false);
        setIsPatchingError(isPatchingErrorSaveInterviewDetails);
        setToastMsg(saveInterviewDetailsPatchingError);
      },
      onSuccessCallback: (success) => {
        setShowInterviewTimeModal(false);
        setIsPatchingSuccess(isPatchingSuccessSaveInterviewDetails);
        const requestedParams = {
          perPage: rowsPerPage,
          page: currentPage,
        };
        updateCurrentRecords(requestedParams);
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
      refKey: "name",
      name: "WorkMode",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: workModeData,
      selectedOptions: filterState?.selectedWorkMode,
      handler: handleFilterChange,
    },
    {
      refKey: "name",
      name: "JobType",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: jobTypeData,
      selectedOptions: filterState?.selectedJobType,
      handler: handleFilterChange,
    },
    {
      refKey: "value",
      name: "Experience",
      type: FILTER_TYPE_ENUM.SLIDER,
      minimumSliderLimit: 0,
      maximumSliderLimit: 40,
      options: experienceData,
      selectedOptions: filterState?.selectedExperience,
      handler: handleFilterChange,
    },
    {
      refKey: "id",
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
    const searchQuery = urlService.getQueryStringValue("search");
    await updateCurrentRecords({
      search: searchQuery,
      perPage: rowsPerPage,
      page: page,
      multiFacet: 1,
      work_mode: filterOptions?.work_mode,
      job_type: filterOptions?.job_type,
      experience: filterOptions?.experience,
      location: filterOptions?.location,
      department: filterOptions?.department,
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    const searchQuery = urlService.getQueryStringValue("search");
    await updateCurrentRecords({
      search: searchQuery,
      perPage: option.value,
      page: currentPage,
      multiFacet: 1,
      work_mode: filterOptions?.work_mode,
      job_type: filterOptions?.job_type,
      experience: filterOptions?.experience,
      location: filterOptions?.location,
      department: filterOptions?.department,
    });
  };

  const handleSearchResults = async (searchedData) => {
    !searchedData
      ? urlService.removeParam("search")
      : urlService.setQueryStringValue("search", searchedData);
    setIsFirstPageReceived(true);
    setFilterOptions((prev) => ({ ...prev, q: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchDataAppliedJobs({
        queryParamsObject: {
          search: searchedData,
          multiFacet: 1,
          work_mode: filterOptions?.work_mode,
          job_type: filterOptions?.job_type,
          experience: filterOptions?.experience,
          location: filterOptions?.location,
          department: filterOptions?.department,
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
        search: searchedData,
        perPage: rowsPerPage,
        page: currentPage,
        multiFacet: 1,
        work_mode: filterOptions?.work_mode,
        job_type: filterOptions?.job_type,
        experience: filterOptions?.experience,
        location: filterOptions?.location,
        department: filterOptions?.department,
      });
    }
  };

  const onIconPress = (item) => {
    if (!item?.status) return "-";
    switch (item?.status?.trim()?.toLowerCase()) {
      case STATUS_OPTIONS.JOB_OFFERED?.trim()?.toLowerCase():
        setShowPopUpWithID(item?.id);
        setPopUpMessage(
          intl.formatMessage({ id: "label.respond_to_job_offer" })
        );
        break;
      case STATUS_OPTIONS.NO_RESPONSE?.trim()?.toLowerCase():
        setShowPopUpWithID(item?.id);
        setPopUpMessage(
          intl.formatMessage({ id: "label.select_interview_time" })
        );
        break;
      case STATUS_OPTIONS.INTERVIEW_SCHEDULED?.trim()?.toLowerCase():
        setShowPopUpWithID(item?.id);
        setPopUpMessage(
          intl.formatMessage({ id: "label.view_interview_details" })
        );
        break;
      default:
        setPopUpMessage("-");
    }
  };

  const renderMoreActionButton = (item) => {
    return (
      item?.status?.trim()?.toLowerCase() ===
        STATUS_OPTIONS.NO_RESPONSE?.trim().toLowerCase() ||
      item?.status?.trim()?.toLowerCase() ===
        STATUS_OPTIONS.JOB_OFFERED?.trim().toLowerCase() ||
      item?.status?.trim()?.toLowerCase() ===
        STATUS_OPTIONS.INTERVIEW_SCHEDULED?.trim().toLowerCase()
    );
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
    setFilterOptions((prev) => {
      return {
        ...prev,
        ...currentFilterOptions,
      };
    });
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      multiFacet: 1,
      work_mode: currentFilterOptions?.work_mode,
      job_type: currentFilterOptions?.job_type,
      experience: currentFilterOptions?.experience,
      location: currentFilterOptions?.location,
      department: currentFilterOptions?.department,
      search: filterOptions?.q ?? "",
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

  const getInterviewDates = ({ rowData }) => {
    const forApiCallInterviewDates = async () => {
      const apiInterviewDates = await fetchInterviewDates({
        overrideUrl:
          USER_TYPE_MEMBER +
          `/${JOBS}` +
          `/${rowData?.related_job_id}` +
          `${APPLICANT}` +
          `/${rowData?.id}` +
          INTERVIEWS,
      });
      setModalData(apiInterviewDates);
    };
    forApiCallInterviewDates();
  };

  let headingTexts = ["id"];
  let subHeadingText = ["company_name"];
  let statusText = ["active"];
  let tableIcon = images.iconTicket;
  let filterCategory = ["Work Mode", "Job Type", "Experience", "Location"];
  let isHeading = true;

  function getStatusStyle(status) {
    if (typeof status === "number") {
      return status
        ? {
            ...(!isWebView ? styles.active : styles.activeWeb),
            ...styles.cellTextStyle(12),
          }
        : {
            ...(!isWebView ? styles.close : styles.closeWeb),
            ...styles.cellTextStyle(12),
          };
    }
    status = !!status ? status?.toLowerCase() : '-"';
    switch (status?.trim().toLowerCase()) {
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
    const applicant_id = item?.id ?? 0;
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    return [
      {
        content: (
          <TouchableOpacity
            onPress={() => {
              navigate(
                `${navigations.APPLIED_JOBS_REDIRECT}/${item?.related_job_id}`
              );
            }}
            style={styles.cursorStyle}
          >
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {item?.readable_id || item?.job_id
                ? item?.readable_id || item?.job_id
                : "-"}
            </CommonText>
          </TouchableOpacity>
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
                  onPopupClick={(option) => {
                    if (
                      popUpMessage ===
                      intl.formatMessage({ id: "label.respond_to_job_offer" })
                    ) {
                      setShowJobOfferResponseModal(true);
                      setModalData(item);
                    } else if (
                      popUpMessage ===
                      intl.formatMessage({
                        id: "label.view_interview_details",
                      })
                    ) {
                      setShowInterviewDetailModal({
                        applicant_id: item?.related_job_id,
                        interview_id: item?.id,
                      });
                    } else {
                      getInterviewDates({ rowData: item });
                      setShowInterviewTimeModal((prev) => !prev);
                    }
                    setShowPopUpWithID(-1);
                  }}
                />
              </View>
            )}
            {renderMoreActionButton(item) && (
              <TouchableImage
                onPress={() => {
                  onIconPress(item);
                }}
                source={images.iconMore}
                imageStyle={styles.iconTicket}
                isSvg={true}
              />
            )}
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
    fetchInterviewDates,
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
    rowsPerPage,
    defaultCategory,
    showPopUpWithID,
    popUpMessage,
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
    showInterviewDetailModal,
    setShowInterviewDetailModal,
    setModalData,
    setShowPopUpWithID,
    patchSelectedInterview,
    isGettingDatesData,
    isErrorInDatesData,
    isPatchingAcceptRejectOfferDecision,
    isPatchingSaveInterviewDetails,
  };
};

export default useAppliedJobsListing;
