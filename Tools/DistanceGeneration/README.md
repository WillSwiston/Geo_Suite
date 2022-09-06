# Generate distance JSON

## Preprocessor
Reduces input JSON into a useful format for `CalculateDistance.py`.

Params:
  - input: input file that contains the JSON, min distance (in km) to consider two countries bordering
  - outuput: output file which will be written to, which is then the input for the distance calculator
## CalculateDistance
Generate the JSON of diistances between each pair of countries.

Params:
  - input: input file containing the preprocessed JSON, threshold integer for what is considered a border in km (10 recommended)

Outputs a file called `distances.json`, which can then by directly imported into GeoSuite.

## Considerations
Before running distance generation, consider simplifying the GeoJSON geometry. Without simplification, it will take... forever.

The amount of precision lost is quite small even at high compression levels.
