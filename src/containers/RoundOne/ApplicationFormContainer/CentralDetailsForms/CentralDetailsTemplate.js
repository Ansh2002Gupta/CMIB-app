import { Platform, ScrollView, View } from "@unthinkable/react-core-components";
import React from "react";
import styles from "./CentralDetailsForms.styles";
import DetailCard from "../../../../components/DetailCard";
import { useIntl } from "react-intl";
import ToastComponent from "../../../../components/ToastComponent/ToastComponent";
import ConfigurableList from "../../../../components/ConfigurableList";
import SaveCancelButton from "../../../../components/SaveCancelButton";
import { keys } from "./controllers/utils";
import CommonText from "../../../../components/CommonText";
import SingleSelectionModal from "../../../../components/SingleSelectionModal";
import Spinner from "../../../../components/Spinner";
import CardComponent from "../../../../components/CardComponent";
import DetailComponent from "../../../../components/DetailComponent";
import CustomToggleComponent from "../../../../components/CustomToggleComponent";
import UploadImage from "../../../../components/UploadImage";
import AddBenefits from "../../../../components/AddBenfits";
import AddDesignation from "../../../../components/AddDesignation";
import CheckBox from "../../../../components/CheckBox";
import CustomButton from "../../../../components/CustomButton";
import images from "../../../../images";
import ActionPairButton from "../../../../components/ActionPairButton";
import { useNavigate } from "react-router";
import commonStyles from "../../../../theme/styles/commonStyles";
import { TwoRow } from "../../../../core/layouts";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";

