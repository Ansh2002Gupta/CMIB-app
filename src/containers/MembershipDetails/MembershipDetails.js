import React, { useContext, useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import MembershipDetailsTemplate from "./MembershipDetailsTemplate";
import { MEMBER_CA_JOB_PROFILE } from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { useMembershipDetails } from "./controller/useMembershipDetails";

const MembershipDetails = ({isEditable, handleEdit}) => {
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
    membership_detail,
    fellow_member_detail,
    practice_detail,
    handleMembershipDetailBlur,
    handleFellowMemberDetailBlur,
    handlePracticeDetailBlur,
    isValidAllFields,
  } = useMembershipDetails({
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
    <MembershipDetailsTemplate
      membership_detail={membership_detail}
      fellow_member_detail={fellow_member_detail}
      practice_detail={practice_detail}
      onChangeValue={onChangeValue}
      handleMembershipDetailBlur={handleMembershipDetailBlur}
      handleFellowMemberDetailBlur={handleFellowMemberDetailBlur}
      handlePracticeDetailBlur={handlePracticeDetailBlur}
      isValidAllFields={isValidAllFields}
      isError={isError}
      isLoading={isLoading}
      isEditable={isEditable}
      onClickSave={() => {
        handleUpdate(state, () => {
          // turn off the edit mode
          handleEdit(false);
        });
      }}
      onClickCancel={() => {
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default MembershipDetails;
