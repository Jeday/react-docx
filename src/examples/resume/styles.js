const { fontPtSize, lineHeight, ptToTwip } = require("./metrics");

const STYLES = {
  normal: "Normal",
  h1: "Heading1",
  h2: "Heading2",
  h3: "Heading3",
  h4: "Heading4",
  date: "Date",
  name: "Name",
  jobTitle: "JobTitle",
  skillTitle: "SkillTitle",
  skillBar: "SkilBar",
};

const COLORS = {
  text: "3C3E43",
  title: "0B101C",
  date: "98A1B3",
  muted: "6E6E6F",
  accent: "2886E7",
  skillBarBg: "E6EBF4",
};

/*
 * This method adds template styles to the document
 */

const declareStyles = (resumeColor) => {
  const paragraphStyles = [
    // default document style
    // all other styles are inherited from it
    {
      id: STYLES.normal,
      name: "Normal",
      quickFormat: true,
      run: {
        font: "Arial",
        size: fontPtSize(9),
        color: COLORS.text,
      },
      paragraph: {
        spacing: {
          before: ptToTwip(4),
          after: ptToTwip(4),
          line: lineHeight(1.3),
        },
      },
    },
    // Heading 1. Used in section names, such as "Profile", "Employment History" etc.
    {
      id: STYLES.h1,
      name: "Heading 1",
      basedOn: STYLES.normal,
      next: STYLES.normal,
      quickFormat: true,
      run: {
        color: COLORS.title,
        size: fontPtSize(12),
        bold: true,
      },
      paragraph: {
        spacing: {
          line: lineHeight(1),
          before: ptToTwip(2),
          after: ptToTwip(0),
        },
      },
    },
    // Heading 2. Used in item headers
    {
      id: STYLES.h2,
      name: "Heading 2",
      basedOn: STYLES.normal,
      next: STYLES.normal,
      quickFormat: true,
      run: {
        color: COLORS.title,
        size: fontPtSize(10),
        bold: true,
      },
      paragraph: {
        spacing: {
          before: ptToTwip(5),
          after: ptToTwip(0),
        },
      },
    },
    // Heading 3. Used for sidebar sections
    {
      id: STYLES.h3,
      name: "Heading 3",
      basedOn: STYLES.normal,
      next: STYLES.normal,
      quickFormat: true,
      run: {
        color: COLORS.title,
        bold: true,
      },
      paragraph: {
        spacing: {
          before: ptToTwip(11),
          after: ptToTwip(0),
          line: lineHeight(1),
        },
      },
    },
    // Heading 4. Used for sidebar cards
    {
      id: STYLES.h4,
      name: "Heading 4",
      basedOn: STYLES.normal,
      next: STYLES.normal,
      quickFormat: true,
      run: {
        color: COLORS.date,
      },
      paragraph: {
        spacing: {
          before: ptToTwip(6),
          line: lineHeight(1),
          after: ptToTwip(0),
        },
      },
    },
    // Custom styles
    {
      id: STYLES.date,
      name: "Date",
      basedOn: STYLES.normal,
      next: STYLES.date,
      quickFormat: true,
      run: {
        size: fontPtSize(8),
        color: COLORS.date,
      },
      paragraph: {
        spacing: {
          line: lineHeight(1),
          before: ptToTwip(0),
          after: ptToTwip(7),
        },
      },
    },
    {
      id: STYLES.name,
      name: "Name",
      basedOn: STYLES.normal,
      next: STYLES.normal,
      quickFormat: true,
      run: {
        bold: true,
        size: fontPtSize(20.7),
        color: COLORS.title,
      },
      paragraph: {
        spacing: {
          line: lineHeight(1),
          before: ptToTwip(0),
          after: ptToTwip(2),
        },
      },
    },
    {
      id: STYLES.jobTitle,
      name: "Job Title",
      basedOn: STYLES.normal,
      next: STYLES.normal,
      quickFormat: true,
      run: {
        size: fontPtSize(9),
        color: COLORS.title,
      },
      paragraph: {
        spacing: {
          line: lineHeight(1),
          before: 0,
          after: 0,
        },
      },
    },
    {
      id: STYLES.skillTitle,
      name: "Job Title",
      basedOn: STYLES.normal,
      next: STYLES.normal,
      quickFormat: true,
      run: {
        size: fontPtSize(9),
        color: COLORS.text,
      },
      paragraph: {
        spacing: {
          before: ptToTwip(7),
          after: ptToTwip(2),
          line: lineHeight(1.2),
        },
      },
    },
    {
      id: STYLES.skillBar,
      name: "Skill Bar",
      basedOn: STYLES.normal,
      next: STYLES.normal,
      quickFormat: true,
      run: {
        color: resumeColor,
      },
      paragraph: {
        spacing: {
          line: lineHeight(0.15),
          before: 0,
          after: 0,
        },
      },
    },
  ];

  const characterStyles = [
    {
      id: "Hyperlink",
      name: "Hyperlink",
      run: {
        color: resumeColor,
        underline: false,
      },
    },
  ];

  return { paragraphStyles, characterStyles };
};

module.exports = { declareStyles, STYLES, COLORS };
