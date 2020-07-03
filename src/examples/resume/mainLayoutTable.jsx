import React from "react";
import { WidthType } from "docx";
import { cmToTwip } from "./metrics";

import { Header } from "./header";
import { Main } from "./main";
import { Sidebar } from "./sidebar";
import { PlainTable } from "./plainTable";
const { columnWidths } = require("./widths");

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
          <Main />
        </tablecell>
        <tablecell
          width={{
            size: columnWidths.sidebar,
            type: WidthType.DXA,
          }}
          ref={sidebarCellRef}
        >
          <Sidebar />
        </tablecell>
      </tablerow>
    </PlainTable>
  );
};
