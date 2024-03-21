import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios"; // or another HTTP client of your choice
import {
  COUNTRY_CODE,
  GET_CATERORY_PREFERENCE,
  GET_FUNCTIONAL_TYPE,
  GET_GENDER_PREFERENCE,
  GET_JOB_LOCATION,
  GET_JOB_TYPE,
  GET_WORK_MODE,
} from "../../apiEndPoint";
import Http from "../../../http-service";
import { AddJobContext } from "../../../../globalContext/addJob/addJobsProvider";
import {
  modifyFilteredjobLocation,
  setCountryData,
  setFunctionalData,
  setGenderPreference,
  setJobCategory,
  setJobLocation,
  setJobType,
  setWorkMode,
} from "../../../../globalContext/addJob/addJobActions";
import { Platform } from "@unthinkable/react-core-components";
const useGetPostedJobsData = () => {
  const [, addJobsDispatch] = useContext(AddJobContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetchedRef = useRef(false); // useRef to track if data has been fetched

  const fetchData = async () => {
    if (hasFetchedRef.current) {
      // If data has already been fetched, don't fetch it again
      return;
    }
    try {
      hasFetchedRef.current = true;
      setLoading(true);
      // Use axios or fetch to get data from the endpoints
      const responses = await Promise.all([
        Http.get(COUNTRY_CODE),
        Http.get(GET_FUNCTIONAL_TYPE),
        Http.get(GET_JOB_LOCATION),
        Http.get(GET_GENDER_PREFERENCE),
        Http.get(GET_WORK_MODE),
        Http.get(GET_CATERORY_PREFERENCE),
        Http.get(GET_JOB_TYPE),
      ]);
      addJobsDispatch(setCountryData(responses[0].data));
      addJobsDispatch(setFunctionalData(responses[1].data));
      addJobsDispatch(setJobLocation(responses[2].data));
      addJobsDispatch(setGenderPreference(responses[3].data));
      addJobsDispatch(setWorkMode(responses[4].data));
      addJobsDispatch(setJobCategory(responses[5].data));
      addJobsDispatch(setJobType(responses[6].data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  // useEffect to call fetchData on component mount
  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchData();
    }
  }, []); // Empty dependency array ensures this runs once on mount
  const fetchSearch = async (data) => {
    setLoading(true);
    return Http.get(`${GET_JOB_LOCATION}?city=${data ? data : ""}`)
      .then((response) => {
        addJobsDispatch(setJobLocation(response.data));
        return response.data;
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    isLoading: loading,
    isSuccess: !loading && !error,
    isError: !!error,
    isErrorData: error,
    fetchData,
    fetchSearch,
  };
};

export default useGetPostedJobsData;
