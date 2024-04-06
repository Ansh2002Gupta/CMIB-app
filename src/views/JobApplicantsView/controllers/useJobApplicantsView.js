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
  JOB_APPLICANTS,
  USER_TYPE_COMPANY,
} from "../../../services/apiServices/apiEndPoint";
import useFetch from "../../../hooks/useFetch";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { navigations } from "../../../constants/routeNames";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";

const isMob = Platform.OS.toLowerCase() !== "web";

const useJobApplicants = () => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const [sideBarState] = useContext(SideBarContext);
  const { isWebView } = useIsWebView();
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
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
  const navigate = useNavigate();

  const popMessageRef = useRef(null);
  useOutsideClick(popMessageRef, () => setCurrentPopupMessage(-1));
  const companyId = userProfileDetails?.userDetails?.id;
  // const companyId = 1;
  const currentModule = sideBarState?.selectedModule?.key;

  let isHeading = true;
  let headingTexts = ["application_id"];
  let subHeadingText = ["status"];
  let statusText = ["active_inactive"];
  let tableIcon = images.iconMore;

  const {
    data: jobApplicantListing,
    isLoading: isJobApplicantListingLoading,
    fetchData: fetchingJobApplicantListing,
  } = useFetch({
    url: USER_TYPE_COMPANY + `/${companyId}` + JOB_APPLICANTS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (companyId) {
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

      fetchData();
    }
  }, [companyId]);

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
    showCurrentPopupmessage !== item?.user_id && item?.user_id !== null
      ? setCurrentPopupMessage(item?.user_id)
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

  const handleActions = (currentAction, item) => {
    // const jobId = item?.job_id;
    const jobId = 2;

    const screens = {
      "Download Profile & Resume": () => {},
      "View Details": () =>
        navigate(
          `/${currentModule}/${navigations.JOB_APPLICANTS}/${jobId}/applicant-details/${showCurrentPopupmessage}`
        ),
      "Shortlist Candidate": () => {},
      "Reject Candidate": () => {},
    };
    const action = screens[currentAction];
    if (action) {
      action();
    }
  };

  //search and filter will integrate when Filter API integrated
  const handleSearchResults = async (searchedData) => {
    // setIsFirstPageReceived(true);
    // setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    // if (isMob) {
    //   setCurrentPage(1);
    //   const newData = await fetchingJobApplicantListing({
    //     queryParamsObject: {
    //       q: searchedData,
    //       status: filterOptions.status,
    //       queryType: filterOptions.query_type,
    //     },
    //   });
    //   setIsFirstPageReceived(false);
    //   setCurrentRecords(newData?.records);
    //   if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
    //     setAllDataLoaded(true);
    //   } else {
    //     setAllDataLoaded(false);
    //   }
    // } else {
    //   await updateCurrentRecords({
    //     q: searchedData,
    //     perPage: rowsPerPage,
    //     page: currentPage,
    //     status: filterOptions.status,
    //     queryType: filterOptions.query_type,
    //   });
    // }
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.customTableHeading
      : styles.cellTextStyle(14);

    const currentStatus = item?.job_status === 1 ? "Active" : "Inactive";

    return [
      {
        content: (
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
            {item.application_id || "-"}
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

            {showCurrentPopupmessage === item?.user_id && (
              <View ref={popMessageRef}>
                <PopupMessage
                  ref={popMessageRef}
                  message={item?.action}
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

  const filterApplyHandler = () => {};
  const filterCategory = [];

  const handlePageChange = async (page) => {
    handlePagePerChange(page);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: page,
      // status: filterOptions.status,
      // queryType: filterOptions.query_type,
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
      // status: filterOptions.status,
      // queryType: filterOptions.query_type,
    });
  };

  return {
    filterApplyHandler,
    filterCategory,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    isFirstPageReceived,
    loadingMore,
    onIconPress,
    allDataLoaded,
    rowsPerPage,
    currentPage,
    getColoumConfigs,
    handleActions,
    showCurrentPopupmessage,
    setCurrentPopupMessage,
    getStatusStyle,
    headingTexts,
    isHeading,
    isJobApplicantListingLoading,
    jobApplicantListingData: currentRecords,
    subHeadingText,
    statusText,
    tableIcon,
    totalcards: jobApplicantListing?.meta?.total,
  };
};

export default useJobApplicants;
