import React from "react";
import DocxRender from "lib/index";
import { MainLayoutTable } from "./mainLayoutTable";
import { ResumeProvder } from "./hooks.js";

const { declareStyles, STYLES, COLORS } = require("./styles");
const { cmToTwip } = require("./metrics");
const filterResumeData = require("./utils/filter-resume-data");

export const renderResume = async (resumeData, config) => {
  const resume = filterResumeData({
    ...resumeData,
    color: COLORS.accent,
  });
  return DocxRender.renderAsyncDocument(
    { styles: declareStyles(resume.color) },
    <ResumeProvder resume={resume} config={config}>
      <section
        margings={{
          top: cmToTwip(1.4),
          bottom: cmToTwip(1.4),
          left: cmToTwip(1.4),
          right: cmToTwip(1.4),
        }}
      >
        <MainLayoutTable />
      </section>
    </ResumeProvder>
  );
};
