# Use Node.js image as the base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node","server.js"] 
