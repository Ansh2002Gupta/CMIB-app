import React from "react";
import { View } from "@unthinkable/react-core-components";

import EducationDetailComponent from "./EducationDetails";
import ExamsComponent from "./ExamsComponent";
import OtherCoursesComponent from "./OtherCoursesComponent";
import { FormTabs } from "../../components/Tab";
import style from "./Exams.style";

const EducationDetailsTab = ({ isEditable, handleEdit }) => {
  return (
    <View style={style.tabContainer}>
      <FormTabs
        showWarningOnTabSwitch={isEditable}
        tabs={[
          {
            label: "Education Details",
            component: (
              <EducationDetailComponent
                isEditable={isEditable}
                handleEdit={handleEdit}
              />
            ),
          },
          {
            label: "Exams",
            component: (
              <ExamsComponent isEditable={isEditable} handleEdit={handleEdit} />
            ),
          },
          {
            label: "Other Courses",
            component: (
              <OtherCoursesComponent
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

export default EducationDetailsTab;
