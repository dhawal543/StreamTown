FROM ubuntu:focal

# Install curl, Node.js, and ffmpeg
RUN /usr/bin/apt-get update && \
    /usr/bin/apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    /usr/bin/apt-get update && \
    /usr/bin/apt-get install -y nodejs ffmpeg

# Verify installation of Node.js and npm
RUN node -v && npm -v

WORKDIR /home/app

# Install nodemon globally
RUN npm i -g nodemon

# Command to run your application
CMD ["node", "index.js"]
