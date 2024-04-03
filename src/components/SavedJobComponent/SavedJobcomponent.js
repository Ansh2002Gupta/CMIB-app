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

  return (
    <TwoRow
      style={style.mainContainer}
      topSection={
        <TwoRow
          topSection={
            <TwoColumn
              isLeftFillSpace
              rightSection={
                <CommonText
                  customContainerStyle={style.urgentText}
                  customTextStyle={style.urgentTextStyles}
                >
                  {intl.formatMessage({ id: "label.urgent" })}
                </CommonText>
              }
            />
          }
          bottomSection={isWeb ? <JobCardWeb /> : <JobCardMobile />}
        />
      }
      bottomSection={
        <TwoColumn
          style={{}}
          isLeftFillSpace
          rightSection={
            // <ActionPairButton
            //   buttonOneText={intl.formatMessage({ id: "label.remove" })}
            //   buttonTwoText={intl.formatMessage({ id: "label.applyJob" })}
            //   displayLoader={false}
            //   iconLeft={{
            //     leftIconAlt: "left-saved",
            //     leftIconSource: images.iconSavedActive,
            //   }}
            //   isDisabled={false}
            //   isButtonTwoGreen
            //   onPressButtonOne={() => {}}
            //   onPressButtonTwo={() => {}}
            //   customStyles={{
            //     customContainerStyle: !isWebView
            //       ? { ...style.customSaveButtonContainer }
            //       : { buttonTwoTextStyle: style.buttonTwoTextStyle },
            //   }}
            // />
            <></>
          }
        />
      }
    />
  );
};

export default SavedJobComponent;
