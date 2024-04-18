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
import { ADD_DOCUMENT, DOCUMENT_TYPE } from "../../constants/constants";
import { numericValidator } from "../../utils/validation";
import styles from "./AddDocument.style";

const AddDocumentTemplate = ({
  addDocumentField,
  addDocumentModal,
  documentDetail,
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
            customWebContainerStyle={{ overflow: "visible" }}
            startRowTemplate={addDocumentField}
            gridTemplate={requiredDocumentDetails}
            setObjectGridTemplate={setObjectGridTemplate}
            numColsInARow={4}
            handleValueChange={(type, inputValue, cellId) => {
              handleMultiRowDocumentDetails(type, inputValue, cellId);
            }}
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
      </CardComponent>
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