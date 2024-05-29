#!/bin/bash

for dir in $(find . -type d); do
    if [ "$dir" == "." ]; then
        continue
    fi
    echo "Converting $dir"

    # remove extension from dir
    dir=${dir%.sol}
    # remove prefix
    dir=${dir#./}
    
    echo "ABI for $dir"
    cat $dir.sol/$dir.json | jq .abi > $dir.json
done