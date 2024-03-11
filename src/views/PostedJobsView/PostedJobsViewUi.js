import { View, ScrollView } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import IconHeader from "../../components/IconHeader/IconHeader";
import CardComponent from "../../components/CardComponent";
import HeaderComponent from "../../containers/PostedJobs/HeaderComponent";
import JobDetailsComponent from "../../containers/PostedJobs/JobDetailsComponent";
import PersonalDetails from "../../containers/PostedJobs/PersonalDetails";
import BottomSection from "../../containers/PostedJobs/BottomSection";
import styles from "./PostedJobsView.style";
import { useIntl } from "react-intl";

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
      <IconHeader
        headerText={
          isWebView
            ? intl.formatMessage({ id: "label.add_new_jobs" })
            : intl.formatMessage({ id: "label.posted_jobs" })
        }
      />
      <View style={styles.innerContainer}>
        <CardComponent customStyle={styles.extendedViewStyle(isExpanded)}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderComponent
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
            {isExpanded && (
              <View style={styles.mainViewStyle}>
                <JobDetailsComponent
                  isWebView={isWebView}
                  jobData={jobData}
                  handleJobDetailsChange={handleJobDetailsChange}
                />
                <PersonalDetails
                  isWebView={isWebView}
                  jobData={jobData}
                  handleJobDetailsChange={handleJobDetailsChange}
                  countryData={countryData}
                  functionalData={functionalData}
                />
                <BottomSection
                  isWebView={isWebView}
                  jobData={jobData}
                  handleJobDetailsChange={handleJobDetailsChange}
                />
              </View>
            )}
          </ScrollView>
        </CardComponent>
      </View>
    </View>
  );
};

export default PostedJobsViewUI;
