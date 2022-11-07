// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const messageList = [
  {
    id:1,
    level:1,
    content:"요요 민균아 생일축하해 Skrr~!!"
  },
  {
    id:2,
    level:2,
    content:"잘생기고~ 사랑스런~ 엠~케~이~!!"
  },
  {
    id:3,
    level:3,
    content:"엠조교 생일 축하드립니다 진군^^7"
  },
  {
    id:4,
    level:4,
    content:"엠둥 어디에 계십니까 많이 보고 싶습니다."
  },
  // {
  //   id:5,
  //   level:5,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:6,
  //   level:4,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:7,
  //   level:1,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:8,
  //   level:3,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:9,
  //   level:2,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:10,
  //   level:4,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:11,
  //   level:5,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:12,
  //   level:5,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:13,
  //   level:5,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:14,
  //   level:5,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:15,
  //   level:5,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
  // {
  //   id:16,
  //   level:5,
  //   content:"요요 민균아 생일축하해 Skrr~!!"
  // },
];

export default function handler(req, res) {
  const size = req.query.size;

  const result = {
    payload:{
      messages : messageList.slice(0, size),
      count:messageList.length,
    }
  };

  res.status(200).json(result);
}
