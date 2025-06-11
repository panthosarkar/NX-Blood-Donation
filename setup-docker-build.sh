# Bash

# Git pull
git pull

# Build the image force
docker build -t src . #--no-cache

# Run the docker
docker rm -f src
docker run -d --name src -p 5002:5002 src