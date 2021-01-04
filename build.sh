#!/bin/bash

cd mqtt-lambda || exit
npm install
npm run build || exit
npm prune --production
cd ..
cd mqtt-rocket || exit
npm install
npm run build || exit
cd ..
rm -rf ./temp
mkdir ./temp


cp -R ./mqtt-lambda/lib/* ./temp
cp -R ./mqtt-lambda/package.json ./temp
cp -R ./mqtt-lambda/node_modules ./temp

cd ./temp
zip -r ../lambda.zip *
cd ..

mkdir ./mqtt-rocket/lib/lambda-handler
cp lambda.zip ./mqtt-rocket/lib/lambda-handler


cd mqtt-rocket || exit
npm run release
cd ..
cd mqtt-lambda || exit
npm install