import React, { useEffect, useState } from "react";
import CardComponent from "../../../components/CardComponent";
import { ScrollView, View } from "@unthinkable/react-core-components";
import HeaderComponent from "../HeaderComponent";
import JobDetailsComponent from "../JobDetailsComponent";
import PersonalDetails from "../PersonalDetails";
import BottomSection from "../BottomSection";
import { useIntl } from "react-intl";
import styles from "./AddJobComponent.styles";
import { progressData } from "../../../constants/constants";
import { validateJobData } from "../../../utils/util";
const AddJobComponent = ({
  isExpanded,
  jobData,
  handleJobDetailsChange,
  setIsExpanded,
  isWebView,
  error,
}) => {
  const intl = useIntl();
  const [jobProgress, setJobProgress] = useState(0);
  useEffect(() => {
    if (!isExpanded) {
      const { isValid, errors } = validateJobData(jobData);
      if (isValid) {
        setJobProgress(3);
      } else if (Object.keys(errors).length > 8) {
        setJobProgress(0);
      } else if (Object.keys(errors).length > 5) {
        setJobProgress(1);
      } else if (Object.keys(errors).length > 3) {
        setJobProgress(2);
      }
    }
  }, [isExpanded]);

  return (
    <CardComponent customStyle={styles.extendedViewStyle(isExpanded)}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <HeaderComponent
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isQuestion={false}
          progressJobData={progressData[jobProgress]}
          headerText={intl.formatMessage({ id: "label.job_details" })}
        />
        {isExpanded && (
          <View style={styles.mainViewStyle}>
            <JobDetailsComponent
              isWebView={isWebView}
              jobData={jobData}
              error={error}
              handleJobDetailsChange={handleJobDetailsChange}
            />
            <PersonalDetails
              isWebView={isWebView}
              jobData={jobData}
              error={error}
              handleJobDetailsChange={handleJobDetailsChange}
            />
            <BottomSection
              isWebView={isWebView}
              jobData={jobData}
              error={error}
              handleJobDetailsChange={handleJobDetailsChange}
            />
          </View>
        )}
      </ScrollView>
    </CardComponent>
  );
};
export default AddJobComponent;
