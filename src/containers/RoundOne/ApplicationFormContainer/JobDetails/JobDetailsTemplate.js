import React, { useContext } from "react";
import { View, Text, ScrollView } from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";
import MultiRow from "../../../../core/layouts/MultiRow";
import MultiColumn from "../../../../core/layouts/MultiColumn";
import CardComponent from "../../../CardComponent/CardComponent";
import CommonText from "../../../../components/CommonText";
import styles from "./JobDetails.style";

const JobDetailsTemplate = () => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);

  console.log(currentBreakpoint, "currentBreakpoint");

  const JobDetailsConfig = [
    {
      content: (
        <View style={styles.mainView}>
          <View>
            <CommonText
              customTextStyle={styles.detailHeadingTextStyle}
              title={"Details of the intended positions to be filled up"}
            />
          </View>
          <CardComponent
            customCardComponentStyle={styles.customCardComponentStyle}
          >
            <View>
              <Text>Hello</Text>
            </View>
          </CardComponent>
        </View>
      ),
    },
  ];

  const JobDetailsColumnConfig = [
    {
      content: (
        <CardComponent>
          <View>
            <Text>Hello</Text>
          </View>
        </CardComponent>
      ),
    },
    {
      content: (
        <CardComponent>
          <View>
            <Text>Hello</Text>
          </View>
        </CardComponent>
      ),
    },
  ];

  return (
    <ScrollView>
      {currentBreakpoint === "xs" ? (
        <MultiRow rows={JobDetailsConfig} style={styles.MultiRowStyle} />
      ) : (
        <MultiColumn columns={JobDetailsColumnConfig} />
      )}
    </ScrollView>
  );
};

export default JobDetailsTemplate;
