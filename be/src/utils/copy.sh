#!/bin/sh
cd /Users/chenyukai/myproject/react-demo/be/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log