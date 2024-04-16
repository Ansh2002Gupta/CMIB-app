import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "../../../routes";
import { Platform, View } from "@unthinkable/react-core-components";

import BadgeLabel from "../../../components/BadgeLabel/BadgeLabel";
import CommonText from "../../../components/CommonText";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import PopupMessage from "../../../components/PopupMessage/PopupMessage";
import useFetch from "../../../hooks/useFetch";

import usePagination from "../../../hooks/usePagination";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { COMPANY_LISTING } from "../../../services/apiServices/apiEndPoint";
import {
  COMPANY,
  FILTER_TYPE_ENUM,
  POPUP_OPTIONS,
  ROWS_PER_PAGE_ARRAY,
} from "../../../constants/constants";
import { navigations } from "../../../constants/routeNames";
import commonStyles from "../../../theme/styles/commonStyles";
import images from "../../../images";
import styles from "../PurchasedPackageDetail.style";
import { COMPANY_INACTIVE_SUBSCRIPTION_LISTING } from "../../../services/apiServices/apiEndPoint";
import { formatDate } from "../../../utils/util";
import TouchableImage from "../../../components/TouchableImage";

// const initialFilterState = {
//   selectedExperience: [],
//   selectedCurrentSalary: 0,
//   selectedFunctionalAreas: [],
//   selectedCategory: [],
// };

