# Base image
FROM node:13.12.0-alpine

# Set working directory
WORKDIR /react-to-do/frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . ./

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
