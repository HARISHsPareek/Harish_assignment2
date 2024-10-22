# Use an official node image as a base
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# RUN the application
RUN npm run dev

# Expose port 3000 to the outside world
EXPOSE 3000

