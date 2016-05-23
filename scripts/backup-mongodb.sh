#!/bin/bash

echo 'RWRITER MONGODB BACKUP'

MONGODB_HOST=$1
MONGODB_USERNAME=$2
MONGODB_PASSWORD=$3
MONGODB_DB=$4
FTP_SERVER=$5
FTP_USERNAME=$6
FTP_PASSWORD=$7

TMP_BACKUP=/tmp/rwriter-$(date +%Y%m%d%H%M%S)

mongodump --host $MONGODB_HOST --username $MONGODB_USERNAME --password $MONGODB_PASSWORD --db $MONGODB_DB --out $TMP_BACKUP/mongo
tar czf $TMP_BACKUP/mongo-$MONGODB_DB-$(date +%Y%m%d%H%M%S).tar.gz -C $TMP_BACKUP mongo

# FTP BACKUP
ftp -n $FTP_SERVER <<END-OF-FTP
user "$FTP_USERNAME" "$FTP_PASSWORD"
passive
binary
cd backup
lcd "$TMP_BACKUP"
put "mongo-$MONGODB_DB-$(date +%Y%m%d%H%M%S).tar.gz"
END-OF-FTP
