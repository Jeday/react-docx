module.exports = function multiJoin(parts = [], separators = []) {
  let result = "";

  parts.forEach((part, index) => {
    const separator =
      result.length && separators[index - 1] ? separators[index - 1] : "";
    if (part !== null) result += separator + part;
  });

  return result;
};
