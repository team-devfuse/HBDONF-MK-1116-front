// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const messageList = [
  {
    id:1,
    level:3,
    text:"민균아생일축하어쩌구"
  },
  {
    id:2,
    level:2,
    text:"민균아생일축하어쩌구"
  },
  {
    id:3,
    level:3,
    text:"민균아생일축하어쩌구"
  },
  {
    id:4,
    level:4,
    text:"민균아생일축하어쩌구"
  },
  {
    id:5,
    level:5,
    text:"민균아생일축하어쩌구"
  },
  {
    id:6,
    level:4,
    text:"민균아생일축하어쩌구"
  },
  {
    id:7,
    level:5,
    text:"민균아생일축하어쩌구"
  },
];

export default function handler(req, res) {
  res.status(200).json(messageList)
}
