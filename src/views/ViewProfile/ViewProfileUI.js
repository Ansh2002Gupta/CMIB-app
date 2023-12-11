import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
} from "@unthinkable/react-core-components";

import IconHeader from "../../components/IconHeader/IconHeader";
import images from "../../images";
import ImagePicker from "react-native-image-crop-picker";

import style from "./ViewProfile.style";
import CardCaomponent from "../../components/CardComponent/CardComponent";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import CustomModal from "../../components/CustomModal/CustomModal";

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
      return <Image source={{ uri: profileImage }} />;
    } else {
      const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
      return (
        <View
          style={[
            style.initialsContainer,
            showEditModal && style.editProfileContainer,
          ]}
        >
          <Text style={style.initialsText}>{initials}</Text>
        </View>
      );
    }
  };

  const openImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        // width: 100,
        // height: 100,
        cropping: true,
        cropperCircleOverlay: true,
      });

      console.log("Selected image:", image);
    } catch (error) {
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
          {renderProfileIcon()}
          <TouchableOpacity
            style={style.iconEditStyle}
            onPress={() => {
              handleEditPopup(true);
            }}
          >
            <Image source={images.iconEdit} />
          </TouchableOpacity>
        </View>
        <CardCaomponent>
          <DetailComponent details={details} />
        </CardCaomponent>
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
            {renderProfileIcon()}
            <View style={style.editButtonContainer}>
              <View style={style.buttonStyle}>
                <Image source={images.iconChange} />
                <TouchableOpacity
                  onPress={() => {
                    handleEditPopup(false);
                    openImagePicker();
                  }}
                >
                  <Text style={style.textStyle}>
                    {intl.formatMessage({ id: "label.change" })}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[style.buttonStyle, style.secondButtonStyle]}>
                <Image source={images.iconDelete} />
                <Text style={style.textStyle}>
                  {intl.formatMessage({ id: "label.remove" })}
                </Text>
              </View>
            </View>
          </CustomModal>
        )}
      </View>
    </>
  );
};

ViewProfileUI.propTypes = {
  intl: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
  showEditModal: PropTypes.bool.isRequired,
  handleEditPopup: PropTypes.func.isRequired,
};

export default ViewProfileUI;
