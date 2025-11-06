import { Button, useMediaQuery } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import useSelectors from 'src/hooks/useSelectors';
import locationsBuildings, { buildingsObj, locationsBuildingsArray, locationsCollectionLetters } from "./locationsBuildings";
import locationsCollection from "./locationsCollection";
import useTexts from "src/hooks/useTexts";

const settingSeats = (number) => {
  return Array(number)
    .fill(null)
    .map((value, index) => (
      <MenuItem key={index + 1} value={index + 1}>
        {index + 1}
      </MenuItem>
    ));
};
const settingLocations = (building, korBuilding) => {
  return building.map((value, index) => (
    <MenuItem key={index + 1} value={korBuilding[index]}>
      {value}
    </MenuItem >
  ));
};
export const location = {
  one: settingSeats(181),
  focus: settingSeats(46),
  two: settingSeats(315),
  three: settingSeats(156),
  four: settingSeats(149),
  guOne: settingSeats(410),
  guButter: settingSeats(156),
  guHyeyum: settingSeats(188),
  guTwo: settingSeats(326),
  // cl: {
  //   ko: settingLocations(locationsCollection['ko'].cl, locationsCollection['ko'].cl),
  //   en: settingLocations(locationsCollection['en'].cl, locationsCollection['ko'].cl)
  // },
  // cw: {
  //   ko: settingLocations(locationsCollection['ko'].cw, locationsCollection['ko'].cw),
  //   en: settingLocations(locationsCollection['en'].cw, locationsCollection['ko'].cw)
  // },
  // p: {
  //   ko: settingLocations(locationsCollection['ko'].p, locationsCollection['ko'].p),
  //   en: settingLocations(locationsCollection['en'].p, locationsCollection['en'].p)
  // },
  // g: {
  //   ko: settingLocations(locationsCollection['ko'].g, locationsCollection['ko'].g),
  //   en: settingLocations(locationsCollection['en'].g, locationsCollection['ko'].g)
  // },
  // n: {
  //   ko: settingLocations(locationsCollection['ko'].n, locationsCollection['ko'].n),
  //   en: settingLocations(locationsCollection['en'].n, locationsCollection['ko'].n)
  // },
  // k: {
  //   ko: settingLocations(locationsCollection['ko'].k, locationsCollection['ko'].k),
  //   en: settingLocations(locationsCollection['en'].k, locationsCollection['ko'].k),
  // },
  // m: {
  //   ko: settingLocations(locationsCollection['ko'].m, locationsCollection['ko'].m),
  //   en: settingLocations(locationsCollection['en'].m, locationsCollection['ko'].m),
  // },
  // e: {
  //   ko: settingLocations(locationsCollection['ko'].e, locationsCollection['ko'].e),
  //   en: settingLocations(locationsCollection['en'].e, locationsCollection['ko'].e),
  // },
  // c: {
  //   ko: settingLocations(locationsCollection['ko'].c, locationsCollection['ko'].c),
  //   en: settingLocations(locationsCollection['en'].c, locationsCollection['ko'].c),
  // }
}
interface Props {
  locationState: { locationOne: string | undefined, locationTwo: string | undefined, locationThree: string | undefined, locationInput: string | undefined }
  changeBuilding: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeRoom: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeSeat: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeLocationInput: (event: { preventDefault: () => void, target: { value: string } }) => void
}
function Selects({
  locationState,
  changeBuilding,
  changeRoom,
  changeSeat,
  changeLocationInput,
}: Props) {
  const matches = useMediaQuery("(min-width:990px)");
  const languages = useSelectors((state) => state.languages.value)
  const locationOne = locationState?.locationOne
  const key = locationOne ? Object.keys(locationsCollectionLetters).find((key) => locationsCollectionLetters[key] === locationState.locationOne) : ''
  const details = (locationOne && locationOne !== '직접 입력') ? buildingsObj[key.slice(0, 2)][key][languages].details : {}
  const koDetails = (locationOne && locationOne !== '직접 입력') ? buildingsObj[key.slice(0, 2)][key]['ko'].details : {}
  const menuItems = (locationOne && locationOne !== '직접 입력') ? settingLocations(details, koDetails) : null
  return (
    <div className={`flex ${matches ? "" : "flex-col"} gap-1 px-5`}>
      <FormControl variant="standard" sx={{ width: 150 }}>
        <InputLabel>
          {languages === 'ko' ? '위치가 어디인가요' : 'Which location?'}
        </InputLabel>
        <Select
          value={locationState.locationOne}
          onChange={changeBuilding}
        // label="Age"
        >
          {locationsBuildingsArray.map((value, index) => {
            const key = Object.keys(value)[0]
            const name = value[key][languages].name
            const koBuilding = value[key].ko.name
            if (key.slice(2) === 'all') return null
            return (
              <MenuItem key={index} value={koBuilding}>{name}</MenuItem>
            )
          })}
          <MenuItem value={'직접 입력'}>Self input</MenuItem>
        </Select>
      </FormControl>
      {locationState.locationOne !== "" &&
        locationState.locationOne !== "직접 입력" && (
          <FormControl variant="standard" sx={{ width: 150 }}>
            <InputLabel
            // id="demo-simple-select-standard-label1"
            >
              {languages === 'en' && 'Where in '}{languages === 'ko' ? locationState.locationOne : locationsBuildings['en'][locationsBuildings['ko'].indexOf(locationState.locationOne)]}{languages === 'ko' && ' 어디인가요'}
            </InputLabel>
            <Select
              // labelId="demo-simple-select-standard-label1"
              // id="demo-simple-select-standard"
              value={locationState.locationTwo}
              onChange={changeRoom}
            // label="Age"
            >
              {menuItems}
              {/* {locationState.locationOne === "중도" && location.cl[languages]}
              {locationState.locationOne === "청운" && location.cw[languages]}
              {locationState.locationOne === "푸른솔" && location.p[languages]}
              {locationState.locationOne === "간호이과대" && location.g[languages]}
              {locationState.locationOne === "네오르네상스관" && location.n[languages]}
              {locationState.locationOne === "경영대" && location.k[languages]}
              {locationState.locationOne === "문과대" && location.m[languages]}
              {locationState.locationOne === "의과대" && location.e[languages]}
              {locationState.locationOne === "치과병원" && location.c[languages]} */}
            </Select>
          </FormControl>
        )}
      {["1열(1F)", "2열(2F)", "3열(2F)", "4열(4F)", "집중열(1F)"].indexOf(
        locationState.locationTwo
      ) !== -1 && (
          <FormControl variant="standard" sx={{ width: 150 }}>
            <InputLabel
            // id="demo-simple-select-standard-label1"
            >
              {languages === 'ko' ? '좌석이 어디인가요' : 'Where is your seat'}
            </InputLabel>
            <Select
              // labelId="demo-simple-select-standard-label1"
              // id="demo-simple-select-standard"
              value={locationState.locationThree}
              onChange={changeSeat}
            // label="Age"
            >
              {locationState.locationTwo === "1열(1F)" && location.one}
              {locationState.locationTwo === "2열(2F)" && location.two}
              {locationState.locationTwo === "3열(2F)" && location.three}
              {locationState.locationTwo === "4열(4F)" && location.four}
              {locationState.locationTwo === "집중열(1F)" && location.focus}
            </Select>
          </FormControl>
        )}
      {(locationState.locationOne === "직접 입력" || locationState.locationTwo === "직접 입력") && (
        <div className="flex pt-7">
          <TextField
            inputProps={{ maxLength: 25 }}
            onChange={changeLocationInput} required autoFocus />
        </div>
      )}
    </div>
  );
}

export default Selects;
