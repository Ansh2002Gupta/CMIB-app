import React, {useState, useImperativeHandle, useEffect} from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./HobbiesDetails.style";
import { YEARS } from "../../../constants/constants";
import CustomChipCard from "../../../components/CustomChipCard/CustomChipCard";

const Hobbies = ({intl, isWebView, isViewMode = false, onValidationChange = () => {}}, ref) => {
  //states
  const [hobbies, setHobbies] = useState([]);


  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        hobbies
      };
    },
  }));
  
  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.hobbies" })}
          </CommonText>
          <View style={isWebView ? styles.hobbiesGridView : styles.gap}>
            <CustomTextInput
                isViewMode={isViewMode}
                viewText={hobbies}
                customStyle={styles.textInputContainer(isWebView)}
                isPaddingNotRequired
                placeholder={intl.formatMessage({ id: "label.selectHobbies" })}
                isDropdown
                options={YEARS}
                isTextInputWithChip
                onChangeValue={(val) => {
                  if (!hobbies.includes(val)) {
                    setHobbies(prev => [...prev, val]);
                  }
                }}
            />
            <View></View>
            <View style={styles.hobbiesChipContainer}>
              {hobbies.map((item, index) => {
                return(
                    <CustomChipCard
                      key={index}
                      message={item}
                      isEditable={!isViewMode}
                      onPress={() => {
                        let newHobbies = hobbies.filter((i, ind) => index !== ind);
                        setHobbies(newHobbies)}
                      }
                    />
                )
              })}
            </View>
          </View>
        </CardComponent>
  )
};

export default  React.forwardRef(Hobbies);