import React, { useState } from "react";
import {
  Row,
  ScrollView,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";

import { CustomTabs } from "../../components/Tab";
import PersonalDetails from "../../containers/PersonalDetails";
import EducationDetails from "../../containers/EducationDetails";
import MembershipDetails from "../../containers/MembershipDetails/MembershipDetails";
import WorkExperience from "../../containers/WorkExperience/WorkExperience";
import Activities from "../../containers/Activities";
import SkillTraining from "../../containers/SkillTraining/SkillTraining";
import JobPreference from "../../containers/JobPreference/JobPreference";
import CommonText from "../../components/CommonText";
import CardComponent from "../../components/CardComponent";
import CustomImage from "../../components/CustomImage";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./ViewJobDetails.styles";
import images from "../../images";
import { TwoColumn, TwoRow } from "../../core/layouts";
import ViewQuestion from "../../containers/ViewPostedJobDetails/ViewQuestion";
import TouchableImage from "../../components/TouchableImage";

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

const ViewJobDetails = ({
  shouldRenderExtraComponent = false,
  questionaireData,
  setIsModalVisible,
}) => {
  const intl = useIntl();
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
  return (
    <View style={style.containerStyle}>
      <CustomTabs
        renderHeader={() => (
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
              <TouchableImage
                source={images.iconCross}
                onPress={() => {
                  setIsModalVisible(false);
                }}
              />
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
        )}
        tabs={[
          {
            label: "Personal Details",
            component: (
              <PersonalDetails isEditable={false} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Education Details",
            component: (
              <EducationDetails isEditable={false} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Membership Details",
            component: (
              <MembershipDetails isEditable={false} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Work Experience",
            component: (
              <WorkExperience isEditable={false} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Skill Training",
            component: (
              <SkillTraining isEditable={false} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Activities",
            component: (
              <Activities isEditable={false} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Job Preference",
            component: (
              <JobPreference isEditable={false} handleEdit={handleEdit} />
            ),
          },
          shouldRenderExtraComponent && {
            label: "Questionaire",
            component: (
              <ViewQuestion
                isEditable={false}
                questionnaireData={questionaireData}
              />
            ),
          },
        ]}
        containerStyle={{ borderTopWidth: 0 }}
      />
    </View>
  );
};

export default ViewJobDetails;
