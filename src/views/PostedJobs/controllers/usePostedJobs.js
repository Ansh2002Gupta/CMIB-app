import { useIntl } from "react-intl";
import { jobDetailModel } from "./models";

const usePostedJobs = ({ state }) => {
  const intl = useIntl();
  return {
    jobDetail: jobDetailModel(state, intl),
  };
};

export default usePostedJobs;
