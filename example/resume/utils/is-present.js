const _ = require("lodash");

/*
 * Checks that the value is truthy.
 * Also covers cases like "  " and empty objects.
 */
module.exports = function isPresent(value) {
  // not empty string
  if (typeof value === "string") return _.trim(value).length > 0;

  // any number
  if (typeof value === "number") return true;

  // any boolean
  if (typeof value === "boolean") return true;

  // not empty array or object
  if (!_.isEmpty(value)) return true;

  return false;
};
