import React from "react";
import { WidthType } from "docx";
import { cmToTwip } from "./metrics";

import { Header } from "./header";

const { columnWidths } = require("./widths");

export const MainLayoutTable = () => {
  return (
    <table
      width={{
        size: columnWidths.table,
        type: WidthType.DXA,
      }}
      columnWidths={[columnWidths.main, columnWidths.sidebar]}
      rows={[]}
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
      </tablerow>
    </table>
  );
};
