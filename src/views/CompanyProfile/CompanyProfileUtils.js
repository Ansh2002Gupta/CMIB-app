import {
  ADDRESS_MAX_LENGTH,
  CODE_MAX_LENGTH,
  CODE_MIN_LENGTH,
  COMPANY_DETAIL_MAX_LENGTH,
  DEFAULT_INPUT_MAX_LENGTH,
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  MOBILE_NUMBER_MAX_LENGTH,
  MOBILE_NUMBER_MIN_LENGTH,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  numRegex,
} from "../../constants/constants";
import { isValidUrl } from "../../utils/util";
import { validateEmail } from "../../utils/validation";

export const allFieldsFilled = (profileData) => {
  const companyDetailsFilled = profileData?.companyDetail?.every(
    (detail) => String(detail.value).trim() !== ""
  );
  const contactPersonInfoFilled = profileData?.contactPersonInfo?.every(
    (contact) => {
      if (contact?.isContactActive || contact?.isNewContactPerson) {
        const modulesFilled = contact?.contactModules?.every(
          (module) => module?.defaultValues?.length > 0
        );
        const infosFilled = contact?.contactInfo?.every(
          (info) => String(info.value).trim() !== ""
        );
        return modulesFilled && infosFilled;
      }
      return true;
    }
  );
  const companyProfileFilled = profileData?.companyProfile?.every(
    (detail) => String(detail.value).trim() !== ""
  );
  const otherDetailsFilled = profileData?.otherDetails?.every(
    (detail) => String(detail.value).trim() !== ""
  );
  const sourceOfInfoFilled = profileData?.sourceOfInfo?.length > 0;
  return (
    companyDetailsFilled &&
    contactPersonInfoFilled &&
    companyProfileFilled &&
    sourceOfInfoFilled &&
    otherDetailsFilled
  );
};

const checkForDuplicates = (field, profileData) => {
  const values = profileData?.contactPersonInfo?.flatMap((contact) =>
    contact.contactInfo
      .filter((info) => info.key === field)
      .map((info) => info.value.toLowerCase())
  );
  const uniqueValues = new Set(values);
  return uniqueValues.size !== values.length;
};

const validateContactPersonDetails = ({
  field,
  index: idx,
  intl,
  profileData,
  newErrors,
  isValid,
}) => {
  profileData.contactPersonInfo.forEach((contact, index) => {
    let contactErrors = {};
    const contactName = contact.contactInfo?.find(
      (info) => info.label === "label.contact_person_name"
    )?.value;
    if (!field || (field === "name" && index === idx)) {
      if (
        !contactName.length ||
        contactName.length > DEFAULT_INPUT_MAX_LENGTH
      ) {
        contactErrors.name = intl.formatMessage({
          id: "label.contact_person_validation",
        });
        isValid = false;
      }
    }
    const contactDesignation = contact.contactInfo?.find(
      (info) => info.label === "label.contact_personal_designation"
    )?.value;
    if (!field || (field === "designation" && index === idx)) {
      if (
        !contactDesignation.length ||
        contactDesignation.length > ADDRESS_MAX_LENGTH
      ) {
        contactErrors.designation = intl.formatMessage({
          id: "label.designation_validation",
        });
        isValid = false;
      }
    }
    const contactMobileNo = contact?.contactInfo?.find(
      (info) => info.label === "label.mobile_number"
    )?.value;
    if (!field || (field === "mobileNo" && index === idx)) {
      if (
        !numRegex.test(String(contactMobileNo)) ||
        contactMobileNo.trim().length < MOBILE_NUMBER_MIN_LENGTH ||
        contactMobileNo.trim().length > MOBILE_NUMBER_MAX_LENGTH
      ) {
        contactErrors.mobileNo = intl.formatMessage({
          id: "label.mobile_number_validation",
        });
        isValid = false;
      }
      if (checkForDuplicates("mobileNo", profileData)) {
        contactErrors.mobileNo = intl.formatMessage({
          id: "label.duplicate_mobileNo_validation",
        });
        isValid = false;
      }
    }
    const contactEmailId = contact?.contactInfo?.find(
      (info) => info.label === "label.email_id"
    )?.value;
    if (!field || (field === "contactEmailId" && index === idx)) {
      if (validateEmail(contactEmailId)) {
        contactErrors.contactEmailId = intl.formatMessage({
          id: "label.email_id_validation",
        });
        isValid = false;
      }
      if (checkForDuplicates("contactEmailId", profileData)) {
        contactErrors.contactEmailId = intl.formatMessage({
          id: "label.duplicate_email_validation",
        });
        isValid = false;
      }
    }

    if (Object.keys(contactErrors).length > 0) {
      newErrors.contactDetails[index] = {
        ...newErrors.contactDetails[index],
        ...contactErrors,
      };
    }
  });
  return isValid;
};

