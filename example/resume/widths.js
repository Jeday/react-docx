const { cmToTwip } = require("./metrics");

const TABLE_WIDTH = 18;
const SIDEBAR_WIDTH = 5.3;
const MAIN_WIDTH = TABLE_WIDTH - SIDEBAR_WIDTH;
const AVATAR_WIDTH = 1;
const ICON_WIDTH = 0.7;

const MAX_SKILL_LEVEL = 5;

const columnWidths = {
  table: cmToTwip(TABLE_WIDTH),
  main: cmToTwip(MAIN_WIDTH),
  title: cmToTwip(TABLE_WIDTH - AVATAR_WIDTH),
  avatar: cmToTwip(AVATAR_WIDTH),
  sidebar: cmToTwip(SIDEBAR_WIDTH),
  layout: cmToTwip(TABLE_WIDTH),
  level: cmToTwip(SIDEBAR_WIDTH / MAX_SKILL_LEVEL),
  sectionIcon: cmToTwip(ICON_WIDTH),
  sectionTitle: cmToTwip(MAIN_WIDTH - ICON_WIDTH),
};

module.exports = {
  TABLE_WIDTH,
  MAIN_WIDTH,
  SIDEBAR_WIDTH,
  AVATAR_WIDTH,
  ICON_WIDTH,
  MAX_SKILL_LEVEL,
  columnWidths,
};
