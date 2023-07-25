export function convertToCSV(objArray: { [key: string]: any }) {
  const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = `${Object.keys(array[0]).join()}\r\n`;

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }
  console.log(str);
  return str;
}
