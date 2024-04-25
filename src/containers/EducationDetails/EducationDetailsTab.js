import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import EducationDetailComponent from "./EducationDetails";
import ExamsComponent from "./ExamsComponent";
import OtherCoursesComponent from "./OtherCoursesComponent";
import { FormTabs } from "../../components/Tab";
import { ACADEMICS } from "../../services/apiServices/apiEndPoint";
import getStyles from "./Exams.style";

const EducationDetailsTab = ({
  isEditable,
  handleEdit,
  customUrl,
  onSaveSuccessfull,
}) => {
  const theme = useTheme();
  const style = getStyles(theme);
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
