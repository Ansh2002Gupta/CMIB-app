import { useContext, useEffect, useState } from "react";
import PersonalDetailUI from "./PersonalDetailUI";
import { usePersonalDetails } from "./controller/usePersonalDetails";
import useFetch from "../../hooks/useFetch";
import { MEMBER_CA_JOB_PROFILE } from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
const PersonalDetailComponent = ({ isEditable = true }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data } = useFetch({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE}`,
  });

  const { handleUpdate, isError, isLoading } = useUpdateService({
    url: `${selectedModule?.key}/${MEMBER_CA_JOB_PROFILE}`,
  });
  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? data : {}
  );

  const {
    correspondence_address,
    permanent_address,
    personal_detail,
    handlePersonalDetailBlur,
    handleCorrespondenceAddressBlur,
    handlePermanentAddressBlur,
    isValidAllFields,
  } = usePersonalDetails({
    state,
    isEditable,
  });

  useEffect(() => {
    if (data !== null && Object.keys(data).length) {
      setState(data);
    }
  }, [data]);

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeValue = (details) => (label, value, codeValue) => {
    const { key } = findKeyByLabel(label, details);

    if (codeValue) {
      setState((prev) => ({
        ...prev,
        codeValue: value,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };
  console.log("state::", state)

  return (
    <PersonalDetailUI
      correspondence_address={correspondence_address}
      permanent_address={permanent_address}
      personal_detail={personal_detail}
      onChangeValue={onChangeValue}
      handlePersonalDetailBlur={handlePersonalDetailBlur}
      handleCorrespondenceAddressBlur={handleCorrespondenceAddressBlur}
      handlePermanentAddressBlur={handlePermanentAddressBlur}
      isValidAllFields={isValidAllFields}
      isError={isError}
      isLoading={isLoading}
      isEditable={isEditable}
      onClickSave={() => {
        handleUpdate(state, () => {
          // turn off the edit mode
        });
      }}
      onClickCancel={() => {
        // turn off the edit mode
      }}
    />
  );
};

export default PersonalDetailComponent;
