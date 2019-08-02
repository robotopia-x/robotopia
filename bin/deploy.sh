#!/bin/bash

npm run build

mkdir dist
cd dist
git init
git remote add origin https://github.com/robotopia-x/robotopia-x.github.io.git
cd ..

cp index.html dist
cp bundle.js dist
cp -r assets dist

mkdir dist/node_modules
cp -r node_modules/blockly dist/node_modules/blockly


cd dist
touch .nojekyll
git add .
git commit -am 'update'
git push --force --set-upstream origin master

cd ..
rm -rf dist
rm bundle.js
