import { View } from "@unthinkable/react-core-components";
import { FormTab } from "../../components/Tab";
import EducationDetailComponent from "./EducationDetailsComponent";
import ExamsComponent from "./ExamsComponent";
import OtherCoursesComponent from "./OtherCoursesComponent";

const EducationDetailsTab = () => {
  return (
    <View style={{ padding: 16 }}>
      <FormTab
        tabs={[
          {
            label: "Education Details",
            component: <EducationDetailComponent />,
          },
          {
            label: "Exams",
            component: <ExamsComponent />,
          },
          {
            label: "Other Courses",
            component: <OtherCoursesComponent />,
          },
        ]}
      />
    </View>
  );
};

export default EducationDetailsTab;
