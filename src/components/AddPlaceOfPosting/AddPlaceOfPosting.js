import React from "react";

import AddPlaceOfPostingTemplate from "./AddPlaceOfPostingTemplate";
import useAddPlaceOfPosting from "./controllers/useAddPlaceOfPosting.js";

const AddPlaceOfPosting = ({
  jobDetailData,
  requiredPostingPlaceDetail,
  setRequiredPostingPlaceDetail,
}) => {
  const {
    addPlaceModal,
    editPlaceModal,
    handlePostingPlaceChange,
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
  });
  return (
    <AddPlaceOfPostingTemplate
      {...{
        addPlaceModal,
        editPlaceModal,
        handlePostingPlaceChange,
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
