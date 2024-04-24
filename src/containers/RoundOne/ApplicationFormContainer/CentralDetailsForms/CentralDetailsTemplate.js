import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "../../../../routes";
import { Platform, ScrollView, View } from "@unthinkable/react-core-components";

import { TwoRow } from "../../../../core/layouts";

import ActionPairButton from "../../../../components/ActionPairButton";
import AddBenefits from "../../../../components/AddBenfits";
import AddDesignation from "../../../../components/AddDesignation";
import CardComponent from "../../../../components/CardComponent";
import Chip from "../../../../components/Chip";
import CheckBox from "../../../../components/CheckBox";
import CommonText from "../../../../components/CommonText";
import ConfigurableList from "../../../../components/ConfigurableList";
import CustomButton from "../../../../components/CustomButton";
import CustomToggleComponent from "../../../../components/CustomToggleComponent";
import CustomLabelView from "../../../../components/CustomLabelView";
import DetailCard from "../../../../components/DetailCard";
import DetailComponent from "../../../../components/DetailComponent";
import ErrorComponent from "../../../../components/ErrorComponent/ErrorComponent";
import PreviewImage from "../../../../components/PreviewImage";
import SingleSelectionModal from "../../../../components/SingleSelectionModal";
import Spinner from "../../../../components/Spinner";
import ToastComponent from "../../../../components/ToastComponent/ToastComponent";
import UploadImage from "../../../../components/UploadImage";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../../../constants/errorMessages";
import { keys } from "./controllers/utils";
import images from "../../../../images";
import colors from "../../../../assets/colors";
import commonStyles from "../../../../theme/styles/commonStyles";
import styles from "./CentralDetailsForms.styles";

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
  handleSubmit,
  selectionFieldError,
  hasRoundTwo,
  submitApplications,
  errorWhileUpdating,
  isPageLoading,
  fetchErrors,
  centerListError,
  saveRoundDetailLoading,
  isEditable,
  setIsEditable,
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

  const { isSubmitting, errorWhileSubmitting, setErrorWhileSubmiting } =
    submitApplications();

  const isWebProps =
    Platform.OS.toLowerCase() === "web"
      ? {
          buttonOneStyle: styles.buttonStyle,
          buttonTwoStyle: styles.buttonTwoStyle,
          buttonOneContainerStyle: styles.buttonStyle,
          buttonTwoContainerStyle: styles.buttonTwoStyleContainer,
        }
      : {};

  const renderSelectionProcess = ({ isEditable }) => {
    return (
      <View>
        <View
          style={isEditable ? styles.checkBoxStyle : styles.viewCheckBoxStyle}
        >
          {selectionProcess?.map((item, index) =>
            isEditable ? (
              <CheckBox
                key={item.key}
                id={item.key}
                index={index}
                title={item.label}
                isSelected={item.isSelected}
                handleCheckbox={handleClickOnSelectionProcess}
                isFillSpace={true}
              />
            ) : (
              <Chip
                label={item.key}
                bgColor={colors.secondaryGrey}
                textColor={colors.black}
              />
            )
          )}
        </View>
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
            headerId={"label.company_details"}
            handleChange={(fieldName, value, codeValue) => {
              handleContactDetailsChange(fieldName, value, codeValue);
            }}
            customCardStyle={styles.customCardStyle}
            isColumnVariableWidth
            isEditProfile={isEditable}
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
            isEditProfile={isEditable}
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
            {renderSelectionProcess({ isEditable })}
          </View>
          <AddDesignation
            isEditable={isEditable}
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

  const renderBottomSection = ({ isEditable }) => {
    return (
      <View>
        <CardComponent customStyle={styles.cardStyle}>
          <DetailComponent
            headerText={intl.formatMessage({ id: "label.other_details" })}
            headerTextCustomStyles={styles.headerTextStyle}
          />
          <View style={styles.toggleComponent}>
            {isEditable ? (
              <CustomToggleComponent
                label={intl.formatMessage({ id: "label.company_ppt" })}
                value={isCompanyPPt}
                onValueChange={(item) => setIsCompanyPPT(item)}
                customToggleStyle={styles.customToggleStyle}
                customLabelStyle={styles.customLabelStyle}
              />
            ) : (
              <CustomLabelView
                label={intl.formatMessage({ id: "label.company_ppt" })}
              >
                {intl.formatMessage({ id: `toggle.${isCompanyPPt ? 0 : 1}` })}
              </CustomLabelView>
            )}
          </View>

          {!isCompanyPPt && (
            <View style={styles.imageContainer}>
              {isEditable ? (
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
              ) : (
                updatedFileUploadResult?.data?.url && (
                  <PreviewImage
                    fileUrl={updatedFileUploadResult?.data?.url}
                    isDocumentUpload
                    hideIconDelete
                  />
                )
              )}
            </View>
          )}
          <AddBenefits
            {...{
              isEditable,
              setRequiredDocumentDetails,
              requiredDocumentDetails,
            }}
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
                isEditable={isEditable}
              />
              <View style={styles.innerContainerStyle}>
                {renderRoundDetail()}
              </View>
            </View>
            {!innerPageLoading &&
              roundCenterDetails &&
              renderBottomSection({ isEditable })}
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
            {isEditable ? (
              <View style={styles.rightSection}>
                <CustomButton
                  style={styles.buttonStyle}
                  onPress={() => {
                    isEditable ? setIsEditable(false) : navigate(-1);
                  }}
                >
                  <CommonText
                    fontWeight={"600"}
                    customTextStyle={styles.backButtonStyle}
                  >
                    {intl.formatMessage({ id: "label.cancel" })}
                  </CommonText>
                </CustomButton>
                {hasRoundTwo ? (
                  <ActionPairButton
                    buttonOneText={
                      isEditable
                        ? intl.formatMessage({
                            id: "label.save",
                          })
                        : ""
                    }
                    buttonTwoText={
                      isEditable
                        ? intl.formatMessage({
                            id: "label.submit",
                          })
                        : intl.formatMessage({ id: "label.done" })
                    }
                    onPressButtonOne={() => handleSave()}
                    onPressButtonTwo={() => {
                      if (isEditable) {
                        handleSubmit();
                      } else {
                        navigate(-1);
                      }
                    }}
                    disableLeftStyle={styles.disabled}
                    isButtonOneDisabled={buttonDisabled}
                    isDisabled={buttonDisabled}
                    displayLoaderLeft={isSubmitting}
                    customStyles={{
                      ...isWebProps,
                      customContainerStyle: commonStyles.customContainerStyle,
                    }}
                    isButtonTwoGreen
                  />
                ) : (
                  <ActionPairButton
                    buttonOneText={intl.formatMessage({ id: "label.save" })}
                    buttonTwoText={intl.formatMessage({
                      id: "label.next",
                    })}
                    onPressButtonOne={() => handleSave()}
                    onPressButtonTwo={() => tabHandler("next")}
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
                )}
              </View>
            ) : (
              <CustomButton
                withGreenBackground
                style={styles.buttonStyle}
                onPress={() => {
                  tabHandler("next");
                }}
              >
                <CommonText
                  fontWeight={"600"}
                  customTextStyle={styles.nextButtonStyle}
                >
                  {intl.formatMessage({ id: "label.next" })}
                </CommonText>
              </CustomButton>
            )}
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
      {(!!errorWhileUpdating || !!errorWhileSubmitting) && (
        <ToastComponent
          toastMessage={errorWhileUpdating || errorWhileSubmitting}
          onDismiss={() => {
            setErrorWhileUpdating("");
            setDesignationDetatils("");
          }}
        />
      )}
    </ScrollView>
  );
};

export default CentralDetailsTemplate;
