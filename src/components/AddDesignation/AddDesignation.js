import React from "react";

import useAddDesignation from "./controllers/useAddDesignation.js";
import AddDesignationTemplate from "./AddDesignationTemplate.js";

const AddDesignation = ({
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
  } = useAddDesignation({
    requiredDocumentDetails,
    setRequiredDocumentDetails,
  });

  return (
    <AddDesignationTemplate
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

export default AddDesignation;
