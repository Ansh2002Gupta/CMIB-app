import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import AddIconText from "../AddIconText";
import CustomMultiRowTextInput from "../CustomMultiRowTextinput";
import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import EditDeleteAction from "../EditDeleteAction/EditDeleteAction";
import useIsWebView from "../../hooks/useIsWebView";
import ModalWithTitleButton from "../ModalWithTitleButton";
import {
  ADD_DESIGNATION_HEADING,
  ADD_DOCUMENT,
  DOCUMENT_TYPE,
} from "../../constants/constants";
import { extractValueDropdown } from "../../utils/util";
import { numericValidator } from "../../utils/validation";
import commonStyles from "../../theme/styles/commonStyles";
import styles from "./AddDesignation.style";

const AddDesignationTemplate = ({
  addDocumentModal,
  documentDetail,
  isEditable,
  multiDocumentDetail,
  setMultiDocumentDetail,
  addDocumentField,
  editDocumentModal,
  handleDocumentDetailChange,
  handleMultiRowDocumentDetails,
  isFormValid,
  onClickAddDocument,
  onClickAddDocumentCancelButton,
  onClickAddDocumentSaveButton,
  onClickDeleteDocument,
  onCLickEditDocument,
  requiredDocumentDetails,
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  function mapDocuments(dataArray) {
    const groupedData = {};
    dataArray.forEach((item) => {
      if (!groupedData[item.cellID]) {
        groupedData[item.cellID] = {};
      }
      switch (item.key) {
        case "designation_details":
          groupedData[item.cellID].designation_details =
            extractValueDropdown(item);
          break;
        case "number_of_vacancies":
          groupedData[item.cellID].number_of_vacancies =
            extractValueDropdown(item);
          break;
      }
    });
    const result = Object.keys(groupedData).map((key) => {
      return groupedData[key];
    });
    return result;
  }
  const nonEditableData = mapDocuments(requiredDocumentDetails);

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.tableHeadingText
      : commonStyles.cellTextStyle();
    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.designation_details || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.number_of_vacancies || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("20%"),
        isFillSpace: true,
      },
    ];
  };

  return (
    <View>
      <CommonText
        fontWeight="600"
        customTextStyle={styles.detailDocumentRequiredText}
      >
        {`${intl.formatMessage({
          id: "label.designation",
        })}s`}
      </CommonText>
      {isWebView ? (
        <CustomMultiRowTextInput
          customCardStyle={styles.multiRowTextStyle}
          isEditProfile={isEditable}
          startRowTemplate={addDocumentField}
          gridTemplate={multiDocumentDetail}
          setGridTemplate={setMultiDocumentDetail}
          numColsInARow={3}
          handleValueChange={({ propertyName, value, index }) => {
            handleMultiRowDocumentDetails(propertyName, value, index);
          }}
          customContainerStyle={styles.customContainerStyle}
          customWebContainerStyle={styles.customWebContainerStyle}
          getColoumConfigs={getColoumConfigs}
          tableData={nonEditableData}
          tableHeading={ADD_DESIGNATION_HEADING}
        />
      ) : (
        <>
          {requiredDocumentDetails.map((item, index) => {
            const isOriginal = item?.documentType === ADD_DOCUMENT.ORIGINAL;
            const isBoth = item?.documentType === ADD_DOCUMENT.BOTH;
            const copiesNumber = item?.copiesNumber || "0";
            return (
              <View>
                <View
                  style={
                    index !== 0
                      ? { ...styles.documentBorderStyle }
                      : { ...styles.notBorderStyle }
                  }
                ></View>
                <EditDeleteAction
                  topText={item?.documentName}
                  bottomLeftText={
                    isOriginal || isBoth
                      ? intl.formatMessage({
                          id: "label.original",
                        })
                      : intl.formatMessage({
                          id: "label.not_original",
                        })
                  }
                  bottomRightText={`${copiesNumber} ${intl.formatMessage({
                    id: "label.photocopies",
                  })} `}
                  onDeleteDocument={() => {
                    onClickDeleteDocument(index);
                  }}
                  onEditDocument={() => {
                    onCLickEditDocument(index);
                  }}
                />
              </View>
            );
          })}
          <AddIconText
            customViewStyle={styles.customAddIconTextStyle}
            label={intl.formatMessage({
              id: "label.add_document",
            })}
            onPress={onClickAddDocument}
          />
        </>
      )}
      {(addDocumentModal || editDocumentModal) && (
        <ModalWithTitleButton
          enableBottomButton
          isRightDisabled={!isFormValid}
          heading={
            addDocumentModal
              ? intl.formatMessage({
                  id: "label.add_document",
                })
              : intl.formatMessage({
                  id: "label.edit_document",
                })
          }
          leftLabelTxt={intl.formatMessage({
            id: "label.cancel",
          })}
          rightLabelTxt={
            addDocumentModal
              ? intl.formatMessage({
                  id: "label.add",
                })
              : intl.formatMessage({
                  id: "label.edit",
                })
          }
          customStyles={styles.customModalStyle}
          onClickLeftButton={onClickAddDocumentCancelButton}
          onClickRightButton={onClickAddDocumentSaveButton}
        >
          <View>
            <CustomTextInput
              customStyle={styles.documentNameInput}
              label={intl.formatMessage({
                id: "label.document_name",
              })}
              placeholder={intl.formatMessage({
                id: "label.required_document_name",
              })}
              isMandatory
              value={documentDetail?.documentName || ""}
              onChangeText={(val) =>
                handleDocumentDetailChange(ADD_DOCUMENT.DOCUMENT_NAME, val)
              }
            ></CustomTextInput>
            <View style={styles.inputView}>
              <CustomTextInput
                customStyle={styles.documentTypeInput}
                label={intl.formatMessage({
                  id: "label.document_type",
                })}
                placeholder={intl.formatMessage({
                  id: "label.enter_document_type",
                })}
                isMandatory
                isDropdown
                options={DOCUMENT_TYPE}
                value={documentDetail?.documentType || ""}
                onChangeValue={(val) =>
                  handleDocumentDetailChange(ADD_DOCUMENT.DOCUMENT_TYPE, val)
                }
                search={false}
              ></CustomTextInput>
              {documentDetail?.documentType === ADD_DOCUMENT.BOTH ||
              documentDetail?.documentType === ADD_DOCUMENT.PHOTOCOPIES ? (
                <View style={styles.copiesInputStyle}>
                  <CustomTextInput
                    label={intl.formatMessage({
                      id: "label.no_of_copies",
                    })}
                    placeholder={intl.formatMessage({
                      id: "label.enter_no_of_copies",
                    })}
                    isMandatory
                    value={documentDetail?.copiesNumber || null}
                    onChangeText={(val) =>
                      numericValidator(val) &&
                      handleDocumentDetailChange(ADD_DOCUMENT.COPIESNUMBER, val)
                    }
                    maxLength={7}
                  ></CustomTextInput>
                </View>
              ) : null}
            </View>
          </View>
        </ModalWithTitleButton>
      )}
    </View>
  );
};

