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
  setCountryData,
  setFunctionalData,
  setGenderPreference,
  setJobCategory,
  setJobLocation,
  setJobType,
  setWorkMode,
} from "../../../../globalContext/addJob/addJobActions";
const useGetAddNewJobData = () => {
  const [, addJobsDispatch] = useContext(AddJobContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
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
  const fetchViewData = async () => {
    try {
      setLoading(true);
      // Use axios or fetch to get data from the endpoints
      const responses = await Promise.all([
        Http.get(GET_JOB_TYPE),
        Http.get(GET_GENDER_PREFERENCE),
        Http.get(GET_CATERORY_PREFERENCE),
        Http.get(GET_WORK_MODE),
      ]);

      addJobsDispatch(setJobType(responses[0].data));
      addJobsDispatch(setGenderPreference(responses[1].data));
      addJobsDispatch(setJobCategory(responses[2].data));
      addJobsDispatch(setWorkMode(responses[3].data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchRemainingViewData = async () => {
    try {
      setLoading(true);
      const responses = await Promise.all([
        Http.get(COUNTRY_CODE),
        Http.get(GET_FUNCTIONAL_TYPE),
        Http.get(GET_JOB_LOCATION),
      ]);
      addJobsDispatch(setCountryData(responses[0].data));
      addJobsDispatch(setFunctionalData(responses[1].data));
      addJobsDispatch(setJobLocation(responses[2].data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

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
    fetchViewData,
    fetchRemainingViewData,
  };
};

export default useGetAddNewJobData;
