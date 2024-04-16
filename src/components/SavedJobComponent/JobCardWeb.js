import React from "react";
import { useIntl } from "react-intl";
import CommonText from "../CommonText";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import { ThreeRow, TwoColumn } from "../../core/layouts";
import MultiColumn from "../../core/layouts/MultiColumn";
import MultiRow from "../../core/layouts/MultiRow";

import ActionPairButton from "../ActionPairButton";
import CustomTextEditor from "../CustomTextEditor/CustomTextEditor";
import Chip from "../Chip";
import { LocationConfig } from "./SaveJobCommon";
import { changeComma, timeAgo, formatSalaryRange } from "../../utils/util";
import images from "../../images";
import style from "./SavedJobComponent.style";

import colors from "../../assets/colors";

const JobCardWeb = ({
  cardDetails,
  isLoading,
  handleApply,
  handleSaveAndRemove,
  isApplyVisible,
  isSaved,
  isApplyLoading,
  onPress,
}) => {
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
            rightSection={
              <CommonText customTextStyle={[style.normalText, style.ellipsis]}>
                {LocationConfig(jobLocation)}
              </CommonText>
            }
          />
        </View>
      ),
    },
  ];

  const buttonOneText = isSaved ? "label.save" : "label.remove";
  const buttonTwoText = isApplyVisible ? "label.applyJob" : "label.applied";

  const mainCardMultiRow = [
    {
      content: (
        <TouchableOpacity onPress={onPress}>
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
        </TouchableOpacity>
      ),
    },
    {
      content: (
        <TouchableOpacity onPress={onPress}>
          <CommonText customTextStyle={[style.breakWordStyle]}>
            <CustomTextEditor
              value={jobDescription}
              disabled
              quilStyle={style.customQuilStyle}
            />
          </CommonText>
        </TouchableOpacity>
      ),
    },
    requirement?.length && {
      content: (
        <TouchableOpacity onPress={onPress}>
          <MultiColumn
            columns={columnConfig(changeComma(requirement, 3))}
            style={style.chipContainerStyle}
          />
        </TouchableOpacity>
      ),
    },
    {
      content: (
        <TwoColumn
          style={style.buttonContainerStyle}
          isLeftFillSpace
          leftSection={
            <CommonText customTextStyle={style.greyText}>{`${intl.formatMessage(
              { id: "label.posted" }
            )} ${timeAgo(createdAt)} ${intl.formatMessage({
              id: "label.ago",
            })}`}</CommonText>
          }
          rightSection={
            <ActionPairButton
              disableRightStyle={style.disableRightStyle}
              displayLoaderLeft={isLoading}
              displayLoader={isApplyLoading}
              isDisabledLeft={isLoading}
              isDisabled={isLoading || !isApplyVisible}
              onPressButtonTwo={handleApply}
              onPressButtonOne={handleSaveAndRemove}
              isButtonTwoGreen={isApplyVisible && !isLoading}
              iconLeft={{
                leftIconSource: isSaved
                  ? images.iconArchiveSave
                  : images.iconSingleSave,
              }}
              customStyles={{
                buttonOneStyle: style.actionPairButtonStyle,
                buttonTwoStyle: isApplyVisible
                  ? style.actionPairButtonStyle
                  : style.disableActionPairButton,
                buttonOneContainerStyle: style.actionPairButtonStyle,
                buttonTwoContainerStyle: style.actionPairButtonStyle,
                buttonTwoTextStyle: style.buttonTextStyle,
                buttonOneTextStyle: style.buttonTextStyle,
              }}
              buttonOneText={intl.formatMessage({ id: buttonOneText })}
              buttonTwoText={intl.formatMessage({ id: buttonTwoText })}
            />
          }
        />
      ),
    },
  ];

  return <MultiRow style={style.webContainer} rows={mainCardMultiRow} />;
};

export default JobCardWeb;
