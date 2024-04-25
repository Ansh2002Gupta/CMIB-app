import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

function mapPosting(dataArray) {
  const groupedData = {};
  dataArray.forEach((item) => {
    if (!groupedData[item.cellID]) {
      groupedData[item.cellID] = {};
    }
    switch (item.key) {
      case "place_of_posting":
        groupedData[item.cellID].place_of_posting = item.value;
        break;
      case "general":
        groupedData[item.cellID].general = item.value;
        break;
      case "obc":
        groupedData[item.cellID].obc = item.value;
        break;
      case "sc":
        groupedData[item.cellID].sc = item.value;
        break;
      case "st":
        groupedData[item.cellID].st = item.value;
        break;
      case "ph":
        groupedData[item.cellID].ph = item.value;
        break;
      case "others":
        groupedData[item.cellID].others = item.value;
        break;
      case "total":
        groupedData[item.cellID].total = item.value;
        break;
    }
  });
  const result = Object.keys(groupedData).map((key) => {
    return groupedData[key];
  });
  return result;
}

const useAddPlaceOfPosting = ({
  requiredPostingPlaceDetail,
  setRenderJobDetails,
  addPostingDetailsField,
}) => {
  const [addPlaceModal, setAddPlaceModal] = useState(false);
  const [editPlaceModal, setEditPlaceModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [postingPlaceDetail, setPostingPlaceDetail] = useState(null);
  const intl = useIntl();

  const nonEditableData = mapPosting(requiredPostingPlaceDetail);

  const onClickAddPlace = (cellID) => {
    setAddPlaceModal(true);
    setPostingPlaceDetail((prev) => ({
      ...prev,
      cellID: cellID,
    }));
  };

  const validateForm = () => {
    const postingPlace = postingPlaceDetail.postingPlace.trim() !== "";
    const total = postingPlaceDetail.total && postingPlaceDetail.total > 0;
    setIsFormValid((postingPlace && total) || false);
  };

  const onClickAddPlaceCancelButton = () => {
    setAddPlaceModal(false);
    setPostingPlaceDetail(null);
  };

  const onClickAddPlaceSaveButton = () => {
    const {
      place_of_posting,
      general,
      obc,
      sc,
      st,
      ph,
      others,
      total,
      cellID,
    } = postingPlaceDetail;

    let newData = addPostingDetailsField?.map((doc) => {
      let val;
      if (doc?.key === "place_of_posting") {
        val = place_of_posting;
      } else if (doc.key === "general") {
        val = general;
      } else if (doc.key === "obc") {
        val = obc;
      } else if (doc.key === "sc") {
        val = sc;
      } else if (doc.key === "st") {
        val = st;
      } else if (doc.key === "ph") {
        val = ph;
      } else if (doc.key === "total") {
        val = total;
      } else {
        val = others;
      }
      return {
        ...doc,
        cellID,
        value: val,
      };
    });

    const updatedDocumentDetails = requiredPostingPlaceDetail.map((item) => {
      if (item.cellID === cellID) {
        switch (item.key) {
          case "place_of_posting":
            return { ...item, value: place_of_posting };
          case "general":
            return { ...item, value: general };
          case "obc":
            return { ...item, value: obc };
          case "sc":
            return { ...item, value: sc };
          case "st":
            return { ...item, value: st };
          case "ph":
            return { ...item, value: ph };
          case "others":
            return { ...item, value: others };
          case "total":
            return { ...item, value: total };
          default:
            return item;
        }
      }
      return item;
    });

    setRenderJobDetails((prev) => ({
      ...prev,
      posting_details: [...updatedDocumentDetails, ...newData],
    }));
    setAddPlaceModal(false);
    setPostingPlaceDetail(null);
  };

  const handlePostingPlaceChange = (propertyName, value) => {
    setPostingPlaceDetail((prevDetail) => ({
      ...prevDetail,
      [propertyName]: value,
    }));
  };

  const onClickDeletePlace = (cellID) => {
    setRenderJobDetails((prevDetail) => {
      const filteredDocs = prevDetail?.posting_details?.filter(
        (doc) => doc.cellID !== cellID
      );
      return { ...prevDetail, posting_details: filteredDocs };
    });
  };

  const onCLickEditPlace = (cellID) => {
    const documentToEdit = requiredPostingPlaceDetail.find(
      (doc) => doc.cellID === cellID
    );

    if (documentToEdit) {
      setPostingPlaceDetail({
        place_of_posting:
          requiredPostingPlaceDetail.find(
            (item) => item.cellID === cellID && item.key === "place_of_posting"
          )?.value || "",
        general:
          requiredPostingPlaceDetail.find(
            (item) => item.cellID === cellID && item.key === "general"
          )?.value || "",
        obc:
          requiredPostingPlaceDetail.find(
            (item) => item.cellID === cellID && item.key === "obc"
          )?.value || "",
        sc:
          requiredPostingPlaceDetail.find(
            (item) => item.cellID === cellID && item.key === "sc"
          )?.value || "",
        st:
          requiredPostingPlaceDetail.find(
            (item) => item.cellID === cellID && item.key === "st"
          )?.value || "",
        ph:
          requiredPostingPlaceDetail.find(
            (item) => item.cellID === cellID && item.key === "ph"
          )?.value || "",
        others:
          requiredPostingPlaceDetail.find(
            (item) => item.cellID === cellID && item.key === "others"
          )?.value || "",
        total:
          requiredPostingPlaceDetail.find(
            (item) => item.cellID === cellID && item.key === "total"
          )?.value || "",
        cellID: cellID,
      });
    }
  };

  const handleMultiRowDocumentDetails = ({
    propertyName,
    value,
    id,
    cellID,
  }) => {
    setRenderJobDetails((prevDetail) => {
      let newTotal = 0;

      const updatedDetail = prevDetail?.posting_details?.map((item) => {
        if (
          item.isNumeric &&
          item.cellID === cellID &&
          item.label !== "label.total"
        ) {
          const newValue = item.label === propertyName ? value : item.value;
          newTotal += Number(newValue) || 0;
        }

        if (item.label === propertyName && item.cellID === cellID) {
          return {
            ...item,
            value: value,
            isError: !value,
            error: !value
              ? intl.formatMessage({ id: "label.error.cannot_be_empty" })
              : null,
          };
        }

        return item;
      });
      const totalItemIndex = updatedDetail.findIndex(
        (item) => item.label === "label.total" && item.cellID === cellID
      );
      if (totalItemIndex !== -1) {
        updatedDetail[totalItemIndex] = {
          ...updatedDetail[totalItemIndex],
          value: newTotal.toString(),
        };
      }
      return { ...prevDetail, posting_details: updatedDetail };
    });
  };

  return {
    addPlaceModal,
    editPlaceModal: postingPlaceDetail,
    nonEditableData,
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
