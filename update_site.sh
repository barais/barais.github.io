#!/bin/bash
bundle exec jekyll build
git add _posts/**
git add _site/**
git commit -m "new" .
git push origin src
git subtree push --prefix _site origin master

