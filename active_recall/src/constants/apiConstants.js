import { CONFIG } from "./configs";

const REQUEST_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const HEADERS = {
  "Content-Type": "application/json",
};

export const ENDPOINTS = {
  DECKS: {
    GET_ALL_DECKS: {
      method: REQUEST_METHODS.GET,
      endpoint: (username) => `${CONFIG.LOCAL_BASE}/decks/${username}`,
    },
    CREATE_DECK: {
      method: REQUEST_METHODS.POST,
      endpoint: (username) => `${CONFIG.LOCAL_BASE}/decks/${username}`,
    },
    GET_DECK_BY_NAME: {
      method: REQUEST_METHODS.GET,
      endpoint: (username, deckname) =>
        `${CONFIG.LOCAL_BASE}/decks/${username}/${deckname}`,
    },
  },
  CARDS: {
    CREATE_CARD: {
      method: REQUEST_METHODS.POST,
      endpoint: (username, deckname) =>
        `${CONFIG.LOCAL_BASE}/cards/${username}/${deckname}`,
    },
    UPDATE_CARD: {
      method: REQUEST_METHODS.PUT,
      endpoint: (username, deckname) =>
        `${CONFIG.LOCAL_BASE}/cards/${username}/${deckname}`,
    },
  },
};
