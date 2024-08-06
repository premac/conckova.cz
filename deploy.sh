#!/bin/bash

while [ -n $PASS]; do
	echo "Password: "
	read PASS
done;	


upload() 
{
	dir=$1

	for file in `ls -F $dir | grep -v '[/]'`; do
		path=$dir/$file
		echo "# Uploading $path"
		curl -T $path ftp://ftpx.forpsi.com/www/$dir/ --user www.conckova.cz:$PASS
	done		

	for dir in `ls -d $dir/*/ 2> /dev/null`; do
		upload `echo $dir | sed 's/\/$//g'`
	done		
}

upload .