const usePackageInactiveHistory = (onViewPress) => {
  const isMob = Platform.OS.toLowerCase() !== "web";
  const defaultCategory = "Experience";
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const navigate = useNavigate();
  //   const [filterState, setFilterState] = useState(initialFilterState);
  //   const [filterOptions, setFilterOptions] = useState({
  //     experience: "",
  //     current_salary: "",
  //     functional_areas: "",
  //     education: "",
  //     category: "",
  //   });

  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );

  const {
    data: inactiveSubscriptionListData,
    isLoading: isInactiveSubscriptionListLoading,
    isError: isInactiveSubscriptionListError,
    error: errorInactiveSubscriptionListData,
    fetchData: fetchInactivePackage,
  } = useFetch({
    url: `${COMPANY_INACTIVE_SUBSCRIPTION_LISTING}`,
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

  //   const handleFilterChange = (selectedFilter, filterName, keyName) => {
  //     setFilterState((prevState) => {
  //       const filterObj = customFilterInfo.find(
  //         (info) => info.name === filterName
  //       );
  //       const filterKey = `selected${filterObj?.name}`;
  //       const existingSelectedOptions = prevState[filterKey];
  //       let newSelectedOptions = [];
  //       if (!!existingSelectedOptions) {
  //         if (filterObj?.type === FILTER_TYPE_ENUM.CHECKBOX) {
  //           newSelectedOptions = existingSelectedOptions?.includes(
  //             selectedFilter?.[keyName]
  //           )
  //             ? existingSelectedOptions?.filter(
  //                 (keyName) => keyName !== selectedFilter?.[keyName]
  //               )
  //             : [...existingSelectedOptions, selectedFilter?.[keyName]];
  //         } else {
  //           newSelectedOptions = selectedFilter.value;
  //         }
  //       }

  //       return {
  //         ...prevState,
  //         [filterKey]: newSelectedOptions,
  //       };
  //     });
  //   };

  //   const customFilterInfo = [
  //     {
  //       refKey: "id",
  //       name: "Experience",
  //       type: FILTER_TYPE_ENUM.CHECKBOX,
  //       options: [{ id: 1, name: "1 year" }], //TODO:experienceData
  //       selectedOptions: filterState?.selectedExperience,
  //       handler: handleFilterChange,
  //     },
  //     {
  //       refKey: "value",
  //       name: "CurrentSalary",
  //       type: FILTER_TYPE_ENUM.CHECKBOX,
  //       options: [],
  //       selectedOptions: filterState?.selectedCurrentSalary,
  //       handler: handleFilterChange,
  //     },
  //     {
  //       refKey: "id",
  //       name: "FunctionalAreas",
  //       type: FILTER_TYPE_ENUM.CHECKBOX,
  //       options: [],
  //       selectedOptions: filterState?.selectedFunctionalAreas,
  //       handler: handleFilterChange,
  //     },
  //     {
  //       refKey: "id",
  //       name: "Category",
  //       type: FILTER_TYPE_ENUM.CHECKBOX,
  //       options: [],
  //       selectedOptions: filterState?.selectedCategory,
  //       handler: handleFilterChange,
  //     },
  //   ];

  //   const returnSelectedFilterOption = (filterInfo, filterName) => {
  //     const filterObj = filterInfo?.find((obj) => obj.name === filterName);
  //     return filterObj?.selectedOptions;
  //   };

  //   const filterApplyHandler = async (filterInfo) => {
  //     const currentFilterOptions = {
  //       experience: returnSelectedFilterOption(filterInfo, "Experience"),
  //       current_salary: returnSelectedFilterOption(filterInfo, "CurrentSalary"),
  //       functional_areas: returnSelectedFilterOption(
  //         filterInfo,
  //         "FunctionalAreas"
  //       ),
  //       education: returnSelectedFilterOption(filterInfo, "Education"),
  //       category: returnSelectedFilterOption(filterInfo, "Category"),
  //     };
  //     setFilterOptions(currentFilterOptions);
  //     await updateCurrentRecords({
  //       perPage: rowsPerPage,
  //       page: currentPage,
  //       multiFacet: 1, //TODO: remove if not needed.
  //       experience: currentFilterOptions.experience,
  //       current_salary: currentFilterOptions.current_salary,
  //       functional_areas: currentFilterOptions.functional_areas,
  //       education: currentFilterOptions.education,
  //       category: currentFilterOptions.category,
  //     });
  //   };

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
  //       q: filterOptions.searchData,
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

  let headingTexts = ["package_name"];
  let subHeadingText = ["candidate_id"];
  let extraDetailsText = ["Experience"];
  let extraDetailsKey = ["total_experience"];
  let tableIcon = images.iconMore;
  let isHeading = true;
  //   let filterCategory = [
  //     "Experience",
  //     "Current Salary",
  //     "Functional Areas",
  //     "Category",
  //   ];

  const handlePopupItemClick = (data) => {
    switch (data?.trim().toLowerCase()) {
      case POPUP_OPTIONS?.[0]:
        return <></>;
      case POPUP_OPTIONS?.[1].trim().toLowerCase():
        navigate(`${navigations.CANDIDATE_DETAILS_SUBROUTE}/${data?.id || 1}`);
    }
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

  const refineColumnData = (data) => {
    if (!data || data.length === 0) return ["-"];
    if (data.length <= 2) return data;
    const extraItems = data.length - 2;
    const newData = [data[0], data[1], `+${extraItems}`];
    return newData;
  };

  // package_name: "Package Name",
  // description: "Package Description",
  // price: "Price",
  // validity: "Package Validuty Period",
  // start_date: "Start Date",
  // validity_date: "Validity Date",

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => onNameSorting("name")}>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.package_name ? item.package_name : "-"}
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
            {!!item.package_name ? item.package_name : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.description ? item.description : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {!!item.description ? item.description : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.price ? item.price : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {!!item.price ? item.price : "0"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("10%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.validity ? item.validity : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {!!item.validity ? item.validity : "0"} Days
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.start_date ? item.start_date : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {!!item.start_date ? formatDate(new Date(item.start_date)) : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CustomTouchableOpacity
          >
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {!!item.validity_date ? item.validity_date : "-"}
            </CommonText>
          </CustomTouchableOpacity>
        ) : (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {!!item.validity_date ? formatDate(new Date(item.validity_date)) : "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <View>
            {!isHeading && (
              <TouchableImage
                onPress={() => {
                  onViewPress && onViewPress(item);
                }}
                source={images.iconEye}
              />
            )}
          </View>
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
    jobSeekersData: inactiveSubscriptionListData?.records,
    loadingMore,
    rowsPerPage,
    subHeadingText,
    extraDetailsText,
    extraDetailsKey,
    tableIcon,
    totalcards: inactiveSubscriptionListData?.meta?.total,
  };
};

export default usePackageInactiveHistory;
