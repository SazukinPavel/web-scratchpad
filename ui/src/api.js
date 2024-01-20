import WebScratchpadApi from "./api/index.js";

const api = new WebScratchpadApi(import.meta.env.VITE_API_URL);

export default api;
