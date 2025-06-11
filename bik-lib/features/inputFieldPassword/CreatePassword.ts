export const createPassword = (length: number = 12): string => {
  if (length < 8) {
    throw new Error("Password length must be at least 8 characters.");
  }

  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const allChars = lowercase + uppercase + numbers; 

  let password = "";

  // Ensure at least one of each required type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  for (let i = password.length; i < length - 1; i++) { // Leave one slot for "_"
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  const passwordArray = password.split("");

  const randomIndex = Math.floor(Math.random() * (passwordArray.length - 1)) + 1; 
  passwordArray.splice(randomIndex, 0, "_")

  password = passwordArray.join("");

  return password;
};
