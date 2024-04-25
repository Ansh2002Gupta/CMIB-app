import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import images from "../../../images";
import { navigations } from "../../../constants/routeNames";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../../ViewPostedJobDetails/ViewPostedJobDetails.styles";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import { urlService } from "../../../services/urlService";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import TouchableImage from "../../../components/TouchableImage";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import { useIntl } from "react-intl";

const isMob = Platform.OS.toLowerCase() !== "web";

const useGetCenterWiseCompanyList = (id) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const selectedId = useRef();
  const popupRef = useRef(null);
  const intl = useIntl();
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
    data: companyNameListing,
    isLoading: isCompanyLoading,
    fetchData: fetchCompanyNameListing,
    isError,
    error: errorGetCompanyName,
  } = useFetch({
    url: ``,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: tempCompanyLocation,
    isLoading: isCompanyLocationLoading,
    fetchData: fetchCompanyLocation,
    isError: isErrorCompanyLocation,
    isSuccess,
    error: errorCompanyLocation,
  } = useFetch({
    url: `member/${selectedModule?.key}/rounds/${id}/centres`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const companyLocation = tempCompanyLocation?.map((item) => {
    return {
      label: item.name,
      id: item.id,
    };
  });

  const isTicketListingLoading = isCompanyLoading || isCompanyLocationLoading;
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
      if (errorGetCompanyName === GENERIC_GET_API_FAILED_ERROR_MESSAGE) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorGetCompanyName?.data?.message}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchCompanyNameListing({
            overrideUrl: `member/${selectedModule?.key}/rounds/${id}/centres/${selectedId.current}/companies`,
          });
        },
      };
    }
    if (isErrorCompanyLocation) {
      let errorMessage = "";
      if (errorCompanyLocation === GENERIC_GET_API_FAILED_ERROR_MESSAGE) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorCompanyLocation?.data?.message}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchCompanyLocation({});
        },
      };
    }
  };

  useEffect(() => {
    if (selectedModule?.key) {
      fetchCompanyLocation();
    }
  }, [selectedModule]);

  const fetchCompanyName = async (centerId) => {
    selectedId.current = centerId;
    const requestedParams = {
      perPage: rowsPerPage,
      page: currentPage,
    };
    const initialData = await fetchCompanyNameListing({
      queryParamsObject: requestedParams,
      overrideUrl: `member/${selectedModule?.key}/rounds/${id}/centres/${centerId}/companies`,
    });
    if (initialData && initialData?.records?.length > 0) {
      setCurrentRecords(initialData?.records);
      if (initialData?.meta?.currentPage === initialData?.meta?.lastPage) {
        setAllDataLoaded(true);
      }
    }
    setIsFirstPageReceived(false);
  };
  useEffect(() => {
    if (isSuccess && tempCompanyLocation && tempCompanyLocation.length) {
      const centerId = companyLocation[0].id;
      selectedId.current = centerId;
      fetchCompanyName(centerId);
    }
  }, [isSuccess, tempCompanyLocation]);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    const newData = await fetchCompanyNameListing({
      queryParamsObject: params,
      overrideUrl: `member/${selectedModule?.key}/rounds/${id}/centres/${selectedId.current}/companies`,
    });
    setCurrentRecords(newData?.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchCompanyNameListing({
        queryParamsObject: { perPage: rowsPerPage, page: nextPage },
        overrideUrl: `member/${selectedModule?.key}/rounds/${id}/centres/${selectedId.current}/companies`,
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
    });
  };

  const filterApplyHandler = async ({}) => {};

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
  let tableIcon = images.iconTicket;
  let filterCategory = [];
  let isHeading = true;

  const onIconPress = (item) => {
    setCurrentPopupMessage(item.id);
  };

  const navigateToDetail = (item) => {
    navigate(
      `/${selectedModule?.key}/${navigations.ROUND_ONE}/${navigations.CENTRE_WISE_COMPANY}/${navigations.COMPANY_DETAILS}/${id}/${selectedId.current}/${item.id}`
    );
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();

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
          ...commonStyles.columnStyle("93%"),
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
                  isSvg={true}
                />
                {currentPopUpMessage === item.id && (
                  <View ref={popupRef}>
                    <PopupMessage
                      message={[
                        {
                          name: intl.formatMessage({
                            id: "label.viewCompanyDetails",
                          }),
                        },
                      ]}
                      onPopupClick={(selectedItem) => {
                        setCurrentPopupMessage(-1);
                        navigateToDetail(item);
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
    filterApplyHandler,
    filterCategory,
    getColoumConfigs,
    getStatusStyle: () => {},
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
    statusText: [],
    subHeadingText: [],
    tableIcon,
    companyNameListing: currentRecords,
    getErrorDetails,
    totalcards: companyNameListing?.meta?.total,

    companyLocation,
    fetchCompanyName,
    navigateToDetail,
  };
};

export default useGetCenterWiseCompanyList;
