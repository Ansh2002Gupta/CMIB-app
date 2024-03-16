import { useState } from "react";
import PersonalDetailUI from "./PersonalDetailUI";
import { usePersonalDetails } from "./controller/usePersonalDetails";
const PersonalDetailComponent = () => {
  const [state, setState] = useState({});

  const {
    correspondence_address,
    permanent_address,
    personal_detail,
    handlePersonalDetailBlur,
    handleCorrespondenceAddressBlur,
    handlePermanentAddressBlur,
  } = usePersonalDetails({
    state,
    setState,
  });

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeValue = (details) => (label, value) => {
    const { key } = findKeyByLabel(label, details);
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <PersonalDetailUI
      correspondence_address={correspondence_address}
      permanent_address={permanent_address}
      personal_detail={personal_detail}
      onChangeValue={onChangeValue}
      handlePersonalDetailBlur={handlePersonalDetailBlur}
      handleCorrespondenceAddressBlur={handleCorrespondenceAddressBlur}
      handlePermanentAddressBlur={handlePermanentAddressBlur}
    />
  );
};

export default PersonalDetailComponent;
