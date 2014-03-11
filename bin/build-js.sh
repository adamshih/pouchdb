#!/bin/bash

: ${LEVEL:="false"}

if [ "$LEVEL" == "false" ]; then
    node_modules/.bin/browserify lib/index.js -s PouchDB -o dist/pouchdb-nightly.js
else
    echo "level stuff!"
    node_modules/.bin/browserify node_modules/level-js/index.js -s Level -o tests/deps/level-js.js
    node_modules/.bin/browserify lib/index.js -s PouchDB -o dist/pouchdb-level.js
fi