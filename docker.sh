#!/bin/sh

echo " NEW API URL : ${HTTP_ENDPOINT} "  ;

echo "REPLACING API URL" ;

sed -i -e 's|HTTP_ENDPOINT|'${HTTP_ENDPOINT}'|g' /usr/app/prod/app.js;

echo "DONE" ;
