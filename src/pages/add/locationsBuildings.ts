import staticImgs from 'src/assets/pwa-512x512.png'
import staticCl from 'src/assets/static_cl.jpeg'
import staticCw from 'src/assets/static_cw.jpeg'
import staticG from 'src/assets/static_g.jpeg'
import staticE from 'src/assets/comratio.jpeg'
import secl from 'src/assets/secl.jpg'
import seb from 'src/assets/seb.jpg'
import sec from 'src/assets/sec.jpg'
import seeu from 'src/assets/seeu.jpg'
import sep from 'src/assets/sep.jpg'
import sek from 'src/assets/sek.jpg'
import sem from 'src/assets/sem.jpg'
import semi from 'src/assets/semi.jpg'
import sech from 'src/assets/sech.jpg'
import sechi from 'src/assets/sechi.jpg'
import see from 'src/assets/see.jpg'
import segu from 'src/assets/segu.jpg'
import seg from 'src/assets/seg.jpg'
import seh from 'src/assets/seh.jpg'
import sej from 'src/assets/sej.jpg'
import seu from 'src/assets/seu.jpg'
import sen from 'src/assets/sen.jpg'
import sey from 'src/assets/sey.jpg'
import ses from 'src/assets/ses.jpg'
import gwcl from 'src/assets/gwcl.png'
import gwb from 'src/assets/gwb.png'
import gwc from 'src/assets/gwc.png'
import gugo from 'src/assets/gugo.jpg'
import guch from 'src/assets/guch.jpg'
import guw from 'src/assets/guw.jpg'
import gum from 'src/assets/gum.jpg'
import gud from 'src/assets/gud.jpg'
import gucha from 'src/assets/gucha.jpg'
import gus from 'src/assets/gus.jpg'
import guy from 'src/assets/guy.jpg'
import guh from 'src/assets/guh.jpg'
import gucl from 'src/assets/gucl.jpg'
import guj from 'src/assets/guj.jpg'
import gugu from 'src/assets/gugu.jpg'
import guc from 'src/assets/guc.jpg'

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
  guall: {
    ko: {
      name: '국제캠퍼스 전체'
    },
    en: {
      name: 'Entire Global Campus'
    }
  },
  input: {
    ko: {
      name: '직접 입력'
    },
    en: {
      name: 'Self input'
    },
    image: staticImgs
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
      image: sep,
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
      image: sek,
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
      image: seeu,
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
      image: sechi,
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
      image: sen,
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
      image: seu,
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
      image: sech,
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
      image: sey,
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
      image: semi,
      location: { lat: 37.595635, lng: 127.048585 },
      itemCounts: itemCounts
    },
    segu: {
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
      image: segu,
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
      image: ses,
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
      image: see,
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
      image: sem,
      location: { lat: 37.596216, lng: 127.055687 },
      itemCounts: itemCounts
    },
    sebe: {
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
      image: seb,
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
      image: seh,
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
    seb: {
      ko: {
        name: '서울 본관',
        details: [
          "1층 로비",
          "직접 입력"
        ],
      },
      en: {
        name: 'Seoul Main Building',
        details: [
          "1F Robby",
          "Self input"
        ],
      },
      image: seb,
      location: { lat: 37.597156, lng: 127.051767 },
      itemCounts: itemCounts
    },
  },
  gw: {
    gwb: {
      ko: {
        name: '광릉 본관',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Gwangneung Main building',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gwb,
      location: { lat: 37.748940, lng: 127.186673 },
      itemCounts: itemCounts
    },
    gwcl: {
      ko: {
        name: '광릉 중도',
        details : [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Gwangneung Central library',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gwcl,
      location: { lat: 37.748849, lng: 127.185880 },
      itemCounts: itemCounts
    },
    gwcha: {
      ko: {
        name: '광릉 체육관',
        details : [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Gwangneung Gym',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gwc,
      location: { lat: 37.749414, lng: 127.186413 },
      itemCounts: itemCounts
    }
  },
  gu: {
    gugo: {
      ko: {
        name: '공과대',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Engineering',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gugo,
      location: { lat: 37.245777, lng: 127.080122 },
      itemCounts: itemCounts
    },
    guch: {
      ko: {
        name: '체육대',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Physical Education',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: guch,
      location: { lat: 37.244233, lng: 127.080537 },
      itemCounts: itemCounts
    },
    guw: {
      ko: {
        name: '외국어대',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Foreign Languages',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: guw,
      location: { lat: 37.245254, lng: 127.077793 },
      itemCounts: itemCounts
    },
    gum: {
      ko: {
        name: '멀관',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Multimedia',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gum,
      location: { lat: 37.244588, lng: 127.076785 },
      itemCounts: itemCounts
    },
    gug: {
      ko: {
        name: '글관',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Global',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gum,
      location: { lat: 37.243973, lng: 127.076319 },
      itemCounts: itemCounts
    },
    gud: {
      ko: {
        name: '도예관',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Ceramic Art',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gud,
      location: { lat: 37.243563, lng: 127.081166 },
      itemCounts: itemCounts
    },
    gucha: {
      ko: {
        name: '체육관',
        details: [
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
      image: gucha,
      location: { lat: 37.242903, lng: 127.080062 },
      itemCounts: itemCounts
    },
    gus: {
      ko: {
        name: '생명과학대',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Life Sciences',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gus,
      location: { lat: 37.242897, lng: 127.081157 },
      itemCounts: itemCounts
    },
    guy: {
      ko: {
        name: '예술디자인대',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Arts and Design',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: guy,
      location: { lat: 37.241527, lng: 127.084456 },
      itemCounts: itemCounts
    },
    guh: {
      ko: {
        name: '국제 학생회관',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Global Student Center',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: guh,
      location: { lat: 37.241807, lng: 127.079968 },
      itemCounts: itemCounts
    },
    gucl: {
      ko: {
        name: '국제 중도',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Global Central Library',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gucl,
      location: { lat: 37.240681, lng: 127.079700 },
      itemCounts: itemCounts
    },
    guj: {
      ko: {
        name: '전자정보/응용과학대',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Electronics Information and Applied Science',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: guj,
      location: { lat: 37.239730, lng: 127.083383 },
      itemCounts: itemCounts
    },
    gugu: {
      ko: {
        name: '국제대',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'International Studies',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: gugu,
      location: { lat: 37.239750, lng: 127.081414 },
      itemCounts: itemCounts
    },
    guc: {
      ko: {
        name: '천문대',
        details: [
          '1층 로비',
          '직접 입력'
        ]
      },
      en: {
        name: 'Astronomical Observatory',
        details: [
          "1F Robby",
          "Self input"
        ]
      },
      image: guc,
      location: { lat: 37.238631, lng: 127.081878 },
      itemCounts: itemCounts
    },
  }
}
const markingBuildings = {
  ...buildingsObj.se,
  ...buildingsObj.gw
}
export const markers = Object.keys(markingBuildings).map((value) => {
  return {
    label: {
      ko: markingBuildings[value].ko,
      en: markingBuildings[value].en
    },
    location: markingBuildings[value].location
  }
})

const keysWithoutAllArray = ['input', ...Object.keys(buildingsObj.se), ...Object.keys(buildingsObj.gu), ...Object.keys(buildingsObj.gw)]
export const locationsCollectionLetters = Object.fromEntries(keysWithoutAllArray.map((value) => {
  if (value === 'input') return [value, buildingsObj[value].ko.name]
  return (
    [value, buildingsObj[value.slice(0, 2)][value].ko.name]
  )
}))
const keysArray = ['seall', ...Object.keys(buildingsObj.se), 'guall', ...Object.keys(buildingsObj.gu), 'gwall', ...Object.keys(buildingsObj.gw)]
export const locationsBuildingsArray = keysArray.map((value) => {
  if (value.slice(2) === 'all') {
    return (
      {[value]: buildingsObj[value]}
    )
  }
  return (
    {[value]: buildingsObj[value.slice(0, 2)][value]}
  )
})
const locationsBuildings = {
  ko: keysArray.map((value) => {
    if (value === 'seall') return '서울캠퍼스 전체'
    if (value === 'guall') return '국제캠퍼스 전체'
    if (value === 'gwall') return '광릉캠퍼스 전체'
    return (buildingsObj[value.slice(0, 2)][value].ko.name)
  }),
  en : keysArray.map((value) => {
    if (value === 'seall') return 'All SeoulCampus'
    if (value === 'guall') return 'All GlobalCampus'
    if (value === 'gwall') return 'All GwangneungCampus'
    return (buildingsObj[value.slice(0, 2)][value].en.name)
  }),
}
export default locationsBuildings
