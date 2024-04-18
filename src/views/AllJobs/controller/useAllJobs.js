import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router";
import { navigations } from "../../../constants/routeNames";
import usePagination from "../../../hooks/usePagination";
import { Platform } from "@unthinkable/react-core-components";
import { SEARCH_JOBS } from "../../../services/apiServices/apiEndPoint";
import { ROWS_PER_PAGE_ARRAY } from "../../../constants/constants";

const useAllJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowPerPage] = useState(ROWS_PER_PAGE_ARRAY[0].value);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFirstPageReceived, setIsFirstPageReceived] = useState(true);

  const isMob = Platform.OS.toLowerCase() !== "web";

  const {
    data: jobData,
    isLoading: isJobListLoading,
    fetchData: fetchSavedJobList,
    error: allJobsError,
  } = useFetch({
    url: SEARCH_JOBS,
    apiOptions: { params: { multiFacet: 1 } },
    otherOptions: { skipApiCallOnMount: true },
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const { handlePagePerChange, handleRowsPerPageChange } = usePagination({
    shouldSetQueryParamsOnMount: true,
    setCurrentPage,
    setRowPerPage,
  });

  const updateCurrentRecords = async (params) => {
    setCurrentRecords([]);
    const newData = await fetchSavedJobList({
      queryParamsObject: { perPage: rowsPerPage, ...params },
    });
    setCurrentRecords(newData?.records);
  };

  const handleLoadMore = async () => {
    if (loadingMore || allDataLoaded) return;
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    try {
      const newData = await fetchSavedJobList({
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
      page,
    });
  };

  const handleRowPerPageChange = async (option) => {
    handleRowsPerPageChange(option.value);
    await updateCurrentRecords({
      perPage: option.value,
      page: currentPage,
    });
  };

  const handleSearch = async (searchText) => {
    if (isMob) {
      setIsFirstPageReceived(true);
      setCurrentPage(1);
      const newData = await fetchSavedJobList({
        queryParamsObject: { perPage: rowsPerPage, q: searchText },
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
        q: searchText,
        page: currentPage,
      });
    }
  };

  const fetchInitialData = async () => {
    const requestedParams = {
      perPage: rowsPerPage,
      page: currentPage,
    };
    const initialData = await fetchSavedJobList({
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

  const handleClickOnJobCard = (jobId) => {
    navigate(`${navigations.CA_JOBS}/${navigations.JOB_DETAIL}/${jobId}`);
  };

  return {
    currentPage,
    data: currentRecords,
    setData: setCurrentRecords,
    isJobListLoading,
    totalPages: jobData?.meta?.total,
    handleLoadMore,
    handleSearch,
    handleClickOnJobCard,
    handlePageChange,
    handlePagePerChange,
    rowsPerPage,
    allJobsError,
    handleRowPerPageChange,
    isFirstPageReceived,
  };
};

export default useAllJobs;
