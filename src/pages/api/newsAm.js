const axios = require("axios");

export default function handler(req, res) {
  axios
    .get(
      `https://news.am/${req.query.lang}/news/allregions/allthemes/${req.query.year}/${req.query.month}/${req.query.day}/`
    )
    .then(({ data }) => {
      res.status(200).send(data);
    });
}
