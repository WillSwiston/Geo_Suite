// NEW COLOR SCHEME: https://gka.github.io/palettes/#/5|s|fffa90,9352a5|ffffe0,ff005e,93003a|1|1

function ComputeColor(distance) {
  if (distance > 10000) {
    return "#9453a1";
  }
  if (distance > 5000) {
    return "#c55d98";
  }
  if (distance > 2500) {
    return "#e8708b";
  }
  if (distance > 1000) {
    return "#fd8b7f";
  }
  if (distance > 500) {
    return "#ffad79";
  }
  if (distance > 200) {
    return "#fcf394";
  }

  if (distance === 0) {
    return "red";
  }

  return "#ffd07e";
}

export default ComputeColor;
