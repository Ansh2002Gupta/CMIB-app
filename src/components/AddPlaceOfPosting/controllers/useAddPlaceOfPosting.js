import { useEffect, useState } from "react";

const addDocumentField = [
  {
    cellID: 1,
    key: "place_of_posting",
    label: "label.place_of_posting",
    placeholder: "label.select_place_of_posting",
    value: "",
  },
  {
    cellID: 1,
    key: "general",
    label: "label.general",
    placeholder: "label.obc",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: "obc",
    label: "label.obc",
    placeholder: "label.obc",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: "sc",
    label: "label.sc",
    placeholder: "label.sc",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: "st",
    label: "label.st",
    placeholder: "label.st",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: "ph",
    label: "label.ph",
    placeholder: "label.ph",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: "others",
    label: "label.others",
    placeholder: "label.others",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    key: "total",
    label: "label.total",
    placeholder: "label.total",
    value: "",
    isNumeric: true,
  },
  {
    cellID: 1,
    isButton: true,
    isAdd: true,
  },
];

const useAddPlaceOfPosting = ({
  setRequiredPostingPlaceDetail,
  requiredPostingPlaceDetail,
}) => {
  const [addPlaceModal, setAddPlaceModal] = useState(false);
  const [editPlaceModal, setEditPlaceModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [postingPlaceDetail, setPostingPlaceDetail] = useState({
    postingPlace: "",
    general: null,
    obc: null,
    st: null,
    sc: null,
    ph: null,
    others: null,
    total: null,
  });

  const [multiAddDocument, setMuliAddDocument] = useState([
    ...addDocumentField,
  ]);

  useEffect(() => {
    validateForm();
  }, [postingPlaceDetail]);

  useEffect(() => {
    if (editPlaceModal) {
      setPostingPlaceDetail({
        postingPlace: postingPlaceDetail.postingPlace,
        general: postingPlaceDetail.general,
        obc: postingPlaceDetail.obc,
        st: postingPlaceDetail.st,
        sc: postingPlaceDetail.sc,
        ph: postingPlaceDetail.ph,
        others: postingPlaceDetail.others,
        total: postingPlaceDetail.total,
      });
    }
  }, []);

  const onClickAddPlace = () => {
    setAddPlaceModal(true);
  };

  const validateForm = () => {
    const postingPlace = postingPlaceDetail.postingPlace.trim() !== "";
    const total = postingPlaceDetail.total && postingPlaceDetail.total > 0;
    setIsFormValid((postingPlace && total) || false);
  };

  const onClickAddPlaceCancelButton = () => {
    setAddPlaceModal(false);
    setEditPlaceModal(false);
    setPostingPlaceDetail({
      postingPlace: "",
      general: null,
      obc: null,
      st: null,
      sc: null,
      ph: null,
      others: null,
      total: null,
    });
  };

  const onClickAddPlaceSaveButton = () => {
    if (editPlaceModal && index !== -1) {
      setRequiredPostingPlaceDetail((prev) => {
        const updatedList = [...prev];
        updatedList[index] = { ...postingPlaceDetail };
        return updatedList;
      });
    } else {
      setRequiredPostingPlaceDetail((prev) => [
        ...prev,
        { ...postingPlaceDetail },
      ]);
    }
    setPostingPlaceDetail({
      postingPlace: "",
      general: null,
      obc: null,
      st: null,
      sc: null,
      ph: null,
      others: null,
      total: null,
    });
    setIsFormValid(false);
    setIndex(-1);
    setEditPlaceModal(false);
    setAddPlaceModal(false);
  };

  const handlePostingPlaceChange = (propertyName, value) => {
    setPostingPlaceDetail((prevDetail) => ({
      ...prevDetail,
      [propertyName]: value,
    }));
  };

  const onClickDeletePlace = (index) => {
    setRequiredPostingPlaceDetail((prev) => prev.filter((_, i) => i !== index));
  };

  const onCLickEditPlace = (index) => {
    const placeOfPostingToEdit = requiredPostingPlaceDetail[index];
    if (placeOfPostingToEdit) {
      setPostingPlaceDetail({
        postingPlace: placeOfPostingToEdit.postingPlace,
        general: placeOfPostingToEdit.general,
        obc: placeOfPostingToEdit.obc,
        st: placeOfPostingToEdit.st,
        sc: placeOfPostingToEdit.sc,
        ph: placeOfPostingToEdit.ph,
        others: placeOfPostingToEdit.others,
        total: placeOfPostingToEdit.total,
      });
      setIndex(index);
    }

    setEditPlaceModal(true);
  };

  return {
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
    setRequiredPostingPlaceDetail,
  };
};

export default useAddPlaceOfPosting;
