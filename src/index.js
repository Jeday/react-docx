/* eslint-disable react/style-prop-object */
import React from "react";
import * as Docx from "docx";
import DocxRenderer from "./reconciler.js";
import { saveAs } from "file-saver";
import { renderAsync } from "docx-preview";

const doc = {};
DocxRenderer.render(
  <document>
    <section>
      <paragraph>
        <textrun>Hello</textrun>
      </paragraph>
    </section>
  </document>,
  doc,
  () => {
    console.log("rendered");
    console.log(doc.document);
    Docx.Packer.toBlob(doc.document).then((Blob) =>
      renderAsync(Blob, document.getElementById("root"))
    );
    // Docx.Packer.toBlob(doc.document).then((blob) => {
    //   saveAs(blob, "example.docx");
    // });
  }
);
