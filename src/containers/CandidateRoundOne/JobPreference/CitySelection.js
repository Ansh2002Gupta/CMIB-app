import React, { useState, useImperativeHandle, useEffect } from "react";
import { View } from "@unthinkable/react-core-components";

import CardComponent from "../../../components/CardComponent";
import CommonText from "../../../components/CommonText";
import CustomTextInput from "../../../components/CustomTextInput";
import styles from "./JobPreferenceDetails.style";

const CitySelection = (
  { intl, isWebView, isViewMode = false, onValidationChange = () => {}, interviewCentreData, programeData },
  ref
) => {
  //states
  const [firstCenter, setFirstCenter] = useState("");
  const [secondCenter, setSeconCenter] = useState("");
  const [orientationCenter, setOrientationCenter] = useState("");
  const [bigCentreList, setBigCentreList] = useState([]);
  const [smallCentreList, setSmallCentreList] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [autoFillDetails, setAutoFillDetails] = useState({});

  useEffect(() => {
    if (interviewCentreData) {
      let bigCenters = []
      let smallCenters = []
      interviewCentreData?.map((item, index) => {
        if (item?.centre_size === 'big'){
          bigCenters.push({
            label: item.name,
            value: item.id,
          })
          
        } else {
          smallCenters.push({
            label: item.name,
            value: item.id,
          })
        }
      })
      setBigCentreList(bigCenters);
      setSmallCentreList(smallCenters);
    }
    
  }, [interviewCentreData])

  useEffect(() => {
    if (programeData) {
      let progs = programeData?.map((item, index) => {
        return {
          label: item?.centre_name,
          value: item?.id
        }
      })
      setPrograms(progs);
    }
  }, [programeData])

  useImperativeHandle(ref, () => ({
    getState: () => {
      return {
        campus_interview: {
          big_centre_id: firstCenter, // add id for update
          small_centre_id: secondCenter,
        },
        orientation_centre: {
          orientation_centre_id: orientationCenter
        },
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


const onSelectOrientation = (val) => {
  setOrientationCenter(val);
  if (programeData) {
    let autoFillData = programeData?.filter((item, index) => item.id == val)
    if (autoFillData.length > 0) {
      setAutoFillDetails(autoFillData[0])
    }

  }
}

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
          options={bigCentreList}
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
          options={smallCentreList}
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
          options={programs}
          onChangeValue={onSelectOrientation}
        />
      </View>
      <View style={isWebView ? styles.oneTwoColumnSingleElement : styles.gap}>
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={autoFillDetails?.created_at || new Date().toISOString()}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          isCalendar
          isEditable={false}
          label={intl.formatMessage({ id: "label.dateofOrientation" })}
          placeholder={intl.formatMessage({
            id: "label.dateofOrientation",
          })}
          format={"DD/MM/YYYY"}
          value={autoFillDetails?.created_at || new Date().toISOString()}
        />
        <CustomTextInput
          isViewMode={isViewMode}
          viewText={autoFillDetails?.venue || ''}
          customStyle={styles.textInputContainer(isWebView)}
          isPaddingNotRequired
          isEditable={false}
          label={intl.formatMessage({
            id: "label.venueofOrientation",
          })}
          placeholder={intl.formatMessage({
            id: "label.venueofOrientation",
          })}
          value={autoFillDetails?.venue || ''}
        />
      </View>
    </CardComponent>
  );
};

export default React.forwardRef(CitySelection);
