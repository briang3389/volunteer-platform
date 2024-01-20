#!/bin/sh

psql -f revert.sql --username=$1 volunteer
