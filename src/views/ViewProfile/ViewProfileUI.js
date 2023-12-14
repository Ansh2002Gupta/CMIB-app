import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import CardComponent from "../../components/CardComponent/CardComponent";
import CommonText from "../../components/CommonText";
import CustomModal from "../../components/CustomModal/CustomModal";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import ImagePicker from "../../components/ImagePickerComponent/ImagePickerComponent";
import images from "../../images";
import style from "./ViewProfile.style";

const ViewProfileUI = (props) => {
  const { handleEditPopup, intl, onGoBack, showEditModal } = props;
  const [profileImage, setProfileImage] = useState("");
  //TODO: Dummy data to be replaced by api data.
  const firstName = "Kashish";
  const lastName = "Bhatheja";
  const details = [
    { title: "Designation", value: "Senior Chartered Accountant" },
    { title: "Mobile Number", value: "+91-1234 5678 21" },
    { title: "Email ID", value: "pooja.dhar@j&k.co" },
  ];

  const renderProfileIcon = (iconType) => {
    if (profileImage) {
      return (
        <View
          style={[
            style.initialsContainer,
            showEditModal &&
              iconType === "modalIcon" &&
              style.editProfileContainer,
          ]}
        >
          <Image
            source={{ uri: profileImage }}
            style={
              showEditModal && iconType === "modalIcon" ? style.modalProfileImage : style.profileImageStyle
            }
          />
        </View>
      );
    } else {
      const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
      return (
        <View
          style={[
            style.initialsContainer,
            showEditModal &&
              iconType === "modalIcon" &&
              style.editProfileContainer,
          ]}
        >
          <CommonText title={initials} customTextStyle={style.initialsText} />
        </View>
      );
    }
  };

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        cropperCircleOverlay: true,
      });
      if (image) {
        handleEditPopup(false);
        setProfileImage(image?.sourceURL);
      }
    } catch (error) {
      //TODO: Replace this error log with a toast which has been created by Kashish.
      console.log("Image picker error:", error);
    }
  };

  return (
    <>
      <IconHeader
        intl={intl}
        headerText={intl.formatMessage({ id: "label.view_profile" })}
        onPressLeftIcon={onGoBack}
        iconLeft={images.iconBack}
        iconRight={images.iconNotification}
      />
      <View style={style.picParentContainer}>
        <View style={style.picContainer}>
          {renderProfileIcon("profileIcon")}
          <TouchableOpacity
            style={style.iconEditStyle}
            onPress={() => {
              handleEditPopup(true);
            }}
          >
            <Image source={images.iconEdit} style={style.editIcon} />
          </TouchableOpacity>
        </View>
        <CardComponent>
          <DetailComponent details={details} />
        </CardComponent>
        {showEditModal && (
          <CustomModal
            headerText={intl.formatMessage({
              id: "label.edit_profile_picture",
            })}
            isIconCross
            onPressIconCross={() => {
              handleEditPopup(false);
            }}
          >
            {renderProfileIcon("modalIcon")}
            <View style={style.editButtonContainer}>
              <View style={style.buttonStyle}>
                <Image source={images.iconChange} />
                <TouchableOpacity
                  onPress={() => {
                    openImagePicker();
                  }}
                >
                  <CommonText
                    customTextStyle={style.textStyle}
                    title={intl.formatMessage({ id: "label.change" })}
                  />
                </TouchableOpacity>
              </View>
              <View style={[style.buttonStyle, style.secondButtonStyle]}>
                <Image source={images.iconDelete} />
                <CommonText
                  customTextStyle={style.textStyle}
                  title={intl.formatMessage({ id: "label.remove" })}
                />
              </View>
            </View>
          </CustomModal>
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
