const isDevMode = process.env.NEXT_PUBLIC_MODE === "dev";
const isProdMode = process.env.NEXT_PUBLIC_MODE === "prod";
const isWinMode = process.env.NEXT_PUBLIC_MODE === "win";

export class EnvManage {
  static isBrowser = typeof window !== "undefined";

  isDev(): boolean {
    return isDevMode;
  }
  isProd(): boolean {
    return isProdMode;
  }
  isWin(): boolean {
    return isWinMode;
  }

  getMode(): "dev" | "win" | "com" {
    // if development
    if (this.isDev()) return "dev";
    // if production but for testing purposes
    if (this.isWin()) return "win";
    // if production and for commercial purposes
    return "com";
  }

  getDomainUrl(): string {
    if (this.isDev()) return "http://localhost:5002";
    if (this.isWin()) return "https://beta.src.com";
    if (this.isProd()) return "https://www.src.com";

    return "";
  }
  getBaseDomain(): string {
    if (this.isDev()) return "localhost";
    if (this.isWin()) return "src.com";
    if (this.isProd()) return "src.com";

    return "";
  }

  getApiUrl(): string {
    if (this.isDev()) return "https://admin.src.com/api";
    if (this.isWin()) return "https://admin.src.com/api";
    if (this.isProd()) return "https://admin.src.com/api";

    return "";
  }
}
