import React from "react";
import { useIntl } from "react-intl";
import { Image, View } from "@unthinkable/react-core-components";

import { TwoColumn } from "../../core/layouts";
import MultiRow from "../../core/layouts/MultiRow";
import MultiColumn from "../../core/layouts/MultiColumn";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton/CustomButton";
import Chip from "../Chip";
import { LocationConfig } from "./SaveJobCommon";
import { changeComma, timeAgo } from "../../utils/util";
import images from "../../images";
import style from "./SavedJobComponent.style";
import colors from "../../assets/colors";

const JobCardMobile = ({ cardDetails, isLoading, handleRemove }) => {
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

  const rowConfig = (data) => {
    return data?.map((item, index) => {
      return {
        content: (
          <CommonText
            customTextStyle={[
              style.marginRightText,
              index !== data?.length - 1 || data?.length <= 3
                ? style.blackText
                : style.greyText,
            ]}
          >
            {item?.name}
            {index !== data?.length - 1 && ","}
          </CommonText>
        ),
      };
    });
  };

  const locationConfig = (data) => {
    return data.map((item, index) => {
      return {
        content: (
          <CommonText customTextStyle={[style.blackText]}>
            {item?.name}
            {index !== data.length - 1 && "/"}
          </CommonText>
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
          isBackground
          bgColor={colors.lightGray}
          textColor={colors.black}
        />
      ),
      style: style.mobileChipStyle,
    },
    {
      content: (
        <View style={[style.leftBorder, style.mobileEvenPadding]}>
          <TwoColumn
            style={style.iconView}
            leftSection={
              <Image source={images.iconRupee} style={style.mobileIconStyle} />
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
        <View style={[style.leftBorder, style.mobileEvenPadding]}>
          <TwoColumn
            style={style.iconView}
            leftSection={
              <Image
                source={images.iconBriefcase}
                style={style.mobileIconStyle}
              />
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
  ];

  const multiRow = [
    {
      content: (
        <Image
          source={company_logo || images.companyLogo}
          style={style.mobileComponyLogo}
          alt={"company_logo"}
        />
      ),
    },
    {
      content: (
        <CommonText
          customTextStyle={[style.companyNameStyle, style.mobileMargin8]}
          fontWeight="600"
        >
          {jobPostion}
        </CommonText>
      ),
    },
    {
      content: (
        <CommonText
          customTextStyle={[style.jobPositionText, style.mobileMargin4]}
          fontWeight="600"
        >
          {companyName}
        </CommonText>
      ),
    },
    {
      content: (
        <MultiColumn columns={multiCoulmn} style={style.mobileMargin8} />
      ),
    },
    jobLocation?.length && {
      content: (
        <TwoColumn
          style={{ ...style.iconView, ...style.mobileMargin8 }}
          leftSection={
            <Image source={images.iconLocation} style={style.mobileIconStyle} />
          }
          rightSection={
            <MultiColumn
              columns={LocationConfig(jobLocation)}
              style={{ backgroundColor: "blue", paddingRight: 24 }}
            />
          }
        />
      ),
    },
    {
      content: (
        <MultiColumn
          columns={rowConfig(changeComma(requirement, 3))}
          style={style.mobileMargin8}
        />
      ),
    },
    {
      content: (
        <TwoColumn
          style={style.mobileActionHandle}
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
            <CustomButton
              disabled={isLoading}
              iconLeft={{
                leftIconAlt: "left-saved",
                leftIconSource: images.iconSaveSlashBlue,
              }}
              onPress={handleRemove}
              customStyle={{ customTextStyle: style.customButtonTextStyle }}
              style={style.buttonStyle}
            >
              {intl.formatMessage({ id: "label.remove" })}
            </CustomButton>
          }
        />
      ),
    },
  ];

  return <MultiRow rows={multiRow} style={style.mobileContainer} />;
};

export default JobCardMobile;