const CentralDetailsTemplate = ({
  handleContactDetailsChange,
  isEditProfile,
  setErrorWhileUpdating,
  isErrorWhileUpdating,
  contactDetails,
  interviewDetails,
  handleInterviewDetailChange,
  mappedCentersList = [],
  buttonDisabled,
  selectedOptions,
  handleDelete,
  handlePress,
  handleAdd,
  menuOptions,
  setMenuOptions,
  configurableListQuery,
  setConfigurableListQuery,
  handleSave,
  handleCancel,
  isValidAllFields,
  handleBlur,
  selectedCenterData,
  handleSelectedCenterData,
  centerListData,
  handleSaveCenter,
  handleCenterCancel,
  showCenterModal,
  mapCenterLoading,
  centerListLoading,
  handleInterviewDetailMultiSelect,
  innerPageLoading,
  roundCenterDetails,
  roundCenterDetailsError,

  errorWhileUpload,
  onDeleteImage,
  uploadImageToServerUtils,
  requiredDocumentDetails,
  setRequiredDocumentDetails,
  isCompanyPPt,
  setIsCompanyPPT,
  designationDetatils,
  setDesignationDetatils,
  desginationData,
  handleClickOnSelectionProcess,
  selectionProcess,
  tabHandler,
  selectionFieldError,

  errorWhileUpdating,
  isPageLoading,
  fetchErrors,
  centerListError,
  saveRoundDetailLoading,
}) => {
  const {
    fileUploadResult,
    handleFileUpload,
    isUploadingImageToServer,
    setFileUploadResult,
    uploadPercentage,
  } = uploadImageToServerUtils;

  const hasCompanyLogo = false;
  const defaultUploadResult = hasCompanyLogo ? { data: { url: false } } : null;

  const updatedFileUploadResult = isEditProfile
    ? fileUploadResult || defaultUploadResult
    : defaultUploadResult;

  const intl = useIntl();
  const navigate = useNavigate();

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonTwoStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonTwoStyle,
        }
      : {};

  const renderSelectionProcess = () => {
    return (
      <View style={styles.checkBoxStyle}>
        {selectionProcess?.map((item, index) => (
          <CheckBox
            key={item.key}
            id={item.key}
            index={index}
            title={item.label}
            isSelected={item.isSelected}
            handleCheckbox={handleClickOnSelectionProcess}
            isFillSpace={true}
          />
        ))}
      </View>
    );
  };

  const renderRoundDetail = () => {
    if (innerPageLoading) {
      return (
        <View style={styles.flexContainer}>
          <Spinner />
        </View>
      );
    }

    if (roundCenterDetailsError) {
      return (
        <View style={styles.flexContainer}>
          <CommonText customTextStyle={styles.messageText}>
            {roundCenterDetailsError?.data?.message}
          </CommonText>
        </View>
      );
    }

    if (roundCenterDetails && selectedOptions?.[0]) {
      return (
        <View style={styles.roundDetailContainer}>
          <CommonText customTextStyle={styles.roundHeaderText}>
            {selectedOptions?.[0]?.name ?? ""}
          </CommonText>
          <DetailCard
            details={contactDetails}
            headerId={intl.formatMessage({
              id: "label.company_details",
            })}
            handleChange={(fieldName, value, codeValue) => {
              handleContactDetailsChange(fieldName, value, codeValue);
            }}
            customCardStyle={styles.customCardStyle}
            isColumnVariableWidth
            isEditProfile={isEditProfile}
            customContainerStyle={styles.customContainerStyle}
            handleBlur={(key, index) => {
              handleBlur(key, keys.contactDetails);
            }}
            handleMultiSelect={handleInterviewDetailMultiSelect}
          />
          <DetailCard
            details={interviewDetails}
            headerId={intl.formatMessage({
              id: "label.interview_details",
            })}
            customCardStyle={styles.customCardStyle}
            handleChange={(fieldName, value, codeValue) => {
              handleInterviewDetailChange(fieldName, value, codeValue);
            }}
            isColumnVariableWidth
            isEditProfile={isEditProfile}
            customContainerStyle={styles.customContainerStyle}
            handleMultiSelect={handleInterviewDetailMultiSelect}
          />
          <View style={styles.bottomMargin}>
            <View style={styles.selectionProcessTitle}>
              <CommonText
                customContainerStyle={styles.selectionProcessTextStyle}
                customTextStyle={styles.selectionProcessStyle}
                fontWeight="600"
              >
                {intl.formatMessage({
                  id: "label.selection_process",
                })}
              </CommonText>
              <CommonText customTextStyle={[styles.label, styles.starStyle]}>
                {" *"}
              </CommonText>
            </View>
            {renderSelectionProcess()}
          </View>
          <AddDesignation
            options={desginationData}
            requiredDocumentDetails={designationDetatils}
            setRequiredDocumentDetails={setDesignationDetatils}
          />
        </View>
      );
    }

    return (
      <View style={styles.flexContainer}>
        <CommonText customTextStyle={styles.messageText}>
          {intl.formatMessage({ id: "label.selectCenterMessage" })}
        </CommonText>
      </View>
    );
  };

  const renderBottomSection = () => {
    return (
      <View>
        <CardComponent customStyle={styles.cardStyle}>
          <DetailComponent
            headerText={intl.formatMessage({ id: "label.other_details" })}
            headerTextCustomStyles={styles.headerTextStyle}
          />
          <View style={styles.toggleComponent}>
            <CustomToggleComponent
              label={intl.formatMessage({ id: "label.company_ppt" })}
              value={isCompanyPPt}
              onValueChange={(item) => setIsCompanyPPT(item)}
              customToggleStyle={styles.customToggleStyle}
              customLabelStyle={styles.customLabelStyle}
            />
          </View>

          {!isCompanyPPt && (
            <View style={styles.imageContainer}>
              <UploadImage
                {...{
                  onDeleteImage,
                  errorWhileUpload,
                  fileUploadResult: updatedFileUploadResult,
                  handleFileUpload,
                  isUploadingImageToServer,
                  setFileUploadResult,
                  uploadPercentage,
                  hideIconDelete: false,
                  isDocumentUpload: true,
                }}
              />
            </View>
          )}
          <AddBenefits
            {...{ setRequiredDocumentDetails, requiredDocumentDetails }}
          />
        </CardComponent>
      </View>
    );
  };

  if (isPageLoading) {
    return (
      <View style={styles.flexContainer}>
        <Spinner />
      </View>
    );
  }

  if (fetchErrors) {
    return (
      <ErrorComponent
        errorMsg={
          fetchErrors?.data?.message || GENERIC_GET_API_FAILED_ERROR_MESSAGE
        }
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TwoRow
        isTopFillSpace={true}
        topSection={
          <>
            <View style={styles.topContainer}>
              <ConfigurableList
                title={intl.formatMessage({ id: "label.centers" })}
                searchQuery={configurableListQuery}
                setSearchQuery={setConfigurableListQuery}
                selectedOptions={selectedOptions.map((item) => {
                  return item?.id;
                })}
                onDelete={handleDelete}
                handlePressCustom={handlePress}
                onAdd={handleAdd}
                nameField="centre_name"
                idField="centre_id"
                options={mappedCentersList}
                menuOptions={menuOptions}
                setMenuOptions={setMenuOptions}
                customOuterContianer={styles.configurableStyle}
                componentContainer={styles.componentContainer}
                optionFormatter={(option) => ({
                  detailId: option?.id,
                  id: String(option["centre_id"]),
                  name: String(option["centre_name"]),
                })}
              />
              <View style={styles.innerContainerStyle}>
                {renderRoundDetail()}
              </View>
            </View>
            {!innerPageLoading && roundCenterDetails && renderBottomSection()}
          </>
        }
        bottomSection={
          <View style={styles.actionBtnContainer}>
            <CustomButton
              style={styles.buttonStyle}
              iconLeft={{
                leftIconSource: images.iconArrowLeft,
              }}
              onPress={() => {
                tabHandler("prev");
              }}
            >
              <CommonText
                fontWeight={"600"}
                customTextStyle={styles.backButtonStyle}
              >
                {intl.formatMessage({ id: "label.back" })}
              </CommonText>
            </CustomButton>
            <View style={styles.rightSection}>
              <CustomButton
                style={styles.buttonStyle}
                onPress={() => navigate(-1)}
              >
                <CommonText
                  fontWeight={"600"}
                  customTextStyle={styles.backButtonStyle}
                >
                  {intl.formatMessage({ id: "label.cancel" })}
                </CommonText>
              </CustomButton>
              <ActionPairButton
                buttonOneText={intl.formatMessage({ id: "label.save" })}
                buttonTwoText={intl.formatMessage({
                  id: "label.next",
                })}
                onPressButtonOne={() => handleSave()}
                onPressButtonTwo={() => {
                  tabHandler("next");
                }}
                disableLeftStyle={styles.disabled}
                isButtonOneDisabled={buttonDisabled}
                isDisabled={buttonDisabled}
                displayLoaderLeft={saveRoundDetailLoading}
                customStyles={{
                  ...isWebProps,
                  customContainerStyle: commonStyles.customContainerStyle,
                }}
                isButtonTwoGreen
              />
            </View>
          </View>
        }
      />

      {showCenterModal && (
        <SingleSelectionModal
          data={centerListData}
          itemKey="id"
          titleKey="name"
          title={intl.formatMessage({ id: "label.selectCenters" })}
          selectedData={selectedCenterData}
          handleOnSelect={handleSelectedCenterData}
          onClickSave={handleSaveCenter}
          onClickCancel={handleCenterCancel}
          isLoading={mapCenterLoading}
          isDataLoading={centerListLoading}
          centerListError={centerListError}
        />
      )}
      {!!errorWhileUpdating && (
        <ToastComponent
          toastMessage={errorWhileUpdating}
          onDismiss={() => {
            setErrorWhileUpdating("");
          }}
        />
      )}
    </ScrollView>
  );
};

export default CentralDetailsTemplate;
