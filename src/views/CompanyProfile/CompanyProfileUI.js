import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import CardComponent from "../../components/CardComponent/CardComponent";
import CheckBox from "../../components/CheckBox/CheckBox";
import CommonText from "../../components/CommonText";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton";
import UploadImage from "../../components/UploadImage/UploadImage";
import useIsWebView from "../../hooks/useIsWebView";
import { sourceOfInfo } from "./mappedData";
import images from "../../images";
import style from "./CompanyProfile.style";

const CompanyProfileUI = (props) => {
  const {
    handleCompanyDetailChange,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleEdit,
    intl,
    isEditProfile,
    isLoading,
    options,
    onGoBack,
    profileResult,
  } = props;
  const { isWebView } = useIsWebView();

  const renderCardWithDetails = (
    handleChange,
    details,
    headerId,
    otherDetails
  ) => (
    <CardComponent customStyle={style.cardStyle}>
      <DetailComponent
        details={details}
        headerText={intl.formatMessage({ id: headerId })}
        isEditable={isEditProfile}
        handleChange={handleChange}
      />
      {!!otherDetails && (
        <DetailComponent
          details={otherDetails}
          isEditable={isEditProfile}
          handleChange={handleChange}
        />
      )}
    </CardComponent>
  );

  const renderSourceOfInfo = () => {
    return isEditProfile ? (
      <View style={style.contentStyle}>
        {options.map((item, index) => (
          <CheckBox
            key={item.id}
            id={item.id}
            index={index}
            title={item.title}
            isSelected={item.isSelected}
          />
        ))}
      </View>
    ) : (
      <BadgeLabel
        badgeLabels={sourceOfInfo}
        customTextStyle={style.badgeContainer}
      />
    );
  };

  return (
    <>
      <IconHeader
        buttonTitle={intl.formatMessage({ id: "label.edit" })}
        handleButtonClick={() => handleEdit(!isEditProfile)}
        hasActionButton={isWebView && !isEditProfile}
        hasIconBar
        headerText={
          isEditProfile
            ? intl.formatMessage({ id: "label.edit_company_profile" })
            : intl.formatMessage({ id: "label.company_profile" })
        }
        intl={intl}
        iconLeft={isEditProfile ? images.iconCross : images.iconBack}
        iconRight={images.iconNotification}
        onPressLeftIcon={onGoBack}
      />
      {isLoading ? (
        <View style={style.loaderStyle}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.contentContainerStyle}
          >
            <View style={style.innerContainerStyle}>
              {renderCardWithDetails(
                handleCompanyDetailChange,
                profileResult?.companyDetail,
                "label.company_details"
              )}
              {renderCardWithDetails(
                handleContactPersonInfo,
                profileResult?.contactPersonInfo,
                "label.contact_person_info"
              )}
              {renderCardWithDetails(
                handleCompanyProfile,
                profileResult?.companyProfile,
                "label.other_details",
                profileResult?.otherDetails
              )}
              <CardComponent customStyle={style.cardStyle}>
                <DetailComponent
                  headerText={intl.formatMessage({
                    id: "label.source_of_info",
                  })}
                />
                {renderSourceOfInfo()}
              </CardComponent>
              <CardComponent customStyle={style.cardStyle}>
                <DetailComponent
                  headerText={intl.formatMessage({ id: "label.company_logo" })}
                />
                <UploadImage
                  imageUrl={profileResult?.companyLogo}
                  imageName={"CompanyLogo.png"}
                  intl={intl}
                  isEditable={isEditProfile}
                />
              </CardComponent>
              <CardComponent customStyle={style.cardStyle}>
                <View style={style.textContainer}>
                  <Text style={style.headingText}>
                    {intl.formatMessage({ id: "label.balance_credit" })}:{" "}
                  </Text>
                  <Text style={style.valueStyle}>{`${
                    profileResult?.balanceCredit || "00"
                  } INR`}</Text>
                </View>
              </CardComponent>
            </View>
          </ScrollView>
          {!isEditProfile && !isWebView && (
            <View style={style.buttonContainer}>
              <CardComponent customStyle={style.cardContainer}>
                <TouchableOpacity
                  style={style.editContainer}
                  onPress={() => {
                    handleEdit(!isEditProfile);
                  }}
                >
                  <Image source={images.iconSquareEdit} />
                  <CommonText
                    customTextStyle={style.textStyle}
                    title={intl.formatMessage({ id: "label.edit" })}
                  />
                </TouchableOpacity>
              </CardComponent>
            </View>
          )}
          {isEditProfile && (
            <View style={style.buttonContainer}>
              <SaveCancelButton
                buttonOneText={intl.formatMessage({ id: "label.cancel" })}
                onPressButtonOne={onGoBack}
                buttonTwoText={intl.formatMessage({ id: "label.save_changes" })}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

CompanyProfileUI.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onGoBack: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  profileResult: PropTypes.object,
};

export default CompanyProfileUI;
