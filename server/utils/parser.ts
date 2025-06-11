export const jsonParser = (jsonVal: string) => {
  return jsonVal ? JSON.parse(jsonVal) : null;
};
