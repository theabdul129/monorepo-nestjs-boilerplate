# Use UBI9 Node.js image as the base image
FROM --platform=linux/amd64 registry.access.redhat.com/ubi9/nodejs-22:latest 

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory for each app
ARG APP_NAME
WORKDIR /${APP_NAME}

# Copy package.json and pnpm-lock.yaml to the container
COPY ./packages ./packages
COPY ./pnpm-lock.yaml ./
COPY ./package.json ./package.json
COPY ./nx.json ./nx.json
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./apps/${APP_NAME} ./apps/${APP_NAME}

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Set environment variable to avoid interactive prompts
ENV NODE_ENV=development


# Install dependencies using pnpm
USER root

# Install necessary libraries for Puppeteer
# RUN microdnf install -y libatk libXcomposite libXcursor libXdamage libXext libXi libXtst cups-libs libXScrnSaver pango atk libxrandr alsa-lib gtk3 ipa-gothic-fonts nss libdrm libgbm && microdnf clean all


RUN pnpm install --unsafe-perm && npm install -g @nestjs/cli && export PATH=$PATH:/usr/local/bin


# Set permissions after copying the application code
# RUN chmod -R 777 ./apps/${APP_NAME}

# Build the application
RUN pnpm run -w build:all && pnpm prune --prod

# Remove packages and src folders after the build
# RUN rm -rf /packages /${APP_NAME}/src

# Expose the port that the app will run on (change as needed)
EXPOSE 3000

# Start the NestJS application
CMD ["pnpm", "exec", "nx", "run", "notification.service:start:prod"]
