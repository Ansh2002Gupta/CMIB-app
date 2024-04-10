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

import { TwoRow } from "../../core/layouts";

import { CustomTabs } from "../../components/Tab";
import Activities from "../../containers/Activities";
import CommonText from "../../components/CommonText";
import CustomButton from "../../components/CustomButton";
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
import useIsWebView from "../../hooks/useIsWebView";
import useFetch from "../../hooks/useFetch";
import { usePost } from "../../hooks/useApiRequest";
import {
  ADMIN,
  CANDIDATES,
  DETAIL,
  MARK_PREFER,
  UNMARK_PREFER,
} from "../../services/apiServices/apiEndPoint";
import { navigations } from "../../constants/routeNames";
import { COMPANY } from "../../constants/constants";
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
          setToastMsg(errorInSaving);
        },
        onSuccessCallback: (success) => {
          setIsSaveButton(false);
          setToastMsg(intl.formatMessage({ id: "label.successful_save" }));
        },
      });
    } else {
      onUnSave({
        overrideUrl: COMPANY + CANDIDATES + `/${id}` + UNMARK_PREFER,
        onErrorCallback: (error) => {
          setToastMsg(errorInUnSaving);
        },
        onSuccessCallback: (success) => {
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
  const [isEditable, setIsEditable] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const navigate = useNavigate();
  const params = useParams();

  const { data: candidateDetails } = useFetch({
    url: COMPANY + CANDIDATES + DETAIL + `/${params?.id},`,
  });

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
                </Row>
              </Col>
            }
            bottomSection={
              <Row style={style.candidateDetailsOuterContainer}>
                <Row>
                  <CommonText fontWeight={"500"} style={style.key}>
                    Candidate Name:&nbsp;
                  </CommonText>
                  <CommonText fontWeight={"600"} style={style.value}>
                    {!!candidateDetails?.name ? candidateDetails?.name : "_"}
                  </CommonText>
                </Row>
                <View style={style.divider}></View>
                <Row>
                  <CommonText fontWeight={"500"} style={style.key}>
                    Candidate ID:&nbsp;
                  </CommonText>
                  <CommonText fontWeight={"600"} style={style.value}>
                    {!!candidateDetails?.member_id
                      ? candidateDetails?.member_id
                      : "_"}
                  </CommonText>
                </Row>
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
