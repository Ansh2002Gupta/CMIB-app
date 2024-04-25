import React, {useImperativeHandle, useRef, useEffect} from "react";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../../../components/CommonText";
import CustomTouchableOpacity from "../../../components/CustomTouchableOpacity";
import Exams from "./Exams";
import styles from "./EducationalDetails.style";
import EdDetails from "./EdDetails";
import OtherCourses from "./OtherCourses";
import useEducationDetailsApi from "../../../services/apiServices/hooks/CandidateRoundeOne/useEducationDetailsAPI";

const   EducationalDetailsTemplate = ({
  educationalTabList,
  intl,
  isWebView,
  onChangeTab,
  selectedTab,
  handleSave
}, ref) => {
  const edDetailsRef = useRef();
  const examsRef = useRef();
  const otherCourseRef = useRef();
  const {fetchFilledData, educationFilledDetails} = useEducationDetailsApi();

  useImperativeHandle(ref, () => ({
    getAllData: () => {
      return {
        ...edDetailsRef.current?.getState(),
        ...examsRef.current?.getState(),
        ...otherCourseRef?.current?.getState(),
      }
    }
  }));

useEffect(() => {
  fetchFilledData();
}, []);

  const getEducationalDetailsTab = () => {
    switch (selectedTab.id) {
      case 1:
        return (
          <ScrollView>
            <EdDetails intl={intl} isWebView={isWebView} ref={edDetailsRef} educationFilledDetails={educationFilledDetails} />
          </ScrollView>
        );
      case 2:
        return (
          <ScrollView>
            <Exams intl={intl} isWebView={isWebView} ref={examsRef} educationFilledDetails={educationFilledDetails}/>
          </ScrollView>
        );
      case 3:
        return (
          <ScrollView>
            <OtherCourses intl={intl} isWebView={isWebView} educationFilledDetails={educationFilledDetails}/>
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

export default React.forwardRef(EducationalDetailsTemplate);
