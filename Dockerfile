# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy and install all dependencies (including dev)
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy source and build
COPY src ./src
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Install curl for healthchecks and create non-root user
RUN apk add --no-cache curl \
    && addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001

# Copy only production dependencies and built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Set proper permissions
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "dist/index.js"]
