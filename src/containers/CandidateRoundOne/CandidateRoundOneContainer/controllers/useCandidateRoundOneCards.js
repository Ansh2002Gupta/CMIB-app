import { useIntl } from "react-intl";
import { useNavigate } from "../../../../routes";

import { getCandidatesRoundCards } from "../../../../constants/constants";
import { navigations } from "../../../../constants/routeNames";
import images from "../../../../images";

const useCandidateRoundOneCards = ({ hasRoundone }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const CANDIDATE_ROUND_CARDS = getCandidatesRoundCards({ hasRoundone });

  const roundCards = CANDIDATE_ROUND_CARDS.map((card) => ({
    title: intl.formatMessage({ id: card.title }),
    id: card.id,
    image: images[card.image],
    subTitle: intl.formatMessage({ id: card.subTitle }),
  }));

  const onPressCard = (id) => {
    switch (id) {
      case 1:
        navigate(`${navigations.APPLICATION_FORM}`);
        break;
      case 2:
        break;
      case 3:
        navigate(`${navigations.CENTRE_WISE_COMPANY}`);
        break;
      default:
        break;
    }
  };

  return {
    onPressCard,
    roundCards,
  };
};

export default useCandidateRoundOneCards;
