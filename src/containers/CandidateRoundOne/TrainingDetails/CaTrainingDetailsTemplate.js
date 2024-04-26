import React, { useState, useImperativeHandle, useRef } from "react";
import { useTheme } from "@unthinkable/react-theme";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import getStyles from "./TrainingDetails.style";
import ArticlesTraining from "./ArticlesTraining";
import IndustrialTraining from "./IndustrialTraining";

const CaTrainingDetailsTemplate = (
  { intl, isWebView, isViewMode, onValidationChange = () => {} },
  ref
) => {
  //refs
  const articleRef = useRef();
  const industryRef = useRef();

  const theme = useTheme();
  const styles = getStyles(theme);

  //state
  const [isArticleCompleted, setIsArticleCompleted] = useState(false);
  const [isIndustryCompleted, setIsIndustryCompleted] = useState(false);

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        ...articleRef?.current?.getState(),
        ...industryRef?.current?.getState(),
      };
    },
  }));

  const handleArticleChange = (val) => {
    if (val !== isArticleCompleted) {
      setIsArticleCompleted(val);
      onValidationChange(val && isIndustryCompleted);
    }
  };

  const handleIndustryChange = (val) => {
    if (val !== isIndustryCompleted) {
      setIsIndustryCompleted(val);
      onValidationChange(val && isArticleCompleted);
    }
  };

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
        {intl.formatMessage({ id: "label.membershipDetails" })}
      </CommonText>
      <ArticlesTraining
        intl={intl}
        isWebView={isWebView}
        isViewMode={isViewMode}
        ref={articleRef}
        onValidationChange={handleArticleChange}
      />
      <IndustrialTraining
        intl={intl}
        isWebView={isWebView}
        isViewMode={isViewMode}
        ref={industryRef}
        onValidationChange={handleIndustryChange}
      />
    </CardComponent>
  );
};

export default React.forwardRef(CaTrainingDetailsTemplate);
