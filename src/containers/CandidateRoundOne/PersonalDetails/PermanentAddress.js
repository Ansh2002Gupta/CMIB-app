import React, { useState, useImperativeHandle, useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";

import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./PersonalDetails.style";
import { MESSAGE_MAX_LENGTH } from "../../../constants/constants";
import CheckBox from "../../../components/CheckBox";
import images from "../../../images";

const PermanentAddress = (
  { intl, isWebView, onValidationChange = () => {}, filledData },
  ref
) => {
  const [permanentAddress1, setPermanentAddress1] = useState("");
  const [permanentAddress2, setPermanentAddress2] = useState("");
  const [permanentAddress3, setPermanentAddress3] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentCountry, setPermanentCountry] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [isPermanentSameAsCorrespondance, setIsPermanentSameAsCorrespondance] =
    useState(false);

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        address: {
          type: "Permanent",
          address_line_1: permanentAddress1,
          address_line_2: permanentAddress2,
          address_line_3: permanentAddress3,
          city: permanentCity,
          country: permanentCountry,
          state: permanentState,
          pincode: permanentPincode,
        },
      };
    },
  }));

  useEffect(() => {
    onValidationChange(
      permanentAddress1.length > 0 &&
        permanentCity.length > 0 &&
        permanentCountry.length > 3 &&
        permanentPincode.length > 3 &&
        permanentState.length > 3
    );
  }, [
    permanentAddress1,
    permanentCity,
    permanentCountry,
    permanentPincode,
    permanentState,
    onValidationChange,
  ]);

  useEffect(() => {
    let tempData = filledData?.addresses?.filter(
      (item) => item.type === "Permanent"
    );
    if (tempData && tempData?.length > 0) {
      let mainData = tempData[0];
      mainData?.address_line_1 && setPermanentAddress1(mainData.address_line_1);
      mainData?.address_line_2 && setPermanentAddress2(mainData.address_line_2);
      mainData?.address_line_3 && setPermanentAddress3(mainData.address_line_3);
      mainData?.city && setPermanentCity(mainData?.city);
      mainData?.country && setPermanentCountry(mainData?.country);
      mainData?.state && setPermanentState(mainData?.state);
      mainData?.pincode && setPermanentPincode(mainData?.pincode);
    }
    //filledData?.phone_number && setPhoneNo(filledData?.phone_number)
  }, [filledData]);

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
        {intl.formatMessage({ id: "label.permanent_address" })}
      </CommonText>
      {/* <CheckBox
            title={intl.formatMessage({ id: "label.sameAsCorrespondance" })}
            isSelected={isPermanentSameAsCorrespondance}
            handleCheckbox={setIsPermanentSameAsCorrespondance}
            iconCheck={images.iconCheckbox}
            iconUnCheck={images.iconUnCheck}
            checkBoxTextStyle={styles.checkBoxTextStyle}
          /> */}
      <View style={isWebView ? styles.gridView : styles.gap}>
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.address1" })}
          placeholder={intl.formatMessage({ id: "label.address1" })}
          isMandatory
          isMultiline
          noOfRows={2}
          value={permanentAddress1}
          onChangeText={setPermanentAddress1}
          maxLength={MESSAGE_MAX_LENGTH}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.address2" })}
          placeholder={intl.formatMessage({ id: "label.address2" })}
          isMultiline
          noOfRows={2}
          value={permanentAddress2}
          onChangeText={setPermanentAddress2}
          maxLength={MESSAGE_MAX_LENGTH}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(false)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.address3" })}
          placeholder={intl.formatMessage({ id: "label.address3" })}
          isMultiline
          noOfRows={2}
          value={permanentAddress3}
          onChangeText={setPermanentAddress3}
          maxLength={MESSAGE_MAX_LENGTH}
        />
        <CustomTextInput
          isPaddingNotRequired
          customStyle={styles.textInputContainer(isWebView)}
          label={intl.formatMessage({ id: "label.country" })}
          placeholder={intl.formatMessage({ id: "label.country" })}
          isMandatory
          value={permanentCountry}
          onChangeText={setPermanentCountry}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.state" })}
          placeholder={intl.formatMessage({ id: "label.state" })}
          isMandatory
          value={permanentState}
          onChangeText={setPermanentState}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(false)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.city" })}
          placeholder={intl.formatMessage({ id: "label.city" })}
          isMandatory
          value={permanentCity}
          onChangeText={setPermanentCity}
        />
        <CustomTextInput
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          label={intl.formatMessage({ id: "label.pincode" })}
          placeholder={intl.formatMessage({ id: "label.pincode" })}
          isMandatory
          value={permanentPincode}
          onChangeText={setPermanentPincode}
        />
      </View>
    </CardComponent>
  );
};

export default React.forwardRef(PermanentAddress);
