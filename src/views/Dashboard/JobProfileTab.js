import { View } from "@unthinkable/react-core-components";
import { TabView } from "../../components/Tab";
import EducationDetailsTab from "./EducationDetailsTab";
import PersonalDetailsComponent from "./PersonalDetailsComponent";
import CommonText from "../../components/CommonText";
import MembershipDetailComponent from "./Membership Details/MembershipDetailComponent";

const JobProfileTab = () => {
  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <TabView
        renderHeader={() => (
          <View style={{ paddingBottom: 24 }}>
            <CommonText
              fontWeight={"500"}
              customTextStyle={{
                fontSize: 32,
                lineHeight: 40,
                color: "#000833",
              }}
            >
              Job Profile
            </CommonText>
          </View>
        )}
        tabs={[
          {
            label: "Personal Details",
            component: <PersonalDetailsComponent />,
          },
          {
            label: "Education Details",
            component: <EducationDetailsTab />,
          },
          {
            label: "Membership Details",
            component: <MembershipDetailComponent />,
          },
        ]}
      />
    </View>
  );
};

export default JobProfileTab;
