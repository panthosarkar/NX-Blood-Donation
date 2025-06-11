# Bash

# Git pull
git pull

# Build the image force
docker build -t bikiran-admin . #--no-cache

# Run the docker
docker rm -f admin
docker run -d --name admin -p 7215:7215 bikiran-admin
