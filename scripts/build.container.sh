#!/usr/bin/env bash

ENV_FILE="${BASH_SOURCE%/*}/../.env"
if [ ! -f "$ENV_FILE" ]; then
    echo ".env file not found. Create it and defined DOCKER_REPO_NAME variable."
    exit 1
fi

source "$ENV_FILE"

if command -v docker &> /dev/null
then
    docker build -t $DOCKER_REPO_NAME/markdown-previewer .
elif command -v container &> /dev/null
then
    # Build for both ARM64 and AMD64 architectures (you may need to enable Rosetta 2)
    container build --arch amd64 --arch arm64 -t $DOCKER_REPO_NAME/markdown-previewer .
else
    echo "Please install Docker compatible CLI tool to build the container."
    exit 1
fi
