import React from "react";
import CommonText from "../CommonText";
import { Platform, View } from "@unthinkable/react-core-components";
import { ThreeRow, TwoColumn } from "../../core/layouts";

const JobCardWeb = ({ jobName, jobPostion, jobDescription }) => {
  return (
    <ThreeRow
      topSection={
        <TwoColumn
          rightSection={
            <ThreeRow
              topSection={<CommonText>{jobName}</CommonText>}
              middleSection={<CommonText>{jobPostion}</CommonText>}
              bottomSection={<View></View>}
            />
          }
          middleSection={<CommonText>{jobDescription}</CommonText>}
          bottomSection={<></>}
        />
      }
    />
  );
};

export default JobCardWeb;
