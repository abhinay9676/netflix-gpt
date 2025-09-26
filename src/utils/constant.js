 export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: " Bearer " + import.meta.env.VITE_TMDB_KEY,
  }
};

export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES = [{identifier: 'en', name: 'english'}, {identifier: 'hindi', name: 'hindi'}, {identifier: 'spanish', name: 'spanish'}];

export const OPENAI_KEY = import.meta.env.VITE_OPEN_AI_KEY;