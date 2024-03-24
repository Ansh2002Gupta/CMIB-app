import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import {
  ScrollView,
  useWindowDimensions,
} from "@unthinkable/react-core-components";

import DetailCard from "../../../../components/DetailCard";
import MultiRow from "../../../../core/layouts/MultiRow";
import styles from "./PreInterviewPreferences.style";

const PreInterviewPreferencesTemplate = ({
  handleInterviewPreferences,
  preInterviewDetails,
}) => {
  const intl = useIntl();
  const windowWidth = useWindowDimensions()?.width;

  const JobDetailsConfig = [
    {
      content: (
        <DetailCard
          headerId={intl.formatMessage({
            id: "label.pre_interview_prefrences",
          })}
          details={preInterviewDetails?.preInterviewPrefrences}
          handleChange={handleInterviewPreferences}
          isEditProfile
          customCardStyle={styles.cardStyle}
          customContainerStyle={styles.customContainerStyle(windowWidth)}
        />
      ),
    },
  ];

  return (
    <ScrollView style={styles.mainContainer}>
      <MultiRow rows={JobDetailsConfig} />
    </ScrollView>
  );
};

PreInterviewPreferencesTemplate.defaultProps = {
  preInterviewDetails: {},
};

PreInterviewPreferencesTemplate.propTypes = {
  preInterviewDetails: PropTypes.object,
};

export default PreInterviewPreferencesTemplate;
