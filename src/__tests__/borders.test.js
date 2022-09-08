import borders from "./borders.json";
import distances from "../json/lists/distances.json";
import "@testing-library/jest-dom";

/*
 Tests whether distances has detected the proper borders between countries, reports any that it has not
*/

it('removal of spaces', () => {
  expect(Minify("united states of america")).toEqual("unitedstatesofamerica");
});
