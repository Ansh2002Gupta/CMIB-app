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
  ROWS_PER_PAGE_ARRAY,
  getPassRejected,
  yesOrNot,
} from "../../../constants/constants";
import usePagination from "../../../hooks/usePagination";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import { urlService } from "../../../services/urlService";
import colors from "../../../assets/colors";
import images from "../../../images";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../constants/errorMessages";
import { navigations } from "../../../constants/routeNames";
import {
  APPLICATION,
  CENTRES,
  POST_JOB,
  ROUNDS,
  STATUS_UPDATE,
  USER_TYPE_COMPANY,
} from "../../../services/apiServices/apiEndPoint";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../ShortListingConsentCandidate.styles";
import CheckBox from "../../../components/CheckBox";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import Chip from "../../../components/Chip";
import { getQueryParams } from "../mappedData";
import { useIntl } from "react-intl";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { usePatch } from "../../../hooks/useApiRequest";

const isMob = Platform.OS.toLowerCase() !== "web";

const initialFilterState = {
  selectedExperience: 0,
  selectedPercentage: 0,
  selectedSalary: 0,
};

const useShortListingConsent = (id) => {
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();
  const intl = useIntl();

  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState;
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [seletedCenter, setSeletedCenter] = useState(0);
  const [selectedTabs, setSelectedTabs] = useState(0);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [selectedElement, setSelectedElements] = useState([]);
  const [filterState, setFilterState] = useState(initialFilterState);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const markedElement = useRef(null);
  const [filterOptions, setFilterOptions] = useState({
    selectedExperience: 0,
    selectedPercentage: 0,
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
  const popupRef = useRef();
  useOutsideClick(popupRef, () => setCurrentPopupMessage(-1));

  const {
    data: candidateData,
    isLoading,
    fetchData: fetchCandidateData,
    isError: isErrorGetCandidateData,
    error: errorGetCandidateData,
  } = useFetch({
    url: `${USER_TYPE_COMPANY}/${selectedModule?.key}/rounds/${id}/application/centres/32/candidates`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    makeRequest: updateShortListCandidate,
    error: errorWhileUpdating,
    setError: setErrorWhileUpdating,
    isLoading: isShortlistCandidateLoading,
    isError: isErrorWhileUpdating,
  } = usePatch({
    url:
      USER_TYPE_COMPANY +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      CENTRES +
      `/${id}` +
      STATUS_UPDATE,
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
  const isError = isErrorCompanyLocation || isErrorGetCandidateData;
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
  const experienceData = 0;

  const customFilterInfo = [
    {
      refKey: "value",
      name: "Experience",
      unit: "Years",
      type: FILTER_TYPE_ENUM.SLIDER,
      minimumSliderLimit: 0,
      maximumSliderLimit: 40,
      options: experienceData,
      selectedOptions: filterState?.selectedExperience,
      handler: handleFilterChange,
    },
    {
      refKey: "value",
      name: "Percentage",
      unit: "%",
      type: FILTER_TYPE_ENUM.SLIDER,
      minimumSliderLimit: 0,
      maximumSliderLimit: 40,
      options: experienceData,
      selectedOptions: filterState.selectedPercentage,
      handler: handleFilterChange,
    },
    {
      refKey: "value",
      name: "Salary",
      unit: "INR",
      type: FILTER_TYPE_ENUM.SLIDER,
      minimumSliderLimit: 0,
      maximumSliderLimit: 40,
      options: experienceData,
      selectedOptions: filterState.selectedSalary,
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
  }, [selectedModule]);

  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        perPage: rowsPerPage,
        page: currentPage,
        listType: getQueryParams(selectedTabs),
      };
      const initialData = await fetchCandidateData({
        queryParamsObject: requestedParams,
        overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidates`,
      });

      if (initialData) {
        setCurrentRecords(initialData?.records);
        if (initialData?.meta?.currentPage === initialData?.meta?.lastPage) {
          setAllDataLoaded(true);
        }
      }
      setIsFirstPageReceived(false);
    };
    if (isSuccess && companyLocation && selectedTabs) {
      fetchData();
    }
  }, [companyLocation, seletedCenter, selectedTabs]);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    params.listType = getQueryParams(selectedTabs);
    const newData = await fetchCandidateData({
      queryParamsObject: params,
      overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidates`,
    });

    setCurrentRecords(newData?.records ?? []);
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
          // status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          // approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
          listType: getQueryParams(selectedTabs),
          q: filterOptions.searchData,
        },
        overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidates`,
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
      q: filterOptions.searchData,
      perPage: rowsPerPage,
      page: page,
      // status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
      // approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
      // status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
      // approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
      q: filterOptions.searchData,
    });
  };

  const handleSearchResults = async (searchedData) => {
    setFilterOptions((prev) => ({ ...prev, q: searchedData }));
    if (isMob) {
      setCurrentPage(1);
      const newData = await fetchCandidateData({
        queryParamsObject: {
          q: searchedData,
          // status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          // approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
          listType: getQueryParams(selectedTabs),
        },
        overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidates`,
      });
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
        // status: filterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
        // approved: filterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
      });
    }
  };

  const returnSelectedFilterOption = (filterInfo, filterName) => {
    const filterObj = filterInfo?.find((obj) => obj.name === filterName);
    return filterObj?.selectedOptions;
  };

  const filterApplyHandler = async (filterInfo) => {
    const currentFilterOptions = {
      selectedExperience: returnSelectedFilterOption(
        filterInfo,
        "selectedExperience"
      ),
      selectedPercentage: returnSelectedFilterOption(
        filterInfo,
        "selectedPercentage"
      ),
      selectedSalary: returnSelectedFilterOption(filterInfo, "selectedSalary"),
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
          q: filterOptions.searchData,
          // status:
          //   currentFilterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
          // approved:
          //   currentFilterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
          listType: getQueryParams(selectedTabs),
        },
        overrideUrl: `company/${selectedModule?.key}/rounds/${id}/application/centres/${companyLocation[seletedCenter].id}/candidates`,
      });
      setCurrentRecords(newData?.records);
      if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
        setAllDataLoaded(true);
      } else {
        setAllDataLoaded(false);
      }
    } else {
      await updateCurrentRecords({
        q: filterOptions.searchData,
        // status: currentFilterOptions[POSTED_JOB_LISTING_ENUM.activeorInactive],
        // approved:
        //   currentFilterOptions[POSTED_JOB_LISTING_ENUM.approvedNotApproved],
        perPage: rowsPerPage,
        page: currentPage,
      });
    }
  };

  let headingTexts = [];
  let subHeadingText = [];
  let statusText = [];
  let tableIcon = images.iconMore;
  let filterCategory = ["Experience", "Percentage", "Salary"];
  let isHeading = true;
  const handleCheckbox = (item, isAllSelected) => {
    if (isAllSelected) {
      if (selectedElement.length === currentRecords.length) {
        setSelectedElements([]);
      } else {
        const newArray = currentRecords.map((item) => {
          return item.application_id;
        });
        setSelectedElements(newArray);
      }
    } else {
      const index = selectedElement.indexOf(item);
      if (index > -1) {
        const newArray = [
          ...selectedElement.slice(0, index),
          ...selectedElement.slice(index + 1),
        ];
        setSelectedElements(newArray);
      } else {
        const newArray = [...selectedElement, item];
        setSelectedElements(newArray);
      }
    }
  };
  const getUpdatedUrl = (selectedId) => {
    return (
      USER_TYPE_COMPANY +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${id}` +
      APPLICATION +
      CENTRES +
      `/${selectedId}` +
      STATUS_UPDATE
    );
  };

  const handleonClick = (selectedItem, item) => {
    if (selectedItem.name == "Shortlist Candidate") {
      const body = {
        application_ids: [item.application_id],
        status: "shortlisted",
        shortlisting_round: selectedTabs === 1 ? "first" : "second",
      };
      updateShortListCandidate({
        body,
        overrideUrl: getUpdatedUrl(companyLocation[seletedCenter].id),
      });
    } else if (selectedItem.name == "Update Written Test Result") {
      markedElement.current = {
        item,
        isMarked: false,
      };
      setIsModalVisible(true);
    } else if (selectedItem.name == "Mark Candidate as Offered") {
      markedElement.current = {
        item,
        isMarked: true,
      };
      setIsModalVisible(true);
    }
  };
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
              {isHeading ? (
                <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
                  {item?.consent ?? "-"}
                </CommonText>
              ) : (
                <CommonText customTextStyle={tableStyle}>
                  {item?.consent ? yesOrNot[item?.consent] : "-"}
                </CommonText>
              )}
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
                    item?.test_result == "pass"
                      ? colors.lightGreen
                      : colors.lightOrangeThird
                  }
                  style={{
                    color:
                      item?.test_result == "pass" ? colors.green : colors.red,
                  }}
                  isBackground
                  label={
                    item?.test_result ? getPassRejected[item?.test_result] : "-"
                  }
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
                    item?.job_offered == "yes"
                      ? colors.lightGreen
                      : colors.greyOne
                  }
                  style={{
                    color:
                      item?.job_offered == "yes" ? colors.green : colors.black,
                  }}
                  isBackground
                  label={item?.job_offered ? yesOrNot[item?.job_offered] : "-"}
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
    const optionArray = [
      {
        name: "View candidate Details",
        id: item.application_id,
      },
      {
        name: "Shortlist Candidate",
        id: item.application_id,
      },
    ];

    const tabsWithoutShortlist = new Set([3, 4, 5, 6, 7, 8]);

    if (tabsWithoutShortlist.has(selectedTabs)) {
      const shortlistIndex = optionArray.findIndex(
        (option) => option.name === "Shortlist Candidate"
      );
      if (shortlistIndex !== -1) {
        optionArray.splice(shortlistIndex, 1);
      }
    }
    switch (selectedTabs) {
      case 5:
        optionArray.push({
          name: "Update Written Test Result",
          id: item.application_id,
        });
        break;
      case 6:
        optionArray.push({
          name: "Mark Candidate as Offered",
          id: item.application_id,
        });
        break;
    }

    return [
      {
        content: (
          <CheckBox
            style={styles.checkboxViewStyle}
            isSelected={
              isHeading
                ? currentRecords.length != 0 &&
                  selectedElement.length === currentRecords.length
                : selectedElement.includes(item.application_id)
            }
            id={item.application_id}
            handleCheckbox={(item) => handleCheckbox(item, isHeading)}
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
              {item?.application_number ?? "-"}
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
                    setCurrentPopupMessage(item.application_id);
                  }}
                  source={images.iconMore}
                  imageStyle={{ height: 20, width: 20 }}
                  isSvg={true}
                />
                {currentPopUpMessage == item.application_id && (
                  <View ref={popupRef}>
                    <PopupMessage
                      message={optionArray}
                      onPopupClick={(selectedItem) => {
                        setCurrentPopupMessage(-1);
                        handleonClick(selectedItem, item);
                      }}
                      labelName={"name"}
                      customStyle={{
                        ...styles.popupContainer,
                        ...{ right: 130 },
                      }}
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
    selectedTabs,
    setSelectedTabs,
    markedElement,
    isModalVisible,
    setIsModalVisible,
    updateShortListCandidate,
    getUpdatedUrl,
  };
};

export default useShortListingConsent;
