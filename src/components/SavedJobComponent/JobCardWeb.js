import React from "react";
import { useIntl } from "react-intl";
import CommonText from "../CommonText";
import { Platform, Image, View } from "@unthinkable/react-core-components";

import { ThreeRow, TwoColumn } from "../../core/layouts";
import MultiColumn from "../../core/layouts/MultiColumn";
import MultiRow from "../../core/layouts/MultiRow";

import ActionPairButton from "../ActionPairButton";
import CustomTextEditor from "../CustomTextEditor/CustomTextEditor";
import Chip from "../Chip";
import { LocationConfig } from "./SaveJobCommon";
import { changeComma, timeAgo } from "../../utils/util";
import images from "../../images";
import style from "./SavedJobComponent.style";

import colors from "../../assets/colors";

const JobCardWeb = ({ cardDetails, isLoading, handleRemove, handleApply }) => {
  const intl = useIntl();
  const {
    companyName,
    company_logo,
    createdAt,
    jobPostion,
    jobDescription,
    jobLocation,
    vaccancies,
    minSalary,
    maxSalary,
    minExperience,
    maxExperience,
    requirement,
  } = cardDetails;

  const columnConfig = (data) => {
    return data?.map((item) => {
      return {
        content: (
          <Chip
            label={item?.name || item}
            textColor={colors.black}
            bgColor={colors.white}
            customContainerStyle={style.customContainerStyle}
          />
        ),
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
          bgColor={colors.lightGray}
          textColor={colors.black}
        />
      ),
      style: style.chipStyle,
    },
    {
      content: (
        <View style={[style.leftBorder, style.evenPadding]}>
          <TwoColumn
            style={style.iconView}
            leftSection={
              <Image source={images.iconRupee} style={style.iconStyle} />
            }
            rightSection={
              <CommonText
                customTextStyle={style.normalText}
              >{`${minSalary}-${maxSalary} ${intl.formatMessage({
                id: "label.lpa",
              })}`}</CommonText>
            }
          />
        </View>
      ),
    },
    {
      content: (
        <View style={[style.leftBorder, style.evenPadding]}>
          <TwoColumn
            style={style.iconView}
            leftSection={
              <Image source={images.iconBriefcase} style={style.iconStyle} />
            }
            rightSection={
              <CommonText
                customTextStyle={style.normalText}
              >{`${minExperience}-${maxExperience} ${intl.formatMessage({
                id: "label.yrs",
              })}`}</CommonText>
            }
          />
        </View>
      ),
    },
    jobLocation?.length && {
      content: (
        <View style={[style.evenPadding, style.leftBorder]}>
          <TwoColumn
            style={{ ...style.iconView, ...style.center }}
            leftSection={
              <Image source={images.iconLocation} style={style.iconStyle} />
            }
            rightSection={<MultiColumn columns={LocationConfig(jobLocation)} />}
          />
        </View>
      ),
    },
  ];

  const mainCardMultiRow = [
    {
      content: (
        <TwoColumn
          style={{ gap: 16 }}
          leftSection={
            <Image
              source={{ uri: company_logo || images.companyLogo }}
              style={style.companyLogoStyle}
              alt={"company_logo"}
            />
          }
          rightSection={
            <ThreeRow
              style={{ gap: 2 }}
              topSection={
                <CommonText customTextStyle={style.companyNameStyle}>
                  {jobPostion}
                </CommonText>
              }
              middleSection={
                <CommonText customTextStyle={style.jobPositionText}>
                  {companyName}
                </CommonText>
              }
              bottomSection={
                <View>
                  <MultiColumn columns={multiCoulmn} style={style.center} />
                </View>
              }
            />
          }
        />
      ),
    },
    {
      content: (
        <CommonText customTextStyle={[style.breakWordStyle]}>
          <CustomTextEditor
            value={jobDescription}
            disabled
            quilStyle={style.customQuilStyle}
          />
        </CommonText>
      ),
    },
    requirement?.length && {
      content: (
        <MultiColumn
          columns={columnConfig(changeComma(requirement, 3))}
          style={style.chipContainerStyle}
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
              displayLoaderLeft={isLoading}
              isDisabledLeft={isLoading}
              isDisabled={isLoading}
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

  return <MultiRow style={style.webContainer} rows={mainCardMultiRow} />;
};

export default JobCardWeb;
