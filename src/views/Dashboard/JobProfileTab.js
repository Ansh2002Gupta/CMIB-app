import {
  Row,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { TabView } from "../../components/Tab";
import EducationDetailsTab from "./EducationDetailsTab";
import PersonalDetailsComponent from "./PersonalDetailsComponent";
import CommonText from "../../components/CommonText";
import MembershipDetailComponent from "./Membership Details/MembershipDetailComponent";
import WorkExperienceComponent from "./Work Experience/WorkExperienceComponent";
import style from "./JobProfileTab.style";
import CardComponent from "../../components/CardComponent";
import { useState } from "react";
import CustomImage from "../../components/CustomImage";
import images from "../../images";
import { useIntl } from "react-intl";
import useIsWebView from "../../hooks/useIsWebView";
import ActivitiesComponent from "./ActivitiesComponent";
import SkillTrainingComponent from "./SkillTrainingComponent";

const EditButton = ({ isEditable, handleEdit }) => {
  const intl = useIntl();
  const isWebView = useIsWebView();
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
  return null;
};

const JobProfileTab = () => {
  const [isEditable, setIsEditable] = useState(false);
  const handleEdit = (value) => {
    setIsEditable(value);
  };
  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <TabView
        renderHeader={() => (
          <Row style={style.headerContainer}>
            <CommonText fontWeight={"500"} customTextStyle={style.titleText}>
              Job Profile
            </CommonText>
            <EditButton isEditable={isEditable} handleEdit={handleEdit} />
          </Row>
        )}
        tabs={[
          {
            label: "Personal Details",
            component: (
              <PersonalDetailsComponent
                isEditable={isEditable}
                handleEdit={handleEdit}
              />
            ),
          },
          {
            label: "Education Details",
            component: (
              <EducationDetailsTab
                isEditable={isEditable}
                handleEdit={handleEdit}
              />
            ),
          },
          {
            label: "Activities",
            component: (
              <ActivitiesComponent
                isEditable={isEditable}
                handleEdit={handleEdit}
              />
            ),
          },
          {
            label: "Skill Training",
            component: (
              <SkillTrainingComponent
                isEditable={isEditable}
                handleEdit={handleEdit}
              />
            ),
          },
          {
            label: "Membership Details",
            component: <MembershipDetailComponent />,
          },
          {
            label: "Work Experience",
            component: <WorkExperienceComponent />,
          },
        ]}
      />
    </View>
  );
};

export default JobProfileTab;
