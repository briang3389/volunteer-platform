#!/bin/sh

psql -f db_linux.sql --username=$1 volunteer
