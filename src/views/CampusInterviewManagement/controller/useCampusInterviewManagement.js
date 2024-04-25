import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";
import { useNavigate } from "../../../routes";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import useFetch from "../../../hooks/useFetch";
import CommonText from "../../../components/CommonText";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import styles from "../CampusInterviewManagement.styles";
import commonStyles from "../../../theme/styles/commonStyles";
import images from "../../../images";
import { COMPANY_INACTIVE_SUBSCRIPTION_LISTING } from "../../../services/apiServices/apiEndPoint";
import { formatDate } from "../../../utils/util";
import TouchableImage from "../../../components/TouchableImage";
import { urlService } from "../../../services/urlService";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";

const useCampusInterviewManagement = (onViewPress) => {
  const isMob = Platform.OS.toLowerCase() !== "web";
  const defaultCategory = "Experience";
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [isCenterAscendingOrder, setIsCenterAscendingOrder] = useState(false);
  const navigate = useNavigate();
  const intl = useIntl();
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(urlService.getQueryStringValue("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(urlService.getQueryStringValue("page"))
  );
  const {
    data: inactiveSubscriptionListData,
    isLoading: isInactiveSubscriptionListLoading,
    isError: isInactiveSubscriptionListError,
    error: errorInactiveSubscriptionListData,
    fetchData: fetchInactivePackage,
  } = useFetch({
    url: `${COMPANY_INACTIVE_SUBSCRIPTION_LISTING}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  const getErrorDetails = () => {
    //TODO: Api error handling
  };
  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        perPage: rowsPerPage,
        page: currentPage,
      };
      const initialData = await fetchInactivePackage({
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
  }, []);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    const newData = await fetchInactivePackage({
      queryParamsObject: params,
    });
    setCurrentRecords(newData?.records);
  };
  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchInactivePackage({
        queryParamsObject: {
          perPage: rowsPerPage,
          page: nextPage,
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
      console.error(
        "Error fetching Package Subscription History on load more:",
        error
      );
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
    setIsFirstPageReceived(true);
    //NOTE: check if it is correct or not
    // setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchInactivePackage({
        queryParamsObject: {
          q: searchedData,
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
        q: searchedData,
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  let headingTexts = ["employer_name"];
  let subHeadingText = ["shortlisting_round"];
  let extraDetailsText = [""];
  let extraDetailsKey = [""];
  let tableIcon = images.iconMore;
  let isHeading = true;
  const onNameSorting = async (sortField) => {
    setIsAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortField: sortField,
      sortDirection: !isAscendingOrder ? "asc" : "desc",
    });
  };
  const onCenterSorting = async (sortField) => {
    setIsCenterAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortField: sortField,
      sortDirection: !isCenterAscendingOrder ? "asc" : "desc",
    });
  };
  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading ? styles.tableHeadingText : {fontSize: 14, fontWeight:500};
    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.employer_name ? item.employer_name : "-"}
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
            {!!item.employer_name ? item.employer_name : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.interview_type ? item.interview_type : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item.interview_type ? item.interview_type : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.mode ? item.mode : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item.mode ? item.mode : "0"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onCenterSorting("center")}>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.center_name ? item.center_name : "-"}
            </CommonText>
            <CustomImage
              source={
                isCenterAscendingOrder
                  ? images.iconArrowUpSorting
                  : images.iconArrowDownSorting
              }
              style={styles.sortingIcon}
            />
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item.center_name ? item.center_name : "0"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.interview_dates ? item.interview_dates : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item.interview_dates ? item.interview_dates : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.shortlisting_round ? item.shortlisting_round : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item.shortlisting_round ? item.shortlisting_round : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.written_test ? item.written_test : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item.written_test ? item.written_test : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
    ];
  };

  const getCampusColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading ? styles.tableHeadingText : {};
    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
            <CommonText fontWeight={"500"} customTextStyle={tableStyle}>
              {!!item?.center_name ? item?.center_name : "-"}
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
            {!!item?.center_name ? item?.center_name : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText customTextStyle={tableStyle}>
              {!!item?.employer_name ? item?.employer_name : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item?.employer_name ? item?.employer_name : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText customTextStyle={tableStyle}>
              {!!item?.interview_type ? item?.interview_type : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item?.interview_type ? item?.interview_type : "0"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onCenterSorting("center")}>
            <CommonText customTextStyle={tableStyle}>
              {!!item?.mode ? item?.mode : "-"}
            </CommonText>
            <CustomImage
              source={
                isCenterAscendingOrder
                  ? images.iconArrowUpSorting
                  : images.iconArrowDownSorting
              }
              style={styles.sortingIcon}
            />
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item?.mode ? item?.mode : "0"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText customTextStyle={tableStyle}>
              {!!item?.interview_dates_time ? item?.interview_dates_time : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item?.interview_dates_time ? item?.interview_dates_time : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText customTextStyle={tableStyle}>
              {!!item?.offer_provided ? item?.offer_provided : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item?.offer_provided ? item?.offer_provided : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText customTextStyle={tableStyle}>
              {!!item?.offer_acceptance_deadline
                ? item?.offer_acceptance_deadline
                : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText customTextStyle={tableStyle}>
            {!!item?.offer_acceptance_deadline
              ? item?.offer_acceptance_deadline
              : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("13%"),
        isFillSpace: true,
      },
    ];
  };

  return {
    intl,
    defaultCategory,
    allDataLoaded,
    currentPage,
    currentRecords,
    setCurrentRecords,
    getColoumConfigs,
    getErrorDetails,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    indexOfFirstRecord,
    indexOfLastRecord,
    isFirstPageReceived,
    isInactiveSubscriptionListLoading,
    isHeading,
    inactiveSubscriptionListData: currentRecords,
    loadingMore,
    rowsPerPage,
    subHeadingText,
    extraDetailsText,
    extraDetailsKey,
    tableIcon,
    totalcards: inactiveSubscriptionListData?.meta?.total,
    getCampusColoumConfigs,
  };
};

export default useCampusInterviewManagement;
