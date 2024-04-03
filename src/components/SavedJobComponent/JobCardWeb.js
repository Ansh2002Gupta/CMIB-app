import React from "react";
import { useIntl } from "react-intl";
import CommonText from "../CommonText";
import { Platform, Image, View } from "@unthinkable/react-core-components";

import { ThreeRow, TwoColumn } from "../../core/layouts";
import MultiColumn from "../../core/layouts/MultiColumn";
import ActionPairButton from "../ActionPairButton";
import { changeComma, timeAgo } from "../../utils/util";
import Chip from "../Chip";
import images from "../../images";
import style from "./SavedJobComponent.style";
import MultiRow from "../../core/layouts/MultiRow";

const JobCardWeb = ({
  companyName,
  createdAt,
  jobPostion,
  jobDescription,
  jobLocation,
  handleRemove,
  handleApply,
  vaccancies,
  minSalary,
  maxSalary,
  minExperience,
  maxExperience,
  requirement,
}) => {
  const intl = useIntl();

  const columnConfig = (data) => {
    return data.map((item) => {
      return {
        content: <Chip label={item} />,
      };
    });
  };

  const multiCoulmn = [
    {
      content: (
        <Chip
          label={`${vaccancies} ${intl.formatMessage({
            id: "label.vacancies",
          })}`}
        />
      ),
      isFillSpace: false,
    },
    {
      content: (
        <CommonText
          customTextStyle={style.normalText}
        >{`${minSalary}-${maxSalary} ${intl.formatMessage({
          id: "label.lpa",
        })}`}</CommonText>
      ),
    },
    {
      content: (
        <CommonText
          customTextStyle={style.normalText}
        >{`${minExperience}-${maxExperience} ${intl.formatMessage({
          id: "label.yrs",
        })}`}</CommonText>
      ),
    },
    {
      content: (
        <CommonText customTextStyle={style.normalText}>
          {jobLocation}
        </CommonText>
      ),
    },
  ];

  const mainCardMultiRow = [
    {
      content: (
        <TwoColumn
          style={{ gap: 16 }}
          leftSection={
            <Image source={images.companyLogo} style={style.companyLogoStyle} />
          }
          rightSection={
            <ThreeRow
              style={{ gap: 2 }}
              topSection={
                <CommonText customTextStyle={style.companyNameStyle}>
                  {companyName}
                </CommonText>
              }
              middleSection={
                <CommonText customTextStyle={style.jobPositionText}>
                  {jobPostion}
                </CommonText>
              }
              bottomSection={
                <View>
                  <MultiColumn
                    columns={multiCoulmn}
                    style={style.multiColumnstyles}
                  />
                </View>
              }
            />
          }
        />
      ),
    },
    { content: <CommonText>{jobDescription}</CommonText> },
    {
      content: (
        <MultiColumn
          columns={columnConfig(changeComma(requirement, 3))}
          style={{ gap: 8 }}
        />
      ),
    },
    {
      content: (
        <TwoColumn
          style={style.buttonContainerStyle}
          isLeftFillSpace
          leftSection={
            <CommonText customTextStyle={style.greyText}>{`${intl.formatMessage(
              {
                id: "label.posted",
              }
            )} ${timeAgo(createdAt)} ${intl.formatMessage({
              id: "label.ago",
            })}`}</CommonText>
          }
          rightSection={
            <ActionPairButton
              onPressButtonTwo={handleApply}
              onPressButtonOne={handleRemove}
              isButtonTwoGreen
              iconLeft={{
                leftIconSource: images.iconSingleSave,
              }}
              customStyles={{
                buttonOneStyle: style.actionPairButtonStyle,
                buttonTwoStyle: style.actionPairButtonStyle,
                buttonOneContainerStyle: style.actionPairButtonStyle,
                buttonTwoContainerStyle: style.actionPairButtonStyle,
                buttonTwoTextStyle: style.buttonTextStyle,
                buttonOneTextStyle: style.buttonTextStyle,
              }}
              buttonOneText={intl.formatMessage({ id: "label.remove" })}
              buttonTwoText={intl.formatMessage({ id: "label.applyJob" })}
            />
          }
        />
      ),
    },
  ];

  return <MultiRow style={{ gap: 24 }} rows={mainCardMultiRow} />;
};

export default JobCardWeb;
