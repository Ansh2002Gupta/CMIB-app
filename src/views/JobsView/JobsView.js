import React from "react";
import { useIntl } from "react-intl";
import { Text, View } from "@unthinkable/react-core-components";

const JobsView = () => {
  const intl = useIntl();

  return (
    <View>
      <Text>{intl.formatMessage({ id: "label.jobs" })}</Text>
    </View>
  );
};

export default JobsView;
