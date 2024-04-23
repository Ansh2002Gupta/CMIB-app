import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import LoadingScreen from "../../components/LoadingScreen";
import PersonalDetailsUI from "./PersonalDetailsUI";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import useFetch from "../../hooks/useFetch";
import { usePut } from "../../hooks/useApiRequest";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { GENERIC_GET_API_FAILED_ERROR_MESSAGE } from "../../constants/errorMessages";
import {
  MEMBERS,
  MEMBER_CA_JOB_PROFILE_PERSONAL,
  PERSONAL,
  USER_TYPE_COMPANY,
} from "../../services/apiServices/apiEndPoint";
import { usePersonalDetails } from "./Controllers/usePersonalDetails";
import { formatDate } from "../../utils/util";

const PersonalDetails = ({
  callBack,
  customUrl,
  isEditable = true,
  handleEdit,
  onSaveSuccessfull,
}) => {
  const { id } = useParams();
  const { isCompany, currentModule } = useGetCurrentUser();

  const {
    data: applicantPersonalData,
    isLoading: isGettingapplicantPersonalDataLoading,
    error: errorWhileGettingApplicantPersonalData,
    fetchData: fetchingApplicantData,
  } = useFetch({
    url:
      USER_TYPE_COMPANY + `/${currentModule}` + MEMBERS + `/${id}` + PERSONAL,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    data: memberPersonalData,
    isLoading: isGettingPersonalData,
    error: errorWhileGettingPersonalData,
    fetchData: fetchingMembersPersonalData,
  } = useFetch({
    url: customUrl ?? `${MEMBER_CA_JOB_PROFILE_PERSONAL}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (currentModule) {
      if (isCompany) {
        fetchingApplicantData({});
      } else {
        fetchingMembersPersonalData({});
      }
    }
  }, [currentModule]);

  const data = isCompany ? applicantPersonalData : memberPersonalData;
  const isLoading = isCompany
    ? isGettingapplicantPersonalDataLoading
    : isGettingPersonalData;
  const errorWhileFetching = isCompany
    ? errorWhileGettingApplicantPersonalData
    : errorWhileGettingPersonalData;

  const {
    makeRequest: handleUpdate,
    isLoading: isUpdatingPersonalData,
    error,
    setError,
  } = usePut({
    url: customUrl ?? `${MEMBER_CA_JOB_PROFILE_PERSONAL}`,
  });

  const getData = (data) =>
    data && Object.keys(data)?.length
      ? {
          gender: data?.gender,
          marital_status: data?.marital_status,
          dob: data?.dob,
          email: data?.email,
          has_passport: data?.has_passport,
          passport_number: data?.passport_number,
          category_id: data?.category_id,
          mobile_country_code: data?.mobile_country_code,
          mobile_number: data?.mobile_number,
          phone_number: data?.phone_number,
          nationality: data?.nationality,
          has_disability: data?.has_disability,
          handicap_description: data?.handicap_description,
          handicap_percentage: data?.handicap_percentage,
          address_id: data?.addresses[0]?.id,
          address1: data?.addresses[0]?.address_line_1,
          address2: data?.addresses[0]?.address_line_2,
          address3: data?.addresses[0]?.address_line_3,
          country: data?.addresses[0]?.country,
          state: data?.addresses[0]?.state,
          city: data?.addresses[0]?.city,
          pincode: data?.addresses[0]?.pincode,
          permanent_address_id: data?.addresses[1]?.id,
          permanent_address1: data?.addresses[1]?.address_line_1,
          permanent_address2: data?.addresses[1]?.address_line_2,
          permanent_address3: data?.addresses[1]?.address_line_3,
          permanent_country: data?.addresses[1]?.country,
          permanent_state: data?.addresses[1]?.state,
          permanent_city: data?.addresses[1]?.city,
          permanent_pincode: data?.addresses[1]?.pincode,
        }
      : {};

  const [state, setState] = useState(getData(data));

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
    isLoading: isGettingDropdownData,
  } = usePersonalDetails({
    state,
    isEditable,
  });

  useEffect(() => {
    if (data !== null && Object.keys(data)?.length) {
      setState(getData(data));
    }
  }, [data]);

  useEffect(() => {
    if (!!data) {
      callBack &&
        callBack({
          candidate_name: data?.name?.[0]?.name,
          candidate_id: data?.member_id,
          is_save: data?.is_save,
        });
    }
  }, [data]);

  const findKeyByLabel = (label, details) => {
    return details.find((item) => {
      return item.label === label;
    });
  };

  const onChangeValue = (details) => (label, value, codeValue) => {
    const { key, isToggle } = findKeyByLabel(label, details);

    //Note: we are using this only to copy correspondence address to permanent address
    //this is not saved in backend
    if (key === "isCommonPermanentAddress") {
      let permanentAddressData;
      if (!Boolean(value)) {
        permanentAddressData = {
          permanent_address_id: state.address_id,
          permanent_address1: state.address1,
          permanent_address2: state.address2,
          permanent_address3: state.address3,
          permanent_country: state?.country,
          permanent_state: state?.state,
          permanent_city: state?.city,
          permanent_pincode: state?.pincode,
        };
      } else {
        permanentAddressData = {
          permanent_address_id: data?.addresses[1]?.id,
          permanent_address1: data?.addresses[1]?.address_line_1,
          permanent_address2: data?.addresses[1]?.address_line_2,
          permanent_address3: data?.addresses[1]?.address_line_3,
          permanent_country: data?.addresses[1]?.country,
          permanent_state: data?.addresses[1]?.state,
          permanent_city: data?.addresses[1]?.city,
          permanent_pincode: data?.addresses[1]?.pincode,
        };
      }
      setState((prev) => ({
        ...prev,
        ...permanentAddressData,
      }));
      return;
    }
    if (isToggle) {
      value = !Boolean(value);
    } else if (key === "passport_number") {
      //make passport uppercase
      value = value.toUpperCase();
    }

    if (codeValue) {
      setState((prev) => ({
        ...prev,
        mobile_country_code: value,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleDismissToast = () => {
    setError("");
  };

  const handleSave = () => {
    let payload = {
      gender: state?.gender,
      marital_status: state?.marital_status,
      dob: formatDate(state?.dob, "YYYY-MM-DD"),
      email: state?.email,
      has_passport: state?.has_passport,
      passport_number: state?.has_passport ? state?.passport_number : "",
      category_id: state?.category_id,
      mobile_country_code: state?.mobile_country_code.split(" ")?.[0],
      mobile_number: state?.mobile_number,
      phone_number: state?.phone_number,
      nationality: state?.nationality,
      has_disability: state?.has_disability,
      handicap_description: state?.has_disability
        ? state?.handicap_description
        : "",
      handicap_percentage: state?.has_disability
        ? state?.handicap_percentage
        : 0,
      addresses: [
        {
          id: state?.address_id ? state?.address_id : null,
          type: "Permanent",
          address_line_1: state?.address1,
          address_line_2: state?.address2,
          address_line_3: state?.address3,
          country: state?.country,
          city: state?.city,
          pincode: state?.pincode,
          state: state?.state,
        },
        {
          id: state?.permanent_address_id ? state?.permanent_address_id : null,
          type: "Correspondence",
          address_line_1: state?.permanent_address1,
          address_line_2: state?.permanent_address2,
          address_line_3: state?.permanent_address3,
          country: state?.permanent_country,
          city: state?.permanent_city,
          pincode: state?.permanent_pincode,
          state: state?.permanent_state,
        },
      ],
    };
    handleUpdate({
      body: payload,
      onSuccessCallback: () => {
        fetchingMembersPersonalData();
        onSaveSuccessfull && onSaveSuccessfull();
        handleEdit(false);
      },
    });
  };

  return isLoading || isGettingDropdownData ? (
    <LoadingScreen />
  ) : errorWhileFetching ? (
    <ErrorComponent
      errorMsg={
        errorWhileFetching?.data?.message ||
        GENERIC_GET_API_FAILED_ERROR_MESSAGE
      }
    />
  ) : (
    <>
      {error ? (
        <ToastComponent toastMessage={error} onDismiss={handleDismissToast} />
      ) : (
        <></>
      )}
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
        isValidAllFields={isValidAllFields}
        isLoading={isUpdatingPersonalData}
        isEditable={isEditable}
        onClickSave={handleSave}
        onClickCancel={() => {
          setState(getData(data));
          handleEdit(false);
        }}
      />
    </>
  );
};

export default PersonalDetails;
