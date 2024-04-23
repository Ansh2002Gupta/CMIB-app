import React, { useEffect, useState } from "react";

import BadgeLabel from "../../../components/BadgeLabel/BadgeLabel";
import CommonText from "../../../components/CommonText";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import CustomImage from "../../../components/CustomImage";
import TouchableImage from "../../../components/TouchableImage";
import usePagination from "../../../hooks/usePagination";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../../../utils/queryParamsHelpers";
import { urlService } from "../../../services/urlService";
import { JobSeekersData } from "../dummyData";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";
import images from "../../../images";
import commonStyles from "../../../theme/styles/commonStyles";
import styles from "../JobSeekers.style";

const useJobSeekers = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  //TODO: Update the filter options when filter is applied
  // const [filterOptions, setFilterOptions] = useState({
  //   experience: "",
  //   current_salary: "",
  //   expected_annual_salary: "",
  //   functional_areas: "",
  //   it_skills: "",
  //   soft_skills: "",
  //   education: "",
  //   gender: "",
  //   marital_status: "",
  //   category: "",
  //   age: "",
  //   posting: "",
  //   language: "",
  // });

  const [rowsPerPage, setRowPerPage] = useState(
    getValidRowPerPage(urlService.getQueryStringValue("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );
  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(urlService.getQueryStringValue("page"))
  );

  //TODO: API Call to get listing
  // const {
  //   data: jobSeekersData,
  //   isLoading: isGeetingJobbSeekers,
  //   fetchData: fetchJobSeekers,
  //   isError: isErrorGettingJobSeekers,
  //   error: errorGettingJobSeekers,
  // } = useFetch({
  //   url: '',
  //   otherOptions: {
  //     skipApiCallOnMount: true,
  //   },
  // });

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
      // TODO: fetch data from api
      // const requestedParams = {
      //   perPage: rowsPerPage,
      //   page: currentPage,
      // };
      // const initialData = await fetchJobSeekers({
      //   queryParamsObject: requestedParams,
      // });
      // if (initialData && initialData?.records?.length > 0) {
      //   setCurrentRecords(initialData?.records);
      //   if (initialData?.records?.length < rowsPerPage && isMob) {
      //     setAllDataLoaded(true);
      //   }
      // }
      // setIsFirstPageReceived(false);
    };
    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;

  const updateCurrentRecords = async (params) => {
    //TODO: API call to get updated listing data
    // const newData = await fetchDataTicketListing({
    //   queryParamsObject: params,
    // });
    // setCurrentRecords(newData?.records);
  };

  const handleLoadMore = async () => {
    //TODO: Api call to get more data
    // if (loadingMore || allDataLoaded) return;
    // setLoadingMore(true);
    // const nextPage = currentPage + 1;
    // try {
    //   const newData = await fetchJobSeekers({
    //     queryParamsObject: {
    //       perPage: rowsPerPage,
    //       page: nextPage,
    //     },
    //   });
    //   if (newData && newData?.records?.length > 0) {
    //     setCurrentRecords((prevRecords) => [
    //       ...prevRecords,
    //       ...newData.records,
    //     ]);
    //   }
    //   setCurrentPage(nextPage);
    //   if (newData?.meta?.currentPage === newData?.meta?.lastPage) {
    //     setAllDataLoaded(true);
    //   }
    // } catch (error) {
    //   console.error("Error fetching job seekers on load more:", error);
    // } finally {
    //   setLoadingMore(false);
    // }
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
    //TODO: API call to get searched result
    // setIsFirstPageReceived(true);
    // setFilterOptions((prev) => ({ ...prev, searchData: searchedData }));
    // if (isMob) {
    //   setCurrentPage(1);
    //   const newData = await fetchJobSeekers({
    //     queryParamsObject: {
    //       q: searchedData,
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
    //   });
    // }
  };

  const filterApplyHandler = async () => {
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
  };

  let headingTexts = ["company_name"];
  let tableIcon = images.iconMore;
  let isHeading = true;
  let filterCategory = [
    "Experience",
    "Current Salary",
    "Expected Annual Salary",
    "Functional Area",
    "IT Skills",
    "Soft Skills",
    "Education",
    "Gender",
    "Marital Status",
    "Category",
    "Age",
    "Posting",
    "Language",
  ];

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? styles.tableHeadingText
      : styles.cellTextStyle();
    return [
      {
        content: isHeading ? (
          <CustomTouchableOpacity onPress={() => {}}>
            <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
              {item.company_name}
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
            {item.company_name}
          </CommonText>
        ),
        style: commonStyles.columnStyle("25%"),
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
            {item?.total_experience || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: isHeading ? (
          <CommonText customTextStyle={tableStyle}>
            {item?.functional_area || "-"}
          </CommonText>
        ) : (
          <BadgeLabel
            badgeLabels={item.functional_area}
            customContainerStyle={styles.badgeContainerStyle}
            customTextStyle={styles.labelStyle}
          />
        ),
        style: commonStyles.columnStyle("25%"),
        isFillSpace: true,
      },
      {
        content: !isHeading && (
          <TouchableImage
            onPress={() => {}}
            source={images.iconMore}
            imageStyle={styles.iconMore}
            isSvg={true}
          />
        ),
        style: {
          ...commonStyles.columnStyle("10%"),
          ...styles.iconMoreColumn,
        },
        isFillSpace: true,
      },
    ];
  };

  return {
    allDataLoaded,
    currentPage,
    filterApplyHandler,
    getColoumConfigs,
    handleLoadMore,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    getErrorDetails,
    indexOfFirstRecord,
    indexOfLastRecord,
    isFirstPageReceived,
    loadingMore,
    rowsPerPage,
    jobSeekersData: JobSeekersData.records || currentRecords, //TODO: Remove dummy data after api integration
    totalcards: JobSeekersData?.meta?.total,
    filterCategory,
    headingTexts,
    tableIcon,
    isHeading,
  };
};

export default useJobSeekers;
