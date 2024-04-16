import React from "react";
import PropTypes from "prop-types";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import IconHeader from "../../components/IconHeader/IconHeader";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import images from "../../images";
import { Candidate, Company } from "../../constants/constants";
import { moduleKeys } from "../../constants/sideBarHelpers";
import classes from "../../theme/styles/CssClassProvider";
import style from "./MyAccount.style";

const MyAccountUI = ({
  accessibleModules,
  handleOptionClick,
  intl,
  options,
  omitArrowIcon,
  userProfileDetails,
}) => {
  const isWebPlatform = Platform.OS.toLowerCase() === "web";

  const profileImage = userProfileDetails?.profile_photo;
  const name = userProfileDetails?.name;
  const email = userProfileDetails?.email;
  const userType = userProfileDetails?.user_type;

  const renderProfileIcon = () => {
    return (
      <ProfileIcon
        customContainerStyle={style.initialsContainer}
        customImageStyle={style.customImageStyle}
        customTextStyle={style.initialTextStyle}
        name={name}
        profileImage={profileImage}
      />
    );
  };

  const renderHorizontalLine = () => {
    return <View style={style.horizontalLine} />;
  };

  const accountComponentProp = isWebPlatform
    ? { className: classes["account-dropdown__base"] }
    : {};

  return (
    <>
      {!omitArrowIcon && (
        <IconHeader
          headerText={intl.formatMessage({ id: "label.account" })}
          intl={intl}
        />
      )}
      <ScrollView
        style={{
          ...style.profileParentContainer,
          ...(omitArrowIcon ? style.omitIconStyle : {}),
        }}
      >
        <View
          style={[
            !omitArrowIcon ? style.profileContainer : style.profileContainerWeb,
          ]}
        >
          {renderProfileIcon()}
          <View
            style={[
              !omitArrowIcon ? style.detailContainer : style.detailContainerWeb,
            ]}
          >
            <CommonText customTextStyle={style.fullNameStyle} fontWeight="600">
              {name || "-"}
            </CommonText>
            <CommonText customTextStyle={style.emailStyle}>{email}</CommonText>
          </View>
        </View>
        {omitArrowIcon && renderHorizontalLine()}
        <ScrollView style={style.profileListContainer}>
          {options?.map((option, index) => {
            if (
              option?.title === "label.job_profile" &&
              !accessibleModules[moduleKeys.CA_JOBS_KEY]
            ) {
              return <></>;
            }
            return (
              ((userType === Candidate && option?.isCandidate) ||
                (userType === Company && option?.isCompany)) && (
                <CustomTouchableOpacity
                  style={[
                    style.optionCotainer,
                    omitArrowIcon
                      ? index === options.length - 2 &&
                        style.optionCotainerBorder
                      : index !== options.length - 1 &&
                        style.optionCotainerBordeLight,
                  ]}
                  key={option.id}
                  onPress={() => handleOptionClick(option)}
                  {...accountComponentProp}
                >
                  <CustomImage
                    source={option.iconLeft}
                    style={style.leftIcon}
                  />
                  <View style={style.titleParentStyle}>
                    <CommonText customTextStyle={style.titleStyle}>
                      {intl.formatMessage({ id: option.title })}
                    </CommonText>
                  </View>
                  {!omitArrowIcon && (
                    <View style={style.iconContainer}>
                      <CustomImage
                        source={images.iconArrowRight}
                        style={style.arrowIcon}
                      />
                    </View>
                  )}
                </CustomTouchableOpacity>
              )
            );
          })}
        </ScrollView>
      </ScrollView>
    </>
  );
};

MyAccountUI.defaultProps = {
  omitArrowIcon: false,
  userProfileDetails: {},
};

MyAccountUI.propTypes = {
  accessibleModules: PropTypes.object,
  handleOptionClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  omitArrowIcon: PropTypes.bool,
  userProfileDetails: PropTypes.object,
};

export default MyAccountUI;
