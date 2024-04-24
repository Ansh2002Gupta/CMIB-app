import React from "react";

import useAddDesignation from "./controllers/useAddDesignation.js";
import AddDesignationTemplate from "./AddDesignationTemplate.js";

const AddDesignation = ({
  isEditable,
  requiredDocumentDetails,
  setRequiredDocumentDetails,
  options,
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
  } = useAddDesignation({
    requiredDocumentDetails,
    setRequiredDocumentDetails,
    options,
  });

  return (
    <AddDesignationTemplate
      {...{
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
      }}
    />
  );
};

export default AddDesignation;
