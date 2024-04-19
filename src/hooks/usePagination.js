import { useEffect } from "react";

import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../utils/queryParamsHelpers";
import { urlService } from "../services/urlService";

const usePagination = ({
  shouldSetQueryParamsOnMount,
  pageQueryParamName,
  rowPerPageQueryParamName,
  setCurrentPage,
  setRowPerPage,
}) => {
  const pageParam = pageQueryParamName || "page";
  const rowPerPageParam = rowPerPageQueryParamName || "rowsPerPage";

  const handlePagePerChange = (page) => {
    setCurrentPage && setCurrentPage(page);
    urlService.setQueryStringValue(pageParam, page);
  };

  const handleRowsPerPageChange = (rowsPerPage) => {
    setRowPerPage && setRowPerPage(rowsPerPage);
    urlService.setQueryStringValue(rowPerPageParam, rowsPerPage);
  };

  useEffect(() => {
    if (shouldSetQueryParamsOnMount) {
      const queryParams = {
        pageParam: getValidCurrentPage(
          +urlService.getQueryStringValue(pageParam)
        ),
        rowPerPageParam: getValidRowPerPage(
          +urlService.getQueryStringValue(rowPerPageParam)
        ),
      };
      urlService.setMultipleQueryStringValues(queryParams);
    }
  }, []);

  return { handlePagePerChange, handleRowsPerPageChange };
};

export default usePagination;
