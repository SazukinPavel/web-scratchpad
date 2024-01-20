export default class AuthModule {
  base = "auth";
  #api;
  constructor(api) {
    this.#api = api;
  }

  login(data) {
    return this.#api.post(`${this.base}/login`, data);
  }

  logout() {
    return this.#api.post(`${this.base}/logout`);
  }

  register(data) {
    return this.#api.post(`${this.base}/register`, data);
  }

  me() {
    return this.#api.post(`${this.base}/me`);
  }
}
