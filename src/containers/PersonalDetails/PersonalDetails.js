import React, { useContext, useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import { usePut } from "../../hooks/useApiRequest";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import PersonalDetailsUI from "./PersonalDetailsUI";
import { MEMBER_CA_JOB_PROFILE } from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { usePersonalDetails } from "./Controllers/usePersonalDetails";

const PersonalDetails = ({ isEditable = true, handleEdit }) => {
  const [sideBarState] = useContext(SideBarContext);
  const { selectedModule } = sideBarState || {};
  const { data } = useFetch({
    url: `${MEMBER_CA_JOB_PROFILE}`,
  });

  const {
    makeRequest: handleUpdate,
    isError,
    isLoading,
  } = usePut({
    url: `${MEMBER_CA_JOB_PROFILE}`,
  });

  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? data : {}
  );

  const {
    accessibility_information,
    correspondence_address,
    permanent_address,
    personal_detail,
    handleAccessibilityInformationBlur,
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

  return (
    <PersonalDetailsUI
      accessibility_information={accessibility_information}
      correspondence_address={correspondence_address}
      permanent_address={permanent_address}
      personal_detail={personal_detail}
      onChangeValue={onChangeValue}
      handleAccessibilityInformationBlur={handleAccessibilityInformationBlur}
      handlePersonalDetailBlur={handlePersonalDetailBlur}
      handleCorrespondenceAddressBlur={handleCorrespondenceAddressBlur}
      handlePermanentAddressBlur={handlePermanentAddressBlur}
      isValidAllFields={false}
      isError={isError}
      isLoading={isLoading}
      isEditable={isEditable}
      onClickSave={() => {
        let payload = { ...state };
        payload.category_id = parseInt(payload.category_id, 10);
        handleUpdate({
          body: {
            ...payload,
            mobile_country_code: "+91",
            addresses: [
              {
                type: "Permanent",
                address_line_1: "XXXXXXXXXXXX",
                address_line_2: "XXXXXXXXXXXXXX",
                address_line_3: "XXXXXXXXXXXXXXXXXX",
                country: "India",
                city: "India",
                pincode: "XXXXXXX",
                state: "Delhi",
              },
              {
                type: "Correspondence",
                address_line_1: "XXXXXXXXXXXX",
                address_line_2: "XXXXXXXXXXXXXX",
                address_line_3: "XXXXXXXXXXXXXXXXXX",
                country: "India",
                city: "India",
                pincode: "XXXXXXX",
                state: "Delhi",
              },
            ],
          },
          onSuccessCallback: () => {
            handleEdit(false);
            // turn off the edit mode
          },
        });
      }}
      onClickCancel={() => {
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default PersonalDetails;
