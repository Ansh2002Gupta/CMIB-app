import React, { useContext, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { View, Platform } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import commonStyles from "../../../theme/styles/commonStyles";
import images from "../../../images";
import styles from "../SavedCandidatesView.styles";
import {
  CANDIDATES,
  MARKED_PREFER,
  MARK_PREFER,
  UNMARKED_PREFER,
  USER_TYPE_COMPANY,
} from "../../../services/apiServices/apiEndPoint";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import useIsWebView from "../../../hooks/useIsWebView";
import { useNavigate, useSearchParams } from "../../../routes";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import useFetch from "../../../hooks/useFetch";
import usePagination from "../../../hooks/usePagination";
import { navigations } from "../../../constants/routeNames";
import TouchableImage from "../../../components/TouchableImage";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { usePost } from "../../../hooks/useApiRequest";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";

const isMob = Platform.OS.toLowerCase() !== "web";

const useSavedCandidates = () => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const [searchParams] = useSearchParams();
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [showCurrentPopupmessage, setCurrentPopupMessage] = useState(-1);
  const [filterOptions, setFilterOptions] = useState({
    status: "",
    query_type: "",
    searchData: "",
  });
  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );
  const [removedCandidates, setRemovedCandidates] = useState([]);

  const navigate = useNavigate();

  const getStatusStyle = () => {
    return styles.cellTextStyle(12);
  };
  const popMessageRef = useRef(null);
  useOutsideClick(popMessageRef, () => setCurrentPopupMessage(-1));

  const headingTexts = ["candidate_name"];
  const subHeadingText = ["candidate_id", "experience"];
  let filterCategory = ["Status", "Query Type"];
  const statusData = [{ id: 1, name: "pending" }];
  const queryTypeData = [{ id: 1, name: "pending" }];
  const tableIcon = images.iconMore;
  const formatConfig = {
    experience: {
      prefix: `${intl.formatMessage({ id: "label.experience" })}${" : "}`,
      suffix: `${" "}${intl.formatMessage({ id: "label.years" })}`,
    },
  };
  const {
    data: savedCandidatesData,
    isLoading: isSavedCadidatesDataLoading,
    error: errorWhileFetchingCandidatesData,
    isError: isErrorWhileFetchingCandidatesData,
    fetchData: fetchingCandidatesData,
  } = useFetch({
    url: USER_TYPE_COMPANY + CANDIDATES + MARKED_PREFER,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    isLoading: markedSavedJobLoading,
    makeRequest: markJob,
    error: errorWhileMarkJob,
    setError: setMarkedSavedJobError,
  } = usePost({
    url: USER_TYPE_COMPANY + CANDIDATES + UNMARKED_PREFER,
  });

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
      const initialData = await fetchingCandidatesData({
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

  const updateCurrentRecords = async (params) => {
    const newData = await fetchingCandidatesData({
      queryParamsObject: params,
    });
    setCurrentRecords(newData?.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchingCandidatesData({
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

  const handleSearchResults = async (searchedData) => {
    setIsFirstPageReceived(true);
    setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchingCandidatesData({
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

  const filterApplyHandler = async ({ selectedStatus, selectedQueryType }) => {
    setIsFirstPageReceived(true);
    setFilterOptions((prev) => ({
      ...prev,
      status: selectedStatus,
      query_type: selectedQueryType,
    }));
    if (isMob) {
      setLoadingMore(false);
      setCurrentPage(1);
      const newData = await fetchingCandidatesData({
        queryParamsObject: {
          q: filterOptions.searchData,
          status: selectedStatus,
          queryType: selectedQueryType,
        },
      });
      setCurrentRecords(newData?.records);
      setIsFirstPageReceived(false);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      } else {
        setAllDataLoaded(false);
      }
    } else {
      await updateCurrentRecords({
        status: selectedStatus,
        queryType: selectedQueryType,
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  const onIconPress = (index) => {
    showCurrentPopupmessage !== index
      ? setCurrentPopupMessage(index)
      : setCurrentPopupMessage(-1);
  };

  const handleActions = (candidateData) => {
    const { candidate_id, user_id } = candidateData;
    setCurrentPopupMessage(-1);
    const removedCandidateIndex = removedCandidates.indexOf(user_id);

    markJob({
      body: {
        candidate_id: candidate_id,
      },
      overrideUrl: `${USER_TYPE_COMPANY}${CANDIDATES}/${user_id}${
        removedCandidateIndex >= 0 ? MARK_PREFER : UNMARKED_PREFER
      }`,
      onSuccessCallback: () => {
        if (removedCandidateIndex >= 0) {
          removedCandidates.splice(removedCandidateIndex, 1);
          setRemovedCandidates([...removedCandidates]);
        } else {
          setRemovedCandidates((prev) => [...prev, user_id]);
        }
      },
    });
  };

  const onNameSorting = async (sortField) => {
    setIsAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortBy: sortField,
      sortDirection: !isAscendingOrder ? "asc" : "desc",
    });
  };

  const openCandidateDetail = (candidateData) => {
    let isRemoved = removedCandidates.includes(candidateData?.user_id);
    navigate(
      `/${selectedModule?.key}/${navigations.CANDIDATE_DETAIL}/${
        candidateData?.user_id
      }/${Number(isRemoved)}`
    );
  };

  const popupOptions = (item) => [
    {
      label: intl.formatMessage({
        id: removedCandidates.includes(item?.user_id)
          ? "label.add_to_saved_candidates"
          : "label.removed_from_saved_candidates",
      }),
      popupAction: handleActions,
    },
    {
      label: intl.formatMessage({ id: "label.view_candidate_details" }),
      popupAction: openCandidateDetail,
    },
  ];

  const getColoumConfigs = (item, isHeading, index) => {
    const tableStyle = isHeading
      ? commonStyles.customTableHeading
      : commonStyles.cellTextStyle(14);

    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
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
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.candidate_name}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item.candidate_id}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.experience} {intl.formatMessage({ id: "label.years" })}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <View style={styles.flexRow}>
            {item?.functional_areas?.map((functionalAreaItem, index) => {
              const remainingNoOfItems = item.functional_areas.length - 2;

              if (isHeading || index < 2) {
                return (
                  <CommonText
                    key={index}
                    customContainerStyle={!isHeading ? styles.arrayStyle : {}}
                    customTextStyle={{ ...tableStyle, ...styles.chipText }}
                  >
                    {functionalAreaItem}
                  </CommonText>
                );
              } else if (index === 2) {
                return (
                  <CommonText
                    key={index}
                    customContainerStyle={!isHeading ? styles.arrayStyle : {}}
                    customTextStyle={tableStyle}
                  >
                    {`+${remainingNoOfItems}`}
                  </CommonText>
                );
              } else {
                return null;
              }
            })}
          </View>
        ),
        style: commonStyles.columnStyle("25%"),
        isFillSpace: true,
      },
      // {
      //   content: (
      //     <View style={styles.flexRow}>
      //       {item.designation_applied_for.map((functionalAreaItem, index) => {
      //         const remainingNoOfItems =
      //           item.designation_applied_for.length - 2;

      //         if (isHeading || index < 2) {
      //           return (
      //             <CommonText
      //               key={index}
      //               customContainerStyle={!isHeading ? styles.arrayStyle : {}}
      //               customTextStyle={{ ...tableStyle, ...styles.chipText }}
      //             >
      //               {functionalAreaItem}
      //             </CommonText>
      //           );
      //         } else if (index === 2) {
      //           return (
      //             <CommonText
      //               key={index}
      //               customContainerStyle={!isHeading ? styles.arrayStyle : {}}
      //               customTextStyle={tableStyle}
      //             >
      //               {`+${remainingNoOfItems}`}
      //             </CommonText>
      //           );
      //         } else {
      //           return null;
      //         }
      //       })}
      //     </View>
      //   ),
      //   style: {
      //     ...commonStyles.columnStyle("20%"),
      //     ...styles.iconTicketColoum,
      //   },
      //   isFillSpace: true,
      // },
      {
        content: !isHeading && (
          <View>
            <TouchableImage
              onPress={() => {
                onIconPress(index);
              }}
              source={images.iconMore}
              imageStyle={styles.iconTicket}
              isSvg={true}
            />
            {showCurrentPopupmessage === index && (
              <View ref={popMessageRef}>
                <PopupMessage
                  message={popupOptions(item)}
                  customStyle={styles.popupMessageStyle}
                  onPopupClick={(configData) => {
                    configData?.popupAction(item);
                  }}
                  labelName="label"
                />
              </View>
            )}
          </View>
        ),
        style: {
          ...commonStyles.columnStyle("2%"),
          ...styles.iconTicketColoum,
        },
        isFillSpace: true,
      },
    ];
  };

  return {
    formatConfig,
    filterCategory,
    queryTypeData,
    statusData,
    errorWhileMarkJob,
    errorWhileFetchingCandidatesData,
    setMarkedSavedJobError,
    getColoumConfigs,
    getStatusStyle,
    headingTexts,
    handleLoadMore,
    handleRowPerPageChange,
    handlePageChange,
    handleSearchResults,
    isFirstPageReceived,
    allDataLoaded,
    loadingMore,
    filterApplyHandler,
    data: currentRecords,
    isSavedCadidatesDataLoading,
    subHeadingText,
    statusText: [],
    tableIcon,
    fetchingCandidatesData,
    rowsPerPage,
    currentPage,
    totalPages: savedCandidatesData?.meta?.total,
    showCurrentPopupmessage,
    onIconPress,
    popupOptions,
  };
};

export default useSavedCandidates;
