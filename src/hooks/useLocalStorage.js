export default function useLocalStorage() {
  const ready = "undefined" !== typeof window && window.localStorage;
  const put = (key, value) => {
    if (ready) {
      window.localStorage.setItem(key, value);
    }
  };

  const remove = (key) => {
    if (ready) {
      window.localStorage.removeItem(key);
    }
  };

  const get = (key) => {
    if (ready) {
      return window.localStorage.getItem(key);
    }

    return undefined;
  };

  return {
    put,
    get,
    remove,
  };
}
