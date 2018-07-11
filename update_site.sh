#!/bin/bash
bundle exec jekyll build
git commit -m "new" .
git push origin src
git subtree push --prefix _site origin master

