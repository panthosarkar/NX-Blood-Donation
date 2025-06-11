class Cors {
  private path: string;
  private method: (
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "*"
  )[] = [];
  private origin: string[] = [];
  private headers: string[] = [];

  constructor(path: string) {
    this.path = path;
  }
  setMethod(...method: ("GET" | "POST" | "PUT" | "DELETE" | "PATCH")[]) {
    this.method = [...method, "OPTIONS"];
    return this;
  }
  acceptOrigins(...origin: string[]) {
    this.origin = origin;
    return this;
  }
  acceptHeaders(...headers: string[]) {
    this.headers = headers;
    return this;
  }
  getPath() {
    return this.path;
  }
  getMethod() {
    return this.method;
  }
  getOrigins(): string[] {
    return this.origin;
  }
  getHeaders(): string[] {
    return this.headers;
  }
}

export default Cors;
