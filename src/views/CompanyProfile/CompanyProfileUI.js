import React from "react";
import PropTypes from "prop-types";
import {
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
import DetailCard from "../../components/DetailCard/DetailCard";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import SaveCancelButton from "../../components/SaveCancelButton/SaveCancelButton";
import Spinner from "../../components/Spinner";
import UploadImage from "../../components/UploadImage/UploadImage";
import useIsWebView from "../../hooks/useIsWebView";
import { sourceOfInfo } from "./mappedData";
import images from "../../images";
import style from "./CompanyProfile.style";

const CompanyProfileUI = (props) => {
  const {
    allFieldsFilled,
    error,
    handleCompanyDetailChange,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleEdit,
    handleToggle,
    intl,
    isEditProfile,
    isLoading,
    options,
    onGoBack,
    onSaveClick,
    profileResult,
  } = props;
  const { isWebView } = useIsWebView();

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
            handleCheckbox={handleToggle}
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

  const renderEditButton = () => {
    if (!isEditProfile && !isWebView) {
      return (
        <View style={style.buttonContainer}>
          <CardComponent customStyle={style.cardContainer}>
            <TouchableOpacity
              style={style.editContainer}
              onPress={() => handleEdit(true)}
            >
              <Image source={images.iconSquareEdit} />
              <CommonText
                customTextStyle={style.textStyle}
                title={intl.formatMessage({ id: "label.edit" })}
              />
            </TouchableOpacity>
          </CardComponent>
        </View>
      );
    }
    return null;
  };

  const renderSaveCancelButton = () => {
    if (isEditProfile) {
      return (
        <View style={style.buttonContainer}>
          <SaveCancelButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            onPressButtonOne={onGoBack}
            buttonTwoText={intl.formatMessage({ id: "label.save_changes" })}
            isNextDisabled={!allFieldsFilled()}
            onPressButtonTwo={onSaveClick}
          />
        </View>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={style.loaderStyle}>
          <Spinner />
        </View>
      );
    }

    if (error) {
      return <ErrorComponent errorMsg={error} />;
    }

    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.contentContainerStyle}
        >
          <View style={style.innerContainerStyle}>
            <DetailCard
              headerId="label.company_details"
              details={profileResult?.companyDetail}
              handleChange={handleCompanyDetailChange}
              isEditProfile={isEditProfile}
            />
            <DetailCard
              headerId="label.contact_person_info"
              details={profileResult?.contactPersonInfo}
              handleChange={handleContactPersonInfo}
              isEditProfile={isEditProfile}
            />
            <DetailCard
              headerId="label.other_details"
              details={profileResult?.companyProfile}
              otherDetails={profileResult?.otherDetails}
              handleChange={handleCompanyProfile}
              isEditProfile={isEditProfile}
            />
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
              <View style={style.imageContainer}>
                <UploadImage
                  imageUrl={profileResult?.companyLogo}
                  imageName={"CompanyLogo.png"}
                  intl={intl}
                  isEditable={isEditProfile}
                />
              </View>
            </CardComponent>
            <CardComponent customStyle={style.cardStyle}>
              <View style={style.textContainer}>
                <Text style={style.headingText}>
                  {intl.formatMessage({ id: "label.balance_credit" })}:
                </Text>
                <Text style={style.valueStyle}>{`${
                  profileResult?.balanceCredit || "00"
                } INR`}</Text>
              </View>
            </CardComponent>
          </View>
        </ScrollView>
        {renderEditButton()}
        {renderSaveCancelButton()}
      </>
    );
  };

  return (
    <>
      <IconHeader
        actionButtonIcon={images.iconSquareEdit}
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
        onPressLeftIcon={onGoBack}
      />
      {renderContent()}
    </>
  );
};

CompanyProfileUI.defaultProps = {
  allFieldsFilled: () => {},
  error: "",
  handleCompanyDetailChange: () => {},
  handleContactPersonInfo: () => {},
  handleCompanyProfile: () => {},
  profileResult: {
    companyDetail: {},
    contactPersonInfo: {},
    companyProfile: {},
    otherDetails: {},
    companyLogo: "",
    balanceCredit: "00",
  },
  onSaveClick: () => {},
};

CompanyProfileUI.propTypes = {
  allFieldsFilled: PropTypes.func,
  error: PropTypes.string,
  handleCompanyDetailChange: PropTypes.func,
  handleContactPersonInfo: PropTypes.func,
  handleCompanyProfile: PropTypes.func,
  handleEdit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onGoBack: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onSaveClick: PropTypes.func,
  profileResult: PropTypes.object,
};

export default CompanyProfileUI;
