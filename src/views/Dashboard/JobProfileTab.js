import { useState } from "react";
import {
  Row,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";
import { useIntl } from "react-intl";

import { CustomTabs } from "../../components/Tab";
import ActivitiesComponent from "./ActivitiesComponent";
import EducationDetailsTab from "./EducationDetailsTab";
import SkillTrainingComponent from "./SkillTrainingComponent";
import PersonalDetailsComponent from "./PersonalDetailsComponent";
import CommonText from "../../components/CommonText";
import CardComponent from "../../components/CardComponent";
import CustomImage from "../../components/CustomImage";
import useIsWebView from "../../hooks/useIsWebView";
import style from "./JobProfileTab.style";
import images from "../../images";

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
      <CustomTabs
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
        ]}
      />
    </View>
  );
};

export default JobProfileTab;
