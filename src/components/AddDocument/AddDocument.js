import React from "react";

import AddDocumentTemplate from "./AddDocumentTemplate.js";
import useAddDocument from "./controllers/useAddDocument.js";

const AddDocument = ({ requiredDocumentDetails, setRenderJobDetails }) => {
  const {
    addDocumentModal,
    documentDetail,
    addDocumentField,
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
        addDocumentModal,
        documentDetail,
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
        setRenderJobDetails,
      }}
    />
  );
};

export default AddDocument;
