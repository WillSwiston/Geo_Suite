"""
Take a GeoJSON of input coordinates, flatten them, return coordinate pairs for easy iteration
"""
import sys
import json


def flatten(nested_list):
    """ Return flattened array regardless of nesting """
    for item in nested_list:
        try:
            yield from flatten(item)
        except TypeError:
            yield item


def main():
    """ Entrypoint, return json file with nested coordinates in 1d array of x, y tuples """
    input_file = sys.argv[1]
    output_file = sys.argv[2]

    coordinate_dict = {}

    try:
        with open(input_file, encoding="utf8") as file:
            json_data = json.load(file)
    except IOError:
        print("ERROR: File does not exist.")
        return

    for element in json_data['features']:
        name = element['properties']['ISO_A3']
        geom = list(flatten(element['geometry']['coordinates']))
        geom = ([[geom[i], geom[i + 1]] for i in range(0, len(geom), 2)])
        coordinate_dict[name] = geom

    with open(output_file + ".json", "w", encoding="utf8") as file:
        json.dump(coordinate_dict, file, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
