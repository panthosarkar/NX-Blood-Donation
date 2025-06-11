export class JsonOperation {
  private jsonString: string = "";
  private jsonObject: any = {};
  private parseDada: any = {};

  constructor(jsonString: string) {
    this.jsonString = jsonString;
  }
  getJsonString(): string {
    return this.jsonString;
  }
  getJsonObject(): any {
    if (this.jsonString) {
      try {
        this.jsonObject = JSON.parse(this.jsonString);
      } catch (ex) {
        this.jsonObject = this.jsonString;
      }
    }
    return this.jsonObject;
  }
  getParseData(): any {
    return this.parseDada;
  }
  setJsonString(jsonString: string): void {
    this.jsonString = jsonString;
  }
  setJsonObject(jsonObject: any): void {
    this.jsonObject = jsonObject;
  }
  setParseData(parseDada: any): void {
    this.parseDada = parseDada;
  }
  excludeKeys(...keys: string[]): any {
    const data = this.getJsonObject();
    const selectedKey = keys;

    // Loop through the keys and remove them from the object
    for (const key of selectedKey) {
      if (key in data) {
        delete data[key];
      }
    }

    return data;
  }

  includeKeys(...keys: string[]): any {
    const data = this.getJsonObject();
    const selectedKey = keys;

    const includedData: any = {};
    // Loop through the keys and include them in the new object
    for (const key of selectedKey) {
      if (key in data) {
        includedData[key] = data[key];
      }
    }
    // Return the new object with only the included keys
    return includedData;
  }
}
