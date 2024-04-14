import React, { useContext, useState } from "react";
import {
  Row,
  Text,
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
import useFetch from "../../hooks/useFetch";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { GET_MEMBER_COMPLETION } from "../../services/apiServices/apiEndPoint";

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
          <CommonText customTextStyle={style.textStyle} fontWeight="500">
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

const CompletionPercent = ({ value }) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  
  return isWebView ? (
    <View
      style={{
        ...style.completionPercentContainer,
      }}
    >
      <CommonText
        customTextStyle={[style.completionTextStyle]}
        customContainerStyle={{}}
      >
        {`${intl.formatMessage({
          id: "label.memberCompletionProfilePercentWeb",
        })}`}
      </CommonText>
      <Text
        style={{
          ...style.completionTextStyle,
          ...style.completionTextBoldStyle,
          ...style.completionValueWebTextStyle,
        }}
      >
        ${value ?? 0}%
      </Text>
    </View>
  ) : (
    <View
      style={{
        ...style.completionPercentContainer,
      }}
    >
      <CircularProgress size={200} strokeWidth={15} progress={0.3} />
      <Text
        style={{
          ...style.completionTextStyle,
          ...style.completionTextBoldStyle,
          ...style.completionValueMobileTextStyle,
        }}
      >
        ${value ?? 0}%
      </Text>
      <CommonText customTextStyle={[style.completionTextStyle]}>
        {`${intl.formatMessage({
          id: "label.complete",
        })}`}
      </CommonText>
    </View>
  );
};

const JobProfileTab = ({
  renderHeader,
  isQuestionaireRequired = false,
  questionaireData,
}) => {
  const intl = useIntl();
  const [isEditable, setIsEditable] = useState(false);
  const { data: completionPercentData } = useFetch({
    url: GET_MEMBER_COMPLETION,
  });

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
              <View style={style.rightHeader}>
                <CompletionPercent
                  value={completionPercentData?.profile_completion_percentage}
                />
                <EditButton isEditable={isEditable} handleEdit={handleEdit} />
              </View>
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
