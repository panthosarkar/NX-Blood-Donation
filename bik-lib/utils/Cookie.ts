import { getBaseDomain } from "./Env";

class Cookie {
  cname: string;
  domain: string;
  path: string;

  constructor(
    cname: string,
    domain: string = getBaseDomain(),
    path: string = "/"
  ) {
    this.cname = cname;
    this.domain = domain;
    this.path = path;
  }

  setCookie(cValue: string, exDays: number): void {
    if (typeof document !== "undefined") {
      const d = new Date();
      d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = `${this.cname}=${cValue};${expires};path=${this.path};domain=${this.domain};`;
    } else {
      console.warn("document is not available. Skipping cookie set.");
    }
  }

  getCookie(): string {
    if (typeof document !== "undefined") {
      const name = this.cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
    }
    return "";
  }

  verifyCookie(cValue: string): boolean {
    const cookieValue = this.getCookie();
    return cookieValue === cValue;
  }

  deleteCookie(): void {
    if (typeof document !== "undefined") {
      document.cookie = `${this.cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${this.path};domain=${this.domain};`;
    } else {
      console.warn("document is not available. Skipping cookie deletion.");
    }
  }
}

export default Cookie;
