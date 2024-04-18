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

const CentralDetailsTemplate = ({
  handleContactDetailsChange,
  isEditProfile,
  setErrorWhileUpdating,
  errorWhileUpdating,
  isErrorWhileUpdating,
  contactDetails,
  interviewDetails,
  handleInterviewDetailChange,
  mappedCentersList = [],

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
  roundCenterDetailsLoading,
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
    if (roundCenterDetailsLoading) {
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

    if (roundCenterDetails) {
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
            <CommonText
              customContainerStyle={styles.selectionProcessTextStyle}
              customTextStyle={styles.selectionProcessStyle}
              fontWeight="600"
            >
              {intl.formatMessage({
                id: "label.selection_process",
              })}
            </CommonText>
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

  return (
    <ScrollView style={styles.container}>
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
        <View style={styles.innerContainerStyle}>{renderRoundDetail()}</View>
      </View>
      {!roundCenterDetailsLoading &&
        roundCenterDetails &&
        renderBottomSection()}
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
        />
      )}
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
        <ActionPairButton
          buttonOneText={intl.formatMessage({ id: "label.cancel" })}
          buttonTwoText={intl.formatMessage({ id: "label.save" })}
          onPressButtonOne={() => navigate(-1)}
          onPressButtonTwo={() => {
            handleSave();
          }}
          displayLoader={false}
          customStyles={{
            ...isWebProps,
            customContainerStyle: commonStyles.customContainerStyle,
          }}
          isButtonTwoGreen
        />
      </View>
      {isErrorWhileUpdating && !!errorWhileUpdating && (
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
