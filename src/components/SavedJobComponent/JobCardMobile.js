import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@unthinkable/react-theme";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import { TwoColumn } from "../../core/layouts";
import MultiRow from "../../core/layouts/MultiRow";
import MultiColumn from "../../core/layouts/MultiColumn";

import CommonText from "../CommonText";
import CustomButton from "../CustomButton/CustomButton";
import Chip from "../Chip";
import { LocationConfig } from "./SaveJobCommon";
import { changeComma, formatSalaryRange, timeAgo } from "../../utils/util";
import images from "../../images";
import colors from "../../assets/colors";
import getStyles from "./SavedJobComponent.style";

const JobCardMobile = ({
  cardDetails,
  isLoading,
  isApplyVisible,
  isSaved,
  isApplyLoading,
  handleApply,
  handleSaveAndRemove,
  onPress,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const style = getStyles(theme);

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

  const buttonOneText = isSaved ? "label.save" : "label.remove";
  const buttonTwoText = isApplyVisible ? "label.apply" : "label.applied";

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
            {item?.name || item}
            {index !== data?.length - 1 && ","}
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
              <CommonText customTextStyle={style.normalText}>
                {formatSalaryRange(minSalary, maxSalary)}
              </CommonText>
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
            <CommonText customTextStyle={style.mobileEllipsis}>
              {LocationConfig(jobLocation)}
            </CommonText>
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
            <TwoColumn
              leftSection={
                <CustomButton
                  disabledStyle={style.disabledStyle}
                  disabled={isApplyLoading || !isApplyVisible || isLoading}
                  onPress={handleApply}
                  customStyle={{
                    customTextStyle: isApplyVisible
                      ? style.customButtonApplyStyle
                      : style.disableButtonText,
                  }}
                  style={style.buttonStyle}
                >
                  {intl.formatMessage({ id: buttonTwoText })}
                </CustomButton>
              }
              rightSection={
                <CustomButton
                  disabledStyle={style.disabledStyle}
                  disabled={isLoading}
                  iconLeft={{
                    leftIconAlt: "left-saved",
                    leftIconSource: isSaved
                      ? images.iconArchiveSaveMobile
                      : images.iconSaveSlashBlue,
                  }}
                  onPress={handleSaveAndRemove}
                  customStyle={{ customTextStyle: style.customButtonTextStyle }}
                  style={style.buttonStyle}
                >
                  {intl.formatMessage({ id: buttonOneText })}
                </CustomButton>
              }
            />
          }
        />
      ),
    },
  ];

  return (
    <TouchableOpacity onPress={onPress}>
      <MultiRow rows={multiRow} style={style.mobileContainer} />
    </TouchableOpacity>
  );
};

export default JobCardMobile;
