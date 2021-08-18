import matchAll = require("string.prototype.matchall");
import attributes from "./dataset";
const converter = (block: string[], to: "HTML" | "JSX") => {
  const newBlock: string[] = [];
  for (const line of block) {
    const regex =
      /([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\2?\s+(?:\S+)=|\2))+.)\2?)?/g;
    const matches = [...matchAll(line, regex)];
    let newLine: string = "";

    for (const match of matches) {
      console.log(match);

      const attribute = attributes.find(({ plain, jsx }) => {
        if (to === "JSX") {
          return plain === match[1];
        } else {
          return jsx === match[1];
        }
      });
      if (attribute) {
        console.log(attribute);

        if (to === "JSX") {
          newLine = line.replace(attribute?.plain, attribute?.jsx);
        } else {
          newLine = line.replace(attribute?.jsx, attribute?.plain);
        }
        console.log(newLine);
      }
    }
    //Checks if the new line is empty, if empty then pushes the original line
    newBlock.push(newLine !== "" ? newLine : line);
  }
  return newBlock;
};

export default converter;
