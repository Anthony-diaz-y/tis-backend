# Base image
FROM node:lts-alpine3.23 AS builder

# Create app directory
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Production image, copy all the files and run next
FROM node:lts-alpine3.23 AS runner

WORKDIR /app

# Copy the bundled code from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Start the server using the production build
CMD [ "node", "dist/main.js" ]