/*
  text: String - Pass in text to return version without accent marks, hyphens, and spaces.
  toLowerCase: Boolean - Pass in toLowerCase boolean value if you want to remove capitalization.
*/

export default function Minify(text, toLowerCase = true, removeSpace = true) {
  let minifiedText = text.normalize("NFD").replace(/[\u0300-\u036f-,+]/g, "");

  if (removeSpace) {
    minifiedText = minifiedText.replace(/[\s]/g, "");
  }

  return toLowerCase ? minifiedText.toLowerCase() : minifiedText;
}
