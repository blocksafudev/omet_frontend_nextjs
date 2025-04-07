# Base image
FROM node:20.11.0-alpine

# Install Git
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --production=true

# Copy all source code
COPY . .

# Build the app
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]