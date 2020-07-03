/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/style-prop-object */

import * as Docx from "docx";
import { saveAs } from "file-saver";
import { renderAsync } from "docx-preview";

import { renderResume } from "examples/resume";
import { resumeData } from "examples/resume/resumeData";

const IsSave = false;

renderResume(resumeData.document, resumeData.config).then((document) => {
  console.log(document);
  Docx.Packer.toBlob(document).then((Blob) => {
    if (IsSave) saveAs(Blob, "reactDocx.docx");

    renderAsync(Blob, window.document.getElementById("root"));
  });
});
