import React, { useContext, useState } from "react";
import {
  Col,
  Row,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";
import { MediaQueryContext } from "@unthinkable/react-theme";

import { TwoRow } from "../../core/layouts";

import { CustomTabs } from "../../components/Tab";
import Activities from "../../containers/Activities";
import CardComponent from "../../components/CardComponent";
import CommonText from "../../components/CommonText";
import CustomImage from "../../components/CustomImage";
import EducationDetails from "../../containers/EducationDetails";
import JobPreference from "../../containers/JobPreference/JobPreference";
import MembershipDetails from "../../containers/MembershipDetails/MembershipDetails";
import PersonalDetails from "../../containers/PersonalDetails";
import SkillTraining from "../../containers/SkillTraining/SkillTraining";
import TouchableImage from "../../components/TouchableImage";
import WorkExperience from "../../containers/WorkExperience/WorkExperience";
import useIsWebView from "../../hooks/useIsWebView";
import { useNavigate, useParams } from "react-router";
import { navigations } from "../../constants/routeNames";
import images from "../../images";
import style, { getResponsiveStyles } from "./ViewDetailsScreen.style";

const EditButton = ({ isEditable, handleEdit }) => {
  const intl = useIntl();
  const isWebView = useIsWebView();
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  if (isEditable) return null;
  if (isWebView) {
    return (
      <CardComponent customStyle={style.cardContainer}>
        <TouchableOpacity
          style={style.editContainer}
          onPress={() => handleEdit(true)}
        >
          <CustomImage
            source={images.iconWallet}
            Icon={images.iconWallet}
            isSvg
            alt={"Save Icon"}
            height={20}
            width={20}
          />
          {(currentBreakpoint === "md" || currentBreakpoint === "lg") && (
            <CommonText customTextStyle={style.textStyle} fontWeight="600">
              {intl.formatMessage({ id: "label.save_candidate_details" })}
            </CommonText>
          )}
        </TouchableOpacity>
      </CardComponent>
    );
  }
  return null;
};

const ViewDetailsScreen = () => {
  const intl = useIntl();
  const [isEditable, setIsEditable] = useState(false);
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const navigate = useNavigate();
  const params = useParams();
  const data = {};
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
                {/* <Row>
                  <TouchableImage
                    onPress={() => {}}
                    source={images.iconArrowLeft}
                    style={style.backButton}
                  />
                </Row> */}
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
                  <EditButton isEditable={isEditable} handleEdit={handleEdit} />
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
                    {!!data?.candidate_name ? data?.candidate_name : "_"}
                  </CommonText>
                </Row>
                <View style={style.divider}></View>
                <Row>
                  <CommonText fontWeight={"500"} style={style.key}>
                    Candidate ID:&nbsp;
                  </CommonText>
                  <CommonText fontWeight={"600"} style={style.value}>
                    {!!data?.candidate_id ? data?.candidate_id : "_"}
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
    </View>
  );
};

export default ViewDetailsScreen;
