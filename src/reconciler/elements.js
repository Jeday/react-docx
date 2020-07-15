import * as Docx from "docx";
import { is } from "../utils/is.js";

/// populate DocxTypes with Docx Primitives
export const DocxTypes = {};
Object.keys(Docx).forEach((key) =>
  is.fun(Docx[key]) ? (DocxTypes[key.toLowerCase()] = Docx[key]) : null
);

DocxTypes["document"] = class Document {
  constructor(props) {
    this.type = "document";
    this.props = props;
    this.children = [];
  }
  addChildElement(child) {
    this.children.push(child);
  }
};

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

DocxTypes["href"] = ({ src, anchor, __document, label }) => {
  const hyperlink = new Docx.Hyperlink(
    label || src,
    "link" + (__document.docRelationships.RelationshipCount + 1),
    anchor
  );
  __document.docRelationships.createRelationship(
    hyperlink.linkId,
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
    src,
    "External"
  );

  return hyperlink;
};

// shortcuts
DocxTypes["t"] = DocxTypes["textrun"];
DocxTypes["p"] = DocxTypes["paragraph"];
DocxTypes["img"] = DocxTypes["image"];
