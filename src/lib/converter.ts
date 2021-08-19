import matchAll = require("string.prototype.matchall");
import attributes from "./dataset";

/**
 * Converts html string to jsx string
 * @param {string[]} block
 * @param {"HTML"|"JSX"} to
 * @returns {string[]} newBlock
 */
const converter = (block: string[], to: "HTML" | "JSX") => {
  const newBlock: string[] = [];
  for (const line of block) {
    const regex =
      /([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\2?\s+(?:\S+)=|\2))+.)\2?)?/g;
    const matches = [...matchAll(line, regex)];
    let newLine: string = "";

    for (const match of matches) {
      const attribute = attributes.find(({ plain, jsx }) => {
        if (to === "JSX") {
          return plain === match[1];
        } else {
          return jsx === match[1];
        }
      });
      if (attribute) {
        if (to === "JSX") {
          newLine = line.replace(attribute?.plain, attribute?.jsx);
        } else {
          newLine = line.replace(attribute?.jsx, attribute?.plain);
        }
      }
    }
    //Checks if the new line is empty, if empty then pushes the original line
    newBlock.push(newLine !== "" ? newLine : line);
  }
  return newBlock;
};

export default converter;
