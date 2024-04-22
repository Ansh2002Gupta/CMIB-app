import React from "react";
import { View, Text } from "@unthinkable/react-core-components";
import { CustomTabs } from "../../components/Tab";
import PositionInformation from "../PositionInformation";
import CompanyProfileDetail from "../CompanyProfileDetail";
import styles from "./styles";
import Header from "../../containers/CompanyDetail/Header";
import { useIntl } from "react-intl";
import { useParams } from "react-router";

const CompanyDetail = () => {
  const intl = useIntl();
  const { centerId, companyId } = useParams();

  return (
    <View style={styles.containerStyle}>
      <CustomTabs
        renderHeader={() => <Header />}
        tabs={[
          {
            label: intl.formatMessage({ id: "label.positionInformation" }),
            component: <PositionInformation {...{ centerId, companyId }} />,
          },
          {
            label: intl.formatMessage({ id: "label.companyProfile" }),
            component: <CompanyProfileDetail {...{ centerId, companyId }} />,
          },
        ]}
      />
    </View>
  );
};

export default CompanyDetail;
