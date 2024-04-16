import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Col,
  Platform,
  Row,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { TwoColumn, TwoRow } from "../../core/layouts";

import { CustomTabs } from "../../components/Tab";
import Activities from "../../containers/Activities";
import CommonText from "../../components/CommonText";
import EducationDetails from "../../containers/EducationDetails";
import CustomImage from "../../components/CustomImage";
import JobPreference from "../../containers/JobPreference/JobPreference";
import MembershipDetails from "../../containers/MembershipDetails/MembershipDetails";
import PersonalDetails from "../../containers/PersonalDetails";
import SkillTraining from "../../containers/SkillTraining/SkillTraining";
import Spinner from "../../components/Spinner";
import ToastComponent from "../../components/ToastComponent/ToastComponent";
import TouchableImage from "../../components/TouchableImage";
import WorkExperience from "../../containers/WorkExperience/WorkExperience";
import { SideBarContext } from "../../globalContext/sidebar/sidebarProvider";
import useIsWebView from "../../hooks/useIsWebView";
import { usePost } from "../../hooks/useApiRequest";
import { capitalizePhrase } from "../../utils/util";
import {
  CANDIDATES,
  COMPANY_CA_JOB_PROFILE,
  MARK_PREFER,
  MEMBER_CA_JOB_PROFILE,
  UNMARK_PREFER,
} from "../../services/apiServices/apiEndPoint";
import { navigations } from "../../constants/routeNames";
import { COMPANY, MODULES } from "../../constants/constants";
import colors from "../../assets/colors";
import images from "../../images";
import style, { getResponsiveStyles } from "./ViewDetailsScreen.style";

const SaveButton = ({
  errorInSaving,
  errorInUnSaving,
  id,
  isSaving,
  isUnsaving,
  onSave,
  onUnSave,
  setToastMsg,
}) => {
  const intl = useIntl();
  const isWebView = useIsWebView();
  const isMob = Platform.OS.toLowerCase() !== "web";
  const webProps = !isMob ? { size: "xs" } : {};
  const [isSaveButton, setIsSaveButton] = useState(true);
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  const handleSavingUnsaving = () => {
    if (isSaveButton) {
      onSave({
        overrideUrl: COMPANY + CANDIDATES + `/${id}` + MARK_PREFER,
        onErrorCallback: (error) => {
          setToastMsg(errorInSaving || error);
        },
        onSuccessCallback: () => {
          setIsSaveButton(false);
          setToastMsg(intl.formatMessage({ id: "label.successful_save" }));
        },
      });
    } else {
      onUnSave({
        overrideUrl: COMPANY + CANDIDATES + `/${id}` + UNMARK_PREFER,
        onErrorCallback: (error) => {
          setToastMsg(errorInUnSaving || error);
        },
        onSuccessCallback: () => {
          setIsSaveButton(true);
          setToastMsg(intl.formatMessage({ id: "label.successful_unsave" }));
        },
      });
    }
  };

  if (isWebView) {
    return (
      <TouchableOpacity
        style={style.editContainer}
        onPress={() => handleSavingUnsaving()}
      >
        {!(isSaving || isUnsaving) ? (
          <CustomImage
            source={images.iconWallet}
            Icon={images.iconWallet}
            isSvg
            alt={"Save Icon"}
            height={20}
            width={20}
          />
        ) : (
          <Spinner color={colors.lightGrey} thickness={1} {...webProps} />
        )}
        {(currentBreakpoint === "md" || currentBreakpoint === "lg") && (
          <CommonText customTextStyle={style.textStyle} fontWeight="600">
            {intl.formatMessage({
              id: isSaveButton
                ? "label.save_candidate_details"
                : "label.unsave_candidate_details",
            })}
          </CommonText>
        )}
      </TouchableOpacity>
    );
  }
  return null;
};

