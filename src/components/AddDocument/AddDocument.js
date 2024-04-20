import React from "react";

import AddDocumentTemplate from "./AddDocumentTemplate.js";
import useAddDocument from "./controllers/useAddDocument.js";

const AddDocument = ({
  requiredDocumentDetails,
  setRenderJobDetails,
  addDocumentField,
}) => {
  const {
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
  });

  return (
    <AddDocumentTemplate
      {...{
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
      }}
    />
  );
};

export default AddDocument;