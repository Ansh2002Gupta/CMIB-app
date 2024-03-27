import { View, ScrollView } from "@unthinkable/react-core-components";
import React, { useState } from "react";
import CommonText from "../../components/CommonText";
import CustomTextEditor from "../../components/CustomTextEditor";
import { FormTabs } from "../../components/Tab/FormTabs";
import { CustomTabs } from "../../components/Tab";
import TouchableImage from "../../../src/components/TouchableImage";
import DetailComponent from "../../../src/components//DetailComponent/DetailComponent";

import images from "../../images";
import colors from "../../assets/colors";
import CardComponent from "../../components/CardComponent";
const details = [
  [
    {
      label: "Job Summary",
      value: "ANiket",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Job Details",
      value: "HOW ARE YOU",
      isMandatory: true,
      style: {
        padding: 16,
        borderWidth: 0.5,
        borderColor: "gray",
        marginBottom: 10,
        borderRadius: 12,
      },
    },
  ],
  [
    {
      label: "Job Type",
      value: "Dummy Dummy  ",
      isMandatory: true,
    },
    {
      label: "Urgent Job",
      value: "Dummy Dummy Dummy ",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Minimum Experience",
      value: "Dummy Dummy ",
      isMandatory: true,
    },
    {
      label: "Maximum Experience",
      value: "Dummy Dummy  ",
    },

    {
      label: "Nationality",
      value: "Dummy Dummy",
    },
  ],
  [
    {
      label: "Designation",
      value: "Dummy Dummy  ",
      isMandatory: true,
    },
    {
      label: "Job Location",
      value: "Dummy Dummy Du",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Functional Areas",
      value: "Dummy Dummy ",
      isMandatory: true,
      showBadgeLabel: true,
      customValue: [1, 2, 3],
    },
  ],
  [
    {
      label: "Gender Preference",
      value: "Dummy Dummy  ",
    },
    {
      label: "Category Preference",
      value: "Dummy Dummy  ",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Essential Qualification",
      value: "Dummy Dummy  ",
    },
  ],
  [
    {
      label: "Desired Qualification",
      value: "Dummy Dummy ",
    },
  ],
  [
    {
      label: "Job Opening Date",
      value: "Dummy Dummy  ",
      isMandatory: true,
    },
    {
      label: "Job Closing Date",
      value: "Dummy Dummy Dummy ",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Number of Vacancies",
      value: "Dummy Dummy  ",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Mode of Work",
      value: "Dummy Dummy Dummy D ",
      isMandatory: true,
    },
    {
      label: "Flexi Hours",
      value: "Dummy Dummy Du ",
    },
    {
      label: "Full Time/Part Time",
      value: "Dummy Dummy Dummy ",
      isMandatory: true,
    },
  ],
  [
    {
      label: "Salary Negotiable",
      value: "Dummy Dummy Dummy D ",
    },
    {
      label: "Minimum Salary(Annual CTC)",
      value: "Dummy Dummy Dumm ",
    },
    {
      label: "Maximum Salary",
      value: "Dummy Dummy Dummy ",
    },
  ],
  [
    {
      label: "Job Status",
      value: "Dummy Dummy ",
    },
  ],
];
const dummy2 = [
  [
    {
      question: "Hoq are you",
      option: [],
      typeofQuestion: "Text Question",
      ShouldRenderOwnComponent: function () {
        return (
          <View style={{ marginBottom: 16 }}>
            <CardComponent>
              <View style={{ flexDirection: "row" }}>
                <CommonText
                  customTextStyle={{ fontSize: 12, color: colors.darkGrey }}
                >{`Question 1`}</CommonText>
                <CommonText
                  customContainerStyle={{ marginLeft: 4 }}
                  customTextStyle={{ fontSize: 12, color: colors.darkGrey }}
                >{`(${this.typeofQuestion})`}</CommonText>
                <CommonText
                  customContainerStyle={{ marginLeft: 4 }}
                  customTextStyle={{ fontSize: 12, color: colors.red }}
                >{`*`}</CommonText>
              </View>
              <View style={{ marginTop: 8 }}>
                <CommonText
                  customTextStyle={{ fontSize: 12, color: colors.black }}
                >
                  {this.question}
                </CommonText>
              </View>
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                {this.option.map((item, index) => {
                  return (
                    <View style={{ marginBottom: 8, marginLeft: 2 }}>
                      <CommonText
                        customTextStyle={{
                          fontSize: 12,
                          color: colors.black,
                        }}
                      >{` ${index + 1}. ${item.value}`}</CommonText>
                    </View>
                  );
                })}
              </View>
            </CardComponent>
          </View>
        );
      },
    },
  ],
  [
    {
      question: "Hoq are you",
      option: [{ value: "this is india" }, { value: "this is india" }],
      typeofQuestion: "Multi",
      ShouldRenderOwnComponent: function () {
        return (
          <View style={{ marginBottom: 16 }}>
            <CardComponent>
              <View style={{ flexDirection: "row" }}>
                <CommonText
                  customTextStyle={{ fontSize: 12, color: colors.darkGrey }}
                >{`Question 1`}</CommonText>
                <CommonText
                  customContainerStyle={{ marginLeft: 4 }}
                  customTextStyle={{ fontSize: 12, color: colors.darkGrey }}
                >{`(${this.typeofQuestion})`}</CommonText>
                <CommonText
                  customContainerStyle={{ marginLeft: 4 }}
                  customTextStyle={{ fontSize: 12, color: colors.red }}
                >{`*`}</CommonText>
              </View>
              <View style={{ marginTop: 8 }}>
                <CommonText
                  customTextStyle={{ fontSize: 12, color: colors.black }}
                >
                  {this.question}
                </CommonText>
              </View>
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                {this.option.map((item, index) => {
                  return (
                    <View style={{ marginBottom: 8, marginLeft: 2 }}>
                      <CommonText
                        customTextStyle={{
                          fontSize: 12,
                          color: colors.black,
                        }}
                      >{` ${index + 1}. ${item.value}`}</CommonText>
                    </View>
                  );
                })}
              </View>
            </CardComponent>
          </View>
        );
      },
    },
  ],
  [
    {
      question:
        "Lorem ipsum dolor sit amet consectetur. Arcu dui convallis nulla sed eget phasellus gravida mattis. Risus neque nisi gravida faucibus. Morbi dictum vitae sed est ut metus velit et massa?",
      option: [
        { value: "Lorem ipsum dolor sit amet consectetur." },
        { value: "Lorem ipsum dolor sit amet consectetur." },
        { value: "Lorem ipsum dolor sit amet consectetur." },
        { value: "Lorem ipsum dolor sit amet consectetur." },
      ],
      typeofQuestion: "text",
      ShouldRenderOwnComponent: function () {
        return (
          <View style={{ marginBottom: 16 }}>
            <CardComponent>
              <View style={{ flexDirection: "row" }}>
                <CommonText
                  customTextStyle={{ fontSize: 12, color: colors.darkGrey }}
                >{`Question 1`}</CommonText>
                <CommonText
                  customContainerStyle={{ marginLeft: 4 }}
                  customTextStyle={{ fontSize: 12, color: colors.darkGrey }}
                >{`(${this.typeofQuestion})`}</CommonText>
                <CommonText
                  customContainerStyle={{ marginLeft: 4 }}
                  customTextStyle={{ fontSize: 12, color: colors.red }}
                >{`*`}</CommonText>
              </View>
              <View style={{ marginTop: 8 }}>
                <CommonText
                  customTextStyle={{ fontSize: 12, color: colors.black }}
                >
                  {this.question}
                </CommonText>
              </View>
              <View style={{ marginTop: 8, marginBottom: 8 }}>
                {this.option.map((item, index) => {
                  return (
                    <View style={{ marginBottom: 8, marginLeft: 2 }}>
                      <CommonText
                        customTextStyle={{
                          fontSize: 12,
                          color: colors.black,
                        }}
                      >{` ${index + 1}. ${item.value}`}</CommonText>
                    </View>
                  );
                })}
              </View>
            </CardComponent>
          </View>
        );
      },
    },
  ],
];

