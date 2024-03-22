import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CardComponent from "../../../components/CardComponent";
import { Animated, ScrollView, View } from "@unthinkable/react-core-components";
import HeaderComponent from "../HeaderComponent";
import JobDetailsComponent from "../JobDetailsComponent";
import PersonalDetails from "../PersonalDetails";
import BottomSection from "../BottomSection";
import { useIntl } from "react-intl";
import styles from "./AddJobComponent.styles";
import { progressData } from "../../../constants/constants";
import { validateJobData } from "../../../utils/util";
const AddJobComponent = forwardRef(
  (
    {
      isExpanded,
      jobData,
      handleJobDetailsChange,
      setIsExpanded,
      isWebView,
      error,
    },
    ref
  ) => {
    const intl = useIntl();
    const [jobProgress, setJobProgress] = useState(0);

    useEffect(() => {
      if (!isExpanded) {
        let jobData = getInternalState();
        const { isValid, errors } = validateJobData(jobData);
        if (isValid) {
          setJobProgress(3);
        } else if (Object.keys(errors).length > 8) {
          setJobProgress(0);
        } else if (Object.keys(errors).length > 5) {
          setJobProgress(1);
        } else if (Object.keys(errors).length > 3) {
          setJobProgress(2);
        }
      }
      Animated.timing(animation, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [isExpanded]);

    const [animation] = useState(new Animated.Value(0));
    const minHeight = 0;
    const maxHeight = 200;
    const formHeight = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [minHeight, maxHeight],
    });
    const jobDetailsRef = useRef();
    const personalDetailsRef = useRef();
    const bottomSectionRef = useRef();

    const getInternalState = () => {
      let jobDetailsValues = {};
      let personalDetails = {};
      let bottomSectionDetails = {};
      if (jobDetailsRef.current) {
        jobDetailsValues = jobDetailsRef.current.getJobDetailsState();
      }
      if (personalDetailsRef.current) {
        personalDetails = personalDetailsRef.current.getPersonalDetails();
      }
      if (bottomSectionRef.current) {
        bottomSectionDetails =
          bottomSectionRef.current.getBottomSectionDetails();
      }
      return {
        ...jobDetailsValues,
        ...personalDetails,
        ...bottomSectionDetails,
      };
    };

    useImperativeHandle(ref, () => ({
      getChildState: getInternalState,
    }));

    return (
      <CardComponent customStyle={styles.extendedViewStyle(isExpanded)}>
        <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
          <HeaderComponent
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isQuestion={false}
            progressJobData={progressData[jobProgress]}
            headerText={intl.formatMessage({ id: "label.job_details" })}
          />

          <Animated.View style={{ ...styles.mainViewStyle, formHeight }}>
            <JobDetailsComponent
              ref={jobDetailsRef}
              isWebView={isWebView}
              jobData={jobData}
              error={error}
              handleJobDetailsChange={handleJobDetailsChange}
            />
            <PersonalDetails
              isWebView={isWebView}
              ref={personalDetailsRef}
              jobData={jobData}
              error={error}
              handleJobDetailsChange={handleJobDetailsChange}
            />
            <BottomSection
              isWebView={isWebView}
              ref={bottomSectionRef}
              jobData={jobData}
              error={error}
              handleJobDetailsChange={handleJobDetailsChange}
            />
          </Animated.View>
        </ScrollView>
      </CardComponent>
    );
  }
);
export default AddJobComponent;
