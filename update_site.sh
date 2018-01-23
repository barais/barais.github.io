#!/bin/bash
git commit -m "new" .
git push origin src
git subtree push --prefix _site origin master

