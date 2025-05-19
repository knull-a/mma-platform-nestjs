FROM node:20-alpine AS build

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm for production
RUN npm install -g pnpm

# Copy package files and install only production dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Copy migration files
COPY --from=build /app/src/database/migrations ./dist/database/migrations

EXPOSE 3000

# Crypto polyfill
RUN echo 'if (typeof globalThis.crypto === "undefined") { globalThis.crypto = require("crypto"); }' > /app/crypto-polyfill.js
CMD ["node", "-r", "/app/crypto-polyfill.js", "dist/src/main"]
