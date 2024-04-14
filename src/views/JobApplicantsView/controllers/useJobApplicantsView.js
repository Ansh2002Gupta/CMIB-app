import React, { useContext, useEffect, useState, useRef } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useSearchParams } from "../../../routes";
import { View, Platform } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import Chip from "../../../components/Chip";
import useIsWebView from "../../../hooks/useIsWebView";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../JobApplicantsView.style";
import {
  FILTERS,
  JOBS,
  JOB_APPLICANTS,
  STATUS,
  USER_TYPE_COMPANY,
} from "../../../services/apiServices/apiEndPoint";
import useFetch from "../../../hooks/useFetch";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import CustomImage from "../../../components/CustomImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import usePagination from "../../../hooks/usePagination";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { usePatch } from "../../../hooks/useApiRequest";
import { navigations } from "../../../constants/routeNames";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";

const isMob = Platform.OS.toLowerCase() !== "web";

const useJobApplicants = () => {
  const [sideBarState] = useContext(SideBarContext);
  const { isWebView } = useIsWebView();
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );
  const [filterOptions, setFilterOptions] = useState({
    status: "",
    query_type: "",
    searchData: "",
  });

  const [showCurrentPopupmessage, setCurrentPopupMessage] = useState(0);
  const [setModals, setModalsState] = useState({
    interviewModal: null,
    scheduleModal: null,
  });
  const navigate = useNavigate();

  const intl = useIntl();

  const popMessageRef = useRef(null);
  useOutsideClick(popMessageRef, () => setCurrentPopupMessage(-1));
  const currentModule = sideBarState?.selectedModule?.key;

  let isHeading = true;
  let headingTexts = ["applicantion_id"];
  let subHeadingText = ["status"];
  let filterCategory = ["Functional Areas", "Gender", "Marital Status", "Age"];
  let tableIcon = images.iconMore;
  const queryTypeData = [{ id: "male", name: "Male" }];
  const statusData = [{ id: 1, name: "Pending" }];

  const {
    data: jobApplicantListing,
    isLoading: isJobApplicantListingLoading,
    fetchData: fetchingJobApplicantListing,
    error: errorWhileFetchingJobApplicantListing,
    isError: isErrorWhileFetchingJobApplicantListing,
  } = useFetch({
    url: USER_TYPE_COMPANY + JOB_APPLICANTS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: filterData,
    isLoading: isFilterLoading,
    fetchData: fetchFilters,
  } = useFetch({
    url: USER_TYPE_COMPANY + JOBS + JOB_APPLICANTS + FILTERS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    makeRequest: handleStatus,
    isLoading: isUpdatingApplicantStatus,
    error: errorWhileUpdatingStatus,
    setError: setErrorStatus,
  } = usePatch({
    url:
      USER_TYPE_COMPANY +
      JOBS +
      JOB_APPLICANTS +
      `/${showCurrentPopupmessage}` +
      STATUS,
  });

  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        perPage: rowsPerPage,
        page: currentPage,
      };
      const initialData = await fetchingJobApplicantListing({
        queryParamsObject: requestedParams,
      });
      if (initialData && initialData?.records?.length > 0) {
        setCurrentRecords(initialData?.records);
        if (initialData?.records?.length < rowsPerPage && isMob) {
          setAllDataLoaded(true);
        }
      }
      setIsFirstPageReceived(false);
    };

    const fetchFilterData = async () => {
      const requestedParams = {
        level_1: "gender",
      };

      const newFilters = await fetchFilters({
        queryParamsObject: requestedParams,
      });
    };

    fetchData();
    fetchFilterData();
  }, []);

  const updateCurrentRecords = async (params) => {
    const newData = await fetchingJobApplicantListing({
      queryParamsObject: params,
    });
    setCurrentRecords(newData?.records);
  };

  function getStatusStyle(status) {
    status = status.toLowerCase();
    switch (status) {
      case "inactive":
        return {
          ...(!isWebView ? styles.inactive : styles.inactiveWeb),
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

  const onIconPress = (item) => {
    showCurrentPopupmessage !== item?.job_applicantion_id &&
    item?.job_applicantion_id !== null
      ? setCurrentPopupMessage(item?.job_applicantion_id)
      : setCurrentPopupMessage(-1);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchingJobApplicantListing({
        queryParamsObject: {
          perPage: rowsPerPage,
          page: nextPage,
          // status: filterOptions.status,
          // queryType: filterOptions.query_type,
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

  const handleClickActions = (id) => {
    handleStatus({
      body: {
        status: id,
      },
      onSuccessCallback: () => {
        fetchingJobApplicantListing({});
      },
    });
  };

  const handleActions = (currentAction, item) => {
    const screens = {
      download_profile_resume: () => {},
      view_details: () =>
        navigate(
          `/${currentModule}/${navigations.JOB_APPLICANTS}/${item?.company_job_id}/applicant-details/${item?.id}`
        ),
      shortlist_candidate: () => {
        setCurrentPopupMessage(-1);

        handleClickActions(3);
      },
      reject_candidate: () => {
        setCurrentPopupMessage(-1);

        handleClickActions(2);
      },
      offer_job: () => {
        setCurrentPopupMessage(-1);

        handleClickActions(6);
      },
      reject_after_interview: () => {
        setCurrentPopupMessage(-1);

        handleClickActions(9);
      },
      view_interview_details: () => {
        setCurrentPopupMessage(-1);
        setModalsState((prev) => ({
          ...prev,
          interviewModal: !!item?.interview_id
            ? item.interview_id
            : setErrorStatus(
                intl.formatMessage({ id: "label.interview_id_not_found" })
              ),
        }));
      },
      schedule_interview: () => {
        setCurrentPopupMessage(-1);
        setModalsState((prev) => ({
          ...prev,
          scheduleModal: !!item?.job_applicantion_id
            ? item.job_applicantion_id
            : setErrorStatus(
                intl.formatMessage({ id: "label.interview_id_not_found" })
              ),
        }));
      },
    };
    const action = screens[currentAction?.id];
    if (action) {
      action();
    }
  };

  //search and filter will integrate when Filter API integrated
  const handleSearchResults = async (searchedData) => {
    setIsFirstPageReceived(true);
    setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchingJobApplicantListing({
        queryParamsObject: {
          keyword: searchedData,
          // status: filterOptions.status,
          // queryType: filterOptions.query_type,
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
        keyword: searchedData,
        perPage: rowsPerPage,
        page: currentPage,
        // status: filterOptions.status,
        // queryType: filterOptions.query_type,
      });
    }
  };

  const onNameSorting = async (sortField) => {
    setIsAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortBy: sortField,
      sortOrder: !isAscendingOrder ? "asc" : "desc",
    });
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.customTableHeading
      : styles.cellTextStyle(14);

    const currentStatus = item?.job_status === 1 ? "Active" : "Inactive";

    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
            <CommonText customTextStyle={tableStyle}>{item.name}</CommonText>
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
            {item.name || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.applicantion_id || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.inactiveActiveStyle}>
            {isHeading ? (
              <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                {item.job_status || "-"}
              </CommonText>
            ) : (
              <Chip
                label={currentStatus}
                style={getStatusStyle(currentStatus)}
              />
            )}
          </View>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
              ...(!isHeading ? styles.underLineText : {}),
            }}
          >
            {item?.job_id || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText
            customTextStyle={{
              ...tableStyle,
              ...(!isHeading ? styles.underLineText : {}),
            }}
          >
            {item?.designation || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>{item?.status}</CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <>
            <TouchableImage
              onPress={() => {
                onIconPress(item);
              }}
              source={images.iconMore}
              imageStyle={styles.iconTicket}
              isSvg={true}
            />

            {showCurrentPopupmessage === item?.job_applicantion_id && (
              <View ref={popMessageRef}>
                <PopupMessage
                  ref={popMessageRef}
                  message={item?.action}
                  labelName={"name"}
                  customStyle={styles.popupMessageStyle}
                  onPopupClick={(action) => handleActions(action, item)}
                />
              </View>
            )}
          </>
        ),
        style: {
          ...commonStyles.columnStyle("5%"),
          ...styles.iconTicketColoum,
        },
        isFillSpace: true,
      },
    ];
  };

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  const filterApplyHandler = async ({
    selectedStatus,
    selectedQueryType,
  }) => {};

  const handlePageChange = async (page) => {
    handlePagePerChange(page);
    await updateCurrentRecords({
      keyword: filterOptions?.searchData,
      perPage: rowsPerPage,
      page: page,
      // status: filterOptions.status,
      // queryType: filterOptions.query_type,
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      keyword: filterOptions?.searchData,
      perPage: option.value,
      page: currentPage,
      // status: filterOptions.status,
      // queryType: filterOptions.query_type,
    });
  };

  const isLoading = isJobApplicantListingLoading || isUpdatingApplicantStatus;

  return {
    allDataLoaded,
    currentPage,
    error: errorWhileFetchingJobApplicantListing,
    errorWhileUpdatingStatus,
    setErrorStatus,
    fetchingJobApplicantListing,
    filterApplyHandler,
    filterCategory,
    getColoumConfigs,
    handleActions,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    isFirstPageReceived,
    isError: isErrorWhileFetchingJobApplicantListing,
    isLoading,
    isHeading,
    isUpdatingApplicantStatus,
    jobApplicantListingData: currentRecords,
    loadingMore,
    onIconPress,
    queryTypeData: queryTypeData,
    rowsPerPage,
    setCurrentPopupMessage,
    setModals,
    setModalsState,
    showCurrentPopupmessage,
    getStatusStyle,
    statusData: statusData,
    subHeadingText,
    tableIcon,
    totalcards: jobApplicantListing?.meta?.total,
  };
};

export default useJobApplicants;
