import React from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";
import useIsWebView from "../../hooks/useIsWebView";

import CommonText from "../../components/CommonText";
import styles from "./PurchasedPackageDetail.style";
import { TwoColumn, TwoRow } from "../../core/layouts";
import CardComponent from "../../components/CardComponent";
import BadgeLabel from "../../components/BadgeLabel/BadgeLabel";
import { formatDate } from "../../utils/util";

function CAJobsDashboard( {packageName, description, price, validity, validityDate }) {
  const intl = useIntl();
  const { isWebView } = useIsWebView();

  const validityDateFormatted = formatDate(new Date(validityDate))

  return (
    <View style={styles.container}>
      <CommonText customTextStyle={styles.currentPackageText}>
        {intl.formatMessage({ id: "label.current_package" })}
      </CommonText>
      <CardComponent
        customStyle={{
          ...styles.componentStyle,
          ...(isWebView ? styles.webComponentStyle : {}),
        }}
      >
        <TwoRow
          topSection={
            <TwoColumn
              leftSection={
                <>
                  <CommonText
                    customTextStyle={styles.packageNameText}
                    fontWeight={"500"}
                  >
                    {packageName}
                  </CommonText>
                  <CommonText
                    customTextStyle={styles.packageValidityText}
                    fontWeight={"500"}
                  >
                    {`${intl.formatMessage({ id: "label.validityFor" })} ${validity} days`}
                  </CommonText>
                </>
              }
              rightSection={
                <CommonText
                  customTextStyle={styles.packagePriceText}
                  fontWeight={"500"}
                >
                  {price}
                </CommonText>
              }
              isLeftFillSpace
            />
          }
          bottomSection={
            <CommonText
              customTextStyle={styles.packageDescriptionText}
              fontWeight={"500"}
            >
              {description}
            </CommonText>
          }
        />
        <View style={styles.borderStyle} />
        <BadgeLabel badgeLabels={[`${intl.formatMessage({ id: "label.valid_till" })} ${validityDateFormatted}`]} />
      </CardComponent>
    </View>
  );
}

export default CAJobsDashboard;
