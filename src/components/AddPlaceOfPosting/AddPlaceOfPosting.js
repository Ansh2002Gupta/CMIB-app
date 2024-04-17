import React from "react";

import AddPlaceOfPostingTemplate from "./AddPlaceOfPostingTemplate";
import useAddPlaceOfPosting from "./controllers/useAddPlaceOfPosting.js";

const AddPlaceOfPosting = ({
  jobDetailData,
  requiredPostingPlaceDetail,
  setRequiredPostingPlaceDetail,
  renderJobDetails,
  handleInputChange,
}) => {
  const {
    addPlaceModal,
    editPlaceModal,
    handlePostingPlaceChange,
    handleMultiRowDocumentDetails,
    addPlaceOfPosting,
    multiAddPlaceOfPosting,
    setMultiAddPlacePosting,
    isFormValid,
    onClickAddPlace,
    onClickAddPlaceCancelButton,
    onClickAddPlaceSaveButton,
    onClickDeletePlace,
    onCLickEditPlace,
    postingPlaceDetail,
  } = useAddPlaceOfPosting({
    setRequiredPostingPlaceDetail,
    requiredPostingPlaceDetail,
    handleInputChange,
  });
  return (
    <AddPlaceOfPostingTemplate
      {...{
        renderJobDetails,
        handleInputChange,
        addPlaceModal,
        editPlaceModal,
        handlePostingPlaceChange,
        handleMultiRowDocumentDetails,
        addPlaceOfPosting,
        multiAddPlaceOfPosting,
        setMultiAddPlacePosting,
        isFormValid,
        jobDetailData,
        onClickAddPlace,
        onClickAddPlaceCancelButton,
        onClickAddPlaceSaveButton,
        onClickDeletePlace,
        onCLickEditPlace,
        postingPlaceDetail,
        requiredPostingPlaceDetail,
      }}
    />
  );
};

export default AddPlaceOfPosting;
