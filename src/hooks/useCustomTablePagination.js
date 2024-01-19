import { useState, useEffect } from "react";
import { ROWS_PER_PAGE_ARRAY } from "../constants/constants";
import { useSearchParams } from "../routes";
import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../utils/queryParamsHelpers";

const useCustomTablePagination = (data) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rowsToShow, setRowsToShow] = useState(
    getValidRowPerPage(searchParams.get("rowsPerPage")) ||
      ROWS_PER_PAGE_ARRAY[0].value
  );

  const [currentPage, setCurrentPage] = useState(
    getValidCurrentPage(searchParams.get("page"))
  );
  const [currentRecords, setCurrentRecords] = useState([]);

  let indexOfLastRecord;
  let indexOfFirstRecord;

  const fetchData = (pageNumber, rowPerPage) => {
    indexOfLastRecord = pageNumber * rowPerPage;
    indexOfFirstRecord = indexOfLastRecord - rowPerPage;
    let newRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(newRecords);
  };

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("page", getValidCurrentPage(+searchParams.get("page")));
      return prev;
    });
    setSearchParams((prev) => {
      prev.set(
        "rowsPerPage",
        getValidRowPerPage(+searchParams.get("rowsPerPage"))
      );
      return prev;
    });
    fetchData(currentPage, rowsToShow);
  }, []);

  const totalcards = data.length;

  const handleSearchResults = (searchedData) => {
    //TODO: Implement searching
  };

  const handleRowPerPageChange = (option) => {
    setRowsToShow(option.value);
    setSearchParams((prev) => {
      prev.set("rowsPerPage", option.value);
      return prev;
    });
    fetchData(currentPage, option.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams((prev) => {
      prev.set("page", page);
      return prev;
    });
    fetchData(page, rowsToShow);
  };
  return {
    currentPage,
    currentRecords,
    handlePageChange,
    handleRowPerPageChange,
    handleSearchResults,
    rowsToShow,
    setCurrentRecords,
    totalcards,
  };
};

export default useCustomTablePagination;
