"""
Run on pairs of JS / CSS files to ensure there are no selectors that are unused
"""
import sys
import re


def main():
    """ Entrypoint, run checks """
    selectors = []

    # Collect CSS selectors
    with open(sys.argv[1], encoding="utf-8") as css_file:
        for elem in css_file.readlines():
            if re.match("^\\.", elem):
                selector = re.search('^\\.((\\w|\\-)*)', elem).group(1)
                if selector not in selectors:
                    selectors.append(selector)

    # Search in JS, print if not found
    with open(sys.argv[2], encoding="utf-8") as js_file:
        text = js_file.read()
        for elem in selectors:
            if not elem + " " in text:
                if not elem + "\"" in text:
                    print(elem)


if __name__ == "__main__":
    main()
