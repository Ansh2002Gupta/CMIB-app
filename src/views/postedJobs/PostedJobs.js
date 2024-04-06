import React from "react";
import { Base } from "../../core/layouts";
import usePostedJobs from "./controllers/usePostedJobs";
import PostedJobsTemplate from "./PostedJobsTemplate";
import styles from "./styles";
import useFetch from "../../hooks/useFetch";

const PostedJobs = () => {
  // TODO: need to add job detail id in endpoint
  const { data } = useFetch({ url: "company/jobs/151" });

  const { jobDetail } = usePostedJobs({ state: data ?? {} });

  return (
    <Base style={styles.containerViewStyle}>
      <PostedJobsTemplate details={jobDetail} />
    </Base>
  );
};

export default PostedJobs;
