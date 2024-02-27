import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../../components/CommonText";
import styles from "./NumberAndTextStepper.style";

const NumberAndTextStepperTemplate = ({stepperData, selectedStepper}) => {
    return (
        <View style={styles.mainContainer}>
        {stepperData.map( (stepper, index) => (
            <View style={styles.stepperContainer(selectedStepper.id === index+1)}>
            <View style={styles.circleContainer(selectedStepper.id === index+1)}>
                <CommonText customTextStyle={styles.circleText} fontWeight={"600"}>
                    {stepper.id}
                </CommonText>
            </View>
            <CommonText customTextStyle={styles.titleText} fontWeight={"600"}>
                {stepper.title}
            </CommonText>
            </View>
        ))}
        </View>
    );
   
};

export default NumberAndTextStepperTemplate;