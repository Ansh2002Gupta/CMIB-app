import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "../../../routes";
import { useTheme } from "@unthinkable/react-theme";
import {
  Platform,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import BadgeLabel from "../../../components/BadgeLabel/BadgeLabel";
import CommonText from "../../../components/CommonText";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import useFetch from "../../../hooks/useFetch";

import usePagination from "../../../hooks/usePagination";
import { capitalizePhrase } from "../../../utils/util";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { urlService } from "../../../services/urlService";
import { COMPANY_LISTING } from "../../../services/apiServices/apiEndPoint";
import {
  FILTER_TYPE_ENUM,
  POPUP_OPTIONS,
  ROWS_PER_PAGE_ARRAY,
} from "../../../constants/constants";
import { navigations } from "../../../constants/routeNames";
import commonStyles from "../../../theme/styles/commonStyles";
import images from "../../../images";
import getStyles from "../JobSeekers.style";
import TouchableImage from "../../../components/TouchableImage";
import useOutsideClick from "../../../hooks/useOutsideClick";

const initialFilterState = {
  selectedExperience: [],
  selectedCurrentSalary: 0,
  selectedFunctionalAreas: [],
  selectedCategory: [],
};

const useJobSeekers = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const isMob = Platform.OS.toLowerCase() !== "web";
  const defaultCategory = "Experience";
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const navigate = useNavigate();
  const [filterState, setFilterState] = useState(initialFilterState);
  const [currentPopUpMessage, setCurrentPopupMessage] = useState(-1);
  const popupRef = useRef(null);
  useOutsideClick(popupRef, () => setCurrentPopupMessage(-1));

  const onIconPress = (item) => {
    setCurrentPopupMessage(item.id);
  };

  const [filterOptions, setFilterOptions] = useState({
    experience: "",
    current_salary: "",
    functional_areas: "",
    education: "",
    category: "",
  });

  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(urlService.getQueryStringValue("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(urlService.getQueryStringValue("page"))
  );

  const {
    data: jobSeekersData,
    isLoading: isGeetingJobbSeekers,
    fetchData: fetchJobSeekers,
    isError: isErrorGettingJobSeekers,
    error: errorGettingJobSeekers,
  } = useFetch({
    url: COMPANY_LISTING,
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
    //   if (isErrorGettingJobSeekers)
    //     return {
    //       errorMessage: errorGettingJobSeekers?.data?.message,
    //       onRetry: () => fetchJobSeekers({}),
    //     };
    //   return {
    //     errorMessage: "",
    //     onRetry: () => {},
    //   };
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestedParams = {
        perPage: rowsPerPage,
        page: currentPage,
      };
      const initialData = await fetchJobSeekers({
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
    const newData = await fetchJobSeekers({
      queryParamsObject: params,
    });
    setCurrentRecords(newData?.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchJobSeekers({
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
      console.error("Error fetching job seekers on load more:", error);
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
      const newData = await fetchJobSeekers({
        queryParamsObject: {
          keyword: searchedData,
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
      });
    }
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
            ? existingSelectedOptions?.filter(
                (keyName) => keyName !== selectedFilter?.[keyName]
              )
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
      name: "Experience",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: [{ id: 1, name: "1 year" }], //TODO:experienceData
      selectedOptions: filterState?.selectedExperience,
      handler: handleFilterChange,
    },
    {
      refKey: "value",
      name: "CurrentSalary",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: [],
      selectedOptions: filterState?.selectedCurrentSalary,
      handler: handleFilterChange,
    },
    {
      refKey: "id",
      name: "FunctionalAreas",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: [],
      selectedOptions: filterState?.selectedFunctionalAreas,
      handler: handleFilterChange,
    },
    {
      refKey: "id",
      name: "Category",
      type: FILTER_TYPE_ENUM.CHECKBOX,
      options: [],
      selectedOptions: filterState?.selectedCategory,
      handler: handleFilterChange,
    },
  ];

  const returnSelectedFilterOption = (filterInfo, filterName) => {
    const filterObj = filterInfo?.find((obj) => obj.name === filterName);
    return filterObj?.selectedOptions;
  };

  const filterApplyHandler = async (filterInfo) => {
    const currentFilterOptions = {
      experience: returnSelectedFilterOption(filterInfo, "Experience"),
      current_salary: returnSelectedFilterOption(filterInfo, "CurrentSalary"),
      functional_areas: returnSelectedFilterOption(
        filterInfo,
        "FunctionalAreas"
      ),
      education: returnSelectedFilterOption(filterInfo, "Education"),
      category: returnSelectedFilterOption(filterInfo, "Category"),
    };
    setFilterOptions(currentFilterOptions);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      multiFacet: 1, //TODO: remove if not needed.
      experience: currentFilterOptions.experience,
      current_salary: currentFilterOptions.current_salary,
      functional_areas: currentFilterOptions.functional_areas,
      education: currentFilterOptions.education,
      category: currentFilterOptions.category,
    });
  };

  // const filterApplyHandler = async () => {
  //TODO: Api call on applying filter
  // setIsFirstPageReceived(true);
  // setFilterOptions((prev) => ({
  //   ...prev,
  // }));
  // if (isMob) {
  //   setLoadingMore(false);
  //   setCurrentPage(1);
  //   const newData = await fetchJobSeekers({
  //     queryParamsObject: {
  //       keyword: filterOptions.searchData,
  //     },
  //   });
  //   setCurrentRecords(newData?.records);
  //   setIsFirstPageReceived(false);
  //   if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
  //     setAllDataLoaded(true);
  //   } else {
  //     setAllDataLoaded(false);
  //   }
  // } else {
  //   await updateCurrentRecords({
  //     perPage: rowsPerPage,
  //     page: currentPage,
  //   });
  // }
  // };

  let headingTexts = ["name"];
  let subHeadingText = ["candidate_id"];
  let extraDetailsText = ["Experience"];
  let extraDetailsKey = ["total_experience"];
  let tableIcon = images.iconMore;
  let isHeading = true;
  let filterCategory = [
    "Experience",
    "Current Salary",
    "Functional Areas",
    "Category",
  ];

  const handlePopupItemClick = ({ option, item }) => {
    switch (option?.trim().toLowerCase()) {
      case POPUP_OPTIONS?.[0].name.trim().toLowerCase():
        return <></>;
      case POPUP_OPTIONS?.[1].name.trim().toLowerCase():
        navigate(`${navigations.CANDIDATE_DETAILS_SUBROUTE}/${item?.id || 1}`);
    }
  };

  const onNameSorting = async (sortBy) => {
    setIsAscendingOrder((prev) => !prev);
    await updateCurrentRecords({
      perPage: rowsPerPage,
      page: currentPage,
      sortBy: sortBy,
      sortOrder: !isAscendingOrder ? "asc" : "desc",
    });
  };

  const refineColumnData = (data) => {
    if (!data || data.length === 0) return ["-"];
    if (data.length <= 2) return data;
    const extraItems = data.length - 2;
    const newData = [data[0], data[1], `+${extraItems}`];
    return newData;
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
            <CommonText customTextStyle={tableStyle}>
              {!!item.name ? item.name : "-"}
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
          <TouchableOpacity
            onPress={() => {
              navigate(
                `${navigations.CANDIDATE_DETAILS_SUBROUTE}/${item?.id || 1}`
              );
            }}
            style={styles.cursorStyle}
          >
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.name ? capitalizePhrase(item.name) : "-"}
            </CommonText>
          </TouchableOpacity>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("candidate_id")}>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.candidate_id ? item.candidate_id : "-"}
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
            {!!item.candidate_id ? item.candidate_id : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("25%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity
            onPress={() => onNameSorting("total_experience")}
          >
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.total_experience ? item.total_experience : "0"}
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
            {!!item.total_experience ? item.total_experience : "0"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CommonText customTextStyle={tableStyle}>
            {item?.functional_area || "-"}
          </CommonText>
        ) : (
          <BadgeLabel
            badgeLabels={refineColumnData(item?.functional_area)}
            customContainerStyle={styles.badgeContainerStyle}
            customTextStyle={styles.labelStyle}
          />
        ),
        style: commonStyles.columnStyle("25%"),
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
              imageStyle={{ height: 20, width: 20 }}
              isSvg={true}
            />
            {currentPopUpMessage === item.id && (
              <View ref={popupRef}>
                <PopupMessage
                  key={item?.id || 0}
                  data={item}
                  message={POPUP_OPTIONS}
                  onPopupClick={(option) => {
                    handlePopupItemClick({ option: option?.name, item: item });
                  }}
                />
              </View>
            )}
          </>
        ),
        style: {
          ...commonStyles.columnStyle("5%"),
          ...styles.iconMoreColumn,
        },
        isFillSpace: true,
      },
    ];
  };

  return {
    defaultCategory,
    allDataLoaded,
    currentPage,
    currentRecords,
    setCurrentRecords,
    customFilterInfo,
    filterApplyHandler,
    filterCategory,
    filterOptions,
    filterState,
    setFilterState,
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
    isGeetingJobbSeekers,
    isHeading,
    jobSeekersData: jobSeekersData?.records,
    loadingMore,
    rowsPerPage,
    subHeadingText,
    extraDetailsText,
    extraDetailsKey,
    tableIcon,
    totalcards: jobSeekersData?.meta?.total,
  };
};

export default useJobSeekers;
