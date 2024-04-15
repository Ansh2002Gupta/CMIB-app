import React, { useContext } from "react";

import { Base } from "../../core/layouts";

import RoundOneContainer from "../../containers/RoundOne/MainContainer";
import styles from "./RoundOneView.style";
import CandidateRoundOneContainer from "../../containers/CandidateRoundOne/CandidateRoundOneContainer";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { USER_TYPE_CANDIDATE } from "../../constants/constants";

const RoundOneView = () => {
  const [userProfileDetails] = useContext(UserProfileContext);

  return (
    <Base style={styles.containerViewStyle}>
      {userProfileDetails?.userDetails?.user_type?.toLowerCase() ===
      USER_TYPE_CANDIDATE ? (
        <CandidateRoundOneContainer hasRoundone />
      ) : (
        <RoundOneContainer />
      )}
    </Base>
  );
};

export default RoundOneView;
