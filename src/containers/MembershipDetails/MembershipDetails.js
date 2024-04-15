import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import useFetch from "../../hooks/useFetch";
import useUpdateService from "../../services/apiServices/hooks/JobProfile/useUpdateService";
import MembershipDetailsTemplate from "./MembershipDetailsTemplate";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import {
  MEMBERS,
  MEMBERSHIP,
  MEMBER_CA_JOB_MEMBERSHIP_DETAILS,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { useMembershipDetails } from "./controller/useMembershipDetails";
import { formatDateToYYYYMMDD } from "../../utils/util";

const MembershipDetails = ({ isEditable, handleEdit, onSaveSuccessfull }) => {
  const { id } = useParams();
  const { isCompany, currentModule } = useGetCurrentUser();

  const {
    data: applicantMemberShipData,
    isLoading: isGettingapplicantMemberShipDataLoading,
    error: errorWhileGettingapplicantMemberShipDataData,
    fetchData: fetchingapplicantMemberShipData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY + `/${currentModule}` + MEMBERS + `/${id}` + MEMBERSHIP,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: memberShipData,
    error: isErrorLoadingPage,
    isLoading: isLoadingPageMemberShip,
    fetchData,
  } = useFetch({
    url: MEMBER_CA_JOB_MEMBERSHIP_DETAILS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (currentModule) {
      if (isCompany) {
        fetchingapplicantMemberShipData({});
      } else {
        fetchData({});
      }
    }
  }, [currentModule]);

  const data = isCompany ? applicantMemberShipData : memberShipData;
  const isLoadingPage = isCompany
    ? isGettingapplicantMemberShipDataLoading
    : isLoadingPageMemberShip;
  const errorWhileFetching = isCompany
    ? errorWhileGettingapplicantMemberShipDataData
    : isErrorLoadingPage;

  const { handleUpdate, isError, isLoading, error, setError } =
    useUpdateService(MEMBER_CA_JOB_MEMBERSHIP_DETAILS);
  const [state, setState] = useState(
    data !== null && Object.keys(data).length ? { ...data } : {}
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
      setState({ ...data });
    }
  }, [data]);

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeValue = (details) => (label, value, codeValue) => {
    const { key, isToggle } = findKeyByLabel(label, details);

    value = isToggle ? !Boolean(value) : value;

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
    const payload = getMembershipDetailsPayload();

    handleUpdate(payload, () => {
      onSaveSuccessfull && onSaveSuccessfull();
      // turn off the edit mode
      handleEdit(false);
      fetchData();
    });
  };

  const getMembershipDetailsPayload = () => {
    const isFellowMember = state?.is_fellow_member;
    const isPractising = state?.is_practising;
    const payload = {
      membership_enrollment_date: state?.membership_enrollment_date
        ? formatDateToYYYYMMDD(state?.membership_enrollment_date)
        : "",
      is_fellow_member: isFellowMember ?? false,
      fellow_member_admission_date:
        isFellowMember && state?.fellow_member_admission_date
          ? formatDateToYYYYMMDD(state?.fellow_member_admission_date)
          : "",
      is_practising: isPractising ?? false,
      practising_start_date:
        isPractising && state?.practising_start_date
          ? formatDateToYYYYMMDD(state?.practising_start_date)
          : "",
    };
    return payload;
  };

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
      isLoading={isLoading}
      isError={isError}
      isLoadingPage={isLoadingPage}
      isErrorLoadingPage={errorWhileFetching}
      error={error}
      setError={setError}
      isEditable={isEditable}
      onClickSave={performSaveChanges}
      onClickCancel={() => {
        setState(data);
        // turn off the edit mode
        handleEdit(false);
      }}
    />
  );
};

export default MembershipDetails;
