import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Platform, View } from "@unthinkable/react-core-components";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";

import ActionPairButton from "../ActionPairButton";
import CommonText from "../CommonText";
import JobCardMobile from "./JobCardMobile";
import JobCardWeb from "./JobCardWeb";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import style from "./SavedJobComponent.style";

const SavedJobComponent = ({
  details,
  handleRemove,
  handleApply,
  isLoading,
}) => {
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";
  const { isWebView } = useIsWebView();

  const cardDetails = {
    companyName: details?.company_name,
    createdAt: details?.created_at,
    jobPostion: details?.designation,
    jobDescription: details?.detail,
    jobLocation: details?.location,
    vaccancies: details?.vacancy,
    minSalary: details?.min_salary,
    maxSalary: details?.max_salary,
    minExperience: details?.min_experience,
    maxExperience: details?.max_experience,
    requirement: details?.functional_areas,
  };

  return (
    <TwoRow
      style={style.mainContainer}
      topSection={
        <TwoColumn
          style={style.topCurveSection}
          isLeftFillSpace
          leftSection={<View style={style.whiteCurveSection} />}
          rightSection={
            <CommonText
              customContainerStyle={style.urgentText}
              customTextStyle={style.urgentTextStyles}
              fontWeight="600"
            >
              {intl.formatMessage({ id: "label.urgent" })}
            </CommonText>
          }
          rightSectionStyle={style.backgroundWhite}
        />
      }
      bottomSection={
        isWebView ? (
          <JobCardWeb
            {...{ cardDetails, isLoading, handleRemove, handleApply }}
          />
        ) : (
          <JobCardMobile
            {...{ cardDetails, isLoading, handleRemove, handleApply }}
          />
        )
      }
    />
  );
};

export default SavedJobComponent;
