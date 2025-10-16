import staticImgs from 'src/assets/pwa-512x512.png'
import staticCl from 'src/assets/static_cl.jpeg'
import staticCw from 'src/assets/static_cw.jpeg'
import staticG from 'src/assets/static_g.jpeg'
import staticE from 'src/assets/comratio.jpeg'

export const staticArray = {
  '중도': staticCl,
  '간호이과대': staticG,
  '청운': staticCw,
  '경영대': staticE,
  'building': staticImgs,
}

export const locationsCollection = {
  ko: {
    cl: [
      "1열(1F)",
      "2열(2F)",
      "3열(2F)",
      "4열(4F)",
      "집중열(1F)",
      "1층 책상",
      "1층 세미나실",
      "매점(2F)",
      "카페(1F)",
      "중앙자료실 책상(3F)",
      "참고열람실 책상(4F)",
      "정기간행물 책상(4F)",
    ],
    cw: ["매점(B1)", "글로벌존(B1)"],
    p: ["매점(1F)"],
    g: ["카페(B2)", "열람실(B2)"],
    k: ["카페"],
    m: ["복사실"],
    e: ["1열(5F)", "2열(6F)"],
    c: ["1층 로비"],
    n: ["1층 로비"]
  },
  en: {
    cl: [
      "Study #1(1F)",
      "Study #2(2F)",
      "Study #3(2F)",
      "Study #4(4F)",
      "Study Focus(1F)",
      "1F Desks",
      "1F Seminar",
      "Cafeteria(2F)",
      "Cafe(1F)",
      "Central Desks(3F)",
      "References Desks(4F)",
      "Serials Desks(4F)",
    ],
    cw: ["Cafeteria(B1)", "Global(B1)"],
    p: ["Cafeteria(1F)"],
    g: ["Cafe(B2)", "Study Room(B2)"],
    k: ["Cafe"],
    m: ["Printer Room"],
    e: ["Study #1(5F)", "Study #2(6F)"],
    c: ["1F Robby"],
    n: ["1F Robby"]
  }
};

export const locationsCollectionLetters = {
  cl: '중도',
  cw: '청운',
  p: '푸른솔',
  g: '간호이과대',
  k: '경영대',
  m: '문과대',
  e: '의과대',
  c: '치과병원',
  n: '네오르네상스관'
};

const locationsBuildings = {
  ko: ["중도", "청운", "푸른솔", "간호이과대", "경영대", "문과대", "의과대", "치과병원", "네오르네상스관"],
  en: ['Central library', 'Cheongwoon', 'Pureunsol', 'Nursing Science & Science', 'Business', 'Humanities', 'Medicine', 'Dental Hospital', 'Neo-Renaissance']
}

export default locationsBuildings
