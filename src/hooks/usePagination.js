import { useEffect } from "react";
import { useSearchParams } from "../routes";

import {
  getValidCurrentPage,
  getValidRowPerPage,
} from "../utils/queryParamsHelpers";

const usePagination = ({
  shouldSetQueryParamsOnMount,
  pageQueryParamName,
  rowPerPageQueryParamName,
  setCurrentPage,
  setRowPerPage,
}) => {
  const pageParam = `${pageQueryParamName || "page"}`;
  const rowPerPageParam = `${rowPerPageQueryParamName || "rowsPerPage"}`;

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePagePerChange = (page) => {
    setCurrentPage && setCurrentPage(page);
    setSearchParams((prev) => {
      prev.set(pageParam, page);
      return prev;
    });
  };

  const handleRowsPerPageChange = (rowsPerPage) => {
    setRowPerPage && setRowPerPage(rowsPerPage);
    setSearchParams((prev) => {
      prev.set(rowPerPageParam, rowsPerPage);
      return prev;
    });
  };

  useEffect(() => {
    if (shouldSetQueryParamsOnMount) {
      setSearchParams((prev) => {
        prev.set(pageParam, getValidCurrentPage(+searchParams.get(pageParam)));
        return prev;
      });
      setSearchParams((prev) => {
        prev.set(
          rowPerPageParam,
          getValidRowPerPage(+searchParams.get(rowPerPageParam))
        );
        return prev;
      });
    }
  }, []);

  return { handlePagePerChange, handleRowsPerPageChange };
};

export default usePagination;
