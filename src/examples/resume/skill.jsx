import React from "react";
import { WidthType, ShadingType } from "docx";

import { PlainTable } from "./plainTable";

const { COLORS, STYLES } = require("./styles");
const { columnWidths, MAX_SKILL_LEVEL } = require("./widths");

const SkillCell = React.forwardRef(({ width, fill }, ref) => {
  return (
    <tablecell
      ref={ref}
      width={{
        size: width,
        type: WidthType.DXA,
      }}
      shading={{
        fill: fill,
        val: ShadingType.CLEAR,
        color: "auto",
      }}
    >
      <p style={STYLES.skillBar}> </p>
    </tablecell>
  );
});

export const Skill = ({ skill, rating = 1, color = COLORS.accent }) => {
  const skillTitleCellRef = React.useRef(null);
  const skillBarLevelCellRef = React.useRef(null);
  const skillBarFillCellRef = React.useRef(null);

  const isMaxRating = rating === MAX_SKILL_LEVEL;
  const skillBarLevelWidth = (columnWidths.sidebar * (15 + 17 * rating)) / 100;

  const tableColumnsWidths = [skillBarLevelWidth];

  let skillBarFillWidth = 0;
  if (!isMaxRating) {
    skillBarFillWidth = columnWidths.sidebar - skillBarLevelWidth;
    tableColumnsWidths.push(skillBarFillWidth);
  }
  React.useLayoutEffect(() => {
    if (skillTitleCellRef.current)
      skillTitleCellRef.current.properties.setWidth(
        columnWidths.sidebar,
        WidthType.DXA
      );
    if (skillBarLevelCellRef.current)
      skillBarLevelCellRef.current.properties.setWidth(
        skillBarLevelWidth,
        WidthType.DXA
      );
    if (skillBarFillCellRef.current)
      skillBarFillCellRef.current.properties.setWidth(
        skillBarFillWidth,
        WidthType.DXA
      );
  }, [skillBarFillWidth, skillBarLevelWidth]);

  // Creates separate cell to simulate brighten skill level background fill
  if (!rating) return <p style={STYLES.skillTitle}>{skill}</p>;
  return (
    <PlainTable
      width={{
        size: columnWidths.sidebar,
        type: WidthType.DXA,
      }}
      columnWidths={tableColumnsWidths}
      margins={{
        marginUnitType: WidthType.DXA,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <tablerow>
        <tablecell
          width={{
            size: columnWidths.sidebar,
            type: WidthType.DXA,
          }}
          columnSpan={2}
          ref={skillTitleCellRef}
        >
          <p style={STYLES.skillTitle}>{skill}</p>
        </tablecell>
      </tablerow>
      <tablerow>
        <SkillCell
          ref={skillBarLevelCellRef}
          width={skillBarLevelWidth}
          fill={color}
        />
        {!isMaxRating && (
          <SkillCell
            ref={skillBarFillCellRef}
            width={skillBarFillWidth}
            fill={COLORS.skillBarBg}
          />
        )}
      </tablerow>
    </PlainTable>
  );
};
