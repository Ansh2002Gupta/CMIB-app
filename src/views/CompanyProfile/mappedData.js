import { Platform } from "@unthinkable/react-core-components";
import {
  COMPANY_TYPE_OPTIONS,
  ENTITY_OPTIONS,
  FIRM_OF_CHARTERED_ACCOUNTANTS,
  NATURE_OF_SUPPLIER,
  SALUTATION_OPTIONS,
} from "../../constants/constants";

export const mapApiDataToUI = ({
  apiData,
  industryOptions,
  countryCodes,
  isEditMode = false,
}) => {
  const {
    name,
    entity,
    frn_number,
    number_of_partners,
    credit_amount,
    industry_type,
    std_country_code,
    telephone_number,
    address,
    email,
    type,
    company_details,
    website,
    nature_of_suppliers,
    source_of_information,
    company_logo,
    contact_details,
    company_module_access,
  } = apiData;

  const checkValue = (value, showPlaceholder = true) => {
    if (isEditMode) {
      return value || "";
    }
    return value || (showPlaceholder ? "--" : "");
  };

  const formatMobileNumber = (countryCode, mobileNumber) => {
    const code = checkValue(countryCode);
    const number = checkValue(mobileNumber);
    if (code === "--" && number === "--") {
      return "--";
    }
    return (code + "-" + number).replace(/--/g, "-");
  };

  const mapContactDetails = (contactDetails) => {
    const selectedModules = new Set();

    contactDetails?.forEach((contact) => {
      contact?.modules?.forEach((module) => {
        selectedModules.add(module);
      });
    });

    return contactDetails?.map((contact) => {
      const combinedMobileNumber = formatMobileNumber(
        contact?.mobile_country_code,
        contact?.mobile_number
      );
      const formatCountryCode = (code) => {
        if (!code) return code;
        const countryOption = countryCodes.find(
          (country) => country["dial_code"] === code
        );
        return countryOption ? `${code} (${countryOption["name"]})` : code;
      };

      const formattedCode =
        isEditMode && Platform.OS === "web"
          ? formatCountryCode(contact?.mobile_country_code)
          : contact?.mobile_country_code;

      const contactModules = [
        {
          label: "label.module",
          value: checkValue(contact?.modules),
          showBadgeLabel: true,
          isMandatory: true,
          isMultiSelect: true,
          isDropdown: true,
          placeholder: "label.select_module",
          defaultValues: contact?.modules.map((item) => ({
            value: item,
            label: item,
            name: item,
          })),
          options: company_module_access.map((item) => ({
            value: item,
            label: item,
            name: item,
            isSelected: contact?.modules.includes(item),
            selectedIndex: contactDetails.findIndex(
              (c) => c.modules && c.modules.includes(item)
            ),
          })),
        },
      ];
      const isActive = !!contact?.status;
      const contactInfo = [
        {
          label: "label.salutation",
          value: checkValue(contact?.salutation),
          isDropdown: true,
          options: SALUTATION_OPTIONS,
          placeholder: "label.select",
          isMandatory: true,
        },
        {
          id: contact?.id,
          key: "name",
          label: "label.contact_person_name",
          value: checkValue(contact?.name),
          isMandatory: true,
          maxLength: 255,
          placeholder: "label.enter_contact_person_name",
        },
        {
          key: "designation",
          label: "label.contact_personal_designation",
          value: checkValue(contact?.designation),
          maxLength: 500,
          isMandatory: true,
          placeholder: "label.enter_contact_person_designation",
        },
        {
          key: "mobileNo",
          label: "label.mobile_number",
          isMobileNumber: true,
          value: isEditMode ? contact?.mobile_number : combinedMobileNumber,
          codeValue: formattedCode,
          options: countryCodes,
          isNumeric: true,
          isMandatory: true,
          placeholder: "label.enter_contact_person_mobile_no",
        },
        {
          key: "contactEmailId",
          label: "label.email_id",
          value: checkValue(contact?.email),
          isMandatory: true,
          placeholder: "label.enter_contact_person_email_id",
        },
      ];
      return {
        contactModules: contactModules,
        contactInfo: contactInfo,
        isContactActive: isActive,
      };
    });
  };

  return {
    companyDetail: [
      {
        key: "companyName",
        label: "label.company_name",
        value: checkValue(name),
        maxLength: 255,
        placeholder: "label.company_name_placeholder",
        isMandatory: true,
      },
      {
        label: "label.entity",
        value: checkValue(entity),
        isDropdown: true,
        options: ENTITY_OPTIONS,
        inputKey: "label",
        valueField: "value",
        placeholder: "label.select_entity_placeholder",
        isMandatory: true,
      },
      ...(entity === FIRM_OF_CHARTERED_ACCOUNTANTS
        ? [
            {
              key: "registrationNo",
              label: "label.firm_registration_no",
              value: checkValue(frn_number),
              isNumeric: true,
              maxLength: 10,
              isMajor: true,
              placeholder: "label.enter_firm_no",
              isMandatory: true,
            },
            {
              key: "noOfPartners",
              label: "label.no_of_partners",
              value: checkValue(number_of_partners),
              isMinor: true,
              isNumeric: true,
              placeholder: "label.no_placeholder",
              isMandatory: true,
            },
          ]
        : []),
      {
        label: "label.current_industry",
        value: checkValue(industry_type?.name),
        isDropdown: true,
        options: industryOptions,
        labelField: "name",
        valueField: "name",
        inputKey: "name",
        placeholder: "label.select_current_indusrty_placeholder",
        isMandatory: true,
      },
      {
        key: "address",
        label: "label.address_for_correspondence",
        value: checkValue(address),
        isMultiline: true,
        maxLength: 500,
        placeholder: "label.address_for_correspondance_placeholder",
        isMandatory: true,
      },
      {
        key: "emailId",
        label: "label.email_id",
        value: checkValue(email),
        placeholder: "label.email_id_placeholder",
        isMandatory: true,
      },
      {
        key: "code",
        label: "label.isd_std_code",
        isNumeric: true,
        value: checkValue(std_country_code),
        isMinor: true,
        maxLength: 8,
        placeholder: "label.isd_std_code",
        isMandatory: true,
      },
      {
        key: "telephoneNo",
        label: "label.telephone_no",
        isNumeric: true,
        value: checkValue(telephone_number),
        isMajor: true,
        maxLength: 15,
        placeholder: "label.enter_telephone_no",
        isMandatory: true,
      },
    ],
    contactPersonInfo: mapContactDetails(contact_details),
    companyProfile: [
      {
        isMandatory: true,
        key: "companyDetail",
        label: "label.short_profile_of_the_company",
        value: checkValue(company_details),
        isMultiline: true,
        maxLength: 100,
        placeholder: "label.enter_profile_of_company",
      },
    ],
    otherDetails: [
      {
        key: "website",
        label: "label.website",
        value: checkValue(website),
        isLink: !!website,
        placeholder: "label.enter_your_website",
        isMandatory: true,
      },
      {
        label: "label.nature_of_supplier",
        value: checkValue(nature_of_suppliers),
        isDropdown: true,
        options: NATURE_OF_SUPPLIER,
        isMandatory: true,
        placeholder: "label.select_nature_of_supplier",
      },
      {
        label: "label.company_type",
        value: checkValue(type),
        isDropdown: true,
        options: COMPANY_TYPE_OPTIONS,
        isMandatory: true,
        valueField: "value",
        placeholder: "label.select_company_type",
      },
    ],
    sourceOfInfo: source_of_information,
    companyLogo: company_logo || null,
    balanceCredit: credit_amount,
    companyModuleAccess: company_module_access,
  };
};
