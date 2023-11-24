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
import style from "./ViewProfile.style";
import CardCaomponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent/DetailComponent";

const ViewProfileUI = (props) => {
  const { intl, onGoBack, showEditModal, handleEditPopup } = props;
  const profileImage = "";
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const details = [
    { title: "Designation", value: "Senior Chartered Accountant" },
    { title: "Mobile Number", value: "+91-1234 5678 21" },
    { title: "Email ID", value: "pooja.dhar@j&k.co" },
  ];

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
      headerText={intl.formatMessage({ id: "label.view_profile" })}
      onPressLeftIcon={onGoBack}
      iconLeft={images.iconBack}
      iconRight={images.iconNotification}
    >
      <View style={style.picContainer}>
        {renderProfileIcon()}
        <TouchableOpacity style={style.iconEditStyle} onPress={() => {}}>
          <Image source={images.iconEdit} />
        </TouchableOpacity>
      </View>
      <CardCaomponent>
        <DetailComponent details={details} />
      </CardCaomponent>
    </Header>
  );
};

ViewProfileUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  showEditModal: PropTypes.bool.isRequired,
  handleEditPopup: PropTypes.func.isRequired,
};

export default ViewProfileUI;
