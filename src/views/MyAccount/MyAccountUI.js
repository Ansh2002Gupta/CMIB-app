import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header/Header";
import images from "../../images";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
} from "@unthinkable/react-core-components";
import style from "./MyAccount.style";

const MyAccountUI = (props) => {
  const { intl, options, handleOptionClick } = props;
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
          <Text style={style.initialsText}>{initials}</Text>
        </View>
      );
    }
  };

  return (
    <Header
      intl={intl}
      headerText={intl.formatMessage({ id: "label.my_account" })}
      iconLeft={images.iconMenu}
      iconRight={images.iconNotification}
    >
      <View style={style.profileContainer}>
        {renderProfileIcon()}
        <View style={style.detailContainer}>
          <Text style={style.fullNameStyle}>
            {firstName} {lastName}
          </Text>
          <Text style={style.emailStyle}>{email}</Text>
        </View>
      </View>
      {options.map((option) => (
        <TouchableOpacity
          style={style.optionCotainer}
          key={option.id}
          onPress={() => handleOptionClick(option)}
        >
          <Image source={option.iconLeft} />
          <Text style={style.titleStyle}>{option.title}</Text>
          <View style={style.iconContainer}>
            <Image source={images.iconArrowRight} />
          </View>
        </TouchableOpacity>
      ))}
    </Header>
  );
};

MyAccountUI.propTypes = {
  intl: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  handleOptionClick: PropTypes.func.isRequired,
};

export default MyAccountUI;
