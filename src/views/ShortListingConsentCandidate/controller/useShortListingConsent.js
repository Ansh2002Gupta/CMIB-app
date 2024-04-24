import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "../../../routes";
import {
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import TouchableImage from "../../../components/TouchableImage";
import useFetch from "../../../hooks/useFetch";
import useIsWebView from "../../../hooks/useIsWebView";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import {
  DEFAULT_CATEGORY_FOR_FILTER_MODAL,
  FILTER_TYPE_ENUM,
  POSTED_JOB_LISTING_ENUM,
  ROWS_PER_PAGE_ARRAY,
} from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import { urlService } from "../../../services/urlService";
import colors from "../../../assets/colors";
import images from "../../../images";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { navigations } from "../../../constants/routeNames";
import { POST_JOB } from "../../../services/apiServices/apiEndPoint";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../ShortListingConsentCandidate.styles";
import CheckBox from "../../../components/CheckBox";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import Chip from "../../../components/Chip";
import { getQueryParams } from "../mappedData";

const isMob = Platform.OS.toLowerCase() !== "web";

const initialFilterState = {
  ["selectedActive/Inactive"]: [],
  ["selectedApproved/NotApproved"]: [],
};

const useShortListingConsent = (onViewPress, onEditPress, id) => {
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();

  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [seletedCenter, setSeletedCenter] = useState(0);
  const [seletedTabs, setSelectedTabs] = useState(0);

  const [currentRecords, setCurrentRecords] = useState([
    {
      registrationNumber: "N1234",
      name: "John",
      gender: "Male",
      age: "23",
      city: "Lucknow",
      country: "India",
      ca_inter_rank: "23",
      ca_final_rank: "50",
      ca_experience_rank: "3",
      rank: "2",
      category: "General",
      expected_salary: "23",
      test_result: "Passed",
      job_offered: "No",
      offered_status: "Rejected",
      consent_given: "Yes",
    },
    {
      registrationNumber: "N4554",
      name: "Peter",
      gender: "Female",
      age: "25",
      city: "Agra",
      country: "India",
      ca_inter_rank: "23",
      ca_final_rank: "50",
      ca_experience_rank: "3",
      rank: "2",
      category: "OBC",
      expected_salary: "23",
      test_result: "Failed",
      job_offered: "Yes",
      offered_status: "Accepted",
      consent_given: "No",
    },
  ]);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [filterOptions, setFilterOptions] = useState({
    [POSTED_JOB_LISTING_ENUM.activeorInactive]: "",
    [POSTED_JOB_LISTING_ENUM.approvedNotApproved]: "",
    searchData: "",
  });
  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);

  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(urlService.getQueryStringValue("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(urlService.getQueryStringValue("page"))
  );
  const defaultCategory = DEFAULT_CATEGORY_FOR_FILTER_MODAL.PostedJobs;

  const {
    data: candidateData,
    isLoading,
    fetchData: fetchCandidateData,
    isError: isErrorGetCandidateData,
    error: errorGetCandidateData,
  } = useFetch({
    url: `company/${selectedModule?.key}/rounds/${id}/application/centres/32/candidate`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: companyLocation,
    isLoading: isCompanyLocationLoading,
    fetchData: fetchCompanyLocation,
    isSuccess,
    isError: isErrorCompanyLocation,
    error: errorCompanyLocation,
  } = useFetch({
    url: `member/${selectedModule?.key}/rounds/${id}/centres`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const isTicketListingLoading = isCompanyLocationLoading || isLoading;
  const isError = isErrorCompanyLocation;
  const statusData = [
    {
      id: 1,
      name: "Active",
    },
    {
      id: 0,
      name: "InActive",
    },
  ];

  const queryTypeData = [
    {
      id: 1,
      name: "Approved",
    },
    {
      id: 0,
      name: "Not Approved",
    },
  ];
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

  const customFilterInfo = [
    {
      refKey: "id",
      name: POSTED_JOB_LISTING_ENUM.activeorInactive,
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: statusData,
      selectedOptions: filterState?.["selectedActive/Inactive"],
      handler: handleFilterChange,
    },
    {
      refKey: "id",
      name: POSTED_JOB_LISTING_ENUM.approvedNotApproved,
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: queryTypeData,
      selectedOptions: filterState?.["selectedApproved/NotApproved"],
      handler: handleFilterChange,
    },
  ];

  const getErrorDetails = () => {
    if (isErrorGetCandidateData) {
      let errorMessage = "";
      if (errorGetCandidateData === GENERIC_GET_API_FAILED_ERROR_MESSAGE) {
        errorMessage = GENERIC_GET_API_FAILED_ERROR_MESSAGE;
      } else {
        errorMessage = `${errorGetCandidateData?.data?.message}`;
      }
      return {
        errorMessage,
        onRetry: () => {
          fetchCandidateData({});
        },
      };
    }
    if (isErrorGetCandidateData)
      return {
        errorMessage: errorGetCandidateData?.data?.message,
        onRetry: () => fetchCandidateData({}),
      };
    if (isErrorCompanyLocation)
      return {
        errorMessage: errorCompanyLocation?.data?.message,
        onRetry: () => fetchCompanyLocation({}),
      };
    // if (ischangeJobStatusError)
    //   return {
    //     errorMessage: errorWhileJobChange,
    //     onRetry: () => {},
    //   };
  };

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  useEffect(() => {
    if (selectedModule.key) {
      fetchCompanyLocation();
    }

    // fetchData();
  }, [selectedModule]);
  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        perPage: rowsPerPage,
        page: currentPage,
        listType: getQueryParams(seletedTabs),
      };
      const initialData = await fetchCandidateData({
        queryParamsObject: requestedParams,
        overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidate`,
      });
      if (initialData) {
        setCurrentRecords(initialData?.records);
      }
      setIsFirstPageReceived(false);
    };
    if (isSuccess && companyLocation) {
      fetchData();
    }
  }, [companyLocation, seletedCenter]);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    params.listType = getQueryParams(seletedTabs);
    const newData = await fetchCandidateData({
      queryParamsObject: params,
      overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidate`,
    });

    setCurrentRecords(newData.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchCandidateData({
        queryParamsObject: {
          perPage: rowsPerPage,
          page: nextPage,
          status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
          listType: getQueryParams(seletedTabs),
        },
        overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidate`,
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
      search: filterOptions.searchData,
      perPage: rowsPerPage,
      page: page,
      status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
      approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
      status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
      approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
      search: filterOptions.searchData,
    });
  };

  const handleSearchResults = async (searchedData) => {
    setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchCandidateData({
        queryParamsObject: {
          search: searchedData,
          status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
          listType: getQueryParams(seletedTabs),
        },
        overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidate`,
      });
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
        status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
        approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
      });
    }
  };

  const returnSelectedFilterOption = (filterInfo, filterName) => {
    const filterObj = filterInfo?.find((obj) => obj.name === filterName);
    return filterObj?.selectedOptions;
  };

  const filterApplyHandler = async (filterInfo) => {
    const currentFilterOptions = {
      [POSTED_JOB_LISTING_ENUM.activeorInactive]: returnSelectedFilterOption(
        filterInfo,
        POSTED_JOB_LISTING_ENUM.activeorInactive
      ),
      [POSTED_JOB_LISTING_ENUM.approvedNotApproved]: returnSelectedFilterOption(
        filterInfo,
        POSTED_JOB_LISTING_ENUM.approvedNotApproved
      ),
    };
    setFilterOptions((prev) => {
      return {
        ...prev,
        ...currentFilterOptions,
      };
    });
    if (isMob) {
      setLoadingMore(false);
      setCurrentPage(1);
      const newData = await fetchCandidateData({
        queryParamsObject: {
          search: filterOptions.searchData,
          status:
            currentFilterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          approved:
            currentFilterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
          listType: getQueryParams(seletedTabs),
        },
        overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidate`,
      });
      setCurrentRecords(newData?.records);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      } else {
        setAllDataLoaded(false);
      }
    } else {
      await updateCurrentRecords({
        search: filterOptions.searchData,
        status: currentFilterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
        approved:
          currentFilterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  let headingTexts = [];
  let subHeadingText = [];
  let statusText = [];
  let tableIcon = images.iconMore;
  let filterCategory = [
    POSTED_JOB_LISTING_ENUM.activeorInactive,
    "Approved/Not Approved",
  ];
  let isHeading = true;

  const getColoumConfigs = (item, isHeading, index, selectedTabs) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    let obj = {};
    switch (selectedTabs) {
      case 3:
      case 4:
        obj = {
          content: (
            <>
              <CommonText customTextStyle={tableStyle}>
                {item?.consent_given ?? "-"}
              </CommonText>
            </>
          ),
          style: {
            ...commonStyles.columnStyle("13%"),
            ...styles.justifyContentCenter,
            ...(isHeading
              ? {}
              : { borderColor: colors.lightGrey, borderTopWidth: 0.5 }),
          },
        };
        break;
      case 5:
        obj = {
          content: (
            <>
              {isHeading ? (
                <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                  {item?.test_result ?? "-"}
                </CommonText>
              ) : (
                <Chip
                  customTextStyle={tableStyle}
                  bgColor={
                    item?.test_result === "Passed"
                      ? colors.lightGreen
                      : colors.lightOrangeThird
                  }
                  style={{
                    color:
                      item?.test_result === "Passed"
                        ? colors.green
                        : colors.red,
                  }}
                  isBackground
                  label={item?.test_result ?? "-"}
                />
              )}
            </>
          ),
          style: {
            ...commonStyles.columnStyle("10%"),
            ...styles.justifyContentCenter,
            ...(isHeading
              ? {}
              : { borderColor: colors.lightGrey, borderTopWidth: 0.5 }),
          },
        };
        break;
      case 6:
        obj = {
          content: (
            <>
              {isHeading ? (
                <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                  {item?.job_offered ?? "-"}
                </CommonText>
              ) : (
                <Chip
                  customTextStyle={tableStyle}
                  bgColor={
                    item?.job_offered === "Yes"
                      ? colors.lightGreen
                      : colors.greyOne
                  }
                  style={{
                    color:
                      item?.job_offered === "Yes" ? colors.green : colors.black,
                  }}
                  isBackground
                  label={item?.job_offered ?? "-"}
                />
              )}
            </>
          ),
          style: {
            ...commonStyles.columnStyle("10%"),
            ...styles.justifyContentCenter,
            ...(isHeading
              ? {}
              : { borderColor: colors.lightGrey, borderTopWidth: 0.5 }),
          },
        };
        break;
      case 7:
        obj = {
          content: (
            <>
              {isHeading ? (
                <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                  {item?.offered_status ?? "-"}
                </CommonText>
              ) : (
                <Chip
                  customTextStyle={tableStyle}
                  bgColor={
                    item?.offered_status === "Accepted"
                      ? colors.lightGreen
                      : colors.lightOrangeThird
                  }
                  style={{
                    color:
                      item?.offered_status === "Accepted"
                        ? colors.green
                        : colors.red,
                  }}
                  isBackground
                  label={item?.offered_status ?? "-"}
                />
              )}
            </>
          ),
          style: {
            ...commonStyles.columnStyle("10%"),
            ...styles.justifyContentCenter,
            ...(isHeading
              ? {}
              : { borderColor: colors.lightGrey, borderTopWidth: 0.5 }),
          },
        };
        break;
      default:
        obj = {};
        break;
    }

    return [
      {
        content: (
          <CheckBox
            style={{
              //   ...tableStyle,
              ...{
                marginTop: 14,
                alignItems: "center",
              },
            }}
          />
        ),
        style: {
          ...commonStyles.columnStyle("4%"),
          ...styles.checkBoxStyle,
        },
      },

      {
        content: (
          <>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {item?.registrationNumber ?? "-"}
            </CommonText>
          </>
        ),
        style: {
          ...commonStyles.columnStyle("13%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.name ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("10%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <>
            <CommonText
              customTextStyle={{
                ...tableStyle,
              }}
            >
              {item?.gender ?? "-"}
            </CommonText>
          </>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <>
            <CommonText
              customTextStyle={{
                ...tableStyle,
              }}
            >
              {item?.age ?? "-"}
            </CommonText>
          </>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <>
            <CommonText
              customTextStyle={{
                ...tableStyle,
              }}
            >
              {item?.city ?? "-"}
            </CommonText>
          </>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <View style={styles.statusStyle}>
            <CommonText
              customTextStyle={{
                ...tableStyle,
              }}
            >
              {item?.country ?? "-"}
            </CommonText>
          </View>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <View>
            <CommonText customTextStyle={tableStyle}>
              {item?.ca_inter_rank ?? "-"}
            </CommonText>
          </View>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.ca_final_rank ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.ca_experience_rank ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.rank ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.category ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("8%"),
          ...styles.justifyContentCenter,
        },
      },
      {
        content: (
          <CommonText customTextStyle={tableStyle}>
            {item?.expected_salary ?? "-"}
          </CommonText>
        ),
        style: {
          ...commonStyles.columnStyle("12%"),
          ...styles.justifyContentCenter,
          ...(isHeading
            ? {}
            : { borderColor: colors.lightGrey, borderTopWidth: 0.5 }),
        },
      },
      obj ? obj : {},

      {
        content: (
          <View>
            {!isHeading && (
              <>
                <TouchableImage
                  onPress={() => {
                    // onIconPress(item);
                  }}
                  source={images.iconMore}
                  imageStyle={{ height: 20, width: 20 }}
                  isSvg={true}
                />
                {currentPopUpMessage === item.id && (
                  <View>
                    <PopupMessage
                      message={item?.action}
                      onPopupClick={(selectedItem) => {
                        setCurrentPopupMessage(-1);
                        // onEditPress(selectedItem.name, item);
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
          ...commonStyles.columnStyle("5%"),
          ...styles.justifyContentCenter,
        },
      },
    ];
  };

  return {
    allDataLoaded,
    currentPage,
    customFilterInfo,
    defaultCategory,
    filterApplyHandler,
    filterCategory,
    filterState,
    getColoumConfigs,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    headingTexts,
    getErrorDetails,
    isError,
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
    setFilterState,
    subHeadingText,
    tableIcon,
    candidateData: currentRecords,
    totalcards: candidateData?.meta?.total,
    initialFilterState,
    companyLocation,
    seletedCenter,
    setSeletedCenter,
    seletedTabs,
    setSelectedTabs,
  };
};

export default useShortListingConsent;
