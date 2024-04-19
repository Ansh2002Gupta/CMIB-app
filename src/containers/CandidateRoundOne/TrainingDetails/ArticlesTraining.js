import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import { YEARS } from "../../../constants/constants";
import styles from "./TrainingDetails.style";
import images from "../../../images";
import CustomButton from "../../../components/CustomButton";

const articleShipKeys = {
    firmName: '',
    location: '',
    trainingFrom: '',
    trainingTo: '',
    noOfPartners: '',
    natureOfWork: '',
    comapanyName: '',
    industryName: '',
    otherAreas: '',
    secondment: '',
}
const ArticlesTaining = ({intl, isWebView, isViewMode, onValidationChange = () => {}}, ref) => {
  //states
  const [articleShips, setArticleShips] = useState([articleShipKeys]);

  //custom functions
  const onDataChange = (data, localIndex, key) => {
    try {
        let newArticles = articleShips.map((item, index) => {
            if(index === localIndex) {
                return {...item, [key]: data}
            } else {
                return item;
            }
        });
        setArticleShips([...newArticles]);

    } catch {
        console.log('getting error')
    }
  }

  const onAddArticle = () => {
    setArticleShips([...articleShips,articleShipKeys ]);
  }

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        articleShips
      };
    },
  }));

  //Lifecycle
//   useEffect(() => {
//     if(!Boolean(isMembershipNumber)) {
//       // selected yes
//       onValidationChange(membershipEnrollNumber.length > 0 && dateOfCompletion.length > 0);
//     } else {
//       // selected no
//       onValidationChange(true);
//     }

//   }, [isMembershipNumber, membershipEnrollNumber, dateOfCompletion, onValidationChange]);
  
  return (
    <View style={styles.articleContainer}>
        <CommonText customTextStyle={styles.articleTrainingTitleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.articlesTraining" })}
        </CommonText>
        {articleShips.map((item, index) => {
            return (
                <CardComponent customStyle={styles.cardContainer} key={`${index}`}>
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
                            onChangeText={(txt) => onDataChange(txt, index, 'firmName')}
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
                            onChangeText={(txt) => onDataChange(txt, index, 'location')}
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
                            value={articleShips[index]?.trainingFrom}
                            onChangeValue={(txt) => onDataChange(txt, index, 'trainingFrom')}
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
                            value={articleShips[index]?.trainingTo}
                            onChangeValue={(txt) => onDataChange(txt, index, 'trainingTo')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={articleShips[index]?.noOfPartners}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.noOfPartnersCaFirm" })}
                            placeholder={intl.formatMessage({ id: "label.noOfPartnersCaFirm" })}
                            value={articleShips[index]?.noOfPartners}
                            onChangeText={(txt) => onDataChange(txt, index, 'noOfPartners')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={articleShips[index]?.natureOfWork}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.natureOfWorkdone" })}
                            placeholder={intl.formatMessage({ id: "label.natureOfWorkdone" })}
                            value={articleShips[index]?.natureOfWork}
                            onChangeText={(txt) => onDataChange(txt, index, 'natureOfWork')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={articleShips[index]?.comapanyName}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            customLabelStyle={{fontSize: 11}}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.provideCompanyName" })}
                            placeholder={intl.formatMessage({ id: "label.provideCompanyName" })}
                            value={articleShips[index]?.comapanyName}
                            onChangeText={(txt) => onDataChange(txt, index, 'comapanyName')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={articleShips[index]?.industryName}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            customLabelStyle={{fontSize: 11}}
                            label={intl.formatMessage({ id: "label.provideIndustryName" })}
                            placeholder={intl.formatMessage({ id: "label.provideIndustryName" })}
                            value={articleShips[index]?.industryName}
                            onChangeText={(txt) => onDataChange(txt, index, 'industryName')}
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
                            onChangeText={(txt) => onDataChange(txt, index, 'otherAreas')}
                        />
                        <CustomTextInput
                            isViewMode={isViewMode}
                            viewText={articleShips[index]?.secondment}
                            isMandatory={!isViewMode}
                            customStyle={styles.textInputContainer(isWebView)}
                            isPaddingNotRequired
                            label={intl.formatMessage({ id: "label.secondmentExchange" })}
                            placeholder={intl.formatMessage({ id: "label.secondmentExchange" })}
                            value={articleShips[index]?.secondment}
                            onChangeText={(txt) => onDataChange(txt, index, 'secondment')}
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
            customTextStyle={{fontSize: 14}}
            customStyle={{ textFontWeight: "500", customTextStyle: {fontSize: 14} }}
          >
            {intl.formatMessage({ id: "label.addIndustrialTraining" })}
          </CustomButton>
    </View>
  )
};

export default  React.forwardRef(ArticlesTaining);