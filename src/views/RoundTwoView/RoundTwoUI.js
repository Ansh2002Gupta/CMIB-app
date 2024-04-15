import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import CandidateRoundOneContainer from "../../containers/CandidateRoundOne/CandidateRoundOneContainer";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { USER_TYPE_CANDIDATE } from "../../constants/constants";
import styles from "./RoundTwo.style";

function RoundTwoUI(props) {
  const [userProfileDetails] = useContext(UserProfileContext);

  const intl = useIntl();

  return (
    <View style={styles.container}>
      {userProfileDetails?.userDetails?.user_type?.toLowerCase() ===
      USER_TYPE_CANDIDATE ? (
        <CandidateRoundOneContainer hasRoundone={false} />
      ) : (
        <CommonText>Company</CommonText>
      )}
    </View>
  );
}

export default RoundTwoUI;
