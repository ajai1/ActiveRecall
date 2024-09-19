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
  USERS: {
    CREATE_USER: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.LOCAL_BASE}/users`,
    },
    SIGNIN: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.LOCAL_BASE}/users/signin`,
    },
    SIGNOUT: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.LOCAL_BASE}/logout`,
    },
  },
  DECKS: {
    GET_ALL_DECKS: {
      method: REQUEST_METHODS.GET,
      endpoint: () => `${CONFIG.LOCAL_BASE}/decks`,
    },
    CREATE_DECK: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.LOCAL_BASE}/decks`,
    },
    GET_DECK_BY_NAME: {
      method: REQUEST_METHODS.GET,
      endpoint: (deckname) => `${CONFIG.LOCAL_BASE}/decks/${deckname}`,
    },
    RESET_CARDS_INTERVAL_REPETITION: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.LOCAL_BASE}/schedule`,
    },
  },
  CARDS: {
    CREATE_CARD: {
      method: REQUEST_METHODS.POST,
      endpoint: (deckname) => `${CONFIG.LOCAL_BASE}/cards/${deckname}`,
    },
    UPDATE_CARD: {
      method: REQUEST_METHODS.PUT,
      endpoint: (deckname) => `${CONFIG.LOCAL_BASE}/cards/${deckname}`,
    },
  },
};
