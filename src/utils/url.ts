export const formatUrl = (url: string | null | undefined) => {
  if (url === null || url === undefined || url.trim() === "" || typeof url !== "string") {
    return "";
  }

  return String(url).toLowerCase()?.split(" ")?.join("-");
};