const ViewDetailsScreen = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const params = useParams();
  const [sideBarState] = useContext(SideBarContext);
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { selectedModule } = sideBarState || {};
  const [isEditable, setIsEditable] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [candidateProfile, setCandidateProfile] = useState();

  const returnModuleWiseUrl = (module) => {
    switch (module) {
      case MODULES.CA_JOBS:
        return `${COMPANY_CA_JOB_PROFILE}/${params?.id}`;
      case MODULES.MEMBER:
        return `${MEMBER_CA_JOB_PROFILE}`;
      default:
        return `${MEMBER_CA_JOB_PROFILE}`;
    }
  };

  const {
    makeRequest: saveCandidateDetails,
    error: errorInSavingCandidateDetails,
    isLoading: isSavingCandidateDetails,
  } = usePost({
    url: COMPANY + CANDIDATES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    makeRequest: unSaveCandidateDetails,
    error: errorInUnSavingCandidateDetails,
    isLoading: isUnSavingCandidateDetails,
  } = usePost({
    url: COMPANY + CANDIDATES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const handleEdit = (value) => {
    setIsEditable(value);
  };
  const handleBackPress = () => {
    navigate(`${navigations.CA_JOBS}/${navigations.JOB_SEEKERS}`);
  };

  const getShortProfileDetails = ({ candidate_name, candidate_id }) => {
    candidate_name = capitalizePhrase(candidate_name);
    setCandidateProfile({ name: candidate_name, id: candidate_id });
  };

  return (
    <View style={style.containerStyle}>
      <CustomTabs
        renderHeader={() => (
          <TwoRow
            topSection={
              <Col>
                <Row style={style.headerContainer}>
                  <Row style={style.alignCenter}>
                    <TouchableImage
                      onPress={handleBackPress}
                      source={images.iconArrowLeft}
                      style={style.backButton}
                    />
                    <CommonText
                      fontWeight={"500"}
                      customTextStyle={getResponsiveStyles({
                        str: "titleText",
                        currentBreakpoint: currentBreakpoint,
                      })}
                    >
                      {intl.formatMessage({ id: "label.candidate_details" })}
                    </CommonText>
                  </Row>
                </Row>
              </Col>
            }
            bottomSection={
              <Row style={style.candidateDetailsOuterContainer}>
                <TwoColumn
                  leftSection={
                    <Row style={style.shortProfileInnerContainer}>
                      <Row>
                        <CommonText fontWeight={"500"} style={style.key}>
                          Candidate Name:&nbsp;
                        </CommonText>
                        <CommonText fontWeight={"600"} style={style.value}>
                          {!!candidateProfile?.name
                            ? candidateProfile?.name
                            : "_"}
                        </CommonText>
                      </Row>
                      <View style={style.divider}></View>
                      <Row>
                        <CommonText fontWeight={"500"} style={style.key}>
                          Candidate ID:&nbsp;
                        </CommonText>
                        <CommonText fontWeight={"600"} style={style.value}>
                          {!!candidateProfile?.id ? candidateProfile?.id : "_"}
                        </CommonText>
                      </Row>
                    </Row>
                  }
                  leftSectionStyle={style.shortProfileOuterContainer}
                  rightSection={
                    <SaveButton
                      id={params?.id}
                      onSave={saveCandidateDetails}
                      onUnSave={unSaveCandidateDetails}
                      isSaving={isSavingCandidateDetails}
                      isUnsaving={isUnSavingCandidateDetails}
                      errorInSaving={errorInSavingCandidateDetails}
                      errorInUnSaving={errorInUnSavingCandidateDetails}
                      {...{ setToastMsg }}
                    />
                  }
                  rightSectionStyle={style.saveButtonContainer}
                ></TwoColumn>
              </Row>
            }
          />
        )}
        tabs={[
          {
            label: "Personal Details",
            component: (
              <PersonalDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={
                  returnModuleWiseUrl(selectedModule?.key) + "/personal"
                }
                callBack={getShortProfileDetails}
              />
            ),
          },
          {
            label: "Education Details",
            component: (
              <EducationDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={returnModuleWiseUrl(selectedModule?.key)}
              />
            ),
          },
          {
            label: "Membership Details",
            component: (
              <MembershipDetails
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={
                  returnModuleWiseUrl(selectedModule?.key) + "/membership"
                }
              />
            ),
          },
          {
            label: "Work Experience",
            component: (
              <WorkExperience
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={
                  returnModuleWiseUrl(selectedModule?.key) + "/work-experiences"
                }
              />
            ),
          },
          {
            label: "Skill Training",
            component: (
              <SkillTraining
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={returnModuleWiseUrl(selectedModule?.key) + "/skills"}
              />
            ),
          },
          {
            label: "Activities",
            component: (
              <Activities
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={
                  returnModuleWiseUrl(selectedModule?.key) + "/activities"
                }
              />
            ),
          },
          {
            label: "Job Preference",
            component: (
              <JobPreference
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={
                  returnModuleWiseUrl(selectedModule?.key) + "/job-preferences"
                }
              />
            ),
          },
        ]}
      />
      {!!toastMsg && (
        <ToastComponent
          toastMessage={
            errorInSavingCandidateDetails ||
            errorInUnSavingCandidateDetails ||
            !!toastMsg
              ? toastMsg
              : intl.formatMessage({ id: "label.some_error_occurred" })
          }
          onDismiss={() => setToastMsg("")}
        />
      )}
    </View>
  );
};

export default ViewDetailsScreen;
