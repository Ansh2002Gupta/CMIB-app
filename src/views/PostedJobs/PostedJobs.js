import React from "react";
import { Base } from "../../core/layouts";
import usePostedJobs from "./controllers/usePostedJobs";
import PostedJobsTemplate from "./PostedJobsTemplate";
import styles from "./styles";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
import { View } from "@unthinkable/react-core-components";
import { STATUS_CODES } from "../../constants/constants";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useParams } from "react-router";
import { GET_JOB_DETAIL } from "../../services/apiServices/apiEndPoint";

const PostedJobs = () => {
  let { jobId } = useParams();

  const { data, isLoading, error } = useFetch({
    url: `${GET_JOB_DETAIL}/${jobId}`,
  });

  const fetchJobError = error?.data;

  const { jobDetail } = usePostedJobs({ state: data ?? {} });

  if (isLoading) {
    return (
      <View style={styles.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (fetchJobError && fetchJobError?.code !== STATUS_CODES.UNAUTHORIZED_USER) {
    return <ErrorComponent errorMsg={fetchJobError?.message} />;
  }

  return (
    <Base style={styles.containerViewStyle}>
      <PostedJobsTemplate details={jobDetail} />
    </Base>
  );
};

export default PostedJobs;
