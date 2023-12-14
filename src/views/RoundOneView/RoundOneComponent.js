import React, { useState } from "react";
import { useIntl } from "react-intl";

import RoundOneUI from "./RoundOneUI";
import images from "../../images";
import { ROUND_ONE_CARD } from "../../constants/constants";

const RoundOneComponent = () => {
  const intl = useIntl();
  const [selectedContainer, setSelectedContainer] = useState(null);
  const containers = ROUND_ONE_CARD.map((card) => ({
    title: intl.formatMessage({ id: card.title }),
    id: card.id,
    image: images[card.image],
    subTitle: intl.formatMessage({ id: card.subTitle }),
  }));

  return (
    <RoundOneUI
      containers={containers}
      onPressCard={(id) => setSelectedContainer(id)}
      selectedContainer={selectedContainer}
      intl={intl}
    />
  );
};

export default RoundOneComponent;
