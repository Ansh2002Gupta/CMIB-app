import React from "react";
import { ScrollView, View } from "@unthinkable/react-core-components";
import { useTheme } from "@unthinkable/react-theme";

import { CustomTabs } from "../../components/Tab";
import PositionInformation from "../PositionInformation";
import CompanyProfileDetail from "../CompanyProfileDetail";
import getStyles from "./styles";
import Header from "../../containers/CompanyDetail/Header";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import useCompanyDetail from "./controller/useCompanyDetail";
import { STATUS_CODES } from "../../constants/constants";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Spinner from "../../components/Spinner";
import useIsWebView from "../../hooks/useIsWebView";

const CompanyDetail = () => {
  const intl = useIntl();
  const { centerId, companyId } = useParams();
  const { isWebView } = useIsWebView();
  const theme = useTheme();
  const styles = getStyles(theme);

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
    <ScrollView
      style={isWebView ? styles.containerStyle : styles.containeStyleMob}
    >
      <CustomTabs
        renderHeader={() => (
          <Header
            centreName={profileInformation?.centre}
            comanyLogo={profileInformation?.company_logo}
            companyName={profileInformation?.name}
          />
        )}
        container={{ flex: undefined }}
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
    </ScrollView>
  );
};

export default CompanyDetail;
