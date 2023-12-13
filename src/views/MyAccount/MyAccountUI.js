import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Image,
  View,
} from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import IconHeader from "../../components/IconHeader/IconHeader";
import images from "../../images";
import style from "./MyAccount.style";

const MyAccountUI = (props) => {
  const { intl, options, handleOptionClick } = props;
  //TODO: Replace this dummy data with api data.
  const profileImage = "";
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const email = "kashishbhatheja@gmail.com";

  const renderProfileIcon = () => {
    if (profileImage) {
      return (
        <Image source={{ uri: profileImage }} style={style.profileImage} />
      );
    } else {
      const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
      return (
        <View style={style.initialsContainer}>
          <CommonText
          customTextStyle={style.initialsText}
          title={initials}
          />
        </View>
      );
    }
  };

  return (
    <>
      <IconHeader
        intl={intl}
        headerText={intl.formatMessage({ id: "label.my_account" })}
        iconLeft={images.iconMenu}
        iconRight={images.iconNotification}
      />
      <View style={style.profileParentContainer}>
        <View style={style.profileContainer}>
          {renderProfileIcon()}
          <View style={style.detailContainer}>
            <CommonText
            customTextStyle={style.fullNameStyle}
            title={`${firstName} ${lastName}`}
            />
            <CommonText
            title={email}
            customTextStyle={style.emailStyle}
            />
          </View>
        </View>
        {options.map((option) => (
          <TouchableOpacity
            style={style.optionCotainer}
            key={option.id}
            onPress={() => handleOptionClick(option)}
          >
            <Image source={option.iconLeft} style={style.leftIcon} />
            <CommonText
            customTextStyle={style.titleStyle}
            title={intl.formatMessage({ id: option.title })}
            />
            <View style={style.iconContainer}>
              <Image source={images.iconArrowRight} style={style.arrowIcon} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

MyAccountUI.propTypes = {
  intl: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
};

export default MyAccountUI;
