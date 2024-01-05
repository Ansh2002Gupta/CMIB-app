import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "@unthinkable/react-core-components";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { useIntl } from "react-intl";

import MultiRow from "../../../../core/layouts/MultiRow";
import MultiColumn from "../../../../core/layouts/MultiColumn";

import CardComponent from "../../../CardComponent/CardComponent";
import CommonText from "../../../../components/CommonText";
import styles from "./JobDetails.style";
import CustomImage from "../../../../components/CustomImage";
import CustomTextInput from "../../../../components/CustomTextInput";
import CustomTextEditor from "../../../../components/CustomTextEditor/CustomTextEditor";
import images from "../../../../images";

const JobDetailsTemplate = ({ addDesignation, onClickAddDesignation }) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const intl = useIntl();

  const JobDetailsConfig = [
    {
      content: (
        <View>
          <CommonText
            customTextStyle={styles.detailHeadingTextStyle}
            title={"Details of the intended positions to be filled up"}
          />
        </View>
      ),
    },
    {
      content: (
        <View style={styles.addDesignationStyle}>
          <TouchableOpacity onPress={onClickAddDesignation}>
            <CardComponent
              customCardComponentStyle={styles.customCardComponentStyle}
            >
              <CustomImage
                Icon={images.iconAdd}
                isSvg
                source={images.iconAdd}
                alt={"right-arrow"}
              />
              <CommonText
                title={intl.formatMessage({ id: "label.add_designation" })}
                customTextStyle={styles.addDesignationTextStyle}
              />
            </CardComponent>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      content: (
        <View style={{ marginTop: 16 }}>
          <CustomTextInput
            label={"Designation"}
            placeholder={"Assistant Finance Manager"}
            isMandatory
            isDropdown
          />
        </View>
      ),
    },
    {
      content: (
        <CardComponent>
          <CustomTextEditor label={"Role and Responsibility *"} />
        </CardComponent>
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
  let filteredJobDetailsConfig = [];

  if (!addDesignation) {
    filteredJobDetailsConfig = JobDetailsConfig.slice(0, 2);
  } else {
    filteredJobDetailsConfig = JobDetailsConfig.filter(
      (_, index) => index !== 1
    );
  }
  return (
    <ScrollView>
      {currentBreakpoint === "xs" ? (
        <MultiRow
          rows={filteredJobDetailsConfig}
          style={styles.MultiRowStyle}
        />
      ) : (
        <MultiColumn columns={JobDetailsColumnConfig} />
      )}
    </ScrollView>
  );
};

export default JobDetailsTemplate;
