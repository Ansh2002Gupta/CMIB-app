import React from "react";

import AddDocumentTemplate from "./AddDocumentTemplate.js";
import useAddDocument from "./controllers/useAddDocument.js";

const AddDocument = ({
  handleInputChange,
  requiredDocumentDetails,
  setRequiredDocumentDetails,
}) => {
  const {
    addDocumentModal,
    documentDetail,
    multiDocumentDetail,
    setMultiDocumentDetail,
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
    handleInputChange,
    requiredDocumentDetails,
    setRequiredDocumentDetails,
  });

  return (
    <AddDocumentTemplate
      {...{
        addDocumentModal,
        documentDetail,
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
      }}
    />
  );
};

export default AddDocument;
