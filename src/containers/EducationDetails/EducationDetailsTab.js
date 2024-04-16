import React from "react";
import { View } from "@unthinkable/react-core-components";

import EducationDetailComponent from "./EducationDetails";
import ExamsComponent from "./ExamsComponent";
import OtherCoursesComponent from "./OtherCoursesComponent";
import { FormTabs } from "../../components/Tab";
import { ACADEMICS } from "../../services/apiServices/apiEndPoint";
import style from "./Exams.style";

const EducationDetailsTab = ({
  isEditable,
  handleEdit,
  customUrl,
  onSaveSuccessfull,
}) => {
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
                customUrl={!!customUrl ? customUrl + ACADEMICS : null}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          {
            label: "Exams",
            component: (
              <ExamsComponent
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={!!customUrl ? customUrl + ACADEMICS : null}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
          {
            label: "Other Courses",
            component: (
              <OtherCoursesComponent
                isEditable={isEditable}
                handleEdit={handleEdit}
                customUrl={!!customUrl ? customUrl + ACADEMICS : null}
                onSaveSuccessfull={onSaveSuccessfull}
              />
            ),
          },
        ]}
      />
    </View>
  );
};

export default EducationDetailsTab;
