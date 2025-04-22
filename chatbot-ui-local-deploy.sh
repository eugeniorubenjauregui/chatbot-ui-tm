#!/bin/bash

# Clear the image from the local Docker Desktop environment
docker rm chatbot-ui

# Build the image
docker build -t chatbot-ui:latest --load .

# Run the image
docker run -it --name chatbot-ui -p 4001:8080 chatbot-ui