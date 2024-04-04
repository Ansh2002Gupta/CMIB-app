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

const SavedJobComponent = ({ details }) => {
  const intl = useIntl();
  const isWeb = Platform.OS.toLowerCase() === "web";
  const { isWebView } = useIsWebView();

  const cardDetails = {
    companyName: "sdafdsf",
    createdAt: "2024-04-01T11:23:51.000000Z",
    jobPostion: "vsvfs",
    jobDescription: "sjdhbsvkhdsbvjlbsdjkvbjksdbvsf",
    jobLocation: "dfsdfsf",
    vaccancies: 10,
    minSalary: 5,
    maxSalary: 7,
    minExperience: 0,
    maxExperience: 2,
    requirement: [
      "Audit",
      "dsbdf",
      "dfsbdsfb",
      "dfgsdfg",
      "dfgsg",
      "dsfgwergw",
      "regwerg",
      "Rtfergwer",
    ],
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
          <JobCardWeb cardDetails={cardDetails} />
        ) : (
          <JobCardMobile cardDetails={cardDetails} />
        )
      }
    />
  );
};

export default SavedJobComponent;
