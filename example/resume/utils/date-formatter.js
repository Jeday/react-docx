const { getYear, format, parse } = require("date-fns");

const locale = require("date-fns/locale");
const { en, ru, nl, es, sv, da, nb, de, fr, pt, it, pl, cs, fi } = locale;

const supportedLocales = {
  en,
  ru,
  "nl-NL": nl,
  "es-ES": es,
  "sv-SE": sv,
  da,
  nb,
  "de-DE": de,
  "fr-FR": fr,
  "pt-BR": pt,
  it,
  pl,
  cs,
  fi,
};

const startCase = (string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
    .join(" ");
};

class DateFormatter {
  constructor({ i18n }) {
    this.i18n = i18n;
    this.locale = supportedLocales[i18n.locale] || supportedLocales.en;
  }

  format(dateString, options) {
    const { isDatePresent = false, isMonthHidden = false } = options;
    const date = parse(dateString);

    if (isDatePresent) {
      return this.i18n.t("date_present");
    } else if (!dateString) {
      return "";
    } else if (isMonthHidden) {
      return getYear(date);
    } else {
      const formattedDate = format(date, options.format, {
        locale: this.locale,
      });
      return startCase(formattedDate);
    }
  }

  formatRange(card, options = {}) {
    const settings = {
      format: options.format || (options.short ? "MMM YYYY" : "MMMM YYYY"),
      ...options,
    };

    const from = this.format(card.dateFrom, {
      isMonthHidden: card.isMonthFromHidden,
      ...settings,
    });
    const until = this.format(card.dateUntil, {
      isMonthHidden: card.isMonthUntilHidden,
      isDatePresent: card.isDateUntilPresent,
      ...settings,
    });

    if (from && until) return `${from} — ${until}`;
    return from || until;
  }
}

module.exports = DateFormatter;
