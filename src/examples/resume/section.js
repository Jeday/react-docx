/* eslint-disable jsx-a11y/alt-text */
import React, { useLayoutEffect, useRef } from "react";
import { WidthType, VerticalAlign } from "docx";
import { cmToTwip } from "./metrics";
import { PlainTable } from "./plainTable";

const { STYLES } = require("./styles");
const { columnWidths } = require("./widths");

export const Section = ({ title, children, iconBuffer }) => {
  const iconcellRef = useRef(null);
  const titleRef = useRef(null);
  useLayoutEffect(() => {
    iconcellRef.current.properties.setWidth(
      columnWidths.sectionIcon,
      WidthType.DXA
    );
    titleRef.current.properties.setWidth(
      columnWidths.sectionTitle,
      WidthType.DXA
    );
  });
  return (
    <PlainTable
      width={{
        size: columnWidths.main,
        type: WidthType.DXA,
      }}
      columnWidths={[columnWidths.sectionIcon, columnWidths.sectionTitle]}
      margins={{
        marginUnitType: WidthType.DXA,
        top: cmToTwip(0.2),
      }}
    >
      <tablerow>
        <tablecell
          ref={iconcellRef}
          width={{
            size: columnWidths.sectionIcon,
            type: WidthType.DXA,
          }}
          verticalAlign={VerticalAlign.TOP}
        >
          <p style={STYLES.h1}>
            {iconBuffer && <image src={iconBuffer} width={20} height={20} />}
          </p>
        </tablecell>
        <tablecell
          ref={titleRef}
          width={{
            size: columnWidths.sectionTitle,
            type: WidthType.DXA,
          }}
          verticalAlign={VerticalAlign.CENTER}
        >
          <p style={STYLES.h1}>{title}</p>
          {children}
        </tablecell>
      </tablerow>
    </PlainTable>
  );
};

export const SidebarSection = ({ title, children }) => {
  return (
    <>
      <p style={STYLES.h3}>{title}</p>
      {children}
    </>
  );
};
