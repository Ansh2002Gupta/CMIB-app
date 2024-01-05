import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ScrollView,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import ChangePasswordModal from "../../containers/ChangePasswordModal/ChangePasswordModal";
import CustomImage from "../../components/CustomImage";
import CustomModal from "../../components/CustomModal/CustomModal";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import LogoutModal from "../../containers/LogoutModal/LogoutModal";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import images from "../../images";
import style from "./MyAccount.style";

const MyAccountUI = ({
  changePasswordModal,
  handleOptionClick,
  handleChangePassword,
  handleLogoutClick,
  isLogout,
  intl,
  options,
  saveLogout,
  omitArrowIcon,
}) => {
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
              title={`${firstName} ${lastName}`}
            />
            <CommonText title={email} customTextStyle={style.emailStyle} />
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
              <CommonText
                customTextStyle={style.titleStyle}
                title={intl.formatMessage({ id: option.title })}
              />
            </View>
            {!omitArrowIcon && (
              <View style={style.iconContainer}>
                <CustomImage source={images.iconArrowRight} style={style.arrowIcon} />
              </View>
            )}
          </CustomTouchableOpacity>
        ))}
      </ScrollView>
      {changePasswordModal ? (
        <CustomModal
          headerText={intl.formatMessage({
            id: "label.change_password",
          })}
          customInnerContainerStyle={style.innerContainerStyle}
          headerTextStyle={style.headerTextStyle}
        >
          <ChangePasswordModal onPressCancel={handleChangePassword} />
        </CustomModal>
      ) : null}
      {isLogout && (
        <LogoutModal onCancel={handleLogoutClick} onSave={saveLogout} />
      )}
    </>
  );
};

MyAccountUI.defaultProps = {
  handleChangePassword: () => {},
  omitArrowIcon: false,
};

MyAccountUI.propTypes = {
  changePasswordModal: PropTypes.bool,
  handleOptionClick: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func,
  intl: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  omitArrowIcon: PropTypes.bool,
};

export default MyAccountUI;
