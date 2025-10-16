import staticImgs from 'src/assets/pwa-512x512.png'
import staticCl from 'src/assets/static_cl.jpeg'
import staticCw from 'src/assets/static_cw.jpeg'
import staticG from 'src/assets/static_g.jpeg'
import staticE from 'src/assets/comratio.jpeg'

const buildingsObject = {
  cl: {
    ko: {
      name: '중도',
      details : [
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
      ]
    },
    en: {
      name: 'Central library',
      details: [
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
      ]
    },
    image: staticCl,
    location: { lat: 37.5970966, lng: 127.0527314 },
  },
  g: {
    ko: {
      name: '간호이과대',
      details : ["카페(B2)", "열람실(B2)"],
    },
    en: {
      name: 'Nursing Science & Science',
      details: ["Cafe(B2)", "Study Room(B2)"],
    },
    image: staticG,
    location: { lat: 37.5960528, lng: 127.0536951 },
  },
  cw: {
    ko: {
      name: '청운',
      details: ["매점(B1)", "글로벌존(B1)"],
    },
    en: {
      name: 'Cheongwoon',
      details: ["Cafeteria(B1)", "Global(B1)"],
    },
    image: staticCw,
    location: { lat: 37.594732, lng: 127.0517775 },
  },
  p: {
    ko: {
      name: '푸른솔',
      details: ["매점(1F)"],
    },
    en: {
      name: 'Pureunsol',
      details: ["Cafeteria(1F)"],
    },
    image: staticImgs,
    location: { lat: 37.5941125, lng: 127.0557743 },
  },
  k: {
    ko: {
      name: '경영대',
      details: ["카페"],
    },
    en: {
      name: 'Business',
      details: ["Cafe"],
    },
    image: staticE,
    location: { lat: 37.5967052, lng: 127.0552861 },
  },
  m: {
    ko: {
      name: '문과대',
      details: ["복사실"],
    },
    en: {
      name: 'Humanities',
      details: ["Printer Room"],
    },
    image: staticImgs,
    location: { lat: 37.5971991, lng: 127.0539612 },
  },
  e: {
    ko: {
      name: '의과대',
      details: ["1열(5F)", "2열(6F)"],
    },
    en: {
      name: 'Medicine',
      details: ["Study #1(5F)", "Study #2(6F)"],
    },
    image: staticImgs,
    location: { lat: 37.5939, lng: 127.0549 },
  },
  c: {
    ko: {
      name: '치과병원',
      details: ["1층 로비"],
    },
    en: {
      name: 'Dental Hospital',
      details: ["1F Robby"],
    },
    image: staticImgs,
    location: { lat: 37.594054, lng: 127.0531189 },
  },
  n: {
    ko: {
      name: '네오르네상스관',
      details: ["1층 로비"],
    },
    en: {
      name: 'Neo-Renaissance',
      details: ["1F Robby"],
    },
    image: staticImgs,
    location: { lat: 37.5948201, lng: 127.053091 },
  },
}
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
}

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
export const markers = Object.keys(buildingsObject).map((value) => {
  return {
    label: {
      ko: locationsBuildings[value].ko,
      en: locationsBuildings[value].en
    },
    location: locationsBuildings[value].location
  }
})
// export const markers = [
//   {
//     label: {
//       ko: '중도',
//       en: 'Central library',
//     },
//     location: { lat: 37.5970966, lng: 127.0527314 },
//   },
//   {
//     label: {
//       ko: '네오르네상스관',
//       en: 'Neo-Renaissance',
//     },
//     location: { lat: 37.5948201, lng: 127.053091 },
//   },
//   {
//     label: {
//       ko: '푸른솔',
//       en: 'Pureunsol',
//     },
//     location: { lat: 37.5941125, lng: 127.0557743 },
//   },
//   {
//     label: {
//       ko: '간호이과대',
//       en: 'Nursing Science & Science',
//     },
//     location: { lat: 37.5960528, lng: 127.0536951 },
//   },
//   {
//     label: {
//       ko: '문과대',
//       en: 'Humanities',
//     },
//     location: { lat: 37.5971991, lng: 127.0539612 },
//   },
//   {
//     label: {
//       ko: '청운',
//       en: 'Cheongwoon',
//     },
//     location: { lat: 37.594732, lng: 127.0517775 },
//   },
//   {
//     label: {
//       ko: '의과대',
//       en: 'Medicine',
//     },
//     location: { lat: 37.5939, lng: 127.0549 },
//   },
//   {
//     label: {
//       ko: '경영대',
//       en: 'Business',
//     },
//     location: { lat: 37.5967052, lng: 127.0552861 },
//   },
//   {
//     label: {
//       ko: '치과병원',
//       en: 'Dental Hospital',
//     },
//     location: { lat: 37.594054, lng: 127.0531189 },
//   },
// ]

const locationsBuildings = {
  ko: ["중도", "청운", "푸른솔", "간호이과대", "경영대", "문과대", "의과대", "치과병원", "네오르네상스관"],
  en: ['Central library', 'Cheongwoon', 'Pureunsol', 'Nursing Science & Science', 'Business', 'Humanities', 'Medicine', 'Dental Hospital', 'Neo-Renaissance']
}

export default locationsBuildings
