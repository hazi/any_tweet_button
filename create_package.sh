#!/bin/bash

cd `dirname $0`

rm -i 'package.zip'
git ls-files|grep -ve '\(^.gitignore\|create_package.sh\|^graphics\)'|xargs -I% zip 'package.zip' %

echo 'Complete'