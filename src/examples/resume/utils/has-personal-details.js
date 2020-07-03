const isPresent = require("./is-present");

module.exports = function hasPersonalDetails(resume, options = {}) {
  const fieldNames = [
    "address",
    "city",
    "postalCode",
    "countryName",
    "email",
    "phoneNumber",
    "birthDate",
    "birthPlace",
    "nationality",
    "drivingLicense"
  ];

  const settings = {
    only: [],
    exclude: [],
    ...options
  };

  const keys = fieldNames.filter(key => {
    if (settings.only.length) return settings.only.includes(key);
    if (settings.exclude.length) return !settings.exclude.includes(key);
    return true;
  });

  for (let index = 0; index < keys.length; index++) {
    let key = keys[index];
    if (isPresent(resume[key])) return true;
  }

  return false;
};
