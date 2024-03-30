import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../../../components/CommonText";
import DetailCard from "../../../../components/DetailCard";
import styles from "./CompanyProfileForm.style";

const CompanyProfile = () => {
  const intl = useIntl();
  return (
    <View style={styles.container}>
      <DetailCard
        details={profileResult?.companyDetail}
        handleBlur={() => {}}
        handleChange={() => {}}
        headerId={intl.formatMessage({
          id: "label.company_details",
        })}
        isEditProfile={true}
      />
    </View>
  );
};

export default CompanyProfile;

const profileResult = {
  companyDetail: [
    {
      key: "companyName",
      label: "label.company_name",
      value: "Nikhils company",
      maxLength: 100,
      placeholder: "label.company_name_placeholder",
      isMandatory: true,
    },
    {
      key: "entity",
      label: "label.entity",
      value: "Corporate",
      isDropdown: true,
      options: [
        {
          label: "Corporate",
          value: "Corporate",
        },
        {
          label: "Non-Corporate",
          value: "Non-corporate",
        },
        {
          label: "Firm of Chartered Accountants",
          value: "Firm of chartered accountants",
        },
        {
          label: "PSU",
          value: "PSU",
        },
      ],
      inputKey: "label",
      valueField: "value",
      placeholder: "label.select_entity_placeholder",
      isMandatory: true,
    },
    {
      key: "currentIndustry",
      label: "label.current_industry",
      value: 2,
      defaultValue: "Air conditioning and refrigeration",
      isDropdown: true,
      options: [
        {
          id: 1,
          name: "Agro Industries and Agricultural Products",
          slug: "agro-industries-and-agricultural-products",
        },
        {
          id: 2,
          name: "Air conditioning and refrigeration",
          slug: "air-conditioning-and-refrigeration",
        },
        {
          id: 3,
          name: "Auto Ancillaries",
          slug: "auto-ancillaries",
        },
        {
          id: 4,
          name: "Auto Manufacturing - Heavy Vehicles",
          slug: "auto-manufacturing-heavy-vehicles",
        },
        {
          id: 5,
          name: "Aviation & Airlines sector",
          slug: "aviation-airlines-sector",
        },
        {
          id: 6,
          name: "Banking",
          slug: "banking",
        },
        {
          id: 7,
          name: "Beverage (Alcoholics)",
          slug: "beverage-alcoholics",
        },
        {
          id: 8,
          name: "Beverages (non Alcoholic)",
          slug: "beverages-non-alcoholic",
        },
        {
          id: 9,
          name: "Business Consultancy",
          slug: "business-consultancy",
        },
        {
          id: 10,
          name: "Business Process Outsourcing",
          slug: "business-process-outsourcing",
        },
        {
          id: 11,
          name: "Cement",
          slug: "cement",
        },
        {
          id: 12,
          name: "Ceramics and glassware",
          slug: "ceramics-and-glassware",
        },
        {
          id: 13,
          name: "Chartered Accountancy Firms",
          slug: "chartered-accountancy-firms",
        },
        {
          id: 14,
          name: "Chemicals",
          slug: "chemicals",
        },
        {
          id: 15,
          name: "Constructions",
          slug: "constructions",
        },
        {
          id: 16,
          name: "Consumer Electronics and Durables",
          slug: "consumer-electronics-and-durables",
        },
        {
          id: 17,
          name: "Cosmetics and Toiletries",
          slug: "cosmetics-and-toiletries",
        },
        {
          id: 18,
          name: "Courier Services",
          slug: "courier-services",
        },
        {
          id: 19,
          name: "Dairy Products",
          slug: "dairy-products",
        },
        {
          id: 20,
          name: "Diversified",
          slug: "diversified",
        },
        {
          id: 21,
          name: "Drugs and Pharmaceuticals",
          slug: "drugs-and-pharmaceuticals",
        },
        {
          id: 22,
          name: "Education, Training and Research",
          slug: "education-training-and-research",
        },
        {
          id: 23,
          name: "Engineering Procurement and Construction",
          slug: "engineering-procurement-and-construction",
        },
        {
          id: 24,
          name: "Exim Trade",
          slug: "exim-trade",
        },
        {
          id: 25,
          name: "Fertilisers",
          slug: "fertilisers",
        },
        {
          id: 26,
          name: "Financial Services",
          slug: "financial-services",
        },
        {
          id: 27,
          name: "Food Product",
          slug: "food-product",
        },
        {
          id: 28,
          name: "Gems & Jewellery",
          slug: "gems-jewellery",
        },
        {
          id: 29,
          name: "Health services",
          slug: "health-services",
        },
        {
          id: 30,
          name: "Heavy Engineering",
          slug: "heavy-engineering",
        },
        {
          id: 31,
          name: "Housing Finance",
          slug: "housing-finance",
        },
        {
          id: 32,
          name: "Information Technology - Hardware",
          slug: "information-technology-hardware",
        },
        {
          id: 33,
          name: "Information Technology - Software",
          slug: "information-technology-software",
        },
        {
          id: 34,
          name: "Insurance-General",
          slug: "insurance-general",
        },
        {
          id: 35,
          name: "Insurance-Life",
          slug: "insurance-life",
        },
        {
          id: 36,
          name: "Iron & Steel",
          slug: "iron-steel",
        },
        {
          id: 37,
          name: "Irrigation",
          slug: "irrigation",
        },
        {
          id: 38,
          name: "Media & Entertainment",
          slug: "media-entertainment",
        },
        {
          id: 39,
          name: "Minerals",
          slug: "minerals",
        },
        {
          id: 40,
          name: "Mining",
          slug: "mining",
        },
        {
          id: 41,
          name: "Mutual Funds",
          slug: "mutual-funds",
        },
        {
          id: 42,
          name: "NBFC",
          slug: "nbfc",
        },
        {
          id: 43,
          name: "Oil & Gas Exploration",
          slug: "oil-gas-exploration",
        },
        {
          id: 44,
          name: "Oil & Gas Refining",
          slug: "oil-gas-refining",
        },
        {
          id: 45,
          name: "Others (which are not covered above)",
          slug: "others-which-are-not-covered-above",
        },
        {
          id: 46,
          name: "Paints & Chemical",
          slug: "paints-chemical",
        },
        {
          id: 47,
          name: "Paper, leather, book, Wood",
          slug: "paper-leather-book-wood",
        },
        {
          id: 48,
          name: "Petrochemicals",
          slug: "petrochemicals",
        },
        {
          id: 49,
          name: "Power Generation and Distribution",
          slug: "power-generation-and-distribution",
        },
        {
          id: 50,
          name: "Shipping",
          slug: "shipping",
        },
        {
          id: 51,
          name: "Steel & metal manufacturing",
          slug: "steel-metal-manufacturing",
        },
        {
          id: 52,
          name: "Sugar",
          slug: "sugar",
        },
        {
          id: 53,
          name: "Telecommunication",
          slug: "telecommunication",
        },
        {
          id: 54,
          name: "Textile Manufacturing",
          slug: "textile-manufacturing",
        },
        {
          id: 55,
          name: "Trading",
          slug: "trading",
        },
        {
          id: 56,
          name: "Transport-All types",
          slug: "transport-all-types",
        },
        {
          id: 57,
          name: "Travel & Tourism",
          slug: "travel-tourism",
        },
        {
          id: 58,
          name: "Tyre, Tube & rubber product",
          slug: "tyre-tube-rubber-product",
        },
        {
          id: 59,
          name: "Others",
          slug: "others",
        },
      ],
      labelField: "name",
      valueField: "id",
      inputKey: "name",
      placeholder: "label.select_current_indusrty_placeholder",
      isMandatory: true,
    },
    {
      key: "address",
      label: "label.address_for_correspondence",
      value: "sadfasdf",
      isMultiline: true,
      maxLength: 500,
      placeholder: "label.address_for_correspondance_placeholder",
      isMandatory: true,
      isCapitalize: true,
    },
    {
      key: "emailId",
      label: "label.email_id",
      value: "nikhil.sharma+201@unthinkable.co",
      placeholder: "label.email_id_placeholder",
      isMandatory: true,
    },
    {
      key: "code",
      label: "label.isd_std_code",
      isNumeric: true,
      value: "91",
      isMinor: true,
      maxLength: 8,
      placeholder: "label.isd_std_code",
      isMandatory: true,
    },
    {
      key: "telephoneNo",
      label: "label.telephone_no",
      isNumeric: true,
      value: "1234566324",
      isMajor: true,
      maxLength: 15,
      placeholder: "label.enter_telephone_no",
      isMandatory: true,
    },
  ],
};
