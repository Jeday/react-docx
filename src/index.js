/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */
import React from "react";
import * as Docx from "docx";
import DocxRender from "lib/index";
import { saveAs } from "file-saver";
import { renderAsync } from "docx-preview";

import { SimpleSectionExample } from "examples/simpleSection";

const IsSave = false;

const renderContainer = {};
DocxRender.render(<SimpleSectionExample />, renderContainer, () => {
  console.log(renderContainer.document);
  Docx.Packer.toBlob(renderContainer.document).then((Blob) => {
    if (IsSave) saveAs(Blob, "reactDocx.docx");
    renderAsync(Blob, document.getElementById("root"));
  });
});
