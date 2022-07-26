"""
Calculate distance between two points on the globe, return km
"""
import json
import sys
from math import radians, cos, sin, asin, sqrt


def haversine(lat1, lon1, lat2, lon2):
    """ Determine globe distance with haversine formula """
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    dlon = lon2 - lon1
    dlat = lat2 - lat1
    inner_prod = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    unscaled_result = 2 * asin(sqrt(inner_prod))
    earth_radius = 6371
    return unscaled_result * earth_radius


def main():
    """ Entrypoint, create distance json file based on coordinate input"""
    with open(sys.argv[1], encoding="utf-8") as coordinate_data_file:
        file = json.load(coordinate_data_file)
        keys = list(file.keys())

        macro_distances = {}
        for index, element in enumerate(keys):
            distances = {}
            for secondary_index in range(index + 1, len(keys)):
                first_country = element
                second_country = keys[secondary_index]

                # Prevent territories from being considered
                if first_country == '-99' or second_country == '-99':
                    continue

                min_dist = float('inf')
                for first_coordinate_pair in file[first_country]:
                    for second_coordinate_pair in file[second_country]:

                        min_dist = min(
                            haversine(
                                first_coordinate_pair[0],
                                first_coordinate_pair[1],
                                second_coordinate_pair[0],
                                second_coordinate_pair[1]),
                            min_dist)
                        if min_dist < 1:
                            min_dist = 0
                            break
                    if min_dist < 1:
                        break
                distances[second_country] = min_dist

            macro_distances[element] = distances

        with open("distances.json", "w", encoding="utf8") as file:
            json.dump(macro_distances, file, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
