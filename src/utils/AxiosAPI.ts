import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import URLParse from "url-parse";
import { EnvManage } from "./EnvManage";
import Cookie from "./Cookie";

class AxiosAPI {
  url: string = "";

  setHeaders(): this {
    const getInit = new Cookie("init-id").getCookie() || "";
    const getLocale = new Cookie("locale").getCookie() || "";
    const getToken = new Cookie("token").getCookie() || "";

    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["init-id"] = getInit;
    axios.defaults.headers.common["Locale"] = getLocale;
    axios.defaults.headers.common["Client-Time"] = new Date().toISOString();
    axios.defaults.headers.common["Token"] = getToken;
    return this;
  }

  setUrl = (url: string, query: { [key: string]: string } = {}): this => {
    this.url = url;

    //if query object is not empty, append query string to url
    const queryKeys = Object.keys(query);
    if (queryKeys.length > 0) {
      const queryString = queryKeys.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join("&");
      this.url = `${url}?${queryString}`;
    }

    return this;
  };

  setPath = (path: string, query = {}) => {
    const rUrl = path
      .split("/")
      .filter((item) => !!item)
      .join("/");

    // const url = new URLParse(`${getApiUrl()}/${rUrl}`, true);
    const url = new URLParse(`${new EnvManage().getApiUrl()}/${rUrl}`, true);

    // Create a new query object
    const newQuery = { ...url.query, ...query };

    // Set the new query object
    url.set("query", newQuery);

    this.url = url.toString();

    return this;
  };

  getUrl = (): string => this.url;

  get(options?: AxiosRequestConfig): Promise<AxiosResponse> {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      axios
        .get(this.url, options)
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }

  post(params: Record<string, unknown>, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      axios
        .post(this.url, params, options)
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
}

export const AxiosAuth = new AxiosAPI();
