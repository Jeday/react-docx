const formatAddress = (resource, options = {}) => {
  const settings = {
    separator: ", ",
    withAddress: true,
    withCode: true,
    ...options
  };
  const parts = [
    settings.withAddress ? resource.address : null,
    resource.city,
    settings.withCode ? resource.postalCode : null,
    resource.countryName
  ];

  return parts.filter(part => part).join(settings.separator);
};

module.exports = formatAddress;
