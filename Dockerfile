# Install dependencies only when needed
FROM node:18.18.0-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
#COPY package.json yarn.lock ./
COPY package.json ./

RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:18.18.0-alpine AS builder
WORKDIR /app
ARG BUILD_CMD=build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn $BUILD_CMD && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:18.18.0-alpine AS runner
WORKDIR /app

# Install PM2 globally
RUN yarn global add pm2

ENV NODE_ENV production
# ENV STAGE PROD

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/config ./config
COPY --from=builder /app/.env ./

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
