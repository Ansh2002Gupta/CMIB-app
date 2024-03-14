import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import ActionPairButton from "../../components/ActionPairButton";
import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import CardComponent from "../../components/CardComponent/CardComponent";
import CheckBox from "../../components/CheckBox/CheckBox";
import CommonText from "../../components/CommonText";
import ConfirmationModal from "../../containers/ConfirmationModal";
import CustomImage from "../../components/CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import DetailCard from "../../components/DetailCard/DetailCard";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import IconHeader from "../../components/IconHeader/IconHeader";
import Spinner from "../../components/Spinner";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import UploadImage from "../../components/UploadImage/UploadImage";
import useIsWebView from "../../hooks/useIsWebView";
import images from "../../images";
import { allFieldsFilled } from "./CompanyProfileUtils";
import { DEFAULT_BALANCE_CREDIT } from "../../constants/constants";
import { gridStyles } from "../../theme/styles/commonStyles";
import style from "./CompanyProfile.style";

const CompanyProfileUI = (props) => {
  const {
    currentUser,
    error,
    errorWhileDeletion,
    errorWhileUpload,
    handleBlur,
    handleCompanyDetailChange,
    handleContactPersonInfo,
    handleCompanyProfile,
    handleDismissToast,
    handleEdit,
    handleModuleAccess,
    handleModuleWarning,
    handleModuleToggle,
    handleRemoveContactPerson,
    handleSwitchChange,
    handleToggle,
    handleunoccupiedModules,
    isEditProfile,
    isLoading,
    isUpdatingCompanyProfile,
    moduleOptions,
    moduleUpdateWarning,
    options,
    onAddContactPerson,
    onDeleteImage,
    onGoBack,
    onSaveClick,
    profileResult,
    unoccupiedModules,
    updationError,
    uploadImageToServerUtils,
    sureSaveProfile,
  } = props;
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebProps = isWebView
    ? {
        buttonOneStyle: style.customButtonStyle,
        buttonOneTextStyle: style.buttonTextStyle,
        buttonTwoStyle: style.customButtonStyle,
        buttonTwoTextStyle: style.buttonTextStyle,
        buttonOneContainerStyle: style.customButtonStyle,
        buttonTwoContainerStyle: style.customButtonStyle,
      }
    : {};

  const errorMessage = errorWhileDeletion || errorWhileUpload || updationError;

  const {
    fileUploadResult,
    handleFileUpload,
    isUploadingImageToServer,
    setFileUploadResult,
    uploadPercentage,
  } = uploadImageToServerUtils;

  const hasCompanyLogo = profileResult?.companyLogo;
  const defaultUploadResult = hasCompanyLogo
    ? {
        data: {
          url: profileResult.companyLogo,
        },
      }
    : null;

  const updatedFileUploadResult = isEditProfile
    ? fileUploadResult || defaultUploadResult
    : defaultUploadResult;

  const columnCount = isWebView && gridStyles[currentBreakpoint];

  const containerStyle = isWebView
    ? style.containerGridStyle(columnCount)
    : style.contentStyle;

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
            handleBlur={handleBlur}
            handleMultiSelect={(updatedSelectedItems) =>
              handleModuleAccess(index, updatedSelectedItems)
            }
            handleSwitchChange={handleSwitchChange}
            index={index}
            onPressActionButton={handleRemoveContactPerson}
            hasActionButton={contactDetailArray.isNewContactPerson}
            isShowSwitch={
              currentUser !==
                contactDetailArray?.contactInfo?.find(
                  (info) => info.key === "name"
                )?.id && !contactDetailArray.isNewContactPerson
            }
            isActive={contactDetailArray?.isContactActive}
            isEditProfile={isEditProfile}
            otherDetails={contactDetailArray?.contactInfo}
          />
        ))}
        {isEditProfile && (
          <CustomTouchableOpacity
            style={isWebView ? style.buttonStyle : style.mobButtonStyle}
            onPress={onAddContactPerson}
          >
            <CustomImage
              Icon={isWebView ? images.iconAddBlack : images.iconAddBlue}
              isSvg
              source={isWebView ? images.iconAddBlack : images.iconAddBlue}
              alt={"Add Contact Person"}
            />
            <CommonText
              customTextStyle={
                isWebView ? style.buttonTextStyle : style.mobTextStyle
              }
              fontWeight={isWebView ? "500" : "600"}
            >
              {intl.formatMessage({
                id: "label.add_contact_person",
              })}
            </CommonText>
          </CustomTouchableOpacity>
        )}
      </CardComponent>
    );
  };

  const renderModuleAccess = () => {
    return isEditProfile ? (
      <View style={containerStyle}>
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
      <View style={containerStyle}>
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
              <CustomImage
                source={images.iconEdit}
                Icon={images.iconEdit}
                isSvg
                alt={"edit icon"}
                height={20}
                width={20}
              />
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
        <View
          style={{
            ...(isWebView ? style.webButtonContainer : {}),
            ...style.buttonContainer,
          }}
        >
          <ActionPairButton
            buttonOneText={intl.formatMessage({ id: "label.cancel" })}
            buttonTwoText={intl.formatMessage({ id: "label.save_changes" })}
            displayLoader={isUpdatingCompanyProfile}
            isButtonTwoGreen
            isDisabled={
              !allFieldsFilled(profileResult) || isUploadingImageToServer
            }
            onPressButtonOne={onGoBack}
            onPressButtonTwo={onSaveClick}
            customStyles={{
              ...isWebProps,
            }}
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
        {moduleUpdateWarning || unoccupiedModules.length ? (
          <ConfirmationModal
            buttonOneText={
              moduleUpdateWarning
                ? intl.formatMessage({ id: "label.okay" })
                : intl.formatMessage({ id: "label.no" })
            }
            buttonTwoText={intl.formatMessage({ id: "label.yes" })}
            hasSingleButton={moduleUpdateWarning}
            headingText={
              moduleUpdateWarning
                ? intl.formatMessage({ id: "label.error" })
                : intl.formatMessage({ id: "label.warning" })
            }
            onPressButtonTwo={sureSaveProfile}
            onPressButtonOne={
              moduleUpdateWarning
                ? handleModuleWarning
                : handleunoccupiedModules
            }
            severity={moduleUpdateWarning ? "error" : "warning"}
            subHeading={
              moduleUpdateWarning
                ? intl.formatMessage({
                    id: "label.module_removal_warning",
                  })
                : `${intl.formatMessage({
                    id: "label.you_have_not_provided",
                  })} ${unoccupiedModules.join(", ")} ${intl.formatMessage({
                    id: "label.module_occupancy_warning",
                  })}`
            }
          />
        ) : (
          <></>
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.contentContainerStyle}
        >
          <View style={style.innerContainerStyle}>
            <DetailCard
              details={profileResult?.companyDetail}
              handleBlur={handleBlur}
              handleChange={handleCompanyDetailChange}
              headerId={intl.formatMessage({
                id: "label.company_details",
              })}
              isEditProfile={isEditProfile}
            />
            <CardComponent customStyle={style.cardStyle}>
              <DetailComponent
                handleBlur={handleBlur}
                headerText={intl.formatMessage({
                  id: "label.module_access",
                })}
                isMandatory
              />
              {renderModuleAccess()}
            </CardComponent>
            {renderContactPersonDetails()}
            <DetailCard
              handleBlur={handleBlur}
              handleChange={handleCompanyProfile}
              headerId={intl.formatMessage({
                id: "label.other_details",
              })}
              isRow
              details={profileResult?.companyProfile}
              otherDetails={profileResult?.otherDetails}
              isEditProfile={isEditProfile}
            />
            <CardComponent customStyle={style.cardStyle}>
              <DetailComponent
                headerText={intl.formatMessage({
                  id: "label.source_of_info",
                })}
                isMandatory
              />
              {renderSourceOfInfo()}
            </CardComponent>
            {(profileResult?.companyLogo || isEditProfile) && (
              <CardComponent customStyle={style.cardStyle}>
                <DetailComponent
                  headerText={intl.formatMessage({
                    id: "label.company_logo",
                  })}
                  headerTextCustomStyles={style.headerTextStyle}
                />
                <CommonText customTextStyle={style.infoStyle}>
                  {intl.formatMessage({
                    id: "label.logo_info",
                  })}
                </CommonText>
                <View style={style.imageContainer}>
                  <UploadImage
                    {...{
                      onDeleteImage,
                      errorWhileUpload,
                      fileUploadResult: updatedFileUploadResult,
                      handleFileUpload,
                      isUploadingImageToServer,
                      setFileUploadResult,
                      uploadPercentage,
                      hideIconDelete: !isEditProfile,
                    }}
                  />
                </View>
              </CardComponent>
            )}
            <CardComponent customStyle={style.cardStyle}>
              <View style={style.textContainer}>
                <CommonText customTextStyle={style.headingText}>
                  {intl.formatMessage({ id: "label.balance_credit" })}:
                </CommonText>
                <CommonText
                  customTextStyle={style.valueStyle}
                  fontWeight="600"
                >{`${intl.formatMessage({
                  id: "label.rupee",
                })} ${
                  profileResult?.balanceCredit || DEFAULT_BALANCE_CREDIT
                }`}</CommonText>
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
        actionButtonIcon={images.iconEdit}
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
        iconLeft={isEditProfile ? images.iconGreyCross : images.iconBack}
        onPressLeftIcon={onGoBack}
      />
      {renderContent()}
      {!!errorMessage && (
        <ToastComponent
          toastMessage={errorMessage}
          onDismiss={handleDismissToast}
        />
      )}
    </>
  );
};

CompanyProfileUI.defaultProps = {
  error: "",
  handleBlur: () => {},
  handleCompanyDetailChange: () => {},
  handleContactPersonInfo: () => {},
  handleCompanyProfile: () => {},
  handleDismissToast: () => {},
  handleModuleAccess: () => {},
  handleSwitchChange: () => {},
  profileResult: {},
  onSaveClick: () => {},
};

CompanyProfileUI.propTypes = {
  currentUser: PropTypes.number,
  error: PropTypes.string,
  handleBlur: PropTypes.func,
  handleCompanyDetailChange: PropTypes.func,
  handleContactPersonInfo: PropTypes.func,
  handleCompanyProfile: PropTypes.func,
  handleDismissToast: PropTypes.func,
  handleEdit: PropTypes.func.isRequired,
  handleModuleAccess: PropTypes.func,
  handleModuleWarning: PropTypes.func,
  handleModuleToggle: PropTypes.func.isRequired,
  handleunoccupiedModules: PropTypes.func,
  handleSwitchChange: PropTypes.func,
  handleToggle: PropTypes.func,
  isEditProfile: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  isUpdatingCompanyProfile: PropTypes.bool,
  moduleOptions: PropTypes.array.isRequired,
  moduleUpdateWarning: PropTypes.bool,
  onGoBack: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onAddContactPerson: PropTypes.func,
  onSaveClick: PropTypes.func,
  profileResult: PropTypes.object,
  unoccupiedModules: PropTypes.array,
  updationError: PropTypes.string,
  sureSaveProfile: PropTypes.func,
};

export default CompanyProfileUI;
