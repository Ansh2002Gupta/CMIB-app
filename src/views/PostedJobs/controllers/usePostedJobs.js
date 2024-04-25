import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";

import { jobDetailModel } from "./models";

const usePostedJobs = ({ state }) => {
  const intl = useIntl();
  const theme = useTheme();

  return {
    jobDetail: jobDetailModel(state, intl, theme),
  };
};

export default usePostedJobs;
