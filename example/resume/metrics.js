/*
 * Contains a bunch of helpful utilities for unit conversion
 * MS Word uses its own unit system internally based on Twips
 *
 * http://bit.ly/points-inches-and-emus
 */

// the fundamental unit in DOCX is the TWIP, a "twentieth of a point",
// where a point ("pt") is 1/72 of an inch.
const ptToTwip = pt => pt * 20;
const inToTwip = inch => ptToTwip(inch * 72);
const cmToTwip = cm => inToTwip(cm / 2.54);

// font size is measured in half-points
const fontPtSize = pt => pt * 2;

// line height is measured in 240ths of a line
const lineHeight = (lh = 1.0) => lh * 240;

module.exports = {
  ptToTwip,
  inToTwip,
  cmToTwip,
  fontPtSize,
  lineHeight
};
