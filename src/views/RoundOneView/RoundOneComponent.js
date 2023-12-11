import React, { useState } from "react";
import { useIntl } from "react-intl";

import { useNavigate } from "../../routes";
import RoundOneUI from "./RoundOneUI";
import images from "../../images";

const RoundOneComponent = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [selectedContainer, setSelectedContainer] = useState(null);
  const containers = [
    {
      title: intl.formatMessage({
        id: "label.add_application_form_text",
      }),
      id: 1,
      image: images.iconAddApplicationForm,
      subTitle: intl.formatMessage({
        id: "label.add_application_form_description_text",
      }),
    },
    {
      title: intl.formatMessage({
        id: "label.hiring_process_text",
      }),
      id: 2,
      image: images.iconHiringProcess,
      subTitle: intl.formatMessage({
        id: "label.hiring_process_description",
      }),
    },
    {
      title: intl.formatMessage({
        id: "label.download_details_text",
      }),
      id: 3,
      image: images.iconDownloadDetails,
      subTitle: intl.formatMessage({
        id: "label.download_details_description",
      }),
    },
  ];

  const onPressCard = (id) => {
    setSelectedContainer(id);
  };

  return (
    <RoundOneUI
      containers={containers}
      onPressCard={onPressCard}
      selectedContainer={selectedContainer}
    />
  );
};

export default RoundOneComponent;
