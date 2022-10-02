// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const workList = [
  {
    id:1,
    category:["cover"],
    date:"2018/11/2",
    title:{
      ko:"10cm-Perfect",
      en:"10cm-Perfect"
    },
    type:"youtube",
    link:"https://youtu.be/zVE-cvSu10k",
    vidid:"zVE-cvSu10k",
    thumbnail:"https://i.ytimg.com/vi/zVE-cvSu10k/maxresdefault.jpg"
  },
  {
    id:2,
    category:["cover"],
    date:"2018/12/2",
    title:{
      ko:"Marteen-Sriracha",
      en:"Marteen-Sriracha"
    },
    type:"youtube",
    link:"https://youtu.be/iI3r8NY2hsI",
    vidid:"iI3r8NY2hsI",
    thumbnail:"https://i.ytimg.com/vi/iI3r8NY2hsI/maxresdefault.jpg"
  },
  {
    id:3,
    category:["cover"],
    date:"2018/12/17",
    title:{
      ko:"The weeknd-I feel it Coming",
      en:"The weeknd-I feel it Coming"
    },
    type:"youtube",
    link:"https://youtu.be/PInS4rkK83o",
    vidid:"PInS4rkK83o",
    thumbnail:"https://i.ytimg.com/vi/PInS4rkK83o/maxresdefault.jpg"
  },
  {
    id:4,
    category:["cover"],
    date:"2019/1/24",
    title:{
      ko:"The Weeknd-Secrets",
      en:"The Weeknd-Secrets"
    },
    type:"youtube",
    link:"https://youtu.be/hTkJjJ4nxCw",
    vidid:"hTkJjJ4nxCw",
    thumbnail:"https://i.ytimg.com/vi/hTkJjJ4nxCw/maxresdefault.jpg"
  },
  {
    id:5,
    category:["lyrics"],
    date:"2019/2/7",
    title:{
      ko:"별일아냐 (Yayaya)",
      en:"Yayaya"
    },
    type:"youtube",
    link:"https://www.youtube.com/watch?v=Q3iAE7hwhfM",
    vidid:"Q3iAE7hwhfM",
    thumbnail:"https://namu.wiki/jump/hNPh8r7%2Fv6CSrXsi8GzA7tuKqQ8FGFTsaGw%2Breiii56r%2FdWxISADPd5vriAGsJEB4L0Wy1wREO%2FD8LmOWg6GSw%3D%3D"
  },
  {
    id:6,
    category:["lyrics"],
    date:"2019/2/7",
    title:{
      ko:"첫 사랑의 법칙(Happily never after)",
      en:"Happily never after"
    },
    type:"youtube",
    link:"https://www.youtube.com/watch?v=2oFgu31WyVU",
    vidid:"2oFgu31WyVU",
    thumbnail:"https://namu.wiki/jump/hNPh8r7%2Fv6CSrXsi8GzA7tuKqQ8FGFTsaGw%2Breiii56r%2FdWxISADPd5vriAGsJEB4L0Wy1wREO%2FD8LmOWg6GSw%3D%3D"
  },
  {
    id:7,
    category:["cover"],
    date:"2019/2/12",
    title:{
      ko:"Marshmello ft.Bastille-Happier",
      en:"Marshmello ft.Bastille-Happier"
    },
    type:"youtube",
    link:"https://youtu.be/LautlAmASQQ",
    vidid:"LautlAmASQQ",
    thumbnail:"https://i.ytimg.com/vi/LautlAmASQQ/maxresdefault.jpg"
  },
  {
    id:8,
    category:["composed", "lyrics"],
    date:"2019/4/20",
    title:{
      ko:"ROLLI (Feat. 와이엇)",
      en:"ROLLI (Feat. WYATT)"
    },
    type:"soundcloud",
    link:"https://soundcloud.com/cxcx9402/rolli-mk-featwyatt",
    thumbnail:"https://i1.sndcdn.com/artworks-000523378140-sp3kqh-t500x500.jpg"
  },
  {
    id:9,
    category:["cover"],
    date:"2019/6/22",
    title:{
      ko:"10CM - 그러나",
      en:"10CM - However"
    },
    type:"soundcloud",
    link:"https://soundcloud.com/cxcx9402/mk-cover",
    thumbnail:"https://i1.sndcdn.com/artworks-000555928362-2ffnd4-t500x500.jpg"
  },
  {
    id:10,
    category:["cover"],
    date:"2019/7/3",
    title:{
      ko:"에드 시런 & 저스틴 비버-I Don't Care",
      en:"ad shiren & justin bieber-I Don't Care"
    },
    type:"soundcloud",
    link:"https://soundcloud.com/cxcx9402/ed-sheeran-justin-bieber-i-dont-care-mk",
    thumbnail:"https://i1.sndcdn.com/artworks-000560919600-7vgqb3-t500x500.jpg"
  },
  {
    id:11,
    category:["cover"],
    date:"2019/7/20",
    title:{
      ko:"아리아나 그란데 & The Weeknd-Love Me Harder",
      en:"ariana grande & the weeknd-Love Me Harder"
    },
    type:"soundcloud",
    link:"https://soundcloud.com/cxcx9402/ariana-grande-the-weekend-love-me-harder-mk-cover",
    thumbnail:"https://i1.sndcdn.com/artworks-000570154919-posa75-t500x500.jpg"
  },
  {
    id:12,
    category:["cover"],
    date:"2019/8/14",
    title:{
      ko:"The Weeknd-Starboy",
      en:"The Weeknd-Starboy"
    },
    type:"soundcloud",
    link:"https://soundcloud.com/cxcx9402/starboy-the-weekend-mk",
    thumbnail:"https://i1.sndcdn.com/artworks-000582391859-8dq0bt-t500x500.jpg"
  },
  {
    id:13,
    category:["composed"],
    date:"2019/10/7",
    title:{
      ko:"Why",
      en:"Why"
    },
    type:"youtube",
    link:"https://www.youtube.com/watch?v=BodVjFLsi8o",
    vidid:"BodVjFLsi8o",
    thumbnail:"https://namu.wiki/jump/teuarAaC0zd5a%2F24EYdyFYi5ZVd0ey4Fd2OF3JmLgrO1jeWS9mkK5%2Bcn5MJjYwtGa3s3eva5wzaclxz8ldp1jQ%3D%3D"
  },
  {
    id:14,
    category:["composed"],
    date:"2019/10/7",
    title:{
      ko:"소행성 (Asteroid)",
      en:"Asteroid"
    },
    type:"youtube",
    link:"https://www.youtube.com/watch?v=Ev2_piRRQqY",
    vidid:"Ev2_piRRQqY",
    thumbnail:"https://namu.wiki/jump/teuarAaC0zd5a%2F24EYdyFYi5ZVd0ey4Fd2OF3JmLgrO1jeWS9mkK5%2Bcn5MJjYwtGa3s3eva5wzaclxz8ldp1jQ%3D%3D"
  },
  {
    id:15,
    category:["composed", "lyrics"],
    date:"2019/12/20",
    title:{
      ko:"Promise U (By. 온앤오프)",
      en:"Promise U (By. ONF)"
    },
    type:"soundcloud",
    link:"https://soundcloud.com/cxcx9402/promiss-u-onf",
    thumbnail:"https://i1.sndcdn.com/artworks-000655941430-r5cnsc-t500x500.jpg"
  },
  {
    id:16,
    category:["cover"],
    date:"2019. 12. 30",
    title:{
      ko:"백예린-Square",
      en:"yerin baek-Square"
    },
    type:"soundcloud",
    link:"https://soundcloud.com/cxcx9402/cover",
    thumbnail:"https://i1.sndcdn.com/artworks-000660037969-tqchtu-t500x500.jpg"
  },
  {
    id:17,
    category:["cover"],
    date:"2020. 2. 12",
    title:{
      ko:"마이클 잭슨 / Years & Years-Heal the World X Desire",
      en:"Michael Jackson, Years & Years-Heal the world , Desire"
    },
    type:"youtube",
    link:"https://youtu.be/tiDPJxaTgJU",
    vidid:"tiDPJxaTgJU",
    thumbnail:"https://i.ytimg.com/vi/tiDPJxaTgJU/maxresdefault.jpg"
  },
  {
    id:18,
    category:["cover"],
    date:"2020. 2. 14",
    title:{
      ko:"노을 - 늦은 밤 너의 집 앞 골목길에서",
      en:"noel - late night your house in the alley"
    },
    type:"youtube",
    link:"https://youtu.be/hVggHrnIED4",
    vidid:"hVggHrnIED4",
    thumbnail:"https://i.ytimg.com/vi/hVggHrnIED4/maxresdefault.jpg"
  },
  {
    id:19,
    category:["cover"],
    date:"2020. 4. 30",
    title:{
      ko:"Conan Gray-Maniac",
      en:"Conan Gray-Maniac"
    },
    type:"youtube",
    link:"https://youtu.be/1g5HFWxKxp8",
    vidid:"1g5HFWxKxp8",
    thumbnail:"https://i.ytimg.com/vi/MzO1kmYQyfg/maxresdefault.jpg"
  },
  {
    id:20,
    category:["featuring"],
    date:"2020. 5. 30",
    title:{
      ko:"smile (feat. MK(ONF), Chawoo)",
      en:"smile (feat. MK(ONF), Chawoo)"
    },
    type:"youtube",
    link:"https://youtu.be/MzO1kmYQyfg",
    vidid:"MzO1kmYQyfg",
    thumbnail:"https://i.ytimg.com/vi/1g5HFWxKxp8/maxresdefault.jpg"
  },
];

export default function handler(req, res) {
  res.status(200).json(workList)
}

