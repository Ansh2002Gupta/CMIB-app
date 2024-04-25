import { View } from "@unthinkable/react-core-components";
import React from "react";
import DetailCard from "../../components/DetailCard";
import { useIntl } from "react-intl";
import styles from "./styles";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Spinner from "../../components/Spinner";
import { STATUS_CODES } from "../../constants/constants";

const CompanyProfileDetailUI = ({
  companyDetails,
  otherDetails,
  contactPersonDetail,
  isLoading,
  error,
}) => {
  const intl = useIntl();

  if (isLoading) {
    return (
      <View style={styles.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (error && error?.code !== STATUS_CODES.UNAUTHORIZED_USER) {
    return <ErrorComponent errorMsg={error.message} />;
  }

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
      <DetailCard
        headerId={intl.formatMessage({
          id: "label.contact_personal_details",
        })}
        details={contactPersonDetail}
        isColumnVariableWidth
        customCardStyle={styles.detailCard}
      />
    </View>
  );
};

export default CompanyProfileDetailUI;
