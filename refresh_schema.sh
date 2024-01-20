#!/bin/sh

./revert_schema.sh $1
./apply_schema.sh $1
