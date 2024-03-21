import { View } from "@unthinkable/react-core-components";
import { FormTab } from "../../components/Tab";
import EducationDetailComponent from "./EducationDetailsComponent";
import ExamsComponent from "./ExamsComponent";
import OtherCoursesComponent from "./OtherCoursesComponent";
import colors from "../../assets/colors";

const EducationDetailsTab = ({ isEditable, handleEdit }) => {
  return (
    <View style={{ backgroundColor: colors.backgroundGrey }}>
      <FormTab
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
