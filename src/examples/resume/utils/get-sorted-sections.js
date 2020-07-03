const { camelize } = require("humps");
const isPresent = require("./is-present");

module.exports = function getSortedSections(resume, options = {}) {
  const settings = Object.assign(
    {
      only: [],
      exclude: [],
      removeEmpty: true,
    },
    options
  );

  const sections = [];

  let order = resume.sectionsOrder.map(camelize).filter((name) => {
    if (settings.only.length) return settings.only.includes(name);
    if (settings.exclude.length) return !settings.exclude.includes(name);
    return true;
  });

  order.forEach((name) => {
    if (resume[name]) {
      const valueKey = Array.isArray(resume[name]) ? "items" : "value";
      sections.push({ sectionType: name, [valueKey]: resume[name] });
    } else {
      resume.customSections.forEach((section) => {
        if (name === `custom:${section.externalId}`) {
          sections.push({ sectionType: "custom", ...section });
        }
      });
    }
  });

  if (settings.removeEmpty) {
    return sections.filter(
      (section) => isPresent(section.value) || isPresent(section.items)
    );
  }

  return sections;
};
