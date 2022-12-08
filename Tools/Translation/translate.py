"""
Translate the given input strings into the selected languages, store the result
"""
import sys
import json
import time
import random as rand
import pyperclip

from selenium import webdriver
from selenium.webdriver.common.by import By
from families import family_names

lang_code_list = []
# LATIN LANGUAGES
lang_code_list += ['sq',
                   'hr',
                   'cs',
                   'da',
                   'et',
                   'en',
                   'de',
                   'hu',
                   'is',
                   'ga',
                   'it',
                   'lv',
                   'lt',
                   'lb',
                   'no',
                   'pt',
                   'ro',
                   'sk',
                   'sl',
                   'sv',
                   'tr',
                   'es',
                   'fi',
                   'fr',
                   'nl',
                   'pl']

# CYRILLIC LANGUAGES
lang_code_list += ['uk', 'ru', 'kk', 'ky', 'tg', 'mk', 'bg', 'mn', 'be']

# DEVANANGARI LANGUAGES
lang_code_list += ['hi', 'sa', 'ne']

# VARIOUS ASIAN LANGUAGES
lang_code_list += ['bn', 'my', 'zh-CN', 'gu', 'id',
                   'ja', 'km', 'ko', 'lo', 'tl', 'ta', 'th', 'vi']

# VARIOUS AFRICAN LANGUAGES
lang_code_list += ['af', 'yo', 'ig']

# VARIOUS OTHER LANGUAGES
lang_code_list += ['az', 'ka', 'pa', 'am', 'te']


def translate(text):
    """ Translate the input text through each of the given languages """
    translation_list = {}

    for lang_code in lang_code_list:

        browser = webdriver.Chrome()
        browser.get(
            "https://translate.google.co.in/?sl=auto&tl=" +
            lang_code +
            " &text=" +
            text +
            "&op=translate")

        time.sleep(3)
        browser.find_elements(By.CSS_SELECTOR,
                              "[aria-label='Copy translation']")[0].click()

        time.sleep(1)
        translation = pyperclip.paste()

        translation_list[lang_code] = {
            "translation": translation,
            "family": family_names[lang_code]}
        browser.close()

    return translation_list


def main():
    """ Entrypoint, allows for saving output files and specifying translation string """
    name = sys.argv[1]
    string = sys.argv[2]
    dic = translate(string)

    with open(name + str(rand.randint(10000, 99999)) +
              ".json", "w", encoding="utf8") as file:
        json.dump(dic, "./translations/" + file, ensure_ascii=False, indent=2)
        file.close()


if __name__ == "__main__":
    main()
