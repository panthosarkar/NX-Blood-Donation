export const getTimestamp = (): number => {
  let timeStamp = new Date().getTime();
  timeStamp = Math.floor(timeStamp / 1000);
  return timeStamp;
};
