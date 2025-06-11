export const SUB_DOMAIN_NAMES = {
  WWW: "www",
  ACCOUNT: "account",
  DOMAIN: "domain",
  ADMANAGE: "admanage",
  DNS: "dns",
  HOSTING: "hosting",
  APPOCEAN: "appocean",
  DOCS: "docs",
  PROBACKUP: "probackup",
  EDUSOFT: "edusoft",
  ADMIN: "admin",
  SUPPORT: "support",
  ICON: "icon",
  DRIVE: "drive",
  API: "io",
  API2: "api2",
  API3: "api3",
} as const;

const subDomainMap: Record<string, string> = {
  www: `http://localhost:7201`,
  account: `http://localhost:5000`,
  domain: `http://localhost:7203`,
  dns: `http://localhost:7204`,
  hosting: `http://localhost:7205`,
  appocean: `http://localhost:7206`,
  docs: `http://localhost:7207`,
  admanage: `http://localhost:7208`,
  probackup: `http://localhost:7209`,
  edusoft: `http://localhost:7210`,
  icon: `http://localhost:7211`,
  drive: `http://localhost:7212`,
  admin: `http://localhost:7215`,
  support: `http://localhost:7216`,
  api: `https://io.bikiran.win`,
  api2:
    process.env.NEXT_PUBLIC_LOCAL_API === "true"
      ? `http://localhost:5010`
      : `https://api2.bikiran.win`,
  api3:
    process.env.NEXT_PUBLIC_LOCAL_API === "true"
      ? `http://localhost:7301`
      : `https://api3.bikiran.win`,
};

export const isDev = process.env.NEXT_PUBLIC_MODE === "dev";
export function getMode(): "dev" | "win" | "com" {
  if (isDev) {
    return "dev";
  }

  const isWin = process.env.NEXT_PUBLIC_MODE === "win";
  if (isWin) {
    return "win";
  }

  return "com";
}

const getDomain = (): string => {
  return process.env.NEXT_PUBLIC_DOMAIN || "";
};

interface DomainObject {
  sub: string;
  name: string;
  tld: string;
}

const getDomainObject = (): DomainObject => {
  const domainParts = getDomain().split(".");
  return {
    sub: domainParts[0],
    name: domainParts[1],
    tld: domainParts[2],
  };
};

export const getBaseDomain = (): string => {
  const mode = getMode();
  if (mode === "dev") {
    return "localhost";
  }

  const d = getDomainObject();
  return `${d.name}.${mode}`;
};

// https://www.bikiran.com/
export function getBikiranUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.www;
  }

  return `https://${SUB_DOMAIN_NAMES.WWW}.${d.name}.${mode}`;
}

// https://www.hosting.bikiran.com/
export function getHostingUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.hosting;
  }

  return `https://${SUB_DOMAIN_NAMES.HOSTING}.${d.name}.${mode}`;
}

// https://www.domain.bikiran.com/
export function getDomainUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.domain;
  }

  return `https://${SUB_DOMAIN_NAMES.DOMAIN}.${d.name}.${mode}`;
}

// https://www.appocean.bikiran.com/
export function getAppoceanUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.appocean;
  }

  return `https://${SUB_DOMAIN_NAMES.APPOCEAN}.${d.name}.${mode}`;
}

// https://www.admanage.bikiran.com/
export function getAdManageUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.admanage;
  }

  return `https://${SUB_DOMAIN_NAMES.ADMANAGE}.${d.name}.${mode}`;
}

// https://www.support.bikiran.com/
export function getAdminUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.admin;
  }

  return `https://${SUB_DOMAIN_NAMES.ADMIN}.${d.name}.${mode}`;
}

// https://www.support.bikiran.com/
export function getSupportUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.support;
  }

  return `https://${SUB_DOMAIN_NAMES.SUPPORT}.${d.name}.${mode}`;
}

export function getSiteUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap[d.sub];
  }

  return `https://${d.sub}.${d.name}.${mode}`;
}

export function getApiUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.api;
  }

  return `https://${SUB_DOMAIN_NAMES.API}.${d.name}.${mode}`;
}

export function getApi2Url(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.api2;
  }

  return `https://${SUB_DOMAIN_NAMES.API2}.${d.name}.${mode}`;
}

export function getApi3Url(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.api3;
  }

  return `https://${SUB_DOMAIN_NAMES.API3}.${d.name}.${mode}`;
}

export function getAccountUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.account;
  }

  return `https://${SUB_DOMAIN_NAMES.ACCOUNT}.${d.name}.${mode}`;
}

export function getDocsUrl(): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap.docs;
  }

  return `https://${SUB_DOMAIN_NAMES.DOCS}.${d.name}.${mode}`;
}

export function generateAnyUrl(subDomain: string): string {
  const d = getDomainObject();
  const mode = getMode();
  if (mode === "dev") {
    return subDomainMap[d.sub];
  }

  return `https://${subDomain}.${d.name}.${mode}`;
}

export function getDBConnectionString(): string {
  const mode = getMode();
  if (mode === "dev") {
    return process.env.DATABASE_URL_DEV || "";
  }

  if (mode === "win") {
    return process.env.DATABASE_URL_WIN || "";
  }

  return process.env.DATABASE_URL_COM || "";
}
