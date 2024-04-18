import { ScrollView, View } from "@unthinkable/react-core-components";
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
import colors from "../../../../assets/colors";
import UploadImage from "../../../../components/UploadImage";
import AddBenefits from "../../../../components/AddBenfits";
import AddDesignation from "../../../../components/AddDesignation";

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
}) => {
  const {
    fileUploadResult,
    handleFileUpload,
    isUploadingImageToServer,
    setFileUploadResult,
    uploadPercentage,
  } = uploadImageToServerUtils;

  const hasCompanyLogo = false;
  const defaultUploadResult = hasCompanyLogo
    ? {
        data: { url: false },
      }
    : null;

  const updatedFileUploadResult = isEditProfile
    ? fileUploadResult || defaultUploadResult
    : defaultUploadResult;

  const intl = useIntl();
  const renderRoundDetail = () => {
    if (roundCenterDetailsLoading) {
      return (
        <View style={styles.spinner}>
          <Spinner />
        </View>
      );
    }
    if (roundCenterDetailsError) {
      return (
        <View style={styles.spinner}>
          <CommonText customTextStyle={styles.errorText}>
            {roundCenterDetailsError?.data?.message}
          </CommonText>
        </View>
      );
    }
    if (roundCenterDetails)
      return (
        <>
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
              id: "label.company_details",
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
          <AddDesignation
            requiredDocumentDetails={designationDetatils}
            setRequiredDocumentDetails={setDesignationDetatils}
          />
        </>
      );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <ConfigurableList
          title={intl.formatMessage({ id: "label.centers" })}
          searchQuery={configurableListQuery}
          setSearchQuery={setConfigurableListQuery}
          selectedOptions={selectedOptions}
          onDelete={handleDelete}
          onPress={handlePress}
          onAdd={handleAdd}
          nameField="centre_name"
          idField="centre_id"
          options={mappedCentersList}
          menuOptions={menuOptions}
          setMenuOptions={setMenuOptions}
          outerContainer={styles.configurableStyle}
          componentContainer={styles.componentContainer}
        />
        <View style={styles.innerContainerStyle}>{renderRoundDetail()}</View>
      </View>
      <View>
        <CardComponent customStyle={styles.cardStyle}>
          <DetailComponent
            headerText={intl.formatMessage({ id: "label.other_details" })}
            headerTextCustomStyles={styles.headerTextStyle}
          />
          <View style={{ marginBottom: 24 }}>
            <CustomToggleComponent
              label={intl.formatMessage({ id: "label.company_ppt" })}
              value={isCompanyPPt}
              onValueChange={(item) => setIsCompanyPPT(item)}
              customToggleStyle={{ marginTop: 12 }}
              customLabelStyle={{ color: colors.gray }}
            />
          </View>

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
          <AddBenefits
            {...{ setRequiredDocumentDetails, requiredDocumentDetails }}
          />
        </CardComponent>
      </View>

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
      <SaveCancelButton
        isEditable={true}
        onClickSave={handleSave}
        onClickCancel={handleCancel}
        // isValidAllFields={isValidAllFields}
      />
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
