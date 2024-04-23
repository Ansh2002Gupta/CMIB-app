import React from "react";
import { FormTabs } from "../../components/Tab";
import usePositionInformation from "./controller/usePositionInformation";
import PositionInformationUI from "./PositionInformationUI";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Spinner from "../../components/Spinner";
import { STATUS_CODES } from "../../constants/constants";
import CommonText from "../../components/CommonText";
import { useIntl } from "react-intl";
import styles from "./styles";
import { View } from "@unthinkable/react-core-components";

const PositionInformation = ({ centerId, companyId }) => {
  const positionInformation = usePositionInformation({ centerId, companyId });
  const { positionTabs, isLoading, error } = positionInformation;
  const intl = useIntl();

  if (isLoading) {
    return (
      <View style={styles.loaderStyle}>
        <Spinner />
      </View>
    );
  }

  if (error && error?.code !== STATUS_CODES.UNAUTHORIZED_USER) {
    return (
      <View style={styles.loaderStyle}>
        <ErrorComponent errorMsg={error.message} />
      </View>
    );
  }

  if (!positionTabs.length) {
    return (
      <View style={styles.loaderStyle}>
        <CommonText customTextStyle={styles.noDataFound}>
          {intl.formatMessage({ id: "label.no_data" })}
        </CommonText>
      </View>
    );
  }

  return (
    <FormTabs
      tabs={positionTabs.map((item) => {
        return {
          label: item?.designation,
          component: (
            <PositionInformationUI
              {...{ ...positionInformation, data: item }}
            />
          ),
        };
      })}
    />
  );
};

export default PositionInformation;
