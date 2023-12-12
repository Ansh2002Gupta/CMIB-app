import React, { useState } from "react";
import { useIntl } from "react-intl";

import RoundOneUI from "./RoundOneUI";
import { ROUND_ONE_CARD } from "../../constants/constants";
import images from "../../images";

const RoundOneComponent = () => {
  const intl = useIntl();
  const [selectedContainer, setSelectedContainer] = useState(null);
  const containers = ROUND_ONE_CARD.map((card) => ({
    title: intl.formatMessage({ id: card.title }),
    id: card.id,
    image: images[card.image],
    subTitle: intl.formatMessage({ id: card.subTitle }),
  }));

  const onPressCard = (id) => {
    setSelectedContainer(id);
  };

  return (
    <RoundOneUI
      containers={containers}
      onPressCard={onPressCard}
      selectedContainer={selectedContainer}
      intl={intl}
    />
  );
};

export default RoundOneComponent;
