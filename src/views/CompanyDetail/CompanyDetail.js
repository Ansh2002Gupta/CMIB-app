import React from "react";
import { View } from "@unthinkable/react-core-components";
import { CustomTabs } from "../../components/Tab";
import PositionInformation from "../PositionInformation";
import CompanyProfileDetail from "../CompanyProfileDetail";
import styles from "./styles";
import Header from "../../containers/CompanyDetail/Header";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import useCompanyDetail from "./controller/useCompanyDetail";
import { STATUS_CODES } from "../../constants/constants";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Spinner from "../../components/Spinner";

const CompanyDetail = () => {
  const intl = useIntl();
  const { centerId, companyId } = useParams();
  const { profileInformation, isProfileLoading, profileError } =
    useCompanyDetail({
      centerId,
      companyId,
    });

  if (isProfileLoading) {
    return (
      <View style={styles.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (profileError && profileError?.code !== STATUS_CODES.UNAUTHORIZED_USER) {
    return <ErrorComponent errorMsg={profileError.message} />;
  }

  return (
    <View style={styles.containerStyle}>
      <CustomTabs
        renderHeader={() => (
          <Header
            centreName={profileInformation?.centre}
            comanyLogo={profileInformation?.company_logo}
            companyName={profileInformation?.name}
          />
        )}
        tabs={[
          {
            label: intl.formatMessage({ id: "label.positionInformation" }),
            component: <PositionInformation {...{ centerId, companyId }} />,
          },
          {
            label: intl.formatMessage({ id: "label.companyProfile" }),
            component: (
              <CompanyProfileDetail {...{ data: profileInformation }} />
            ),
          },
        ]}
      />
    </View>
  );
};

export default CompanyDetail;
