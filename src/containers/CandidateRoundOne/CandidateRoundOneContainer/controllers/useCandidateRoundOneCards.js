import { useIntl } from "react-intl";
import { useNavigate } from "../../../../routes";

import { CANDIDATE_ROUND_ONE_CARDS } from "../../../../constants/constants";
import { navigations } from "../../../../constants/routeNames";
import images from "../../../../images";


const useCandidateRoundOneCards = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const roundOneCards = CANDIDATE_ROUND_ONE_CARDS.map((card) => ({
    title: intl.formatMessage({ id: card.title }),
    id: card.id,
    image: images[card.image],
    subTitle: intl.formatMessage({ id: card.subTitle }),
  }));

  const onPressCard = (id) => {
    switch (id) {
      case 1:
        navigate(navigations.APPLICATION_FORM);
        break;
      case 2:
        break;
      case 3:
      default:
        break;
    }
  };

  return {
    onPressCard,
    roundOneCards,
  };
};

export default useCandidateRoundOneCards;
