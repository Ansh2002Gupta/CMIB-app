import React, {useState, useImperativeHandle, useEffect, useRef} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import { YEARS } from "../../../constants/constants";
import styles from "./TrainingDetails.style";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomToggleComponent from "../../../components/CustomToggleComponent";
import { formatDate } from "../../../utils/util";
import ArticlesTraining from "./ArticlesTraining";
import IndustrialTraining from "./IndustrialTraining";

const CaTrainingDetailsTemplate = ({intl, isWebView, isViewMode, onValidationChange = () => {}}, ref) => {
  //refs
  const articleRef = useRef();
  const industryRef = useRef();
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
  }

  const handleIndustryChange = (val) => {
    if (val !== isIndustryCompleted) {
      setIsIndustryCompleted(val);
      onValidationChange(val && isArticleCompleted);
    }
  }
  
  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.membershipDetails" })}
          </CommonText>
          <ArticlesTraining intl={intl} isWebView={isWebView} isViewMode={isViewMode} ref={articleRef} onValidationChange={handleArticleChange}/>
          <IndustrialTraining  intl={intl} isWebView={isWebView} isViewMode={isViewMode} ref={industryRef} onValidationChange={handleIndustryChange}/>
    </CardComponent>
  )
};

export default  React.forwardRef(CaTrainingDetailsTemplate);