import { ROWS_PER_PAGE_ARRAY } from "../constants/constants";

export const getValidCurrentPage = (page) => {
  if (+page && +page > 0) {
    return +page;
  }
  return 1;
};

export const getValidRowPerPage = (rowsPerPage) => {
  if (
    +rowsPerPage &&
    +rowsPerPage > 0 &&
    ROWS_PER_PAGE_ARRAY.find((item) => item.value === +rowsPerPage)
  ) {
    return +rowsPerPage;
  }
  return ROWS_PER_PAGE_ARRAY[0].value;
};
