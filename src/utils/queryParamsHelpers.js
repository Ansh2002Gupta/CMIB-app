import * as _ from "lodash";

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

export const objectToQueryString = (requestedParams) => {
  let queryString = "";
  const validParams = _.omitBy(
    requestedParams,
    (v) =>
      _.isUndefined(v) ||
      _.isNull(v) ||
      v === "" ||
      (Array.isArray(v) && v.length === 0)
  );
  const keys = Object.keys(validParams);
  for (let key of keys) {
    queryString += `${key}=${validParams[key]}&`;
  }
  return queryString.slice(0, queryString.length - 1);
};
