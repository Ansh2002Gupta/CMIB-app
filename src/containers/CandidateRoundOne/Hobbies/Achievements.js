import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./HobbiesDetails.style";
import { BOOLEAN_OPTION } from "../../../constants/constants";

const Achievements = ({intl, isWebView, isViewMode = false}, ref) => {
  //states
  const [obtainedScholarship, setObtainedScholarship] = useState('');
  const [wonPrizes, setWonPrizes] = useState('');
  const [wonDebatePrizes, setWonDebatePrizes] = useState('');
  const [socialParticipation, setSocialParticipation] = useState('');
  const [anyOtherPrizes, setAnyOtherPrizes] = useState('');


  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        obtainedScholarship,
        wonPrizes,
        wonDebatePrizes,
        socialParticipation,
        anyOtherPrizes
      };
    },
  }));

  
  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.achievements" })}
          </CommonText>
          <View style={isWebView ? styles.currentStatusGridView : styles.gap}>
            <CustomTextInput
                isViewMode={isViewMode}
                viewText={obtainedScholarship}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.obtained_scholarships" })}
                placeholder={intl.formatMessage({ id: "label.obtained_scholarships" })}
                value={obtainedScholarship}
                isDropdown
                options={BOOLEAN_OPTION}
                onChangeValue={setObtainedScholarship}
            />
            <CustomTextInput
                isViewMode={isViewMode}
                viewText={wonPrizes}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.won_prizes" })}
                placeholder={intl.formatMessage({ id: "label.won_prizes" })}
                value={wonPrizes}
                isDropdown
                options={BOOLEAN_OPTION}
                onChangeValue={setWonPrizes}
            />
            <CustomTextInput
                isViewMode={isViewMode}
                viewText={wonDebatePrizes}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.won_prizes_in_debates" })}
                placeholder={intl.formatMessage({ id: "label.won_prizes_in_debates" })}
                value={wonDebatePrizes}
                isDropdown
                options={BOOLEAN_OPTION}
                onChangeValue={setWonDebatePrizes}
            />
            <CustomTextInput
                isViewMode={isViewMode}
                viewText={socialParticipation}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.participation_in_social" })}
                placeholder={intl.formatMessage({ id: "label.participation_in_social" })}
                value={socialParticipation}
                isDropdown
                options={BOOLEAN_OPTION}
                onChangeValue={setSocialParticipation}
            />
            <CustomTextInput
              isViewMode={isViewMode}
              viewText={anyOtherPrizes}
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.any_other_specify" })}
              placeholder={intl.formatMessage({ id: "label.any_other_specify" })}
              value={anyOtherPrizes}
              onChangeText={setAnyOtherPrizes}
            />
          </View>
        </CardComponent>
  )
};

export default  React.forwardRef(Achievements);