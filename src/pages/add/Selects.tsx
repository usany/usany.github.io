import { Button, useMediaQuery } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import useSelectors from 'src/hooks/useSelectors';
import locationsBuildings from "./locationsBuildings";
import locationsCollection from "./locationsCollection";

// export const locationsCollection = {
//   ko: {
//     cl: [
//       "1열(1F)",
//       "2열(2F)",
//       "3열(2F)",
//       "4열(4F)",
//       "집중열(1F)",
//       "1층 책상",
//       "1층 세미나실",
//       "매점(2F)",
//       "카페(1F)",
//       "중앙자료실 책상(3F)",
//       "참고열람실 책상(4F)",
//       "정기간행물 책상(4F)",
//     ],
//     cw: ["매점(B1)", "글로벌존(B1)"],
//     p: ["매점(1F)"],
//     g: ["카페(B2)", "열람실(B2)"],
//     k: ["카페"],
//     m: ["복사실"],
//     e: ["1열(5F)", "2열(6F)"],
//     c: ["1층 로비"],
//     n: ["1층 로비"]
//   },
//   en: {
//     cl: [
//       "Study #1(1F)",
//       "Study #2(2F)",
//       "Study #3(2F)",
//       "Study #4(4F)",
//       "Study Focus(1F)",
//       "1F Desks",
//       "1F Seminar",
//       "Cafeteria(2F)",
//       "Cafe(1F)",
//       "Central Desks(3F)",
//       "References Desks(4F)",
//       "Serials Desks(4F)",
//     ],
//     cw: ["Cafeteria(B1)", "Global(B1)"],
//     p: ["Cafeteria(1F)"],
//     g: ["Cafe(B2)", "Study Room(B2)"],
//     k: ["Cafe"],
//     m: ["Printer Room"],
//     e: ["Study #1(5F)", "Study #2(6F)"],
//     c: ["1F Robby"],
//     n: ["1F Robby"]
//   }
// };

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
console.log(locationsCollection)
export const location = {
  one: settingSeats(181),
  focus: settingSeats(46),
  two: settingSeats(315),
  three: settingSeats(156),
  four: settingSeats(149),
  cl: {
    ko: settingLocations(locationsCollection['ko'].cl, locationsCollection['ko'].cl),
    en: settingLocations(locationsCollection['en'].cl, locationsCollection['ko'].cl)
  },
  cw: {
    ko: settingLocations(locationsCollection['ko'].cw, locationsCollection['ko'].cw),
    en: settingLocations(locationsCollection['en'].cw, locationsCollection['ko'].cw)
  },
  p: {
    ko: settingLocations(locationsCollection['ko'].p, locationsCollection['ko'].p),
    en: settingLocations(locationsCollection['en'].p, locationsCollection['en'].p)
  },
  g: {
    ko: settingLocations(locationsCollection['ko'].g, locationsCollection['ko'].g),
    en: settingLocations(locationsCollection['en'].g, locationsCollection['ko'].g)
  },
  n: {
    ko: settingLocations(locationsCollection['ko'].n, locationsCollection['ko'].n),
    en: settingLocations(locationsCollection['en'].n, locationsCollection['ko'].n)
  },
  k: {
    ko: settingLocations(locationsCollection['ko'].k, locationsCollection['ko'].k),
    en: settingLocations(locationsCollection['en'].k, locationsCollection['ko'].k),
  },
  m: {
    ko: settingLocations(locationsCollection['ko'].m, locationsCollection['ko'].m),
    en: settingLocations(locationsCollection['en'].m, locationsCollection['ko'].m),
  },
  e: {
    ko: settingLocations(locationsCollection['ko'].e, locationsCollection['ko'].e),
    en: settingLocations(locationsCollection['en'].e, locationsCollection['ko'].e),
  },
  c: {
    ko: settingLocations(locationsCollection['ko'].c, locationsCollection['ko'].c),
    en: settingLocations(locationsCollection['en'].c, locationsCollection['ko'].c),
  }
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
          {locationsBuildings[languages].map((value, index) => {
            return (
              <MenuItem key={index} value={locationsBuildings['ko'][index]}>{value}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      {locationState.locationOne !== "" &&
        locationState.locationOne !== "직접 입력" && locationState.locationOne !== "Self input" && (
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
              {locationState.locationOne === "중도" && location.cl[languages]}
              {locationState.locationOne === "청운" && location.cw[languages]}
              {locationState.locationOne === "푸른솔" && location.p[languages]}
              {locationState.locationOne === "간호이과대" && location.g[languages]}
              {locationState.locationOne === "네오르네상스관" && location.n[languages]}
              {locationState.locationOne === "경영대" && location.k[languages]}
              {locationState.locationOne === "문과대" && location.m[languages]}
              {locationState.locationOne === "의과대" && location.e[languages]}
              {locationState.locationOne === "치과병원" && location.c[languages]}
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
      {(locationState.locationOne === "직접 입력" || locationState.locationOne === "Self input") && (
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
