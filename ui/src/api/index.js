import axios from "axios";
import AuthModule from "./modules/auth.js";

export default class WebScratchpadApi {
  #axios;
  auth;

  constructor(url) {
    this.#axios = axios.create({ baseURL: url, withCredentials: true });
    this.auth = new AuthModule(this);
  }

  request(type, url, data = {}) {
    return new Promise((resolve, reject) => {
      this.#axios
        [type](url, data)
        .then((res) => resolve(res.data))
        .catch(reject);
    });
  }

  post(url, data) {
    return this.request("post", url, data);
  }

  put(url, data) {
    return this.request("put", url, data);
  }

  patch(url, data) {
    return this.request("patch", url, data);
  }

  get(url, params = {}) {
    return this.request("get", url, params);
  }

  delete(url, params = {}) {
    return this.request("delete", url, params);
  }

  applyToken(token) {
    this.#axios.defaults.headers.common = {
      Authorization: "Bearer " + token,
    };
  }
}
