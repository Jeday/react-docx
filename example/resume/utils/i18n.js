const get = require("lodash/get");
const camelCase = require("lodash/camelCase");
const DateFormatter = require("./date-formatter");

class I18n {
  constructor(options = {}) {
    this.locale = options.locale || "en";
    this.translations = options.translations || {};

    this.t = this.translate;
  }

  translate(name) {
    const camelCasedName = name
      .split(".")
      .map(camelCase)
      .join(".");

    const translation =
      get(this.translations, name) || get(this.translations, camelCasedName);

    return translation || `[missing "${name}" translation]`;
  }

  formatDate(...args) {
    return this.getDateFormatter().format(...args);
  }

  formatDateRange(...args) {
    return this.getDateFormatter().formatRange(...args);
  }

  getDateFormatter() {
    if (!this.dateFormatter) {
      this.dateFormatter = new DateFormatter({ i18n: this });
    }

    return this.dateFormatter;
  }
}

module.exports = I18n;