export const validateFields = ({
  field,
  index,
  intl,
  profileData,
  setProfileData,
}) => {
  //TODO: Need to be optimize
  let isValid = true;
  let newErrors = {};

  profileData?.companyDetail?.forEach((detail) => {
    newErrors[detail?.key] = detail.error || "";
  });

  profileData?.companyProfile?.forEach((detail) => {
    newErrors[detail?.key] = detail.error || "";
  });

  profileData?.otherDetails?.forEach((detail) => {
    newErrors[detail?.key] = detail.error || "";
  });

  newErrors.contactDetails = [];
  profileData.contactPersonInfo.forEach((contact, idx) => {
    newErrors.contactDetails[idx] = {};
    contact.contactInfo.forEach((info) => {
      newErrors.contactDetails[idx][info.key] = info.error || "";
    });
  });

  const findValueByLabel = (label) => {
    const combinedDetails = [
      ...profileData.companyDetail,
      ...profileData.contactPersonInfo,
      ...profileData.companyProfile,
      ...profileData.otherDetails,
    ];
    const detail = combinedDetails.find((d) => d.label === label);
    return detail ? detail.value : "";
  };
  const companyName = findValueByLabel("label.company_name");
  const registrationNo = findValueByLabel("label.firm_registration_no");
  const noOfPartners = findValueByLabel("label.no_of_partners");
  const address = findValueByLabel("label.address_for_correspondence");
  const emailId = findValueByLabel("label.email_id");
  const telephoneNo = findValueByLabel("label.telephone_no");
  const code = findValueByLabel("label.isd_std_code");
  const companyDetail = findValueByLabel("label.short_profile_of_the_company");
  const website = findValueByLabel("label.website");
  const entity = findValueByLabel("label.entity");
  if (!field || field === "companyName") {
    if (
      !companyName.trim().length ||
      companyName.trim().length > DEFAULT_INPUT_MAX_LENGTH
    ) {
      newErrors.companyName = intl.formatMessage({
        id: "label.company_name_validation",
      });
      isValid = false;
    }
  }
  if (!field || field === "code") {
    if (
      !numRegex.test(String(code)) ||
      code.length < CODE_MIN_LENGTH ||
      code.length > CODE_MAX_LENGTH
    ) {
      newErrors.code = intl.formatMessage({
        id: "label.country_code_validation",
      });
      isValid = false;
    }
  }
  if (!field || field === "telephoneNo") {
    if (
      !numRegex.test(String(telephoneNo)) ||
      telephoneNo.length > NUMBER_MAX_LENGTH ||
      telephoneNo.length < NUMBER_MIN_LENGTH
    ) {
      newErrors.telephoneNo = intl.formatMessage({
        id: "label.telephone_no_validation",
      });
      isValid = false;
    }
  }
  if (!field || field === "emailId") {
    if (validateEmail(emailId)) {
      newErrors.emailId = intl.formatMessage({
        id: "label.email_id_validation",
      });
      isValid = false;
    }
  }
  if (entity === FIRM_OF_CHARTERED_ACCOUNTANTS) {
    if (!field || field === "registrationNo") {
      if (!registrationNo) {
        newErrors.registrationNo = intl.formatMessage({
          id: "label.registration_no_validation",
        });
        isValid = false;
      }
    }
    if (!field || field === "noOfPartners") {
      if (!numRegex.test(String(noOfPartners))) {
        newErrors.noOfPartners = intl.formatMessage({
          id: "label.no_of_partners_validation",
        });
        isValid = false;
      }
    }
  }
  if (!field || field === "address") {
    if (!address.trim().length || address.trim().length > ADDRESS_MAX_LENGTH) {
      newErrors.address = intl.formatMessage({
        id: "label.address_validation",
      });
      isValid = false;
    }
  }
  if (!field || field === "companyDetail") {
    if (
      companyDetail.trim().length < DEFAULT_INPUT_MAX_LENGTH ||
      companyDetail.trim().length > COMPANY_DETAIL_MAX_LENGTH
    ) {
      newErrors.companyDetail = intl.formatMessage({
        id: "label.company_details_validation",
      });
      isValid = false;
    }
  }
  if (!field || field === "website") {
    if (!isValidUrl(String(website))) {
      newErrors.website = intl.formatMessage({
        id: "label.url_validation",
      });
      isValid = false;
    }
  }

  isValid = validateContactPersonDetails({
    field,
    index,
    intl,
    isValid,
    newErrors,
    profileData,
  });

  const profileDataWithErrors = {
    ...profileData,
    companyDetail: profileData.companyDetail.map((detail) => ({
      ...detail,
      error: newErrors[detail?.key] || "",
    })),
    contactPersonInfo: profileData.contactPersonInfo.map((contact, index) => ({
      ...contact,
      contactInfo: contact.contactInfo.map((info) => ({
        ...info,
        error:
          newErrors.contactDetails[index] &&
          newErrors.contactDetails[index][info.key]
            ? newErrors.contactDetails[index][info.key]
            : "",
      })),
    })),
    companyProfile: profileData.companyProfile.map((detail) => ({
      ...detail,
      error: newErrors[detail?.key] || "",
    })),
    otherDetails: profileData.otherDetails.map((detail) => ({
      ...detail,
      error: newErrors[detail?.key] || "",
    })),
  };
  setProfileData(profileDataWithErrors);
  return isValid;
};
