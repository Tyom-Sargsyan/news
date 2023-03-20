export default function useDate() {
  const getStructuredDate = (date) => {
    date = date ? new Date(date) : new Date();

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  };

  return {
    getStructuredDate,
  };
}
