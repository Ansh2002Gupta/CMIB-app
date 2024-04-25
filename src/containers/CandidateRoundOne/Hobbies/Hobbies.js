import React, { useState, useImperativeHandle, useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./HobbiesDetails.style";
import CustomChipCard from "../../../components/CustomChipCard/CustomChipCard";

const Hobbies = (
  { intl, isWebView, isViewMode = false, hobbies: hobbiesData },
  ref
) => {
  //states
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    if (hobbiesData?.details?.length > 0) {
      setHobbies([...hobbiesData?.details]);
    }
  }, [hobbiesData]);

  //custom functions
  const onHobbieSelect = (val) => {
    setHobbies([hobbiesData?.details, ...val]);
  };

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        details: hobbies,
        hobbies_id: null,
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
          viewText={hobbiesData}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          placeholder={intl.formatMessage({ id: "label.selectHobbies" })}
          isTextInputWithChip
          onChangeValue={onHobbieSelect}
          value={hobbies}
        />
      </View>
    </CardComponent>
  );
};

export default React.forwardRef(Hobbies);
