const getNewsByDate = async ({ year, month, day, language }) =>
  await fetch(
    `api//newsAm?year=${year}&month=${month}&day=${day}&lang=${language}`
  ).then((response) => response.json());


export default getNewsByDate;
