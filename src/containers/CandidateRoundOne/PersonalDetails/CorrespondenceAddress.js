import React, {useState} from "react";
import { ScrollView, View } from "@unthinkable/react-core-components";

import MultiRow from "../../../core/layouts/MultiRow";
import CardComponent from "../../../components/CardComponent";

import CommonText from "../../../components/CommonText";
import CustomLabelView from "../../../components/CustomLabelView";
import CustomTextInput from "../../../components/CustomTextInput";
import CustomToggleComponent from "../../../components/CustomToggleComponent/CustomToggleComponent";
import MobileNumberInput from "../../../components/MobileNumberInput";
import { numericValidator } from "../../../utils/validation";
import { GENDER, MARITAL_STATUS } from "../../../constants/constants";
import images from "../../../images";
import styles from "./PersonalDetails.style";

const CorrespondenceAddress = ({
  intl,
  isWebView,
  countryCodeData
}) => {
  // Inside your component
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState(''); // Assuming this is a string
  const [mobileNo, setMobileNo] = useState('');
  const [nationality, setNationality] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [state, setState] = useState('');
  return (
    <CardComponent customStyle={styles.cardContainer}>
          <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
            {intl.formatMessage({ id: "label.correspondence_address" })}
          </CommonText>
          <View style={isWebView ? styles.gridView : styles.gap}>
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address1" })}
              placeholder={intl.formatMessage({ id: "label.address1" })}
              isMandatory
              isMultiline
              noOfRows={2}
              value={address1}
              onChangeText={setAddress1}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address2" })}
              placeholder={intl.formatMessage({ id: "label.address2" })}
              isMultiline
              noOfRows={2}
              value={address2}
              onChangeText={setAddress2}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.address3" })}
              placeholder={intl.formatMessage({ id: "label.address3" })}
              isMultiline
              noOfRows={2}
              value={address3}
              onChangeText={setAddress3}
            />
            <CustomTextInput
              isPaddingNotRequired
              customStyle={styles.textInputContainer(isWebView)}
              label={intl.formatMessage({ id: "label.country" })}
              placeholder={intl.formatMessage({ id: "label.country" })}
              isMandatory
              value={country}
              onChangeText={setCountry}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.state" })}
              placeholder={intl.formatMessage({ id: "label.state" })}
              isMandatory
              value={state}
              onChangeText={setState}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.city" })}
              placeholder={intl.formatMessage({ id: "label.city" })}
              isMandatory
              value={city}
              onChangeText={setCity}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.pincode" })}
              placeholder={intl.formatMessage({ id: "label.pincode" })}
              isMandatory
              value={pincode}
              onChangeText={setPincode}
            />
            <View style={isWebView && { marginRight: 16 }}>
              <MobileNumberInput
                mobileFieldLabel="label.mobile_number"
                codeValue={countryCode}
                onChangeCode={setCountryCode}
                onChangeMobNumber={(val) => {
                  numericValidator(val) && setMobileNo(val);
                }}
                isEditable={false}
                options={countryCodeData}
                mobNumberValue={mobileNo}
              />
            </View>
            <CustomTextInput
              customStyle={styles.textInputContainer(false)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.telephone_no" })}
              placeholder={intl.formatMessage({ id: "label.telephone_no" })}
              isMandatory
              value={phoneNo}
              onChangeText={setPhoneNo}
            />
            <CustomTextInput
              customStyle={styles.textInputContainer(isWebView)}
              isPaddingNotRequired
              label={intl.formatMessage({ id: "label.nationality" })}
              placeholder={intl.formatMessage({ id: "label.nationality" })}
              isMandatory
              value={nationality}
              onChangeText={setNationality}
            />
          </View>
        </CardComponent>
  )
};

export default CorrespondenceAddress;
