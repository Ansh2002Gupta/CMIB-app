import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import Exams from "./Exams";
import getStyles from "./EducationalDetails.style";

const EducationalDetailsTemplate = ({
  educationalTabList,
  intl,
  isWebView,
  onChangeTab,
  selectedTab,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const getEducationalDetailsTab = () => {
    switch (selectedTab.id) {
      case 2:
        return (
          <ScrollView>
            <Exams intl={intl} isWebView={isWebView} />
          </ScrollView>
        );
      default:
        return (
          <View style={styles.emptyContainer}>
            <CommonText customTextStyle={styles.text} fontWeight={"600"}>
              COMING SOON!!!
            </CommonText>
          </View>
        );
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.row}>
        {educationalTabList.map((tab, index) => (
          <CustomTouchableOpacity
            onPress={() => onChangeTab(index)}
            style={styles.tab(tab.id === selectedTab.id)}
          >
            <CommonText
              customTextStyle={styles.tabText(tab.id === selectedTab.id)}
            >
              {tab.title}
            </CommonText>
          </CustomTouchableOpacity>
        ))}
      </View>
      <View style={styles.flexContainer}>{getEducationalDetailsTab()}</View>
    </View>
  );
};

export default EducationalDetailsTemplate;
