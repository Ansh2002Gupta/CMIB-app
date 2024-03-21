import React from "react";
import CardComponent from "../../../components/CardComponent";
import { ScrollView, View } from "@unthinkable/react-core-components";
import HeaderComponent from "../HeaderComponent";
import JobDetailsComponent from "../JobDetailsComponent";
import PersonalDetails from "../PersonalDetails";
import BottomSection from "../BottomSection";
import { useIntl } from "react-intl";
import styles from "./AddJobComponent.styles";
const AddJobComponent = ({
  isExpanded,
  jobData,
  handleJobDetailsChange,
  setIsExpanded,
  isWebView,
  error,
}) => {
  const intl = useIntl();

  return (
    <CardComponent customStyle={styles.extendedViewStyle(isExpanded)}>
      <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
        <HeaderComponent
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
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
