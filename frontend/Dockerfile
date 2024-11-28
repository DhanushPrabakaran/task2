# Use Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Run Vite development server
CMD ["npm", "run", "dev"]
