#!/usr/bin/env sh

npm run build

echo "Converting absolute paths to relative paths"
sed -i 's/"\//"/g' dist/index.html

echo "Renaming dist folder to docs"
rm -rf docs/
mv dist/ docs/
