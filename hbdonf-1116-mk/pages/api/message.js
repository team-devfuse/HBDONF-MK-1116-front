// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const messageList = [
  {
    id:1,
    type:3,
    text:"민균아생일축하어쩌구"
  },
  {
    id:2,
    type:2,
    text:"민균아생일축하어쩌구"
  },
  {
    id:3,
    type:3,
    text:"민균아생일축하어쩌구"
  },
  {
    id:4,
    type:4,
    text:"민균아생일축하어쩌구"
  },
  {
    id:5,
    type:5,
    text:"민균아생일축하어쩌구"
  },
];

export default function handler(req, res) {
  res.status(200).json(messageList)
}
