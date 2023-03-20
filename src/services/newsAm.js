import { parse } from "node-html-parser";

const newsAmLanguages = { en: "eng", hy: "arm", ru: "rus" };

const domainNormalizer = (link) =>
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

export const getNewsByDate = async ({ year, month, day, language }) => {
  console.log("🟢", { year, month, day, language });

  return await fetch(
    `api//newsAm?year=${year}month=${zeroAdder(month)}&day=${zeroAdder(
      day
    )}&lang=${newsAmLanguages[language]}`
  )
    .then((response) => response.text())
    .then((data) => parse(data))
    .then((dom) => {
      const news = [];
      dom.querySelectorAll("article.article-item").forEach((article) =>
        news.push({
          link: domainNormalizer(
            article.querySelector("a").getAttribute("href")
          ),
          img: domainNormalizer(
            article.querySelector("a img").getAttribute("src")
          ),
          title: article.querySelector(".title a").innerText,
          date: dateNormalizer(article.querySelector("time").innerText),
          description: article.querySelector(".text").innerText,
        })
      );
      return news;
    });
};

export default getNewsByDate;
