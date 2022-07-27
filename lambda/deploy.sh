#!/bin/bash

rm -rf build
mkdir build

cp Score.js index.js
zip build/score_function_code index.js

aws lambda update-function-code \
    --function-name Score \
    --zip-file fileb://build/score_function_code.zip
