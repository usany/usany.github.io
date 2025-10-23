import staticImgs from 'src/assets/pwa-512x512.png'
import staticCl from 'src/assets/static_cl.jpeg'
import staticCw from 'src/assets/static_cw.jpeg'
import staticG from 'src/assets/static_g.jpeg'
import staticE from 'src/assets/comratio.jpeg'

const itemCounts = {
  usanOne: 0,
  usanTwo: 0,
  yangsanOne: 0,
  yangsanTwo: 0,
}
export const buildingsObj = {
  seall: {
    ko: {
      name: '서울캠퍼스 전체'
    },
    en: {
      name: 'Entire Seoul Campus'
    }
  },
  gwall: {
    ko: {
      name: '광릉캠퍼스 전체'
    },
    en: {
      name: 'Entire Gwangneung Campus'
    }
  },
  se: {
    secl: {
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
          "직접 입력"
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
          "Self input"
        ]
      },
      image: staticCl,
      location: { lat: 37.5970966, lng: 127.0527314 },
      itemCounts: itemCounts
    },
    seg: {
      ko: {
        name: '간호이과대',
        details : [
          "카페(B2)",
          "열람실(B2)",
          "직접 입력"
        ],
      },
      en: {
        name: 'Nursing Science & Science',
        details: [
          "Cafe(B2)",
          "Study Room(B2)",
          "Self input"
        ],
      },
      image: staticG,
      location: { lat: 37.5960528, lng: 127.0536951 },
      itemCounts: itemCounts
    },
    sec: {
      ko: {
        name: '청운',
        details: [
          "매점(B1)",
          "글로벌존(B1)",
          "직접 입력"
        ],
      },
      en: {
        name: 'Cheongwoon',
        details: [
          "Cafeteria(B1)",
          "Global(B1)",
          "Self input"
        ],
      },
      image: staticCw,
      location: { lat: 37.594732, lng: 127.0517775 },
      itemCounts: itemCounts
    },
    sep: {
      ko: {
        name: '푸른솔',
        details: [
          "매점(1F)",
          "직접 입력"
        ],
      },
      en: {
        name: 'Pureunsol',
        details: [
          "Cafeteria(1F)",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.5941125, lng: 127.0557743 },
      itemCounts: itemCounts
    },
    sek: {
      ko: {
        name: '경영대',
        details: [
          "카페",
          "직접 입력"
        ],
      },
      en: {
        name: 'Business',
        details: [
          "Cafe",
          "Self input"
        ],
      },
      image: staticE,
      location: { lat: 37.5967052, lng: 127.0552861 },
      itemCounts: itemCounts
    },
    sem: {
      ko: {
        name: '문과대',
        details: [
          "복사실",
          "직접 입력"
        ],
      },
      en: {
        name: 'Humanities',
        details: [
          "Printer Room",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.5971991, lng: 127.0539612 },
      itemCounts: itemCounts
    },
    seeu: {
      ko: {
        name: '의과대',
        details: [
          "1열(5F)",
          "2열(6F)",
          "직접 입력"
        ],
      },
      en: {
        name: 'Medicine',
        details: [
          "Study #1(5F)",
          "Study #2(6F)",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.5939, lng: 127.0549 },
      itemCounts: itemCounts
    },
    sechi: {
      ko: {
        name: '치과병원',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Dental Hospital',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.594054, lng: 127.0531189 },
      itemCounts: itemCounts
    },
    sen: {
      ko: {
        name: '네오르네상스관',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Neo-Renaissance',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.5948201, lng: 127.053091 },
      itemCounts: itemCounts
    },
    seeui: {
      ko: {
        name: '의료원',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Medical Center',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.594129, lng: 127.051861 },
      itemCounts: itemCounts
    },
    sech: {
      ko: {
        name: '치과대',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Dentistry',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.594145, lng: 127.053778 },
      itemCounts: itemCounts
    },
    sey: {
      ko: {
        name: '약학대',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Pharmacy',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.593816, lng: 127.055599 },
      itemCounts: itemCounts
    },
    semi: {
      ko: {
        name: '미술대',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Fine Arts',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.595635, lng: 127.048585 },
      itemCounts: itemCounts
    },
    sego: {
      ko: {
        name: '국제교육원',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'International Education',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.596160, lng: 127.050868 },
      itemCounts: itemCounts
    },
    ses: {
      ko: {
        name: '생활과학대',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Human Ecology',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.595954, lng: 127.051321 },
      itemCounts: itemCounts
    },
    seha: {
      ko: {
        name: '한의과대',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Korean Medicine',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.596108, lng: 127.053975 },
      itemCounts: itemCounts
    },
    see: {
      ko: {
        name: '음악대',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Music',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.595846, lng: 127.055458 },
      itemCounts: itemCounts
    },
    semo: {
      ko: {
        name: '무용학부관',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Dance',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.596216, lng: 127.055687 },
      itemCounts: itemCounts
    },
    seb: {
      ko: {
        name: '법학관',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Law',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.597883, lng: 127.053854 },
      itemCounts: itemCounts
    },
    seh: {
      ko: {
        name: '호텔관광대',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Hotel and Tourism Management',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.595474, lng: 127.051071 },
      itemCounts: itemCounts
    },
    seno: {
      ko: {
        name: '노란지붕문화센터',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Yellow Roof Building',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: staticImgs,
      location: { lat: 37.594503, lng: 127.052378 },
      itemCounts: itemCounts
    },
  },
  gw: {
    gwcl: {
      ko: {
        name: '중도',
        details : [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Central library',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: staticImgs,
      location: { lat: 37.748849, lng: 127.185880 },
      itemCounts: itemCounts
    },
    gwc: {
      ko: {
        name: '체육관',
        details : [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Gym',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: staticImgs,
      location: { lat: 37.749414, lng: 127.186413 },
      itemCounts: itemCounts
    }
  }
}
export const buildingsObject = {
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
      ko: buildingsObject[value].ko,
      en: buildingsObject[value].en
    },
    location: buildingsObject[value].location
  }
})

const keysArray = ['seall', ...Object.keys(buildingsObj.se), 'gwall', ...Object.keys(buildingsObj.gw)]
// const locationsBuildings = {
//   ko: keysArray.map((value) => {
//     if (value === 'seall') return {symbol: value, name: '서울캠퍼스 전체'}
//     if (value === 'gwall') return {symbol: value, name: '광릉캠퍼스 전체'}
//     return ({symbol: value, name: buildingsObj[value.slice(0, 2)][value].ko.name})
//   }),
//   en : keysArray.map((value) => {
//     if (value === 'seall') return {symbol: value, name: 'All SeoulCampus'}
//     if (value === 'gwall') return {symbol: value, name: 'All GwangneungCampus'}
//     return ({symbol: value, name: buildingsObj[value.slice(0, 2)][value].en.name})
//   }),
// }
const locationsBuildings = keysArray.map((value) => {
  if (value.slice(2) === 'all') {
    return (
      {[value]: buildingsObj[value]}
    )
  }
  return (
    {[value]: buildingsObj[value.slice(0, 2)][value]}
  )
})

export default locationsBuildings
