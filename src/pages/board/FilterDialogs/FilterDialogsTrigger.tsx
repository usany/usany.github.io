// import { useState } from "react";
// import { Filter } from "lucide-react";
// import useCardsBackground from "src/hooks/useCardsBackground";
import { Chip } from "@mui/material";
import useSelectors from 'src/hooks/useSelectors';
import locationsBuildings from "src/pages/add/locationsBuildings";
import { useSearchParams } from "react-router-dom";
const items = {
  ko: ['전체 아이템', '우산', '양산'],
  en: ['All items', 'Usan', 'Yangsan']
}
const locations = {
  ko: ['전체 장소', ...locationsBuildings['ko']],
  en: ['All locations', ...locationsBuildings['en']]
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

function FilterDialogsTrigger() {
  const languages = useSelectors((state) => state.languages.value)
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedValueOne = searchParams.get('selectedValueOne') || '전체 아이템'
  const selectedValueTwo = searchParams.get('selectedValueTwo') || '전체 장소'
  const selectedValueThree = searchParams.get('selectedValueThree') || '최신순'
  const selectedValues = [selectedValueOne, selectedValueTwo, selectedValueThree]

  return (
    <div className="flex gap-1">
      {selectedValues.map((element, index) => {
        let label = element
        if (index === 0) {
          if (languages === 'en') {
            label = items['en'][items['ko'].indexOf(element)]
          }
        } else if (index === 1) {
          if (languages === 'en') {
            label = locations['en'][locations['ko'].indexOf(element)]
          }
        } else {
          if (languages === 'en') {
            label = time['en'][time['ko'].indexOf(element)]
          }
        }
        return (
          <Chip
            key={index}
            label={label}
          />
        )
      })}
    </div>
  );
}

export default FilterDialogsTrigger;
