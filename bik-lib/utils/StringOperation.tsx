export function mkToken(length: number = 32): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function mkStrongPassword(length: number): string {
  function mkString(charset: string, l: number): string {
    let str = "";
    for (let i = 0; i < l; i += 1) {
      str += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return str;
  }

  const charset1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charset2 = "0123456789";
  const charset3 = "!@#$%^&*";

  const pass1 = mkString(charset1, 1);
  const pass2 = mkString(
    charset1 + charset1.toLowerCase() + charset2 + charset3,
    length - 6
  );
  const pass3 = mkString(charset2, 1);
  const pass4 = mkString(charset3, 1);
  const pass5 = mkString(charset2, 1);
  const pass6 = mkString(charset1, 1);

  return pass1 + pass2 + pass3 + pass4 + pass5 + pass6;
}

export const ParseJson = (json: string): any => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

export const getFileType = (file: string): string => {
  // Validate input
  if (!file) return "";

  // Extract the file name from the URL
  const fileName = file.split("/").pop() || "";

  // Extract file extension from the file name
  const fileExtension = fileName.includes(".")
    ? fileName.split(".").pop()?.toLowerCase() || ""
    : "";

  return fileExtension;
};

const StringOperation: null = null;

export default StringOperation;
