import React from "react";

import AddPlaceOfPostingTemplate from "./AddPlaceOfPostingTemplate";
import useAddPlaceOfPosting from "./controllers/useAddPlaceOfPosting.js";

const AddPlaceOfPosting = ({
  addPostingDetailsField,
  handleInputChange,
  jobDetailData,
  requiredPostingPlaceDetail,
  setRenderJobDetails,
  isSpecificPerformaRequired,
  otherInfo,
}) => {
  const {
    addPlaceModal,
    editPlaceModal,
    handlePostingPlaceChange,
    handleMultiRowDocumentDetails,
    isFormValid,
    onClickAddPlace,
    onClickAddPlaceCancelButton,
    onClickAddPlaceSaveButton,
    onClickDeletePlace,
    onCLickEditPlace,
    postingPlaceDetail,
  } = useAddPlaceOfPosting({
    requiredPostingPlaceDetail,
    setRenderJobDetails,
  });
  return (
    <AddPlaceOfPostingTemplate
      {...{
        otherInfo,
        isSpecificPerformaRequired,
        addPostingDetailsField,
        handleInputChange,
        addPlaceModal,
        editPlaceModal,
        handlePostingPlaceChange,
        handleMultiRowDocumentDetails,
        isFormValid,
        jobDetailData,
        onClickAddPlace,
        onClickAddPlaceCancelButton,
        onClickAddPlaceSaveButton,
        onClickDeletePlace,
        onCLickEditPlace,
        postingPlaceDetail,
        requiredPostingPlaceDetail,
        setRenderJobDetails,
      }}
    />
  );
};

export default AddPlaceOfPosting;
