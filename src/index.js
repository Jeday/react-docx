/* eslint-disable react/style-prop-object */
import React from "react";
import * as Docx from "docx";
import DocxRenderer from "./reconciler";
import { saveAs } from "file-saver";
import { renderAsync } from "docx-preview";

const IsSave = false;

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
    Docx.Packer.toBlob(renderContainer.document).then((Blob) => {
      if (IsSave) saveAs(Blob, "reactDocx.docx");
      renderAsync(Blob, document.getElementById("root"));
    });
  }
);
