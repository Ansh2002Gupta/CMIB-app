import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import CardComponent from "../../components/CardComponent/CardComponent";
import CheckBox from "../../components/CheckBox/CheckBox";
import CommonText from "../../components/CommonText";
import CustomTextInput from "../../components/CustomTextInput";
import DetailCard from "../../components/DetailCard/DetailCard";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import ActionPairButton from "../../components/ActionPairButton";
import Spinner from "../../components/Spinner";
import ConfirmationModal from "../../containers/ConfirmationModal";
import UploadImage from "../../components/UploadImage/UploadImage";
import useIsWebView from "../../hooks/useIsWebView";
import { numericValidator } from "../../utils/validation";
import images from "../../images";
import style from "./CompanyProfile.style";

const CompanyProfileUI = (props) => {
  const {
    allFieldsFilled,
    error,
    handleBalanceCreditChange,
    handleCompanyDetailChange,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleModuleWarning,
    handleModuleAccess,
    moduleUpdateWarning,
    handleModuleToggle,
    handleEdit,
    handleSwitchChange,
    handleToggle,
    intl,
    isEditProfile,
    isLoading,
    moduleOptions,
    options,
    onGoBack,
    onSaveClick,
    profileResult,
  } = props;
  const { isWebView } = useIsWebView();

  const renderContactPersonDetails = () => {
    return (
      <CardComponent customStyle={style.cardStyle}>
        <CommonText customTextStyle={style.headerText} fontWeight="600">
          {intl.formatMessage({
            id: "label.contact_person_info",
          })}
        </CommonText>
        {profileResult?.contactPersonInfo?.map((contactDetailArray, index) => (
          <DetailCard
            key={index}
            customCardStyle={style.customCardStyle}
            customContainerStyle={style.customContainerStyle}
            details={contactDetailArray?.contactModules}
            handleChange={(detailKey, value, isCode) =>
              handleContactPersonInfo(index, detailKey, value, isCode)
            }
            handleMultiSelect={(updatedSelectedItems) =>
              handleModuleAccess(index, updatedSelectedItems)
            }
            handleSwitchChange={handleSwitchChange}
            index={index}
            isShowSwitch
            isActive={contactDetailArray?.isContactActive}
            isEditProfile={isEditProfile}
            otherDetails={contactDetailArray?.contactInfo}
          />
        ))}
      </CardComponent>
    );
  };

  const renderModuleAccess = () => {
    return isEditProfile ? (
      <View style={style.contentStyle}>
        {moduleOptions?.map((item, index) => (
          <CheckBox
            key={item.id}
            id={item.id}
            index={index}
            title={item.title}
            isSelected={item.isSelected}
            handleCheckbox={handleModuleToggle}
          />
        ))}
      </View>
    ) : (
      <BadgeLabel
        badgeLabels={profileResult?.companyModuleAccess}
        customTextStyle={style.badgeContainer}
      />
    );
  };

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
        badgeLabels={profileResult?.sourceOfInfo}
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
              <CommonText customTextStyle={style.textStyle} fontWeight="600">
                {intl.formatMessage({ id: "label.edit" })}
              </CommonText>
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
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.save_changes" })}
            isButtonTwoGreen
            isDisabled={!allFieldsFilled()}
            onPressButtonOne={onGoBack}
            onPressButtonTwo={onSaveClick}
          />
        </View>
      );
    }
    return null;
  };
  console.log("moduleUpdateWarning", moduleUpdateWarning);
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
        {moduleUpdateWarning && (
          <ConfirmationModal
            buttonOneText={intl.formatMessage({ id: "label.okay" })}
            headingText={intl.formatMessage({ id: "label.warning" })}
            hasSingleButton
            icon={images.iconWarning}
            onPressButtonOne={handleModuleWarning}
            subHeading={intl.formatMessage({
              id: "label.module_removal_warning",
            })}
          />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.contentContainerStyle}
        >
          <View style={style.innerContainerStyle}>
            <DetailCard
              headerId={intl.formatMessage({
                id: "label.company_details",
              })}
              details={profileResult?.companyDetail}
              handleChange={handleCompanyDetailChange}
              isEditProfile={isEditProfile}
            />
            <CardComponent customStyle={style.cardStyle}>
              <DetailComponent
                headerText={intl.formatMessage({
                  id: "label.module_access",
                })}
              />
              {renderModuleAccess()}
            </CardComponent>
            {renderContactPersonDetails()}
            <DetailCard
              headerId={intl.formatMessage({
                id: "label.other_details",
              })}
              isRow
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
            {(profileResult?.companyLogo || isEditProfile) && (
              <CardComponent customStyle={style.cardStyle}>
                <DetailComponent
                  headerText={intl.formatMessage({
                    id: "label.company_logo",
                  })}
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
            )}
            <CardComponent customStyle={style.cardStyle}>
              {isEditProfile ? (
                <View style={isWebView ? style.balanceInputStyle : {}}>
                  <CustomTextInput
                    value={profileResult?.balanceCredit}
                    label={intl.formatMessage({ id: "label.balance_credit" })}
                    isMandatory
                    placeholder={intl.formatMessage({
                      id: "label.enter_balance_credit",
                    })}
                    onChangeText={(val) =>
                      numericValidator(val) && handleBalanceCreditChange(val)
                    }
                    isRupee
                  />
                </View>
              ) : (
                <View style={style.textContainer}>
                  <CommonText customTextStyle={style.headingText}>
                    {intl.formatMessage({ id: "label.balance_credit" })}:
                  </CommonText>
                  <CommonText
                    customTextStyle={style.valueStyle}
                    fontWeight="600"
                  >{`${profileResult?.balanceCredit || "00"} INR`}</CommonText>
                </View>
              )}
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
        showInWeb={isWebView}
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
  handleModuleAccess: () => {},
  handleSwitchChange: () => {},
  profileResult: {},
  onSaveClick: () => {},
};

CompanyProfileUI.propTypes = {
  allFieldsFilled: PropTypes.func,
  error: PropTypes.string,
  handleBalanceCreditChange: PropTypes.func,
  handleCompanyDetailChange: PropTypes.func,
  handleContactPersonInfo: PropTypes.func,
  handleCompanyProfile: PropTypes.func,
  handleEdit: PropTypes.func.isRequired,
  handleModuleAccess: PropTypes.func,
  handleModuleToggle: PropTypes.func.isRequired,
  handleSwitchChange: PropTypes.func,
  handleToggle: PropTypes.func,
  intl: PropTypes.object.isRequired,
  isEditProfile: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  moduleOptions: PropTypes.array.isRequired,
  onGoBack: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onSaveClick: PropTypes.func,
  profileResult: PropTypes.object,
};

export default CompanyProfileUI;
