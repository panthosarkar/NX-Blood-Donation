import Cors from "./Cors";
import corses from "@/config/Cors.config";

export type TMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

function matchMethod(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS",
  cors: Cors
): boolean {
  const methods = cors.getMethod();

  if (methods.includes("*")) {
    return true;
  }

  if (methods.includes(method)) {
    return true;
  }

  return false;
}

function fetchOrigin(origin: string, cors: Cors): string {
  const origins = cors.getOrigins();

  // Find * origin
  if (origins.includes("*")) {
    return origin;
  }

  // Find specific origin
  if (origins.includes(origin)) {
    return origin;
  }

  return "";
}

function fetchHeaders(cors: Cors): string {
  const corsHeaders = cors.getHeaders();

  if (corsHeaders.includes("*")) {
    return "*";
  }

  return corsHeaders.join(", ");
}

class CorsHandle {
  private corses: Cors[];

  constructor(
    private origin: string,
    private method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS"
  ) {
    this.corses = corses;
  }

  getHeaders(path: string) {
    // Find * path
    const cors = this.corses.find((cors) => cors.getPath() === "*");
    const isMethod = cors ? matchMethod(this.method, cors) : false;
    const origin = cors ? fetchOrigin(this.origin, cors) : "";
    if (cors && isMethod && origin) {
      return {
        "Access-Control-Allow-Origin": fetchOrigin(this.origin, cors),
        "Access-Control-Allow-Headers": fetchHeaders(cors),
      };
    }

    // Find specific path
    const corsPath = this.corses.find((cors) => cors.getPath() === path);
    const isMethodPath = corsPath ? matchMethod(this.method, corsPath) : false;
    const originPath = corsPath ? fetchOrigin(this.origin, corsPath) : "";
    if (corsPath && isMethodPath && originPath) {
      return {
        "Access-Control-Allow-Origin": fetchOrigin(this.origin, corsPath),
        "Access-Control-Allow-Headers": fetchHeaders(corsPath),
      };
    }

    return undefined;
  }
}

export default CorsHandle;
