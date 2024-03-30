import React, { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import MembershipDetailsTemplate from "./MembershipDetailsTemplate";
import { MEMBER_CA_JOB_MEMBERSHIP_DETAILS } from "../../services/apiServices/apiEndPoint";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import { useMembershipDetails } from "./controller/useMembershipDetails";
import { formatDateToYYYYMMDD } from "../../utils/util";

const MembershipDetails = ({isEditable, handleEdit}) => {
  const { fetchData, data } = useFetch({
   url: MEMBER_CA_JOB_MEMBERSHIP_DETAILS,
  });
  const { handleUpdate, isError, isLoading } = useUpdateService(MEMBER_CA_JOB_MEMBERSHIP_DETAILS);
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

  const performSaveChanges = () => {
    const payload = getMembershipDetailsPayload() 
    handleUpdate(payload, () => {
      // turn off the edit mode
      handleEdit(false);
      fetchData();
    });
  }

  const getMembershipDetailsPayload = () => {
    const payload = {
      membership_enrollment_date:  formatDateToYYYYMMDD(state?.membership_enrollment_date),
      is_fellow_member: !state?.is_fellow_member,
      fellow_member_admission_date: !state?.is_fellow_member ? formatDateToYYYYMMDD(state?.fellow_member_admission_date) : "",
      is_practising: !state?.is_practising,
      practising_start_date: !state?.is_practising ? formatDateToYYYYMMDD(state?.practising_start_date) : "",
    }
    return payload;
  }

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
        performSaveChanges();
      }}
      onClickCancel={() => {
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default MembershipDetails;