AddDesignationTemplate.propTypes = {
  addDocumentModal: PropTypes.bool.isRequired,
  documentDetail: PropTypes.shape({
    documentName: PropTypes.string,
    documentType: PropTypes.string,
    copiesNumber: PropTypes.number,
  }).isRequired,
  editDocumentModal: PropTypes.bool.isRequired,
  handleDocumentDetailChange: PropTypes.func.isRequired,
  onClickAddDocument: PropTypes.func.isRequired,
  onClickAddDocumentCancelButton: PropTypes.func.isRequired,
  onClickAddDocumentSaveButton: PropTypes.func.isRequired,
  onClickDeleteDocument: PropTypes.func.isRequired,
  onCLickEditDocument: PropTypes.func.isRequired,
  requiredDocumentDetails: PropTypes.arrayOf(
    PropTypes.shape({
      documentName: PropTypes.string,
      documentType: PropTypes.string,
      copiesNumber: PropTypes.number,
    })
  ).isRequired,
};

AddDesignationTemplate.defaultProps = {
  addDocumentModal: false,
  documentDetail: {
    documentName: "",
    documentType: "",
    copiesNumber: 0,
  },
  editDocumentModal: false,
  handleDocumentDetailChange: () => {},
  onClickAddDocument: () => {},
  onClickAddDocumentCancelButton: () => {},
  onClickAddDocumentSaveButton: () => {},
  onClickDeleteDocument: () => {},
  onCLickEditDocument: () => {},
  requiredDocumentDetails: [],
};

export default AddDesignationTemplate;
