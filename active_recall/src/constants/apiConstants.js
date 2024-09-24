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
      endpoint: () => `${CONFIG.BASE}/users`,
    },
    SIGNIN: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.BASE}/users/signin`,
    },
    SIGNOUT: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.BASE}/logout`,
    },
  },
  DECKS: {
    GET_ALL_DECKS: {
      method: REQUEST_METHODS.GET,
      endpoint: () => `${CONFIG.BASE}/decks`,
    },
    CREATE_DECK: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.BASE}/decks`,
    },
    GET_DECK_BY_NAME: {
      method: REQUEST_METHODS.GET,
      endpoint: (deckname) => `${CONFIG.BASE}/decks/${deckname}`,
    },
    FIND_DECK_BY_ID: {
      method: REQUEST_METHODS.GET,
      endpoint: (deckid) => `${CONFIG.BASE}/decks/find/${deckid}`,
    },
    RESET_CARDS_INTERVAL_REPETITION: {
      method: REQUEST_METHODS.POST,
      endpoint: () => `${CONFIG.BASE}/schedule`,
    },
    DELETE_DECK_BY_ID: {
      method: REQUEST_METHODS.DELETE,
      endpoint: () => `${CONFIG.BASE}/decks`,
    },
    UPDATE_DECK_BY_ID: {
      method: REQUEST_METHODS.PUT,
      endpoint: () => `${CONFIG.BASE}/decks`,
    },
  },
  CARDS: {
    GET_CARDS_FROM_DECK: {
      method: REQUEST_METHODS.GET,
      endpoint: (deckname) => `${CONFIG.BASE}/cards/${deckname}`,
    },
    CREATE_CARD: {
      method: REQUEST_METHODS.POST,
      endpoint: (deckname) => `${CONFIG.BASE}/cards/${deckname}`,
    },
    UPDATE_CARD: {
      method: REQUEST_METHODS.PUT,
      endpoint: (deckname) => `${CONFIG.BASE}/cards/${deckname}`,
    },
    REMOVE_CARD: {
      method: REQUEST_METHODS.DELETE,
      endpoint: (deckname) => `${CONFIG.BASE}/cards/${deckname}`,
    },
  },
};
