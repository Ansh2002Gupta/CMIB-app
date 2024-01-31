import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import EditProfilePic from "../../containers/EditProfilePic";
import IconHeader from "../../components/IconHeader/IconHeader";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import style from "./ViewProfile.style";

const ViewProfileUI = ({ handleEditPopup, intl, onGoBack, showEditModal }) => {
  //TODO: Dummy data to be replaced by api data.
  const profileImage = "";
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const details = [
    { label: "Designation", value: "Senior Chartered Accountant" },
    { label: "Mobile Number", value: "+91-1234 5678 21" },
    { label: "Email ID", value: "pooja.dhar@j&k.co" },
  ];

  const renderProfileIcon = () => {
    return (
      <ProfileIcon
        showEditIcon
        firstName={firstName}
        lastName={lastName}
        profileImage={profileImage}
        onPressEditIcon={() => {
          handleEditPopup(true);
        }}
      />
    );
  };

  return (
    <>
      <IconHeader
        hasIconBar
        headerText={intl.formatMessage({ id: "label.view_profile" })}
        intl={intl}
        onPressLeftIcon={onGoBack}
      />
      <View style={style.picParentContainer}>
        <View style={style.picContainer}>{renderProfileIcon()}</View>
        <CardComponent customStyle={style.cardStyle}>
          <DetailComponent details={details} />
        </CardComponent>
        {showEditModal && (
          <EditProfilePic
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            onPressIconCross={() => {
              handleEditPopup(false);
            }}
          />
        )}
      </View>
    </>
  );
};

ViewProfileUI.propTypes = {
  handleEditPopup: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  showEditModal: PropTypes.bool.isRequired,
};

export default ViewProfileUI;
