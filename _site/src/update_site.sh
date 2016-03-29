#!/bin/bash
git pull
mv photos/Bombannes2014/IMG_06037.JPG  photos/Bombannes2014/IMG_060371.JPG
sleep 5
mv photos/Bombannes2014/IMG_060371.JPG  photos/Bombannes2014/IMG_06037.JPG
sleep 10
'cp' -uvarf _site/* ../ && git add ../ && git commit -m "Update site" && git push
