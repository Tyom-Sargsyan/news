import { parse } from "node-html-parser";

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

export const getNewsByDate = async () => {
  return await fetch("api//newsAm?year=2023&month=02&day=06")
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
