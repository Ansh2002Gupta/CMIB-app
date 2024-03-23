import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CardComponent from "../../../components/CardComponent";
import { Animated, ScrollView } from "@unthinkable/react-core-components";
import HeaderComponent from "../HeaderComponent";
import JobDetailsComponent from "../JobDetailsComponent";
import PersonalDetails from "../PersonalDetails";
import BottomSection from "../BottomSection";
import { useIntl } from "react-intl";
import styles from "./AddJobComponent.styles";
import { progressData } from "../../../constants/constants";
const AddJobComponent = forwardRef(
  (
    { isExpanded, handleJobDetailsChange, setIsExpanded, isWebView, error },
    ref
  ) => {
    const intl = useIntl();
    const [jobProgress, setJobProgress] = useState(0);
    useEffect(() => {
      if (!isExpanded) {
        let error1 = false;
        let error2 = false;
        let error3 = false;
        if (jobDetailsRef.current) {
          error1 = jobDetailsRef.current.getErrors();
        }
        if (personalDetailsRef.current) {
          error2 = personalDetailsRef.current.getErrors();
        }
        if (bottomSectionRef.current) {
          error3 = bottomSectionRef.current.getErrors();
        }
        let errorLength = [error1, error2, error3].filter(
          (item) => item == true
        );
        if (errorLength.length === 3) {
          setJobProgress(0);
        } else if (errorLength.length === 2) {
          setJobProgress(1);
        } else if (errorLength.length === 1) {
          setJobProgress(2);
        } else if (errorLength.length === 0) {
          setJobProgress(3);
        }
      }
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
    const [selectedJobType, setSelectedJobType] = useState({});

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

    const getErrors = () => {
      let error1 = true;
      let error2 = true;
      let error3 = true;
      if (jobDetailsRef.current) {
        error1 = jobDetailsRef.current.getErrors();
      }
      if (personalDetailsRef.current) {
        error2 = personalDetailsRef.current.getErrors();
      }
      if (bottomSectionRef.current) {
        error3 = bottomSectionRef.current.getErrors();
      }
      return error1 && error2 && error3;
    };

    useImperativeHandle(ref, () => ({
      getChildState: getInternalState,
      getErrors: getErrors,
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
              setSelectedJobType={setSelectedJobType}
              selectedJobType={selectedJobType}
            />
            <PersonalDetails isWebView={isWebView} ref={personalDetailsRef} />
            <BottomSection
              isWebView={isWebView}
              ref={bottomSectionRef}
              selectedJobType={selectedJobType}
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
