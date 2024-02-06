import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import CardComponent from "../../components/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import EditProfileImage from "../../containers/EditProfileImage";
import IconHeader from "../../components/IconHeader/IconHeader";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import images from "../../images";
import style from "./ViewProfile.style";

const ViewProfileUI = ({
  handleEditPopup,
  intl,
  onGoBack,
  showEditModal,
  userProfileDetails,
}) => {
  const profileImage = userProfileDetails?.profile_photo;
  const name = userProfileDetails?.name;
  const email = userProfileDetails?.email;
  const mobileNumber = userProfileDetails?.mobile_number;
  const designation = userProfileDetails?.designation;

  const details = [
    { label: "label.designation", value: designation },
    { label: "label.mobile_number", value: mobileNumber },
    { label: "label.email_id", value: email },
  ];

  const renderProfileIcon = () => {
    return (
      <ProfileIcon
        showEditIcon
        name={name}
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
        <View style={style.picContainer}>
          {renderProfileIcon()}
          <TouchableOpacity
            style={style.iconEditStyle}
            onPress={() => {
              handleEditPopup(true);
            }}
          >
            <Image source={images.iconEdit} style={style.editIcon} />
          </TouchableOpacity>
        </View>
        {!!name && (
          <CommonText
            fontWeight="600"
            customContainerStyle={style.customContainerStyle}
            customTextStyle={style.customTextStyle}
          >
            {name}
          </CommonText>
        )}
        <CardComponent customStyle={style.cardStyle}>
          <DetailComponent details={details} />
        </CardComponent>
        {showEditModal && (
          <EditProfileImage
            name={name}
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

ViewProfileUI.defaultProps = {
  userProfileDetails: {},
};

ViewProfileUI.propTypes = {
  handleEditPopup: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  showEditModal: PropTypes.bool.isRequired,
  userProfileDetails: PropTypes.object,
};

export default ViewProfileUI;
