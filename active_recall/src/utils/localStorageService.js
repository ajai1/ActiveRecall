export const getLocalStorage = (key = "") => {
  console.log("GETTING LOCAL !!!");
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, payload) => {
  if (key) {
    localStorage.setItem(key, JSON.stringify(payload));
  }
};
