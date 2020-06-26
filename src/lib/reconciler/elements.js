import * as Docx from "docx";
import { is } from "../utils/is.js";

/// populate DocxTypes with Docx Primitives
export const DocxTypes = {};
Object.keys(Docx).forEach((key) =>
  is.fun(Docx[key]) ? (DocxTypes[key.toLowerCase()] = Docx[key]) : null
);

DocxTypes["document"] = undefined;

// missing Docx Primitive placholder
DocxTypes["section"] = class Section {
  constructor(props) {
    this.type = "section";
    this.props = props;
    this.children = [];
  }
  addChildElement(child) {
    this.children.push(child);
  }
};

/// image wrapper
DocxTypes["image"] = ({ src, width, height, __document, ...props }) => {
  if (!src) {
    throw new Error("No image src provided");
  }
  return Docx.Media.addImage(__document, src, width, height, props);
};

// shortcuts
DocxTypes["t"] = DocxTypes["textrun"];
DocxTypes["p"] = DocxTypes["paragraph"];
DocxTypes["img"] = DocxTypes["image"];
