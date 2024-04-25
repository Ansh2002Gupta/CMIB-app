import React from "react";
import useFetch from "../../../hooks/useFetch";
import { View } from "@unthinkable/react-core-components";

import AddApplicationTemplate from "./AddApplicationTemplate";
import Spinner from "../../../components/Spinner";
import useAddApplication from "./controller/useAddApplication";
import useIsWebView from "../../../hooks/useIsWebView";
import { COUNTRY_CODE } from "../../../services/apiServices/apiEndPoint";
import styles from "./AddApplication.style";
import { useTheme } from "@unthinkable/react-theme";
import getStyles from "./AddApplication.style";

const AddApplication = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {
    intl,
    onChangeStepper,
    onClickBack,
    onClickCancel,
    selectedStepper,
    stepperData,
  } = useAddApplication();

  const { data, isLoading, isSuccess } = useFetch({ url: COUNTRY_CODE });
  const { isWebView } = useIsWebView();

  return (
    <>
      {isLoading && (
        <View style={styles.spinner}>
          <Spinner />
        </View>
      )}
      {isSuccess && (
        <AddApplicationTemplate
          countryCodeData={data}
          intl={intl}
          isWebView={isWebView}
          onChangeStepper={onChangeStepper}
          onClickCancel={onClickCancel}
          onClickBack={onClickBack}
          selectedStepper={selectedStepper}
          stepperData={stepperData}
        />
      )}
    </>
  );
};

export default AddApplication;