const ViewPostedJobDetails = () => {
  const [selectedBar, setSelectedBar] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "white", height: 80 }}>
        <CustomTabs
          tabs={[
            { label: "Job Details", component: <View /> },
            { label: "Applicants", component: <View /> },
            { label: "Scheduled Interview", component: <View /> },
          ]}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <FormTabs
          tabs={[
            {
              label: "Job Details",
              component: (
                <View style={{ flex: 1 }}>
                  <ScrollView
                    style={{
                      overflow: "hidden",
                    }}
                    // contentContainerStyle={{ flex: 1 }}
                  >
                    <CardComponent
                      customStyle={{
                        margin: 16,
                        padding: 16,
                      }}
                    >
                      <DetailComponent
                        details={details}
                        isColumnVariableWidth
                        customContainerStyle={{ marginTop: 0 }}
                      />
                    </CardComponent>
                  </ScrollView>
                </View>
              ),
            },
            {
              label: "Questionaire",
              component: (
                <View style={{ flex: 1, marginLeft: 16, marginTop: 16 }}>
                  <DetailComponent
                    details={dummy2}
                    isColumnVariableWidth
                    isEditable={false}
                  />
                </View>
              ),
            },
          ]}
          isEditButtonVisible
        />
      </View>
    </View>
  );
};
export default ViewPostedJobDetails;
