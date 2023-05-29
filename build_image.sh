#! /bin/bash

echo 'Removing tagged images'
docker rmi gcr.io/api-documenter-server:1.0.0

echo 'Removing existing images'
docker rmi api-documenter-server:1.0.0

echo 'Creating new image for api-documenter-server'
docker build --tag api-documenter-server:1.0.0 . --platform linux/amd64