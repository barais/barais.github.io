#!/bin/bash
git pull
sleep 10
'cp' -uvarf _site/* ../ && git add ../ && git commit -m "Update site" && git push
