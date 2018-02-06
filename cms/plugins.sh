#!/bin/bash

inputFile="./plugins.conf"

while IFS= read -r pluginName
do
  if [[ "${pluginName:0:1}" != "#" ]] && [[ ${#pluginName} > 0 ]]
  then
      echo "Installing ${pluginName}..."
      wp --allow-root plugin install ${pluginName}
      wp --allow-root plugin activate ${pluginName}
  fi
done < "$inputFile"
