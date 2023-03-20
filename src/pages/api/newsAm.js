const axios = require("axios");
const HTMLParser = require("node-html-parser");

const newsAmLanguages = { en: "eng", hy: "arm", ru: "rus" };

const newsAmDomainNormalizer = (link) =>
  link.includes("news.am") ? link : `https://news.am/${link}`;

const dateFormatter = new Intl.DateTimeFormat("en-us", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const dateNormalizer = (date) => {
  const moddedDate = date
    .replaceAll(",", "")
    .replaceAll(":", ".")
    .replaceAll(" ", ".")
    .split(".");

  return dateFormatter.format(
    new Date(
      moddedDate[4],
      moddedDate[3] - 1,
      moddedDate[2],
      moddedDate[0],
      moddedDate[1]
    )
  );
};

const zeroAdder = (number) => (number < 10 ? "0" + number : number);

export default function handler(req, res) {
  axios
    .get(
      `https://news.am/${
        newsAmLanguages[req.query.lang]
      }/news/allregions/allthemes/${req.query.year}/${zeroAdder(
        req.query.month
      )}/${zeroAdder(req.query.day)}/`
    )
    .then(({ data }) => HTMLParser.parse(data))
    .then((parsedData) => {
      const news = [];
      parsedData.querySelectorAll("article.article-item").forEach((article) =>
        news.push({
          link: newsAmDomainNormalizer(
            article.querySelector("a").getAttribute("href")
          ),
          img: newsAmDomainNormalizer(
            article.querySelector("a img").getAttribute("src")
          ),
          title: article.querySelector(".title a").innerText,
          date: dateNormalizer(article.querySelector("time").innerText),
          description: article.querySelector(".text").innerText,
        })
      );

      res.status(200).send(news);
    });
}
