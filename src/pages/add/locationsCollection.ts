import { buildingsObject } from "./locationsBuildings";

const keysArray = Object.keys(buildingsObject)
const locationsCollection = {
  ko: Object.fromEntries(
    keysArray.map((value) => [value, buildingsObject[value].ko.details])
  ),
  en: Object.fromEntries(
    keysArray.map((value) => [value, buildingsObject[value].en.details])
  ),
};

export default locationsCollection

