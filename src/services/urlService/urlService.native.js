import * as _ from "lodash";

class UrlServiceClass {
  getQueryStringValue = () => {
    return "";
  };

  setQueryStringWithoutPageReload = () => {};

  setQueryStringValue = () => {};

  setMultipleQueryStringValues = () => {};

  removeParam = () => {};

  objectToQueryString = (requestedParams) => {
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
}

export const urlService = new UrlServiceClass();
