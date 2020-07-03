import React from "react";
import { WidthType } from "docx";
import { cmToTwip } from "./metrics";

import { Header } from "./header";
import { PlainTable } from "./plainTable";
import { RenderSection } from "./renderSections";
import { Details } from "./details";
import { useResume } from "./hooks";

const { columnWidths } = require("./widths");
const getSortedSections = require("./utils/get-sorted-sections");

const SIDEBAR_SECTION_NAMES = [
  "socialProfiles",
  "skills",
  "languages",
  "hobbies",
];

export const MainLayoutTable = () => {
  const mainCellRef = React.useRef(null);
  const sidebarCellRef = React.useRef(null);
  React.useLayoutEffect(() => {
    mainCellRef.current.properties.setWidth(columnWidths.main, WidthType.DXA);
    sidebarCellRef.current.properties.setWidth(
      columnWidths.sidebar,
      WidthType.DXA
    );
  });

  const { resume } = useResume();
  // this should be refactored to return array splitted in two
  const sections = getSortedSections(resume, {
    exclude: SIDEBAR_SECTION_NAMES,
  });
  const sidebarSections = getSortedSections(resume, {
    only: SIDEBAR_SECTION_NAMES,
  });

  return (
    <PlainTable
      width={{
        size: columnWidths.table,
        type: WidthType.DXA,
      }}
      columnWidths={[columnWidths.main, columnWidths.sidebar]}
    >
      <tablerow>
        <tablecell
          columnSpan={2}
          margins={{
            marginUnitType: WidthType.DXA,
            bottom: cmToTwip(0.4),
          }}
        >
          <Header />
        </tablecell>

        <tablecell
          ref={mainCellRef}
          margins={{
            marginUnitType: WidthType.DXA,
            bottom: cmToTwip(2),
          }}
          width={{
            size: columnWidths.main,
            type: WidthType.DXA,
          }}
        >
          {sections.map((section) => (
            <RenderSection key={section.sectionType} section={section} />
          ))}
        </tablecell>
        <tablecell
          width={{
            size: columnWidths.sidebar,
            type: WidthType.DXA,
          }}
          ref={sidebarCellRef}
        >
          {sidebarSections.map((section) => (
            <RenderSection key={section.sectionType} section={section} />
          ))}
          <Details />
        </tablecell>
      </tablerow>
    </PlainTable>
  );
};
