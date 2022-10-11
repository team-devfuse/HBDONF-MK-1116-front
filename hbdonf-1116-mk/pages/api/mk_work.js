// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const workList = [
  {
    id: "mk01",
    category: ["cover"],
    date: "2018-11-01T15:00:00.000Z",
    title:{
      ko: "10cm-Perfect",
      en: "10cm-Perfect"
    },
    type: "youtube",
    vidid: "zVE-cvSu10k",
    link: "https://youtu.be/zVE-cvSu10k",
    thumbnail: "https://i.ytimg.com/vi/zVE-cvSu10k/maxresdefault.jpg"
  },
  {
    id: "mk02",
    category: ["cover"],
    date: "2018-12-01T15:00:00.000Z",
    title:{
      ko: "Marteen-Sriracha",
      en: "Marteen-Sriracha"
    },
    type: "youtube",
    vidid: "iI3r8NY2hsI",
    link: "https://youtu.be/iI3r8NY2hsI",
    thumbnail: "https://i.ytimg.com/vi/iI3r8NY2hsI/maxresdefault.jpg"
  },
  {
    id: "mk03",
    category: ["cover"],
    date: "2018-12-16T15:00:00.000Z",
    title:{
      ko: "The weeknd-I feel it Coming",
      en: "The weeknd-I feel it Coming"
    },
    type: "youtube",
    vidid: "PInS4rkK83o",
    link: "https://youtu.be/PInS4rkK83o",
    thumbnail: "https://i.ytimg.com/vi/PInS4rkK83o/maxresdefault.jpg"
  },
  {
    id: "mk04",
    category: ["cover"],
    date: "2019-01-23T15:00:00.000Z",
    title:{
      ko: "The Weeknd-Secrets",
      en: "The Weeknd-Secrets"
    },
    type: "youtube",
    vidid: "hTkJjJ4nxCw",
    link: "https://youtu.be/hTkJjJ4nxCw",
    thumbnail: "https://i.ytimg.com/vi/hTkJjJ4nxCw/maxresdefault.jpg"
  },
  {
    id: "mk05",
    category: ["lyrics"],
    date: "2019-02-06T15:00:00.000Z",
    title:{
      ko: "별일아냐 (Yayaya)",
      en: "Yayaya"
    },
    type: "youtube",
    vidid: "Q3iAE7hwhfM",
    link: "https://www.youtube.com/watch?v=Q3iAE7hwhfM",
    thumbnail: "https://namu.wiki/jump/hNPh8r7%2Fv6CSrXsi8GzA7tuKqQ8FGFTsaGw%2Breiii56r%2FdWxISADPd5vriAGsJEB4L0Wy1wREO%2FD8LmOWg6GSw%3D%3D"
  },
  {
    id: "mk06",
    category: ["lyrics"],
    date: "2019-02-06T15:00:00.000Z",
    title:{
      ko: "첫 사랑의 법칙(Happily never after)",
      en: "Happily never after"
    },
    type: "youtube",
    vidid: "2oFgu31WyVU",
    link: "https://www.youtube.com/watch?v=2oFgu31WyVU",
    thumbnail: "https://namu.wiki/jump/hNPh8r7%2Fv6CSrXsi8GzA7tuKqQ8FGFTsaGw%2Breiii56r%2FdWxISADPd5vriAGsJEB4L0Wy1wREO%2FD8LmOWg6GSw%3D%3D"
  },
  {
    id: "mk07",
    category: ["cover"],
    date: "2019-02-11T15:00:00.000Z",
    title:{
      ko: "Marshmello ft.Bastille-Happier",
      en: "Marshmello ft.Bastille-Happier"
    },
    type: "youtube",
    vidid: "LautlAmASQQ",
    link: "https://youtu.be/LautlAmASQQ",
    thumbnail: "https://i.ytimg.com/vi/LautlAmASQQ/maxresdefault.jpg"
  },
  {
    id: "mk08",
    category: ["composed","lyrics"],
    date: "2019-04-19T15:00:00.000Z",
    title:{
      ko: "ROLLI (Feat. 와이엇)",
      en: "ROLLI (Feat. Wyatt)"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/rolli-mk-featwyatt",
    thumbnail: "https://i1.sndcdn.com/artworks-000523378140-sp3kqh-t500x500.jpg"
  },
  {
    id: "mk09",
    category: ["cover"],
    date: "2019-06-21T15:00:00.000Z",
    title:{
      ko: "10CM - 그러나",
      en: "10CM - however"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/mk-cover",
    thumbnail: "https://i1.sndcdn.com/artworks-000555928362-2ffnd4-t500x500.jpg"
  },
  {
    id: "mk10",
    category: ["cover"],
    date: "2019-07-02T15:00:00.000Z",
    title:{
      ko: "에드 시런 & 저스틴 비버-I Don't Care",
      en: "Ed Sheeran & Justin Biber-I Don't Care"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/ed-sheeran-justin-bieber-i-dont-care-mk",
    thumbnail: "https://i1.sndcdn.com/artworks-000560919600-7vgqb3-t500x500.jpg"
  },
  {
    id: "mk11",
    category: ["cover"],
    date: "2019-07-19T15:00:00.000Z",
    title:{
      ko: "아리아나 그란데 & The Weeknd-Love Me Harder",
      en: "Ariana Grande & The Weeknd-Love Me Harder"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/ariana-grande-the-weekend-love-me-harder-mk-cover",
    thumbnail: "https://i1.sndcdn.com/artworks-000570154919-posa75-t500x500.jpg"
  },
  {
    id: "mk12",
    category: ["cover"],
    date: "2019-08-13T15:00:00.000Z",
    title:{
      ko: "The Weeknd-Starboy",
      en: "The Weeknd-Starboy"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/starboy-the-weekend-mk",
    thumbnail: "https://i1.sndcdn.com/artworks-000582391859-8dq0bt-t500x500.jpg"
  },
  {
    id: "mk13",
    category: ["composed"],
    date: "2019-10-06T15:00:00.000Z",
    title:{
      ko: "Why",
      en: "Why"
    },
    type: "youtube",
    vidid: "BodVjFLsi8o",
    link: "https://www.youtube.com/watch?v=BodVjFLsi8o",
    thumbnail: "https://namu.wiki/jump/teuarAaC0zd5a%2F24EYdyFYi5ZVd0ey4Fd2OF3JmLgrO1jeWS9mkK5%2Bcn5MJjYwtGa3s3eva5wzaclxz8ldp1jQ%3D%3D"
  },
  {
    id: "mk14",
    category: ["composed"],
    date: "2019-10-06T15:00:00.000Z",
    title:{
      ko: "소행성 (Asteroid)",
      en: "Asteroid"
    },
    type: "youtube",
    vidid: "Ev2_piRRQqY",
    link: "https://www.youtube.com/watch?v=Ev2_piRRQqY",
    thumbnail: "https://namu.wiki/jump/teuarAaC0zd5a%2F24EYdyFYi5ZVd0ey4Fd2OF3JmLgrO1jeWS9mkK5%2Bcn5MJjYwtGa3s3eva5wzaclxz8ldp1jQ%3D%3D"
  },
  {
    id: "mk15",
    category: ["composed","lyrics"],
    date: "2019-12-19T15:00:00.000Z",
    title:{
      ko: "Promise U (By. 온앤오프)",
      en: "Promise U (By. ONF)"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/promiss-u-onf",
    thumbnail: "https://i1.sndcdn.com/artworks-000655941430-r5cnsc-t500x500.jpg"
  },
  {
    id: "mk16",
    category: ["cover"],
    date: "2019-12-29T15:00:00.000Z",
    title:{
      ko: "백예린-Square",
      en: "Yerin Baek-Square"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/cover",
    thumbnail: "https://i1.sndcdn.com/artworks-000660037969-tqchtu-t500x500.jpg"
  },
  {
    id: "mk17",
    category: ["cover"],
    date: "2020-02-12T15:00:00.000Z",
    title:{
      ko: "마이클 잭슨 / Years & Years-Heal the World X Desire",
      en: "Michael Jackson, Years & Years-Heal the world , Desire"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/heal-the-world-x-desire-cover",
    thumbnail: "https://i1.sndcdn.com/artworks-5rk1ZbJhBZgmNxTt-YOdJZw-t500x500.jpg"
  },
  {
    id: "mk18",
    category: ["cover"],
    date: "2020-02-13T15:00:00.000Z",
    title:{
      ko: "노을 - 늦은 밤 너의 집 앞 골목길에서",
      en: "Noel - Late Night"
    },
    type: "youtube",
    vidid: "hVggHrnIED4",
    link: "https://youtu.be/hVggHrnIED4",
    thumbnail: "https://i.ytimg.com/vi/hVggHrnIED4/maxresdefault.jpg"
  },
  {
    id: "mk19",
    category: ["cover"],
    date: "2020-04-29T15:00:00.000Z",
    title:{
      ko: "Conan Gray-Maniac",
      en: "Conan Gray-Maniac"
    },
    type: "youtube",
    vidid: "MzO1kmYQyfg",
    link: "https://youtu.be/MzO1kmYQyfg",
    thumbnail: "https://i.ytimg.com/vi/MzO1kmYQyfg/maxresdefault.jpg"
  },
  {
    id: "mk20",
    category: ["featuring"],
    date: "2020-05-29T15:00:00.000Z",
    title:{
      ko: "Smile (feat. MK(ONF), Chawoo)",
      en: "Smile (feat. MK(ONF), Chawoo)"
    },
    type: "youtube",
    vidid: "1g5HFWxKxp8",
    link: "https://youtu.be/1g5HFWxKxp8",
    thumbnail: "https://i.ytimg.com/vi/1g5HFWxKxp8/maxresdefault.jpg"
  },
  {
    id: "mk21",
    category: ["composed"],
    date: "2020-06-11T15:00:00.000Z",
    title:{
      ko: "신세계 (New World)",
      en: "New World"
    },
    type: "youtube",
    vidid: "m7uHOnjmlPM",
    link: "https://www.youtube.com/watch?v=m7uHOnjmlPM",
    thumbnail: "https://namu.wiki/jump/jP5BKeMtcS9nLQA55cxS8g814cN6VPtmu4D2cQPWFfMLHwFyoVkqMr2ALl4DtaFtwvQgK1Y%2BE24AXi1dZgWZQw%3D%3D"
  },
  {
    id: "mk22",
    category: ["cover"],
    date: "2020-07-07T15:00:00.000Z",
    title:{
      ko: "Tones and I-Dance Monkey",
      en: "Tones and I-Dance Monkey"
    },
    type: "youtube",
    vidid: "NDwL6tF-oEs",
    link: "https://youtu.be/NDwL6tF-oEs",
    thumbnail: "https://i.ytimg.com/vi/NDwL6tF-oEs/maxresdefault.jpg"
  },
  {
    id: "mk23",
    category: ["composed","lyrics"],
    date: "2020-08-09T15:00:00.000Z",
    title:{
      ko: "스쿰빗스위밍 (Sukhumvit Swimming)",
      en: "Sukhumvit Swimming"
    },
    type: "youtube",
    vidid: "pFSqmE-jy9g",
    link: "https://www.youtube.com/watch?v=pFSqmE-jy9g",
    thumbnail: "https://namu.wiki/jump/mYRSeWKvs%2Fv5Ek4bbMP3CKHrzcW0LY5P2jkmToRmvQFD%2BBYH0qRjhsbja5r4UxUW0ZGhsOqa9TQXhFE9kUOjBA%3D%3D"
  },
  {
    id: "mk24",
    category: ["composed","lyrics"],
    date: "2020-08-09T15:00:00.000Z",
    title:{
      ko: "제페토 (Geppetto)",
      en: "Geppetto"
    },
    type: "youtube",
    vidid: "UbVGdZ8V1dU",
    link: "https://www.youtube.com/watch?v=UbVGdZ8V1dU",
    thumbnail: "https://namu.wiki/jump/mYRSeWKvs%2Fv5Ek4bbMP3CKHrzcW0LY5P2jkmToRmvQFD%2BBYH0qRjhsbja5r4UxUW0ZGhsOqa9TQXhFE9kUOjBA%3D%3D"
  },
  {
    id: "mk25",
    category: ["composed","lyrics"],
    date: "2020-08-09T15:00:00.000Z",
    title:{
      ko: "오늘 뭐 할래 (Good Good)",
      en: "Good Good"
    },
    type: "youtube",
    vidid: "JlAI4UHxtP0",
    link: "https://www.youtube.com/watch?v=JlAI4UHxtP0",
    thumbnail: "https://namu.wiki/jump/mYRSeWKvs%2Fv5Ek4bbMP3CKHrzcW0LY5P2jkmToRmvQFD%2BBYH0qRjhsbja5r4UxUW0ZGhsOqa9TQXhFE9kUOjBA%3D%3D"
  },
  {
    id: "mk26",
    category: ["composed"],
    date: "2020-08-09T15:00:00.000Z",
    title:{
      ko: "신세계 (SPIN OFF Ver.)",
      en: "New World - SPIN OFF Version"
    },
    type: "youtube",
    vidid: "JYqHZSjzt2w",
    link: "https://www.youtube.com/watch?v=JYqHZSjzt2w",
    thumbnail: "https://namu.wiki/jump/mYRSeWKvs%2Fv5Ek4bbMP3CKHrzcW0LY5P2jkmToRmvQFD%2BBYH0qRjhsbja5r4UxUW0ZGhsOqa9TQXhFE9kUOjBA%3D%3D"
  },
  {
    id: "mk27",
    category: ["lyrics"],
    date: "2020-08-09T15:00:00.000Z",
    title:{
      ko: "Message",
      en: "Message"
    },
    type: "youtube",
    vidid: "FibEQL_I2Ak",
    link: "https://www.youtube.com/watch?v=FibEQL_I2Ak",
    thumbnail: "https://namu.wiki/jump/mYRSeWKvs%2Fv5Ek4bbMP3CKHrzcW0LY5P2jkmToRmvQFD%2BBYH0qRjhsbja5r4UxUW0ZGhsOqa9TQXhFE9kUOjBA%3D%3D"
  },
  {
    id: "mk28",
    category: ["cover"],
    date: "2020-12-24T15:00:00.000Z",
    title:{
      ko: "DAY6 (Even of Day) - 파도가 끝나는 곳까지",
      en: "DAY6 (Even of Day) - where the sea sleeps"
    },
    type: "youtube",
    vidid: "O4-R7sntQ90",
    link: "https://youtu.be/O4-R7sntQ90",
    thumbnail: "https://i.ytimg.com/vi/O4-R7sntQ90/maxresdefault.jpg"
  },
  {
    id: "mk29",
    category: ["composed","lyrics"],
    date: "2021-01-13T15:00:00.000Z",
    title:{
      ko: "넌 나의 뮤즈야 (Feat. 와이엇)",
      en: "You Are My Muse (Feat. 와이엇)"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/mk-original-song-onf-difficult-ac-ver",
    thumbnail: "https://i1.sndcdn.com/artworks-jZUxjilix2koDdkI-IzNsYA-t500x500.jpg"
  },
  {
    id: "mk30",
    category: ["composed","lyrics"],
    date: "2021-02-23T15:00:00.000Z",
    title:{
      ko: "Lights On (2021 ver.)",
      en: "Lights On (2021 ver.)"
    },
    type: "cdonly",
    vidid: "wSgjYOZ24MY",
    link: "https://www.youtube.com/watch?v=wSgjYOZ24MY",
    thumbnail: "https://namu.wiki/jump/RENGeRoZoVacjh02TGFxs8AqvJJSEluGIwFZe1DJH0ZaZmvOpmmowEADh8KuJDaf"
  },
  {
    id: "mk31",
    category: ["lyrics"],
    date: "2021-02-23T15:00:00.000Z",
    title:{
      ko: "My Name Is",
      en: "My Name Is"
    },
    type: "youtube",
    vidid: "7GhfmqGxyJ4",
    link: "https://www.youtube.com/watch?v=7GhfmqGxyJ4",
    thumbnail: "https://namu.wiki/jump/RENGeRoZoVacjh02TGFxs8AqvJJSEluGIwFZe1DJH0ZaZmvOpmmowEADh8KuJDaf"
  },
  {
    id: "mk32",
    category: ["lyrics"],
    date: "2021-02-23T15:00:00.000Z",
    title:{
      ko: "누워서 세계 속으로 (Trip Advisor)",
      en: "Trip Advisor"
    },
    type: "youtube",
    vidid: "SQ_ciNQ4HEM",
    link: "https://www.youtube.com/watch?v=SQ_ciNQ4HEM",
    thumbnail: "https://namu.wiki/jump/RENGeRoZoVacjh02TGFxs8AqvJJSEluGIwFZe1DJH0ZaZmvOpmmowEADh8KuJDaf"
  },
  {
    id: "mk33",
    category: ["composed"],
    date: "2021-08-08T15:00:00.000Z",
    title:{
      ko: "여름 시 (Summer Poem)",
      en: "Summer Poem"
    },
    type: "youtube",
    vidid: "EUxo6zCaB2Q",
    link: "https://www.youtube.com/watch?v=EUxo6zCaB2Q",
    thumbnail: "https://namu.wiki/jump/AgyATiGwEQoiEMHwwaggU0kaM75O2Axi1EF8BNOjoTEZfc0z2ym3RdR9nqtDzyTxlmQ%2FC14RJaXs%2FSj%2BAfjwNA%3D%3D"
  },
  {
    id: "mk34",
    category: ["composed"],
    date: "2021-08-08T15:00:00.000Z",
    title:{
      ko: "여름의 온도 (Dry Ice)",
      en: "Dry Ice"
    },
    type: "youtube",
    vidid: "rir5sRhMTfU",
    link: "https://www.youtube.com/watch?v=rir5sRhMTfU",
    thumbnail: "https://namu.wiki/jump/AgyATiGwEQoiEMHwwaggU0kaM75O2Axi1EF8BNOjoTEZfc0z2ym3RdR9nqtDzyTxlmQ%2FC14RJaXs%2FSj%2BAfjwNA%3D%3D"
  },
  {
    id: "mk35",
    category: ["cover"],
    date: "2021-09-27T15:00:00.000Z",
    title:{
      ko: "정준일-고백",
      en: "Joonil Jung-Confession"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/mk-cover-1",
    thumbnail: "https://i1.sndcdn.com/avatars-YLwbCWbFCOmRQ5nF-XB6yAQ-t500x500.jpg"
  },
  {
    id: "mk36",
    category: ["composed","lyrics"],
    date: "2021-11-05T15:00:00.000Z",
    title:{
      ko: "Mistake (Feat. 우태운)",
      en: "Mistake (Feat. Woo Tae Woon)"
    },
    type: "soundcloud",
    vidid: null,
    link: "https://soundcloud.com/cxcx9402/mistake-mk-feat",
    thumbnail: "https://i1.sndcdn.com/artworks-ky8xHlFuMFyyW9cG-ZdCRRg-t500x500.jpg"
  },
  {
    id: "mk37",
    category: ["composed"],
    date: "2021-12-02T15:00:00.000Z",
    title:{
      ko: "Goosebumps",
      en: "Goosebumps"
    },
    type: "youtube",
    vidid: "2Y40Ma6HXbw",
    link: "https://www.youtube.com/watch?v=2Y40Ma6HXbw",
    thumbnail: "https://namu.wiki/jump/zxRyGNX1kUIGJReQO0JIrVoqg5mdWZWxkW4fzJCQX4BNW1BoRRDaLhKVpu6zRFbDzRyugZFeGO03PQ29jYGnLw%3D%3D"
  },
  {
    id: "mk38",
    category: ["composed"],
    date: "2021-12-02T15:00:00.000Z",
    title:{
      ko: "Whistle",
      en: "Whistle"
    },
    type: "youtube",
    vidid: "ZK3g5rEcXrY",
    link: "https://www.youtube.com/watch?v=ZK3g5rEcXrY",
    thumbnail: "https://namu.wiki/jump/zxRyGNX1kUIGJReQO0JIrVoqg5mdWZWxkW4fzJCQX4BNW1BoRRDaLhKVpu6zRFbDzRyugZFeGO03PQ29jYGnLw%3D%3D"
  },
  {
    id: "mk39",
    category: ["composed"],
    date: "2021-12-02T15:00:00.000Z",
    title:{
      ko: "Fat And Sugar",
      en: "Fat And Sugar"
    },
    type: "youtube",
    vidid: "IBZdM6IJNko",
    link: "https://www.youtube.com/watch?v=IBZdM6IJNko",
    thumbnail: "https://namu.wiki/jump/zxRyGNX1kUIGJReQO0JIrVoqg5mdWZWxkW4fzJCQX4BNW1BoRRDaLhKVpu6zRFbDzRyugZFeGO03PQ29jYGnLw%3D%3D"
  },
  {
    id: "mk40",
    category: ["composed","lyrics"],
    date: "2021-12-02T15:00:00.000Z",
    title:{
      ko: "Show Must Go On",
      en: "Show Must Go On"
    },
    type: "youtube",
    vidid: "kW8dyGaZR80",
    link: "https://www.youtube.com/watch?v=kW8dyGaZR80",
    thumbnail: "https://namu.wiki/jump/zxRyGNX1kUIGJReQO0JIrVoqg5mdWZWxkW4fzJCQX4BNW1BoRRDaLhKVpu6zRFbDzRyugZFeGO03PQ29jYGnLw%3D%3D"
  },
  {
    id: "mk41",
    category: ["composed"],
    date: "2022-08-15T15:00:00.000Z",
    title:{
      ko: "Runaway",
      en: "Runaway"
    },
    type: "youtube",
    vidid: "Jyq-t-11uLs",
    link: "https://www.youtube.com/watch?v=Jyq-t-11uLs",
    thumbnail: "https://namu.wiki/jump/HVU1wxfSMPUg6lodlkp19%2BC67ecwvyzSwH%2BXOZLK54vAH2ogLHxfM8JW%2FS3V5IfS%2BD0%2BcMJ%2Bu%2FtMM0yb%2FJUEaA%3D%3D"
  }
];

export default function handler(req, res) {
  res.status(200).json(workList)
}

