import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import URLParse from "url-parse";
import Cookie from "./Cookie";
import { getApiUrl } from "./Env";

export interface CurrentUser {
  currentUser?: {
    userUid?: string;
    refreshToken?: string;
  };
}

class AxiosAPI {
  url: string = "";

  setHeaders = (): this => {
    const cookieInit = new Cookie("init-id");
    const cookieLocale = new Cookie("locale");

    axios.defaults.headers.common["content-type"] = "application/json";
    axios.defaults.headers.common["init-id"] = cookieInit.getCookie();
    axios.defaults.headers.common["client-time"] = new Date().toISOString();
    axios.defaults.headers.common.Locale = cookieLocale.getCookie();
    return this;
  };

  currentUserAuth = ({ currentUser }: CurrentUser): this => {
    axios.defaults.headers.common["user-uid"] = currentUser?.userUid || "";
    axios.defaults.headers.common["refresh-token"] =
      currentUser?.refreshToken || "";
    return this;
  };

  setUrl = (url: string, query: { [key: string]: any } = {}): this => {
    // Base URL assignment
    this.url = url;

    // If query object is not empty, append query parameters to the URL
    const queryKeys = Object.keys(query);
    if (queryKeys.length > 0) {
      const queryString = queryKeys
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&");
      this.url += `?${queryString}`;
    }

    return this;
  };

  setPath = (path: string, query = {}) => {
    const rUrl = path
      .split("/")
      .filter((item) => !!item)
      .join("/");

    const url = new URLParse(`${getApiUrl()}/${rUrl}`, true);

    // Create a new query object
    const newQuery = { ...url.query, ...query };

    // Set the new query object
    url.set("query", newQuery);

    this.url = url.toString();

    return this;
  };

  getUrl = (): string => this.url;

  get = (options?: AxiosRequestConfig): Promise<AxiosResponse> => {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      axios
        .get(this.url, options)
        .then((response: any) => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };

  post = (
    params: any,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      axios
        .post(this.url, params, options)
        .then((response: any) => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };

  put = (params: any, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      axios
        .put(this.url, params, options)
        .then((response: any) => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };

  patch = (
    params: any,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      axios
        .patch(this.url, params, options)
        .then((response: any) => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };

  delete = (
    params?: AxiosRequestConfig,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> => {
    this.setHeaders();
    return new Promise((resolve, reject) => {
      axios
        .delete(this.url, { ...options, data: params })
        .then((response: any) => {
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  };
}

const AxiosAuth = new AxiosAPI();

export default AxiosAuth;
