import React, { useState } from "react";
import {
  Row,
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
import style from "./JobProfile.style";
import images from "../../images";
import ViewQuestion from "../../containers/ViewPostedJobDetails/ViewQuestion";

const EditButton = ({ isEditable, handleEdit }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  if (isEditable) return null;
  if (isWebView) {
    return (
      <CardComponent customStyle={style.cardContainer}>
        <TouchableOpacity
          style={style.editContainer}
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
          <CommonText customTextStyle={style.textStyle} fontWeight="600">
            {intl.formatMessage({ id: "label.edit_job_profile" })}
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

const JobProfileTab = ({
  renderHeader,
  isQuestionaireRequired = false,
  questionaireData,
}) => {
  const intl = useIntl();
  const [isEditable, setIsEditable] = useState(false);
  //Todo:editable will be in query params
  const handleEdit = (value) => {
    setIsEditable(value);
  };
  return (
    <View style={style.containerStyle}>
      <CustomTabs
        renderHeader={() =>
          renderHeader ? (
            renderHeader()
          ) : (
            <Row style={style.headerContainer}>
              <CommonText fontWeight={"500"} customTextStyle={style.titleText}>
                {intl.formatMessage({ id: "label.job_profile" })}
              </CommonText>
              <EditButton isEditable={isEditable} handleEdit={handleEdit} />
            </Row>
          )
        }
        tabs={[
          {
            label: "Personal Details",
            component: (
              <PersonalDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
              />
            ),
          },
          {
            label: "Education Details",
            component: (
              <EducationDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
              />
            ),
          },
          {
            label: "Membership Details",
            component: (
              <MembershipDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
              />
            ),
          },
          {
            label: "Work Experience",
            component: (
              <WorkExperience isEditable={isEditable} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Skill Training",
            component: (
              <SkillTraining isEditable={isEditable} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Activities",
            component: (
              <Activities isEditable={isEditable} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Job Preference",
            component: (
              <JobPreference isEditable={isEditable} handleEdit={handleEdit} />
            ),
          },
          isQuestionaireRequired && {
            label: "Questionaire",
            component: (
              <ViewQuestion
                isEditable={false}
                questionnaireData={questionaireData}
              />
            ),
          },
        ]}
      />
    </View>
  );
};

export default JobProfileTab;
