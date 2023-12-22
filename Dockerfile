# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json tsconfig.json ./

# Install dependencies, including 'devDependencies' for TypeScript compilation
RUN npm install

# Copy your application source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Remove 'devDependencies' to reduce image size
RUN npm prune --production

# Your app binds to port 3000. Expose this port to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]