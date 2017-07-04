#!/bin/sh
node new_version.js
git add -A templates
git commit -m "version $1"
git tag v$1
git push
git push --tags