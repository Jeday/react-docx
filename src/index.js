/* eslint-disable react/style-prop-object */
import React from "react";
import * as Docx from "docx";
import DocxRenderer from "./reconciler";
//import { saveAs } from "file-saver";
import { renderAsync } from "docx-preview";

const renderContainer = {};
DocxRenderer.render(
  <document>
    <section>
      <p>
        <t>Hello</t>
      </p>
    </section>
  </document>,
  renderContainer,
  () => {
    Docx.Packer.toBlob(renderContainer.document).then((Blob) =>
      renderAsync(Blob, document.getElementById("root"))
    );
    // Docx.Packer.toBlob(doc.document).then((blob) => {
    //   saveAs(blob, "example.docx");
    // });
  }
);
