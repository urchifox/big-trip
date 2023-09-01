import { CITIES, MAX_POINT_PRICE, POINTS_COUNT, POINT_TYPES } from '../const.js';
import { getRandomArrayElement, getRandomInteger, makeNonRepeatingIdGenerator} from '../utils/random-elements.js';
import { getMinDate, getMaxDate } from '../utils/dates.js';
import { offersMocks } from './offer-mock.js';

function getChosenOffersId(type) {
  const allOffers = offersMocks.filter((offer) => offer.type === type);
  const offersId = [];
  allOffers.forEach((offer) => offersId.push(offer.id));
  const randomIds = Array.from(
    {length: getRandomInteger(allOffers.length)},
    () => getRandomArrayElement(offersId)
  );

  return randomIds;
}

const getNonRepeatingId = makeNonRepeatingIdGenerator(POINTS_COUNT);

class PointMock {
  constructor() {
    const date1 = `${getRandomInteger(12) + 1}/${getRandomInteger(31) + 1}/2023 ${getRandomInteger(24)}:${getRandomInteger(59)}`;
    const date2 = `${getRandomInteger(12) + 1}/${getRandomInteger(31) + 1}/2023 ${getRandomInteger(24)}:${getRandomInteger(59)}`;
    this.id = getNonRepeatingId();
    this.basePrice = getRandomInteger(MAX_POINT_PRICE);
    this.dateFrom = new Date(getMinDate(date1, date2));
    this.dateTo = new Date(getMaxDate(date1, date2));
    this.destination = getRandomInteger(CITIES.length);
    this.isFavorite = Boolean(getRandomInteger(2));
    this.type = getRandomArrayElement(POINT_TYPES);
    this.offers = getChosenOffersId(this.type);
  }
}

const pointsMocks = Array.from(
  {length: POINTS_COUNT},
  () => new PointMock()
);

export {pointsMocks};
