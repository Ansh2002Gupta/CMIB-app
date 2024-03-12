import { View, ScrollView } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import IconHeader from "../../components/IconHeader/IconHeader";
import styles from "./PostedJobsView.style";
import { useIntl } from "react-intl";
import AddJobComponent from "../../containers/PostedJobs/AddJobComponent";
import FooterComponent from "../../containers/PostedJobs/FooterComponent";

const PostedJobsViewUI = ({
  isWebView,
  jobData,
  handleJobDetailsChange,
  countryData,
  functionalData,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const intl = useIntl();
  return (
    <View style={styles.container}>
      <ScrollView>
        <IconHeader
          headerText={
            isWebView
              ? intl.formatMessage({ id: "label.add_new_jobs" })
              : intl.formatMessage({ id: "label.posted_jobs" })
          }
        />
        <View style={styles.innerContainer}>
          <AddJobComponent
            isExpanded={isExpanded}
            jobData={jobData}
            handleJobDetailsChange={handleJobDetailsChange}
            setIsExpanded={setIsExpanded}
            isWebView={isWebView}
            countryData={countryData}
            functionalData={functionalData}
          />
          <FooterComponent isWebView={isWebView} />
        </View>
      </ScrollView>
    </View>
  );
};

export default PostedJobsViewUI;
