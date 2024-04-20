import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./WorkExperienceDetails.style";
import { formatDate } from "../../../utils/util";
import { YEARS } from "../../../constants/constants";

const CurrentStatusDetailsTemplate = ({intl, isWebView, isViewMode = false, onValidationChange = () => {}}, ref) => {
  //states
  const [areasOfCurrentSpecialisation, setAreasOfCurrentSpecialisation] = useState('');
  const [otherSpecialisation, setOtherSpecialisation] = useState('');
  const [areaOfCurrentIndustry, setAreaOfCurrentIndustry] = useState('');
  const [otherIndustrySpecialisation, setOtherIndustrySpecialisation] = useState('');


  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        areasOfCurrentSpecialisation,
        otherSpecialisation,
        areaOfCurrentIndustry,
        otherIndustrySpecialisation
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    onValidationChange(areasOfCurrentSpecialisation.length > 0 && areaOfCurrentIndustry.length > 0);

  }, [areasOfCurrentSpecialisation, areaOfCurrentIndustry, onValidationChange]);
  
  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.current_status" })}
          </CommonText>
          <View style={isWebView ? styles.currentStatusGridView : styles.gap}>
            <CustomTextInput
                isViewMode={isViewMode}
                viewText={areasOfCurrentSpecialisation}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.current_specialisation" })}
                placeholder={intl.formatMessage({ id: "label.current_specialisation" })}
                value={areasOfCurrentSpecialisation}
                isDropdown
                options={YEARS}
                onChangeValue={setAreasOfCurrentSpecialisation}
            />
            <CustomTextInput
              isViewMode={isViewMode}
              viewText={otherSpecialisation}
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "other_specialisation" })}
              placeholder={intl.formatMessage({ id: "enterOtherAreas" })}
              value={otherSpecialisation}
              onChangeText={setOtherSpecialisation}
            />
            <CustomTextInput
                isViewMode={isViewMode}
                viewText={areaOfCurrentIndustry}
                isMandatory={!isViewMode}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                label={intl.formatMessage({ id: "label.current_industry_specialisation" })}
                placeholder={intl.formatMessage({ id: "label.current_industry_specialisation" })}
                value={areaOfCurrentIndustry}
                isDropdown
                options={YEARS}
                onChangeValue={setAreaOfCurrentIndustry}
            />
            <CustomTextInput
              isViewMode={isViewMode}
              viewText={otherIndustrySpecialisation}
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "other_specialisation" })}
              placeholder={intl.formatMessage({ id: "enterOtherAreas" })}
              value={otherIndustrySpecialisation}
              onChangeText={setOtherIndustrySpecialisation}
            />
          </View>
        </CardComponent>
  )
};

export default  React.forwardRef(CurrentStatusDetailsTemplate);