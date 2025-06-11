export class NumberOperation {
  static getNumberWithComma = (number: number = 0): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
}
