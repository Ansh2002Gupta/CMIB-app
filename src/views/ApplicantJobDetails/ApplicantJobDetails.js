import React, { useContext, useState } from "react";
import {
  Row,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import CommonText from "../../components/CommonText";
import CardComponent from "../../components/CardComponent";
import CustomImage from "../../components/CustomImage";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./ApplicantJobDetails.styles";
import images from "../../images";
import JobProfileTab from "../JobProfile";
import { AddJobContext } from "../../globalContext/addJob/addJobsProvider";
import { useLocation } from "react-router";

const EditButton = ({ isEditable, handleEdit }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  if (isWebView) {
    return (
      <CardComponent customStyle={style.cardContainer}>
        <TouchableOpacity
          style={style.editContainer}
          onPress={() => handleEdit(true)}
        >
          <CustomImage
            source={images.iconCalendar}
            Icon={images.iconCalendar}
            isSvg
            alt={"edit icon"}
            height={20}
            width={20}
          />
          <CommonText customTextStyle={style.textStyle} fontWeight="600">
            {intl.formatMessage({ id: "label.schedule_interview" })}
          </CommonText>
        </TouchableOpacity>
      </CardComponent>
    );
  }
  return (
    <TouchableOpacity
      style={style.mobileEditContainer}
      onPress={() => handleEdit(true)}
    >
      <CustomImage
        source={images.iconEdit}
        Icon={images.iconEdit}
        isSvg
        alt={"edit icon"}
        height={20}
        width={20}
      />
    </TouchableOpacity>
  );
};

const ApplicantJobDetails = ({}) => {
  const intl = useIntl();
  const location = useLocation();
  const { questionaireData } = location.state;
  const [isEditable, setIsEditable] = useState(false);
  const handleEdit = (value) => {
    setIsEditable(value);
  };
  const getApplicantDetails = (heading, name) => {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CommonText
          customTextStyle={{ fontSize: 14 }}
        >{`${heading}: `}</CommonText>
        <CommonText
          fontWeight={600}
          customTextStyle={{ fontSize: 14 }}
        >{`   ${name}`}</CommonText>
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View style={{ marginBottom: 24 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CommonText fontWeight={600} customTextStyle={{ fontSize: 18 }}>
            Applicant Details
          </CommonText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 24,
            flex: 1,
          }}
        >
          <View style={{ flex: 1, marginRight: 12 }}>
            <View style={{ flexDirection: "row", flex: 0.3 }}>
              {getApplicantDetails("Applicant Name", "ANiket")}
              <CommonText
                customContainerStyle={{ marginLeft: 8, marginRight: 8 }}
              >
                |
              </CommonText>
              {getApplicantDetails("Applicant ID", "NRO0123456")}
            </View>
            <View style={{ flexDirection: "row", marginTop: 4, flex: 0.3 }}>
              {getApplicantDetails("Updated At", "1234353")}
              <CommonText
                customContainerStyle={{ marginLeft: 16, marginRight: 16 }}
              >
                |
              </CommonText>
              {getApplicantDetails("Status", "Pending")}
            </View>
          </View>
          <View style={{ flex: 0.35 }}>
            <EditButton isEditable={isEditable} handleEdit={handleEdit} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={style.containerStyle}>
      <JobProfileTab
        renderHeader={renderHeader}
        questionaireData={questionaireData}
        isQuestionaireRequired
      />
    </View>
  );
};

export default ApplicantJobDetails;
