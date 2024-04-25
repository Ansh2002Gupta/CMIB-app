import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import AddIconText from "../../components/AddIconText";
import CardComponent from "../CardComponent/CardComponent";
import CustomMultiRowTextInput from "../CustomMultiRowTextinput";
import CommonText from "../CommonText";
import CustomTextInput from "../CustomTextInput";
import EditDeleteAction from "../../components/EditDeleteAction/EditDeleteAction";
import useIsWebView from "../../hooks/useIsWebView";
import ModalWithTitleButton from "../ModalWithTitleButton";
import {
  ADD_DOCUMENT,
  ADD_DOCUMENT_HEADING,
  DOCUMENT_TYPE,
} from "../../constants/constants";
import { numericValidator } from "../../utils/validation";
import styles from "./AddDocument.style";
import commonStyles from "../../theme/styles/commonStyles";
import { mappedPayload } from "../../containers/RoundOne/ApplicationFormContainer/PaymentForm/mappedData";

const AddDocumentTemplate = ({
  nonEditableData,
  addDocumentField,
  addDocumentModal,
  documentDetail,
  editDocumentModal,
  handleDocumentDetailChange,
  handleMultiRowDocumentDetails,
  isFormValid,
  isEditable,
  onClickAddDocument,
  onClickAddDocumentCancelButton,
  onClickAddDocumentSaveButton,
  onClickDeleteDocument,
  onCLickEditDocument,
  requiredDocumentDetails,
  setRenderJobDetails,
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const setObjectGridTemplate = (updatedDocs) => {
    setRenderJobDetails((prev) => ({
      ...prev,
      required_docs: [...updatedDocs],
    }));
  };

  const getColoumConfigs = (item, isHeading) => {
    const tableStyle = isHeading
      ? commonStyles.tableHeadingText
      : commonStyles.cellTextStyle();
    return [
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.doc_name || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.doc_type || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
      {
        content: (
          <CommonText fontWeight={"600"} customTextStyle={tableStyle}>
            {item?.no_of_copies || "-"}
          </CommonText>
        ),
        style: commonStyles.columnStyle("15%"),
        isFillSpace: true,
      },
    ];
  };
  const dataArr = Object.values(
    requiredDocumentDetails.reduce((acc, item) => {
      if (!acc[item.cellID]) acc[item.cellID] = {};
      const group = acc[item.cellID];

      if (item.key === "document_name") {
        group.doc_name = item.value;
      } else if (item.key === "document_type") {
        group.doc_type = item.value;
      } else if (item.key === "no_of_copies") {
        group.no_of_copies = item.value;
      } else {
        group.cellID = item.cellID;
      }

      return acc;
    }, {})
  );
  
  return (
    <View>
      <CardComponent customStyle={styles.notBorderStyle}>
        <CommonText
          fontWeight="600"
          customTextStyle={styles.detailDocumentRequiredText}
        >
          {intl.formatMessage({
            id: "label.details_of_required_document",
          })}
        </CommonText>
        {isWebView ? (
          <CustomMultiRowTextInput
            customCardStyle={styles.multiRowTextStyle}
            customWebContainerStyle={styles.customWebContainerStyle}
            startRowTemplate={addDocumentField}
            gridTemplate={requiredDocumentDetails}
            setObjectGridTemplate={setObjectGridTemplate}
            isEditProfile={isEditable}
            numColsInARow={4}
            handleValueChange={(type, inputValue, cellId) => {
              handleMultiRowDocumentDetails(type, inputValue, cellId);
            }}
            getColoumConfigs={getColoumConfigs}
            tableData={nonEditableData}
            tableHeading={ADD_DOCUMENT_HEADING}
            isHeading
          />
        ) : (
          <>
            {dataArr.map((item, index) => {
              const isOriginal = item.doc_type === ADD_DOCUMENT.ORIGINAL;
              const isBoth = item.doc_type === ADD_DOCUMENT.BOTH;
              const copiesNumber = item.no_of_copies || "0";
              return (
                <View key={index}>
                  <View
                    style={
                      index !== 0
                        ? { ...styles.documentBorderStyle }
                        : { ...styles.notBorderStyle }
                    }
                  ></View>
                  <EditDeleteAction
                    topText={item.doc_name}
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
                      onClickDeleteDocument(item.cellID);
                    }}
                    onEditDocument={() => {
                      onCLickEditDocument(item.cellID);
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
              onPress={() => onClickAddDocument(dataArr?.length + 1)}
            />
          </>
        )}
      </CardComponent>
      {(addDocumentModal || editDocumentModal) && (
        <ModalWithTitleButton
          enableBottomButton
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
              value={documentDetail?.doc_name || ""}
              onChangeText={(val) =>
                handleDocumentDetailChange("doc_name", val)
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
                value={documentDetail?.doc_type || ""}
                onChangeValue={(val) =>
                  handleDocumentDetailChange("doc_type", val)
                }
                search={false}
              ></CustomTextInput>
              {documentDetail?.doc_type === ADD_DOCUMENT.BOTH ||
              documentDetail?.doc_type === ADD_DOCUMENT.PHOTOCOPIES ? (
                <View style={styles.copiesInputStyle}>
                  <CustomTextInput
                    label={intl.formatMessage({
                      id: "label.no_of_copies",
                    })}
                    placeholder={intl.formatMessage({
                      id: "label.enter_no_of_copies",
                    })}
                    isMandatory
                    value={documentDetail?.no_of_copies || null}
                    onChangeText={(val) =>
                      numericValidator(val) &&
                      handleDocumentDetailChange("no_of_copies", val)
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

AddDocumentTemplate.propTypes = {
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

AddDocumentTemplate.defaultProps = {
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

export default AddDocumentTemplate;
