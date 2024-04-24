import React, { useEffect, useContext, useState, useImperativeHandle, useRef } from "react";
import { ScrollView } from "@unthinkable/react-core-components";
import PersonalDetailsTemplate from "./PersonalDetailsTemplate";
import MultiRow from "../../../core/layouts/MultiRow";
import CorrespondenceAddress from "./CorrespondenceAddress";
import PermanentAddress from "./PermanentAddress";
import styles from "./PersonalDetails.style";
import { SideBarContext } from "../../../globalContext/sidebar/sidebarProvider";
import { UserProfileContext } from "../../../globalContext/userProfile/userProfileProvider";
import usePersonalDetailsAPI from "../../../services/apiServices/hooks/CandidateRoundeOne/usePersonalDetailsAPI";

const PersonalDetails = ({ countryCodeData, intl, isWebView, handleSave = () => {} }, ref) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const [sideBarState, sideBarDispatch] = useContext(SideBarContext);
  console.log("userProfileDetails", userProfileDetails,  "sideBarState", sideBarState )
  const {handlePersonalDetails, personalDetails} = usePersonalDetailsAPI();

  const [isPersonalDetailsCompleted, setisPersonalDetailsCompleted] = useState(false);
  const [isCorresponAddCompleted, setIsCorresponAddCompleted] = useState(false);
  const [isPermanentAddCompleted, setIsPermanentAddCompleted] = useState(false);
  const [isAllFieldsCompleted, setIsAllFieldsCompleted] = useState(false);

  const personalDetailsTemplateRef = useRef();
  const correspondanceAddRef = useRef();
  const permanentAddRef = useRef();

  // useEffect(() => {
  //   if(isAllFieldsCompleted !== isPermanentAddCompleted && isCorresponAddCompleted && isPersonalDetailsCompleted) {
  //     setIsAllFieldsCompleted(isPermanentAddCompleted && isCorresponAddCompleted && isPersonalDetailsCompleted)
  //     if (isPermanentAddCompleted && isCorresponAddCompleted && isPersonalDetailsCompleted) {
  //       enableSave(true);
  //     } else {
  //       enableSave(false);
  //     }
  //   }
  // }, [isPermanentAddCompleted, isCorresponAddCompleted, isPersonalDetailsCompleted])
  // console.log("userProfileDetails", userProfileDetails);
  // console.log("sideBarState", sideBarState);

  useImperativeHandle(ref, () => ({
    getFilledData: () => {
      const corresAddData = correspondanceAddRef?.current?.getState();
      const perAddData = permanentAddRef?.current?.getState();
      return {
        addresses: [perAddData.address, corresAddData.address],
        ...personalDetailsTemplateRef?.current?.getState(),
        ...corresAddData.other
      }
    }
  }));

  const handlePersonalDetailsFields = (val) => {
    if (val !== isPersonalDetailsCompleted) {
      setisPersonalDetailsCompleted(val);
      handleSave(val && isCorresponAddCompleted && isPermanentAddCompleted);
    }
  }

  const handleCorresponAddFields = (val) => {
    if (val !== isCorresponAddCompleted) {
      setIsCorresponAddCompleted(val);
      handleSave(val && isPersonalDetailsCompleted && isPermanentAddCompleted);
    }
  }

  const handlePermanentAddFields = (val) => {
    if (val !== isPermanentAddCompleted) {
      setIsPermanentAddCompleted(val);
      handleSave(val && isCorresponAddCompleted && isPersonalDetailsCompleted);
    }
  }

  useEffect(() => {
    handlePersonalDetails();
    //BUG: adding deps causes infinite loop
  }, []);

  const personalDetailsConfig = [
    {
      content: <PersonalDetailsTemplate ref={personalDetailsTemplateRef} intl={intl} isWebView={isWebView} onValidationChange={handlePersonalDetailsFields} personalDetails={personalDetails}/>,
    },
    {
      content: <CorrespondenceAddress ref={correspondanceAddRef} intl={intl} isWebView={isWebView} countryCodeData={countryCodeData}  onValidationChange={handleCorresponAddFields} userProfileDetails={userProfileDetails}/>,
    },
    {
      content: <PermanentAddress ref={permanentAddRef} intl={intl} isWebView={isWebView}  onValidationChange={handlePermanentAddFields}/>
    },
  ];

  return(
    <ScrollView>
      <MultiRow rows={personalDetailsConfig} style={styles.mainContainer} />
    </ScrollView>
  )
};

export default React.forwardRef(PersonalDetails);
