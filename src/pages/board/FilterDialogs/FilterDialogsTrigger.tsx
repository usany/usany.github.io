import { useState } from "react";
// import { Filter } from "lucide-react";
import { Chip } from "@mui/material";
import useCardsBackground from "src/hooks/useCardsBackground";
import { useSelectors } from "src/hooks";
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

function FilterDialogsTrigger({ selectedValues, handleSelectedValues }) {
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  const [selected, setSelected] = useState(null);
  const onClick = ({ id }) => {
    setSelected(id);
  };
  const { colorOne } = useCardsBackground()

  return (
    <div className="flex gap-1">
      {selectedValues.map((element, index) => {
        let label = element.value
        if (index === 0) {
          if (languages === 'en') {
            label = items['en'][items['ko'].indexOf(element.value)]
          }
        } else if (index === 1) {
          if (languages === 'en') {
            label = locations['en'][locations['ko'].indexOf(element.value)]
          }
        } else {
          if (languages === 'en') {
            label = time['en'][time['ko'].indexOf(element.value)]
          }
        }
        return (
          <Chip
            // sx={{
            //   bgcolor: colorOne,
            //   ":hover": {
            //     bgcolor: colorOne
            //   }
            // }
            // }
            key={index}
            label={label}
          // onClick={() => {
          //   onClick({ id: element.id });
          // }}
          />
        )
      })}
    </div>
  );
}

export default FilterDialogsTrigger;
