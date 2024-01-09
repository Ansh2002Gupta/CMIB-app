import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import images from "../../images";
import style from "./MyAccount.style";

const MyAccountUI = ({ handleOptionClick, intl, options, omitArrowIcon }) => {
  //TODO: Replace this dummy data with api data.
  //TODO: update image on save button (once api will come)
  const profileImage = "";
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const email = "kashishbhatheja@gmail.com";

  const renderProfileIcon = () => {
    return (
      <ProfileIcon
        firstName={firstName}
        lastName={lastName}
        profileImage={profileImage}
        customContainerStyle={style.initialsContainer}
      />
    );
  };

  const renderHorizontalLine = () => {
    return <View style={style.horizontalLine} />;
  };

  return (
    <>
      <ScrollView style={style.profileParentContainer}>
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
            <CommonText
              customTextStyle={style.fullNameStyle}
              fontWeight="600"
            >{`${firstName} ${lastName}`}</CommonText>
            <CommonText customTextStyle={style.emailStyle}>{email}</CommonText>
          </View>
        </View>
        {omitArrowIcon && renderHorizontalLine()}
        {options.map((option, index) => (
          <CustomTouchableOpacity
            style={[
              style.optionCotainer,
              omitArrowIcon
                ? index === options.length - 2 && style.optionCotainerBorder
                : index !== options.length - 1 &&
                  style.optionCotainerBordeLight,
            ]}
            key={option.id}
            onPress={() => handleOptionClick(option)}
          >
            <CustomImage source={option.iconLeft} style={style.leftIcon} />
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
        ))}
      </ScrollView>
    </>
  );
};

MyAccountUI.defaultProps = {
  omitArrowIcon: false,
};

MyAccountUI.propTypes = {
  handleOptionClick: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  omitArrowIcon: PropTypes.bool,
};

export default MyAccountUI;
