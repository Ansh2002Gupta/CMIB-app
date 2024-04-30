import React, {
  useState,
  useImperativeHandle,
  useEffect,
  useCallback,
} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import getStyles from "./TrainingDetails.style";
import images from "../../../images";
import CustomButton from "../../../components/CustomButton";
import { YEARS } from "../../../constants/constants";
import { formatDate } from "../../../utils/util";
import { useTheme } from "@unthinkable/react-theme";

const articleShipKeys = {
  firmName: "",
  location: "",
  trainingFrom: "",
  trainingTo: "",
  noOfPartners: "",
  natureOfWork: "",
  comapanyName: "",
  industryName: "",
  otherAreas: "",
  secondment: "",
};
const ArticlesTaining = (
  { intl, isWebView, isViewMode, onValidationChange = () => {} },
  ref
) => {
  //states
  const [articleShips, setArticleShips] = useState([articleShipKeys]);

  const theme = useTheme();
  const styles = getStyles(theme);

  //custom functions
  const onDataChange = (data, localIndex, key) => {
    try {
      let newArticles = articleShips.map((item, index) => {
        if (index === localIndex) {
          return { ...item, [key]: data };
        } else {
          return item;
        }
      });
      setArticleShips([...newArticles]);
    } catch {
      console.log("getting error");
    }
  };

  const onAddArticle = () => {
    setArticleShips([...articleShips, articleShipKeys]);
  };

  const onDeleteArticle = (LIndex) => {
    if (articleShips.length > 1) {
      let newArticles = articleShips.filter((item, index) => index !== LIndex);
      setArticleShips([...newArticles]);
    }
  };

  // Custom function to validate all fields
  const validateFields = useCallback(() => {
    // Define which fields are optional
    const optionalFields = ["otherAreas", "secondment"];
    const dateFields = ["trainingFrom", "trainingTo"];
    // Check every article to make sure all required fields are filled
    for (const article of articleShips) {
      // Check if any of the properties, except the optional ones, is an empty string
      for (const key in article) {
        const value = article[key];
        if (!optionalFields.includes(key)) {
          if (dateFields.includes(key)) {
            // For date fields, check if the value is a valid date
            if (!(value instanceof Date && !isNaN(value))) {
              return false;
            }
          } else {
            // For text fields, trim and check if empty
            if (typeof value === "string" && value.trim() === "") {
              return false;
            }
          }
        }
      }
    }
    // If we get here, all required fields are filled
    return true;
  }, [articleShips]);

  useImperativeHandle(ref, () => ({
    getState: () => {
      let articles = articleShips.map((item, index) => ({
        name_of_firm: item.firmName,
        assignment_company_name: item.comapanyName,
        assignment_industry_name: item.industryName,
        nature_of_work_done: item.natureOfWork,
        training_from: formatDate(item.trainingFrom, "YYYY-MM-DD"),
        training_to: formatDate(item.trainingTo, "YYYY-MM-DD"),
        location: item.location,
        no_of_partner_ca_firm: item.noOfPartners,
        other_areas: item.otherAreas,
        secondment_exchange: item.secondment,
      }));
      return {
        article_training_details: articles,
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    const allFieldsValidated = validateFields();
    onValidationChange(allFieldsValidated);
  }, [articleShips, onValidationChange, validateFields]);

  return (
    <View style={styles.articleContainer}>
      <CommonText
        customTextStyle={styles.articleTrainingTitleText}
        fontWeight={"600"}
      >
        {intl.formatMessage({ id: "label.articlesTraining" })}
      </CommonText>
      {articleShips.map((item, index) => {
        return (
          <CardComponent customStyle={styles.cardContainer} key={`${index}`}>
            {articleShips.length > 1 && (
              <CustomButton
                style={styles.deleteButton}
                iconLeft={{
                  leftIconSource: images.iconDeleteRed,
                }}
                onPress={() => {
                  onDeleteArticle(index);
                }}
              />
            )}
            <View style={isWebView ? styles.gridView : styles.gap}>
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.firmName}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.nameOfFirm" })}
                placeholder={intl.formatMessage({ id: "label.nameOfFirm" })}
                value={articleShips[index]?.firmName}
                onChangeText={(txt) => onDataChange(txt, index, "firmName")}
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.location}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.location" })}
                placeholder={intl.formatMessage({ id: "label.location" })}
                value={articleShips[index]?.location}
                onChangeText={(txt) => onDataChange(txt, index, "location")}
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.trainingFrom}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.trainingFrom" })}
                placeholder={intl.formatMessage({ id: "label.trainingFrom" })}
                isCalendar
                format={"DD/MM/YYYY"}
                value={articleShips[index]?.trainingFrom}
                onChangeValue={(txt) =>
                  onDataChange(txt, index, "trainingFrom")
                }
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.trainingTo}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.trainingTo" })}
                placeholder={intl.formatMessage({ id: "label.trainingTo" })}
                isCalendar
                format={"DD/MM/YYYY"}
                value={articleShips[index]?.trainingTo}
                onChangeValue={(txt) => onDataChange(txt, index, "trainingTo")}
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.noOfPartners}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                isCounterInput
                label={intl.formatMessage({ id: "label.noOfPartnersCaFirm" })}
                placeholder={intl.formatMessage({
                  id: "label.noOfPartnersCaFirm",
                })}
                value={articleShips[index]?.noOfPartners}
                handleCountChange={(txt) =>
                  onDataChange(`${txt}`, index, "noOfPartners")
                }
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.natureOfWork}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.natureOfWorkdone" })}
                placeholder={intl.formatMessage({
                  id: "label.natureOfWorkdone",
                })}
                value={articleShips[index]?.natureOfWork}
                onChangeText={(txt) => onDataChange(txt, index, "natureOfWork")}
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.comapanyName}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                customLabelStyle={{ fontSize: 11 }}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.provideCompanyName" })}
                placeholder={intl.formatMessage({
                  id: "label.provideCompanyName",
                })}
                value={articleShips[index]?.comapanyName}
                onChangeText={(txt) => onDataChange(txt, index, "comapanyName")}
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.industryName}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                customLabelStyle={{ fontSize: 11 }}
                label={intl.formatMessage({ id: "label.provideIndustryName" })}
                placeholder={intl.formatMessage({
                  id: "label.provideIndustryName",
                })}
                value={articleShips[index]?.industryName}
                onChangeText={(txt) => onDataChange(txt, index, "industryName")}
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.otherAreas}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.otherAreas" })}
                placeholder={intl.formatMessage({ id: "label.otherAreas" })}
                value={articleShips[index]?.otherAreas}
                onChangeText={(txt) => onDataChange(txt, index, "otherAreas")}
              />
              <CustomTextInput
                isViewMode={isViewMode}
                viewText={articleShips[index]?.secondment}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.secondmentExchange" })}
                placeholder={intl.formatMessage({
                  id: "label.secondmentExchange",
                })}
                value={articleShips[index]?.secondment}
                onChangeText={(txt) => onDataChange(txt, index, "secondment")}
              />
            </View>
          </CardComponent>
        );
      })}
      <CustomButton
        onPress={onAddArticle}
        style={styles.buttonStyle}
        iconLeft={{
          leftIconSource: images.iconAdd,
        }}
        customTextStyle={{ fontSize: 14 }}
        customStyle={{
          textFontWeight: "500",
          customTextStyle: { fontSize: 14 },
        }}
      >
        {intl.formatMessage({ id: "label.addArticlesTraining" })}
      </CustomButton>
    </View>
  );
};

export default React.forwardRef(ArticlesTaining);
