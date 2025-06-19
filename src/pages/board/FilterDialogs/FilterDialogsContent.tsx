import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState } from "react";
// import { Filter } from "lucide-react";
import { useSelectors } from "src/hooks/useSelectors";
import locationsBuildings from "src/pages/add/locationsBuildings";
const itemsTitle = {
  ko: '우산 / 양산 선택',
  en: 'Select Usan / Yangsan'
}
const items = {
  ko: ['전체 아이템', '우산', '양산'],
  en: ['All items', 'Usan', 'Yangsan']
}
const locationsTitle = {
  ko: '장소 선택',
  en: 'All locations'
}
const locations = {
  ko: ['전체 장소', ...locationsBuildings['ko']],
  en: ['All locations', ...locationsBuildings['en']]
}
const timeTitle = {
  ko: '시간 정렬',
  en: 'Time order'
}
const time = {
  ko: ['최신순', '오래된'],
  en: ['Recent', 'Older']
}
const markers = [
  {
    label: '중도',
    location: { lat: 37.5970966, lng: 127.0527314 }
  },
  {
    label: '네오르네상스관',
    location: { lat: 37.5948201, lng: 127.053091 }
  },
  {
    label: '푸른솔',
    location: { lat: 37.5941125, lng: 127.0557743 }
  },
  {
    label: '간호이과대',
    location: { lat: 37.5960528, lng: 127.0536951 }
  },
  {
    label: '문과대',
    location: { lat: 37.5971991, lng: 127.0539612 }
  },
  {
    label: '청운',
    location: { lat: 37.594732, lng: 127.0517775 }
  },
  {
    label: '의과대',
    location: { lat: 37.59390, lng: 127.0549 }
  },
  {
    label: '경영대',
    location: { lat: 37.5967052, lng: 127.0552861 }
  },
  {
    label: '치과병원',
    location: { lat: 37.594054, lng: 127.0531189 }
  },
]

function FilterDialogsContent({ selectedValues, handleSelectedValues }) {
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  const [selected, setSelected] = useState(null);
  const onClick = ({ id }) => {
    setSelected(id);
  };
  console.log(selectedValues)

  return (
    <div className='p-5'>
      <div className="flex justify-center">{itemsTitle[index]}</div>
      <Select
        defaultValue={selectedValues[0].value || "전체 아이템"}
        onValueChange={(newValue) =>
          handleSelectedValues({
            id: "selectedValueOne",
            newValue: newValue,
          })
        }
      >
        <SelectTrigger
          className="bg-light-1 dark:bg-dark-1"
          autoFocus={selected === selectedValues[0].id}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-light-1 dark:bg-dark-1">
          <SelectGroup>
            {items[index].map((value, index) => {
              return (
                <SelectItem key={index} value={items['ko'][index]} > {value}</SelectItem>
              )
            })}
            {/* <SelectItem value="전체 아이템">전체 아이템</SelectItem>
                    <SelectItem value="우산">우산</SelectItem>
                    <SelectItem value="양산">양산</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex justify-center">{locationsTitle[index]}</div>
      <Select
        defaultValue={selectedValues[1].value || "전체 장소"}
        onValueChange={(newValue) =>
          handleSelectedValues({
            id: "selectedValueTwo",
            newValue: newValue,
          })
        }
      >
        <SelectTrigger
          className="bg-light-1 dark:bg-dark-1"
          autoFocus={selected === selectedValues[1].id}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-light-1 dark:bg-dark-1">
          <SelectGroup id="location">
            {locations[index].map((value, index) => {
              return (
                <SelectItem key={index} value={locations['ko'][index]}>{value}</SelectItem>
              )
            })}
            {/* <SelectItem value="전체 장소">전체 장소</SelectItem> */}
            {/* {markers.map((value, index) => {
                      return (
                        <SelectItem key={index} value={value.label}>{value.label}</SelectItem>
                      )
                    })} */}
            {/* <SelectItem value="청운">청운</SelectItem>
                <SelectItem value="이과대">이과대</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex justify-center">{timeTitle[index]}</div>
      <Select
        defaultValue={selectedValues[2].value || "최신순"}
        onValueChange={(newValue) =>
          handleSelectedValues({
            id: "selectedValueThree",
            newValue: newValue,
          })
        }
      >
        <SelectTrigger
          className="bg-light-1 dark:bg-dark-1"
          autoFocus={selected === selectedValues[2].id}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-light-1 dark:bg-dark-1">
          <SelectGroup>
            {time[index].map((value, index) => {
              return (
                <SelectItem key={index} value={time['ko'][index]}>{value}</SelectItem>
              )
            })}
            {/* <SelectItem value="최신순">최신순</SelectItem>
                    <SelectItem value="오래된">오래된</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterDialogsContent;
