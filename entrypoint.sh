#!/bin/bash
set -e
cd /usr/app/
forever ./bin/www
tail -f /dev/null