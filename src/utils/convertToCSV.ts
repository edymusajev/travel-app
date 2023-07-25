export function convertToCSV(
  objArray: { [key: string]: any },
  currencies: { userCurrencySymbol: string; localCurrencySymbol: string }
) {
  const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let headers = Object.keys(array[0]);

  // Update headers based on currency information
  headers = headers.map((header) => {
    if (header === "cost") {
      return `cost (in ${currencies.userCurrencySymbol})`;
    } else if (header === "localCost") {
      return `local cost (in ${currencies.localCurrencySymbol})`;
    }
    return header;
  });

  let str = `${headers.join()}\r\n`;

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }
  return str;
}
