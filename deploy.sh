#!/bin/bash

while [ -z "$PASS" ]; do
    echo "Password: "
    read -s PASS
done	

upload() 
{
    dir=$1

    for file in $(ls -F "$dir" | grep -v '[/]' | grep -viE '\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff)$'); do
        path=$dir/$file
        echo "# Uploading $path"
        curl -T "$path" ftp://ftpx.forpsi.com/www/$dir/ --user www.conckova.cz:$PASS
    done		

    for subdir in $(ls -d "$dir"/*/ 2> /dev/null); do
        upload "$(echo $subdir | sed 's/\/$//g')"
    done		
}

upload .