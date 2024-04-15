import React, { useContext, useState } from "react";
import {
  Platform,
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
import ViewQuestion from "../../containers/ViewPostedJobDetails/ViewQuestion";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./JobProfile.style";
import images from "../../images";
import useFetch from "../../hooks/useFetch";
import { GET_MEMBER_COMPLETION } from "../../services/apiServices/apiEndPoint";
import IconHeader from "../../components/IconHeader/IconHeader";
import { useNavigate } from "react-router";
import { navigations } from "../../constants/routeNames";
import CircularProgress from "../../components/CircularProgress";

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
      {Platform.OS === "web" && (
        <CircularProgress
          size={24}
          strokeWidth={3}
          progress={value / 100 ?? 0}
          containerStyle={style.progressBar}
        />
      )}
      <CommonText
        fontWeight="500"
        customTextStyle={[style.completionTextStyle]}
      >
        {`${intl.formatMessage({
          id: "label.memberCompletionProfilePercentWeb",
        })}`}
      </CommonText>
      <CommonText
        fontWeight="600"
        customTextStyle={{
          ...style.completionTextStyle,
          ...style.completionTextBoldStyle,
          ...style.completionValueWebTextStyle,
        }}
      >
        {value ?? 0}%
      </CommonText>
    </View>
  ) : (
    <View
      style={{
        ...style.completionPercentContainer,
      }}
    >
      <CommonText
        fontWeight="600"
        customTextStyle={{
          ...style.completionTextStyle,
          ...style.completionTextBoldStyle,
          ...style.completionValueMobileTextStyle,
        }}
      >
        {value ?? 0}%
      </CommonText>
      <CommonText
        fontWeight={"500"}
        customTextStyle={[style.completionTextStyle]}
      >
        {`${intl.formatMessage({
          id: "label.complete",
        })}`}
      </CommonText>
    </View>
  );
};

const JobProfileTab = ({
  renderHeader,
  renderFooter,
  isQuestionaireRequired = false,
  questionaireData,
  questionaireURL,
}) => {
  const intl = useIntl();
  const { isWebView } = useIsWebView();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const { data: completionPercentData, fetchData } = useFetch({
    url: GET_MEMBER_COMPLETION,
  });

  //Todo:editable will be in query params
  const handleEdit = (value) => {
    setIsEditable(value);
  };

  const onGoBack = () => {
    navigate(navigations.PROFILE);
  };

  const onSaveSuccessfull = () => {
    fetchData();
  };

  return (
    <View style={style.containerStyle}>
      <IconHeader
        actionButtonIcon={images.iconAddWhite}
        customActionButtonStyle={style.addNewButton}
        customActionButtonText={style.addNewText}
        hasIconBar
        isBorderVisible={false}
        hasActionButton={false}
        onPressLeftIcon={onGoBack}
        showHeaderContent={false}
      />
      <CustomTabs
        renderHeader={() =>
          !!renderHeader ? (
            renderHeader()
          ) : (
            <Row style={style.headerContainer}>
              <CommonText
                fontWeight={isWebView ? "500" : "600"}
                customTextStyle={{
                  ...(isWebView ? style.titleText : style.titleTextMobile),
                }}
              >
                {intl.formatMessage({ id: "label.job_profile" })}
              </CommonText>
              <View style={style.rightHeader}>
                {!isEditable && (
                  <CompletionPercent
                    value={parseInt(
                      completionPercentData?.profile_completion_percentage
                        ? `${completionPercentData?.profile_completion_percentage}`.split(
                            "."
                          )?.[0] ?? 0
                        : 0
                    )}
                  />
                )}
                <EditButton isEditable={isEditable} handleEdit={handleEdit} />
              </View>
            </Row>
          )
        }
        renderFooter={() => !!renderFooter && renderFooter()}
        tabs={[
          {
            label: "Personal Details",
            component: (
              <PersonalDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          {
            label: "Education Details",
            component: (
              <EducationDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          {
            label: "Membership Details",
            component: (
              <MembershipDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          {
            label: "Work Experience",
            component: (
              <WorkExperience
                isEditable={isEditable}
                handleEdit={handleEdit}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          {
            label: "Skill Training",
            component: (
              <SkillTraining
                isEditable={isEditable}
                handleEdit={handleEdit}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          {
            label: "Activities",
            component: (
              <Activities
                isEditable={isEditable}
                handleEdit={handleEdit}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          {
            label: "Job Preference",
            component: (
              <JobPreference
                isEditable={isEditable}
                handleEdit={handleEdit}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          isQuestionaireRequired && {
            label: "Questionnaire",
            component: (
              <ViewQuestion
                isEditable={false}
                questionnaireData={questionaireData}
                url={questionaireURL}
              />
            ),
          },
        ]}
      />
    </View>
  );
};

export default JobProfileTab;
