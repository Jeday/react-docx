import React from "react";
import DocxRender from "../../src/lib";
import { MainLayoutTable } from "./mainLayoutTable";
import { ResumeProvder } from "./hooks.js";

const { declareStyles, COLORS } = require("./styles");
const { cmToTwip } = require("./metrics");
const filterResumeData = require("./utils/filter-resume-data");
const I18n = require("./utils/i18n");

export const renderResume = async (resumeData, config) => {
  const resume = filterResumeData({
    ...resumeData,
    color: COLORS.accent,
  });
  const { locale, translations } = config;
  const i18n = new I18n({ locale, translations: translations.resume });
  return DocxRender.renderAsyncDocument(
    <ResumeProvder resume={resume} config={config} i18n={i18n}>
      <section
        margings={{
          top: cmToTwip(1.4),
          bottom: cmToTwip(1.4),
          left: cmToTwip(1.4),
          right: cmToTwip(1.4),
          headers: null,
          footers: null,
        }}
        headers={null}
        footers={null}
      >
        <MainLayoutTable />
      </section>
    </ResumeProvder>,
    {
      styles: declareStyles(resume.color),
    }
  );
};
