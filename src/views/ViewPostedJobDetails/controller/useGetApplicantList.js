import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import { formatDate } from "../../../utils/util";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import images from "../../../images";
import { navigations } from "../../../constants/routeNames";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../ViewPostedJobDetails.styles";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import { urlService } from "../../../services/urlService";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import TouchableImage from "../../../components/TouchableImage";
import useOutsideClick from "../../../hooks/useOutsideClick";

const isMob = Platform.OS.toLowerCase() !== "web";

const useGetApplicantList = (id, onEditPress) => {
  const { isWebView } = useIsWebView();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const popupRef = useRef(null);
  const [filterOptions, setFilterOptions] = useState({
    status: "",
    query_type: "",
  });
  useOutsideClick(popupRef, () => setCurrentPopupMessage(-1));

  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(urlService.getQueryStringValue("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(urlService.getQueryStringValue("page"))
  );

  const navigate = useNavigate();

  const {
    data: applicantListingData,
    isLoading: isTicketListingLoading,
    fetchData: fetchDataTicketListing,
    isError,
    error: errorGetApplicant,
  } = useFetch({
    url: `company/jobs/${id}/applicants`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const queryTypeData = [];
  const statusData = [];

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  const getErrorDetails = () => {
    if (isError) {
      let errorMessage = "";
      if (errorGetApplicant === GENERIC_GET_API_FAILED_ERROR_MESSAGE) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorGetApplicant?.data?.message}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchDataTicketListing({});
        },
      };
    }
  };

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
  const getAllRecords = async () => {
    const newData = await fetchDataTicketListing();
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
      search: searchedData,
      perPage: rowsPerPage,
      page: currentPage,
      status: filterOptions.status,
      queryType: filterOptions.query_type,
    });
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

  const onNameSorting = async (sortField) => {
    setIsAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortField: sortField,
      sortDirection: !isAscendingOrder ? "asc" : "desc",
    });
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
  const onIconPress = (item) => {
    setCurrentPopupMessage(item.id);
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();

    if (
      item.is_primary_accepted === null &&
      item.is_alternate_accepted === null
    ) {
      const offerJobIndex = item.action.findIndex(
        (action) => action.id === "offer_job"
      );
      if (offerJobIndex !== -1) {
        item.action.splice(offerJobIndex, 1);
      }
    }

    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {item?.name ?? "-"}
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
          <View>
            {!isHeading && (
              <>
                <TouchableImage
                  onPress={() => {
                    onIconPress(item);
                  }}
                  source={images.iconMore}
                  imageStyle={{ height: 20, width: 20 }}
                  isSvg
                />
                {currentPopUpMessage === item.id && (
                  <View ref={popupRef}>
                    <PopupMessage
                      message={item?.action}
                      onPopupClick={(selectedItem) => {
                        setCurrentPopupMessage(-1);
                        onEditPress(selectedItem.name, item);
                      }}
                      labelName={"name"}
                      customStyle={styles.popupContainer}
                      isPopupModal
                      onPopUpClose={() => setCurrentPopupMessage(-1)}
                    />
                  </View>
                )}
              </>
            )}
          </View>
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
    getAllRecords,
    filterApplyHandler,
    filterCategory,
    getColoumConfigs,
    getStatusStyle,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    isError,
    getErrorDetails,
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
    applicantListingData: currentRecords,
    getErrorDetails,
    totalcards: applicantListingData?.meta?.total,
  };
};

export default useGetApplicantList;
