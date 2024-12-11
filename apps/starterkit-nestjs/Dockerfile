# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy pnpm-lock.yaml and pnpm-workspace.yaml from the root directory to the container
COPY ../../pnpm-lock.yaml ../../pnpm-workspace.yaml ./

# Copy the app2 package.json to the container
COPY package.json ./

# Copy the libs and packages directories to the container
COPY ../../libs ./libs
COPY ../../packages ./packages

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile --filter ./ --workspace-root

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your app runs on (if applicable)
EXPOSE 3001

# Specify the command to run your application
CMD ["pnpm", "start"]
