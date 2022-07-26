import Minify from "../const/Minify";
import "@testing-library/jest-dom";

/*
  Tests for the minify.js function, takes verbose input and returns a reduced version, aimed to accept as many words as possible with the same output.
*/

it('removal of spaces', () => {
  expect(Minify("united states of america")).toEqual("unitedstatesofamerica");
});

it('removal of capitalization if EXPLICITLY specified', () => {
  expect(Minify("US", true)).toEqual("us");
});

it('removal of capitalization if IMPLICITLY specified', () => {
  expect(Minify("US")).toEqual("us");
});

it('retention of capitalization if explicitly specified', () => {
  expect(Minify("US", false)).toEqual("US");
});

it('removal of hyphens from input', () => {
  expect(Minify("has-hyphen")).toEqual("hashyphen");
});

it('removal of commas from input', () => {
  expect(Minify("has,comma")).toEqual("hascomma");
});

it('removal of accent marks from input', () => {
  const accents = "ÁáÉéÍíÓóÚúÝýÀàÈèÌìÒòÙùÄäËëÏïÖöÜüŸÿÂâÊêÎîÔôÛûÃãÑñÕõÇçÅåŠšŽž";
  expect(Minify(accents)).toEqual("aaeeiioouuyyaaeeiioouuaaeeiioouuyyaaeeiioouuaannooccaasszz");
});
