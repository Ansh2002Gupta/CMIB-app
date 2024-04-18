import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

const useAddPlaceOfPosting = ({
  requiredPostingPlaceDetail,
  setRenderJobDetails,
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
  const intl = useIntl();

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
    // Todo: Need to change logic for mobile
    // if (editPlaceModal && index !== -1) {
    //   setRequiredPostingPlaceDetail((prev) => {
    //     const updatedList = [...prev];
    //     updatedList[index] = { ...postingPlaceDetail };
    //     return updatedList;
    //   });
    // } else {
    //   setRequiredPostingPlaceDetail((prev) => [
    //     ...prev,
    //     { ...postingPlaceDetail },
    //   ]);
    // }
    // setPostingPlaceDetail({
    //   postingPlace: "",
    //   general: null,
    //   obc: null,
    //   st: null,
    //   sc: null,
    //   ph: null,
    //   others: null,
    //   total: null,
    // });
    // setIsFormValid(false);
    // setIndex(-1);
    // setEditPlaceModal(false);
    // setAddPlaceModal(false);
  };

  const handlePostingPlaceChange = (propertyName, value) => {
    setPostingPlaceDetail((prevDetail) => ({
      ...prevDetail,
      [propertyName]: value,
    }));
  };

  const onClickDeletePlace = (index) => {
    // Todo: Fix Logic for mobile
    // setRequiredPostingPlaceDetail((prev) => prev.filter((_, i) => i !== index));
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

  const handleMultiRowDocumentDetails = ({
    propertyName,
    value,
    id,
    cellID,
  }) => {
    setRenderJobDetails((prevDetail) => {
      const updatedDetail = prevDetail?.posting_details?.map((item) => {
        if (
          !value &&
          value?.length === 0 &&
          item.cellID === cellID &&
          item.label === propertyName
        ) {
          return {
            ...item,
            value: value,
            isError: true,
            error: intl.formatMessage({ id: "label.error.cannot_be_empty" }),
          };
        }

        if (item.label === propertyName && item.cellID === cellID) {
          return { ...item, value: value, isError: null, error: null };
        }
        return item;
      });
      return { ...prevDetail, posting_details: updatedDetail };
    });
  };

  return {
    addPlaceModal,
    editPlaceModal,
    handleMultiRowDocumentDetails,
    handlePostingPlaceChange,
    isFormValid,
    onClickAddPlace,
    onClickAddPlaceCancelButton,
    onClickAddPlaceSaveButton,
    onClickDeletePlace,
    onCLickEditPlace,
    postingPlaceDetail,
  };
};

export default useAddPlaceOfPosting;
