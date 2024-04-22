import { View } from "@unthinkable/react-core-components";
import React from "react";
import DetailCard from "../../components/DetailCard";
import { useIntl } from "react-intl";

const CompanyProfileDetailUI = ({ companyDetails, otherDetails }) => {
  const intl = useIntl();

  return (
    <View>
      <DetailCard
        headerId={intl.formatMessage({
          id: "label.company_details",
        })}
        details={companyDetails}
        isColumnVariableWidth
      />
      <DetailCard
        headerId={intl.formatMessage({
          id: "label.other_details",
        })}
        details={otherDetails}
        isColumnVariableWidth
      />
    </View>
  );
};

export default CompanyProfileDetailUI;
