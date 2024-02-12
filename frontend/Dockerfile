# Use an official Node.js runtime as a base image
FROM node:14

RUN addgroup app && adduser --system --group app
USER app

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
