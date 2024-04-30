import React from "react";

import AddDocumentTemplate from "./AddDocumentTemplate.js";
import useAddDocument from "./controllers/useAddDocument.js";

const AddDocument = ({
  requiredDocumentDetails,
  setRenderJobDetails,
  addDocumentField,
  isEditable,
}) => {
  const {
    nonEditableData,
    addDocumentModal,
    documentDetail,
    editDocumentModal,
    handleDocumentDetailChange,
    isFormValid,
    handleMultiRowDocumentDetails,
    onClickAddDocument,
    onClickAddDocumentCancelButton,
    onClickAddDocumentSaveButton,
    onClickDeleteDocument,
    onCLickEditDocument,
  } = useAddDocument({
    requiredDocumentDetails,
    setRenderJobDetails,
    addDocumentField,
  });

  return (
    <AddDocumentTemplate
      {...{
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
      }}
    />
  );
};

export default AddDocument;
