import React, { useState, useImperativeHandle, useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./JobPreferenceDetails.style";
import { YEARS } from "../../../constants/constants";
import CustomChipCard from "../../../components/CustomChipCard/CustomChipCard";

const CitySelection = (
  { intl, isWebView, isViewMode = false, onValidationChange = () => {} },
  ref
) => {
  //states
  const [firstCenter, setFirstCenter] = useState("");
  const [secondCenter, setSeconCenter] = useState("");
  const [orientationCenter, setOrientationCenter] = useState("");
  const [orientationDate, setOrientationDate] = useState("");
  const [orientationVenue, setOrientationVenue] = useState("");

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        big_centre_id: 21,
        small_centre_id: 2,
        orientation_centre_id: 14,
        orientationDate,
        orientationVenue,
      };
    },
  }));

  //Lifecycle
  useEffect(() => {
    onValidationChange(
      firstCenter.length > 0 &&
        secondCenter.length > 0 &&
        orientationCenter.length > 0
    );
  }, [firstCenter, secondCenter, orientationCenter, onValidationChange]);

  return (
    <CardComponent customStyle={styles.cardContainer}>
      <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
        {intl.formatMessage({ id: "label.desireToAppear" })}
      </CommonText>
      <View style={isWebView ? styles.gridView : styles.gap}>
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={firstCenter}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          isMandatory
          label={intl.formatMessage({ id: "label.firstCampusInterviewcentre" })}
          placeholder={intl.formatMessage({
            id: "label.dateofOrientation",
          })}
          isDropdown
          options={YEARS}
          value={firstCenter}
          onChangeValue={setFirstCenter}
        />
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={secondCenter}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.secondCampusInterviewCentre",
          })}
          label={intl.formatMessage({
            id: "label.secondCampusInterviewCentre",
          })}
          isDropdown
          options={YEARS}
          value={secondCenter}
          onChangeValue={setSeconCenter}
        />
        <View></View>
      </View>
      <View style={isWebView ? styles.twoColumnSingleElement : styles.gap}>
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={orientationCenter}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          isMandatory
          placeholder={intl.formatMessage({
            id: "label.select",
          })}
          label={intl.formatMessage({
            id: "label.centreWantOrientationProgrammeBeforeInterviews",
          })}
          value={orientationCenter}
          isDropdown
          options={YEARS}
          onChangeValue={setOrientationCenter}
        />
      </View>
      <View style={isWebView ? styles.oneTwoColumnSingleElement : styles.gap}>
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={orientationDate}
          customStyle={styles.textInputContainer(isWebView)}
          isMandatory
          isPaddingNotRequired
          isCalendar
          options={YEARS}
          label={intl.formatMessage({ id: "label.dateofOrientation" })}
          placeholder={intl.formatMessage({
            id: "label.dateofOrientation",
          })}
          format={"DD/MM/YYYY"}
          value={orientationDate}
          onChangeValue={setOrientationDate}
        />
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={orientationDate}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          isMandatory
          options={YEARS}
          label={intl.formatMessage({
            id: "label.venueofOrientation",
          })}
          placeholder={intl.formatMessage({
            id: "label.venueofOrientation",
          })}
          onChangeText={setOrientationVenue}
          value={orientationVenue}
        />
      </View>
    </CardComponent>
  );
};

export default React.forwardRef(CitySelection);
